# users/models.py
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, name, email, password=None, hashed_password=None):
        self.name = name
        self.email = email
        if password:
            self.password = generate_password_hash(password)
        elif hashed_password:
            self.password = hashed_password
        else:
            raise ValueError("Either password or hashed_password must be provided")

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    # users/models.py

class Course:
    def __init__(self, title, description, duration, free=True, amount=0):
        self.title = title
        self.description = description
        self.duration = duration
        self.free = free
        self.amount = amount

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "duration": self.duration,
            "free": self.free,
            "amount": self.amount
        }
        
class Question:
    def __init__(self, course, question, options):
        self.course = course
        self.question = question
        self.options = options

    def to_dict(self):
        return {
            "course": self.course,
            "question": self.question,
            "options": self.options
        }

