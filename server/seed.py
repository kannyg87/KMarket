#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import Admin, User, Login

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Admin.query.delete()
        User.query.delete()
        Login.query.delete()
        
        # Seed admins
        admins = [
            Admin(name="admin", email="admin@gmail.com", password="1234"),
            Admin(name="admin2", email="admin2@gmail.com", password="1234"),
            Admin(name="kanny", email="kanny.ghafour87@gmail.com", password="1234")
        ]
        db.session.add_all(admins)
        db.session.commit()

        # Seed users
        users = []
        logins = []
        for _ in range(10):
            user = User(
                name=fake.name(),
                email=fake.unique.email(),
                _password=fake.password(),
                phone_number=fake.phone_number()
            )
            db.session.add(user)
            db.session.commit()

            login = Login(
                email=user.email,
                user_id=user.id
            )
            logins.append(login)
        
        db.session.add_all(logins)
        db.session.commit()