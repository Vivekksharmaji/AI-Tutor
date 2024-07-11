# # app.py
# from database import get_database

# def main():
#     db = get_database()
#     if db is not None:
#         collection = db['users']  # Replace 'users' with your actual collection name
        
#         # Insert multiple documents
#         documents = [
#             {"name": "Alice", "age": 25, "city": "Los Angeles"},
#             {"name": "Bob", "age": 30, "city": "New York"},
#             {"name": "Charlie", "age": 35, "city": "Chicago"}
#         ]
#         collection.insert_many(documents)

#         # Fetch and print all documents
#         results = collection.find()
#         for result in results:
#             print(result)
#     else:
#         print("Database connection failed.")

# if __name__ == "__main__":
#     main()


from flask import Flask
from flask_cors import CORS
from users.routes import user_blueprint
from users.course_routes import course_blueprint
from users.mock_questions_routes import mock_questions_blueprint
from users.question_routes import question_blueprint

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
app.register_blueprint(user_blueprint)
app.register_blueprint(course_blueprint)
app.register_blueprint(mock_questions_blueprint)
app.register_blueprint(question_blueprint)

if __name__ == '__main__':
    app.run(debug=True)





