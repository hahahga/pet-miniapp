from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import db, User, Wallet, ServiceHistory
from utils.auth import token_required
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

# 用户个人资料
@app.route('/api/user/profile', methods=['GET'])
@token_required
def get_user_profile(current_user):
    return jsonify({
        "username": current_user.username,
        "user_id": current_user.user_id,
        "is_vip": current_user.is_vip,
        "avatar": current_user.avatar,
        "follow_count": current_user.follow_count,
        "follower_count": current_user.follower_count,
        "like_count": current_user.like_count,
        "member_since": current_user.created_at.strftime("%Y-%m-%d")
    })

# 用户服务功能
@app.route('/api/user/services', methods=['GET'])
@token_required
def get_user_services(current_user):
    return jsonify({
        "contact_customer_service": {
            "url": "/api/support",
            "badge": current_user.unread_support_messages
        },
        "my_wallet": {
            "url": "/api/wallet",
            "balance": current_user.wallet.balance if current_user.wallet else 0
        },
        "nearby_services": {
            "url": "/api/services/nearby",
            "is_new": True  # 根据截图显示NEW标签
        }
    })

# 系统设置
@app.route('/api/system/settings', methods=['GET'])
@token_required
def get_system_settings(current_user):
    return jsonify({
        "settings": {
            "url": "/api/settings",
            "options": [
                {"name": "账号安全", "icon": "security"},
                {"name": "通知设置", "icon": "notifications"},
                {"name": "隐私设置", "icon": "privacy"},
                {"name": "关于我们", "icon": "info"}
            ]
        }
    })

# 钱包余额查询
@app.route('/api/wallet', methods=['GET'])
@token_required
def get_wallet(current_user):
    wallet = Wallet.query.filter_by(user_id=current_user.id).first()
    return jsonify({
        "balance": wallet.balance if wallet else 0,
        "currency": "CNY",
        "recent_transactions": []
    })

if __name__ == '__main__':
    app.run(debug=True)