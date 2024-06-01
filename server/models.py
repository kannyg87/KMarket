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

    def __repr__(self):
      return f'<User {self.name} {self.email} {self.is_select} {self.phone_number}>'


class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __repr__(self):
      return f'<Admin {self.name} {self.email} {self.password}>'


