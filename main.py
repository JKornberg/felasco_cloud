import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("felasco-contact-b4597-firebase-adminsdk-wl4o8-a5f1327195.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'felasco-contact-b4597',
})

db = firestore.client()