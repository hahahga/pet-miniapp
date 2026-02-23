from backend import app, db
from backend.models import User, Pet, HealthRecord, Service, ServiceRequest, Activity, Participation, Post, Comment

def init_db():
    with app.app_context():
        db.create_all()
        
        # 创建测试用户
        owner = User(username='pet_owner', password='owner123', role='owner', phone='13800138000', email='owner@example.com')
        staff = User(username='community_staff', password='staff123', role='staff', phone='13900139000', email='staff@example.com')
        db.session.add(owner)
        db.session.add(staff)
        
        # 创建测试宠物
        pet = Pet(name='豆豆', breed='金毛', age=2, gender='male', vaccination='已接种狂犬疫苗', user_id=1)
        db.session.add(pet)
        
        # 创建测试健康记录
        health_record = HealthRecord(pet_id=1, temperature=38.5, food_intake='正常', bowel_movement='正常')
        db.session.add(health_record)
        
        # 创建测试服务
        service = Service(name='宠物美容', description='专业宠物美容服务', price=100.0, duration='1小时')
        db.session.add(service)
        
        db.session.commit()
        print('Database initialized successfully!')

if __name__ == '__main__':
    init_db()