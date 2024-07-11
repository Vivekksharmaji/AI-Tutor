# users/course_routes.py
from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from .models import Course
from myproject.database import get_database

course_blueprint = Blueprint('course_blueprint', __name__)
db = get_database()
courses_collection = db['courses']

@course_blueprint.route('/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    duration = data.get('duration')
    free = data.get('free', True)
    amount = data.get('amount', 0)

    if not all([title, description, duration]):
        return jsonify({"error": "Missing data"}), 400

    new_course = Course(title, description, duration, free, amount)
    courses_collection.insert_one(new_course.to_dict())

    return jsonify({"message": "Course created successfully"}), 201

@course_blueprint.route('/courses', methods=['GET'])
def get_courses():
    courses = courses_collection.find()
    course_list = [course for course in courses]
    for course in course_list:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string

    return jsonify(course_list), 200


@course_blueprint.route('/courses/<course_id>', methods=['DELETE'])
def delete_course(course_id):
    result = courses_collection.delete_one({"_id": ObjectId(course_id)})

    if result.deleted_count == 1:
        return jsonify({"message": "Course deleted successfully"}), 200
    else:
        return jsonify({"error": "Course not found"}), 404

@course_blueprint.route('/courses/<course_id>', methods=['PUT'])
def update_course(course_id):
    data = request.get_json()
    update_data = {}
    if 'title' in data:
        update_data['title'] = data['title']
    if 'description' in data:
        update_data['description'] = data['description']
    if 'duration' in data:
        update_data['duration'] = data['duration']
    if 'free' in data:
        update_data['free'] = data['free']
    if 'amount' in data:
        update_data['amount'] = data['amount']

    result = courses_collection.update_one({"_id": ObjectId(course_id)}, {"$set": update_data})

    if result.matched_count == 1:
        return jsonify({"message": "Course updated successfully"}), 200
    else:
        return jsonify({"error": "Course not found"}), 404
