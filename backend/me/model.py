from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20), unique=True, nullable=False)  # 如user12345
    username = db.Column(db.String(50), nullable=False)  # 如"宠物家长"
    password_hash = db.Column(db.String(128))
    avatar = db.Column(db.String(200))
    is_vip = db.Column(db.Boolean, default=False)
    follow_count = db.Column(db.Integer, default=0)
    follower_count = db.Column(db.Integer, default=0)
    like_count = db.Column(db.Integer, default=0)
    unread_support_messages = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    wallet = db.relationship('Wallet', backref='user', uselist=False, lazy=True)
    service_history = db.relationship('ServiceHistory', backref='user', lazy=True)
    
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class Wallet(db.Model):
    __tablename__ = 'wallets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    balance = db.Column(db.Float, default=0.0)
    currency = db.Column(db.String(10), default='CNY')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ServiceHistory(db.Model):
    __tablename__ = 'service_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    service_type = db.Column(db.String(50))
    service_date = db.Column(db.DateTime, default=datetime.utcnow)
    amount = db.Column(db.Float)
    status = db.Column(db.String(20), default='completed')