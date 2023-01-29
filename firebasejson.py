import json
import firebase_admin
from firebase_admin import db, credentials

cred = credentials.Certificate("beelineServiceKey.json")
# firebase_admin.initialize_app(cred)

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://beeline-48d6e-default-rtdb.firebaseio.com/'
})

# Read the JSON file
with open('flights.json') as json_file:
    data = json.load(json_file)

# Update the data in the database
db.reference().set(data)