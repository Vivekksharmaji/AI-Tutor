from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

def get_database():
    uri = "mongodb+srv://ramnarayan:Ram1234@cluster0.hk4ehir.mongodb.net/"
    
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)  # 5 second timeout
    
    try:
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ismaster')
        print("Connected to MongoDB successfully!")
        return client['Ai_Tutor']  # Replace 'your_database_name' with your actual database name
    except ServerSelectionTimeoutError as err:
        # Handle connection failure
        print("Could not connect to MongoDB:", err)
        return None

def insert_sample_data():
    db = get_database()
    if db is not None:
        courses_collection = db['courses']
        sample_data = [
            {
                "title": "React",
                "description": "Learn React from scratch.",
                "duration": "30 hours",
                "free": False,
                "amount": 100
            },
            {
                "title": "Python",
                "description": "Learn Python programming.",
                "duration": "40 hours",
                "free": True,
                "amount": 0
            }
        ]
        courses_collection.insert_many(sample_data)
        print("Sample data inserted successfully!")
    else:
        print("Failed to connect to the database.")

if __name__ == "__main__":
    insert_sample_data()
