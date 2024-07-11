# users/routes.py
from flask import Blueprint, request, jsonify
from .models import User
from myproject.database import get_database

user_blueprint = Blueprint('user_blueprint', __name__)
db = get_database()
users_collection = db['users']

@user_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"error": "Missing data"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    new_user = User(name, email, password)
    users_collection.insert_one(vars(new_user))

    return jsonify({"message": "User created successfully"}), 201

@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Missing data"}), 400

    user_data = users_collection.find_one({"email": email})
    if not user_data:
        return jsonify({"error": "User not found"}), 404

    print(f"User data from DB: {user_data}")  # Debugging statement

    user = User(user_data['name'], user_data['email'], hashed_password=user_data['password'])
    print(f"User object created: {vars(user)}")  # Debugging statement

    if not user.check_password(password):
        return jsonify({"error": "Invalid password"}), 400

    return jsonify({"message": "Logged in successfully"}), 200
