# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/pet_contacts'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 数据库模型
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True)
    avatar = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Friendship(db.Model):
    __tablename__ = 'friendships'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (
        db.UniqueConstraint('user_id', 'friend_id', name='unique_friendship'),
    )

class Group(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    avatar = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class GroupMember(db.Model):
    __tablename__ = 'group_members'
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id', ondelete='CASCADE'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    role = db.Column(db.String(20), default='member')
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (
        db.UniqueConstraint('group_id', 'user_id', name='unique_membership'),
    )

# 原生SQL查询函数（利用PostgreSQL高级特性）
def pg_search_contacts(keyword, user_id):
    conn = psycopg2.connect(app.config['SQLALCHEMY_DATABASE_URI'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    # 使用PostgreSQL的全文搜索和相似度算法
    query = """
    (SELECT 'user' AS type, id, username AS name, 
            similarity(username, %s) AS score
     FROM users 
     WHERE username %% %s AND id != %s
     ORDER BY score DESC LIMIT 10)
    
    UNION ALL
    
    (SELECT 'group' AS type, id, name, 
            similarity(name, %s) AS score
     FROM groups
     WHERE name %% %s
     ORDER BY score DESC LIMIT 10)
    """
    
    cur.execute(query, (keyword, keyword, user_id, keyword, keyword))
    results = cur.fetchall()
    cur.close()
    conn.close()
    
    return {
        'users': [r for r in results if r['type'] == 'user'],
        'groups': [r for r in results if r['type'] == 'group']
    }

# API路由
@app.route('/api/friends/add', methods=['POST'])
def add_friend():
    data = request.get_json()
    if Friendship.query.filter_by(user_id=data['user_id'], friend_id=data['friend_id']).first():
        return jsonify({'error': '好友关系已存在'}), 400
        
    friendship = Friendship(
        user_id=data['user_id'],
        friend_id=data['friend_id']
    )
    db.session.add(friendship)
    db.session.commit()
    return jsonify({'message': '好友请求已发送'}), 201

@app.route('/api/friends/remove', methods=['POST'])
def remove_friend():
    data = request.get_json()
    # PostgreSQL支持更高效的批量删除
    db.session.execute(
        "DELETE FROM friendships WHERE (user_id=:uid AND friend_id=:fid) OR (user_id=:fid AND friend_id=:uid)",
        {'uid': data['user_id'], 'fid': data['friend_id']}
    )
    db.session.commit()
    return jsonify({'message': '好友已删除'})

@app.route('/api/groups/create', methods=['POST'])
def create_group():
    data = request.get_json()
    # 使用PostgreSQL的RETURNING子句获取新建的group
    result = db.session.execute(
        "INSERT INTO groups (name, creator_id) VALUES (:name, :cid) RETURNING id",
        {'name': data['name'], 'cid': data['creator_id']}
    )
    group_id = result.fetchone()[0]
    
    # 添加创建者为群主
    db.session.execute(
        "INSERT INTO group_members (group_id, user_id, role) VALUES (:gid, :uid, 'owner')",
        {'gid': group_id, 'uid': data['creator_id']}
    )
    db.session.commit()
    return jsonify({'group_id': group_id}), 201

@app.route('/api/groups/delete', methods=['POST'])
def delete_group():
    data = request.get_json()
    # 级联删除由PostgreSQL的外键约束自动处理
    db.session.execute(
        "DELETE FROM groups WHERE id=:gid AND creator_id=:uid",
        {'gid': data['group_id'], 'uid': data['user_id']}
    )
    db.session.commit()
    return jsonify({'message': '群组已删除'})

@app.route('/api/search/contacts', methods=['GET'])
def search_contacts():
    keyword = request.args.get('q', '')
    user_id = request.args.get('user_id')
    
    # 使用PostgreSQL特有的高级搜索功能
    return jsonify(pg_search_contacts(keyword, user_id))

@app.route('/api/contacts/list', methods=['GET'])
def list_contacts():
    user_id = request.args.get('user_id')
    
    # 使用PostgreSQL的JSON聚合功能
    result = db.session.execute("""
    SELECT json_build_object(
        'friends', (SELECT json_agg(json_build_object('id', u.id, 'name', u.username))
                   FROM users u JOIN friendships f ON u.id = f.friend_id
                   WHERE f.user_id = :uid AND f.status = 'accepted'),
        'groups', (SELECT json_agg(json_build_object('id', g.id, 'name', g.name))
                  FROM groups g JOIN group_members gm ON g.id = gm.group_id
                  WHERE gm.user_id = :uid)
    ) AS result
    """, {'uid': user_id})
    
    return jsonify(result.fetchone()['result'])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)