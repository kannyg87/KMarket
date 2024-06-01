# models.py

from sqlalchemy_serializer import SerializerMixin
from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    confPassword = db.Column(db.String, nullable=False)
    is_select = db.Column(db.Boolean, default=False)
    phone_number = db.Column(db.String, nullable=True)
