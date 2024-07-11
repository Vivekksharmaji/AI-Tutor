# users/question_routes.py
from flask import Blueprint, request, jsonify
from .models import Question
from myproject.database import get_database

question_blueprint = Blueprint('question_blueprint', __name__)
db = get_database()
questions_collection = db['questions']

@question_blueprint.route('/add-question', methods=['POST'])
def add_question():
    data = request.get_json()
    course = data.get('course')
    question_text = data.get('question')
    options = data.get('options')

    if not all([course, question_text, options]) or len(options) != 4:
        return jsonify({"error": "Course, question and exactly 4 options are required"}), 400

    new_question = Question(course, question_text, options)
    questions_collection.insert_one(new_question.to_dict())

    return jsonify({"message": "Question added successfully"}), 201

@question_blueprint.route('/get-questions', methods=['GET'])
def get_questions():
    course = request.args.get('course')
    if not course:
        return jsonify({"error": "Course parameter is required"}), 400

    questions_cursor = questions_collection.find({"course": course})
    questions = [q for q in questions_cursor]
    for question in questions:
        question['_id'] = str(question['_id'])  # Convert ObjectId to string

    return jsonify(questions), 200
