from flask import Blueprint, request, jsonify
from faker import Faker
import random

fake = Faker()
mock_questions_blueprint = Blueprint('mock_questions_blueprint', __name__)

# Define a pool of fake questions and options for different courses
def generate_random_question(course_name):
    question = f"What is {course_name} used for?"
    correct_answer = f"{course_name} is used for {fake.bs()}"
    incorrect_answers = [fake.bs() for _ in range(3)]
    options = [correct_answer] + incorrect_answers
    random.shuffle(options)
    return {
        "question": question,
        "options": options
    }

def generate_random_questions(course_name, num_questions=3):
    questions = []
    for _ in range(num_questions):
        questions.append(generate_random_question(course_name))
    return questions

@mock_questions_blueprint.route('/mock-questions', methods=['GET'])
def get_mock_questions():
    course = request.args.get('course')
    num_questions = int(request.args.get('num_questions', 3))
    
    if not course:
        return jsonify({"error": "Course parameter is required"}), 400
    
    course_questions = generate_random_questions(course, num_questions)
    
    return jsonify(course_questions), 200
