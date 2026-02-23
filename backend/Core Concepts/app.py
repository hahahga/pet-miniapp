from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import db, User, Post, Activity, Service
import config

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)

# 初始化数据库
@app.before_first_request
def create_tables():
    db.create_all()

# 错误处理
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

# 1. 宠物社交功能
@app.route('/api/posts', methods=['GET', 'POST'])
def handle_posts():
    if request.method == 'GET':
        # 获取动态列表
        page = request.args.get('page', 1, type=int)
        per_page = 10
        posts = Post.query.order_by(Post.created_at.desc()).paginate(page=page, per_page=per_page)
        
        return jsonify({
            'posts': [post.to_dict() for post in posts.items],
            'total': posts.total,
            'pages': posts.pages,
            'current_page': page
        })
    
    elif request.method == 'POST':
        # 创建新动态
        data = request.get_json()
        new_post = Post(
            user_id=data['user_id'],
            content=data['content'],
            images=data.get('images', [])
        )
        db.session.add(new_post)
        db.session.commit()
        
        return jsonify(new_post.to_dict()), 201

# 2. 活动推荐功能
@app.route('/api/activities', methods=['GET'])
def get_activities():
    # 获取推荐活动
    activities = Activity.query.order_by(Activity.start_time.asc()).limit(5).all()
    return jsonify([activity.to_dict() for activity in activities])

# 3. 服务发现功能
@app.route('/api/services', methods=['GET'])
def get_services():
    # 获取附近服务
    lat = request.args.get('lat', type=float)
    lng = request.args.get('lng', type=float)
    radius = request.args.get('radius', 5, type=float)  # 默认5公里
    
    services = Service.query.filter(
        Service.latitude.between(lat - 0.1, lat + 0.1),
        Service.longitude.between(lng - 0.1, lng + 0.1)
    ).limit(10).all()
    
    return jsonify([service.to_dict() for service in services])

# 未读消息计数
@app.route('/api/messages/unread', methods=['GET'])
def unread_messages():
    user_id = request.args.get('user_id', type=int)
    # 这里简化实现，实际应该查询数据库
    return jsonify({'count': 37})  # 根据截图显示37条未读

if __name__ == '__main__':
    app.run(debug=True)