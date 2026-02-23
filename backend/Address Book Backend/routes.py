from flask import Blueprint, jsonify, request
from backend import db
from backend.models import Pet, User, HealthRecord, Activity, SocialPost
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

api = Blueprint('api', __name__)

@api.route('/user/login', methods=['POST'])
def wechat_login():
    # 微信小程序登录接口
    data = request.get_json()
    # 这里应该添加微信小程序登录验证逻辑
    return jsonify({'code': 200, 'msg': '登录成功'})

@api.route('/services', methods=['GET'])
@jwt_required()
def get_services():
    # 获取服务列表
    current_user = get_jwt_identity()
    return jsonify({'services': []})

@api.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([pet.to_dict() for pet in pets])

@api.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    return jsonify(pet.to_dict())

@api.route('/pets', methods=['POST'])
def create_pet():
    data = request.get_json()
    pet = Pet(
        name=data['name'],
        breed=data['breed'],
        age=data['age'],
        gender=data['gender'],
        vaccination=data['vaccination'],
        user_id=data['user_id']
    )
    db.session.add(pet)
    db.session.commit()
    return jsonify(pet.to_dict()), 201

@api.route('/pets/<int:pet_id>', methods=['PUT'])
def update_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    data = request.get_json()
    pet.name = data['name']
    pet.breed = data['breed']
    pet.age = data['age']
    pet.gender = data['gender']
    pet.vaccination = data['vaccination']
    db.session.commit()
    return jsonify(pet.to_dict())

@api.route('/pets/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    db.session.delete(pet)
    db.session.commit()
    return jsonify({'message': 'Pet deleted successfully'}), 200

@api.route('/pets/<int:pet_id>/health', methods=['GET'])
def get_pet_health_stats(pet_id):
    records = HealthRecord.query.filter_by(pet_id=pet_id).all()
    if not records:
        return jsonify({'message': 'No health records found'}), 404
    
    # 计算平均体温
    avg_temp = sum(r.temperature for r in records if r.temperature) / len(records)
    
    # 统计饮食情况
    food_stats = {}
    for r in records:
        if r.food_intake:
            food_stats[r.food_intake] = food_stats.get(r.food_intake, 0) + 1
    
    return jsonify({
        'average_temperature': avg_temp,
        'food_intake_stats': food_stats,
        'total_records': len(records)
    })

# 活动管理API
@api.route('/activities', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    return jsonify([activity.to_dict() for activity in activities])

@api.route('/activities/<int:activity_id>', methods=['GET'])
def get_activity(activity_id):
    activity = Activity.query.get_or_404(activity_id)
    return jsonify(activity.to_dict())

@api.route('/activities', methods=['POST'])
@jwt_required()
def create_activity():
    data = request.get_json()
    activity = Activity(
        title=data['title'],
        description=data['description'],
        location=data['location'],
        start_time=datetime.strptime(data['start_time'], '%Y-%m-%d %H:%M:%S'),
        end_time=datetime.strptime(data['end_time'], '%Y-%m-%d %H:%M:%S'),
        creator_id=get_jwt_identity()
    )
    db.session.add(activity)
    db.session.commit()
    return jsonify(activity.to_dict()), 201

# 社交功能API
@api.route('/posts', methods=['GET'])
def get_posts():
    posts = SocialPost.query.order_by(SocialPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@api.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    post = SocialPost(
        content=data['content'],
        author_id=get_jwt_identity(),
        pet_id=data.get('pet_id')
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

@api.route('/posts/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(post_id):
    data = request.get_json()
    comment = Comment(
        content=data['content'],
        author_id=get_jwt_identity(),
        post_id=post_id
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201