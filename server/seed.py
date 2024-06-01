#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import Admin, User

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
        # Seed code goes here!
        admins = []
        admins.append(
            Admin(name="admin", email="admin@gmail.com", password="1234"))
        admins.append(
            Admin(name="admin2", email="admin2@gmail.com", password="1234"))
        admins.append(
            Admin(name="kanny", email="kanny.ghafour87@gmail.com", password="1234"))
        db.session.add_all(admins)
        db.session.commit()

        users = []
        for n in range(10):
            user = User(
                name=fake.name(),
                email=fake.unique.email(),
                password=fake.password(),
                confPassword=fake.password(),
                is_select=fake.boolean(),
                phone_number=fake.phone_number()
            )

            users.append(user)
        db.session.add_all(users)
        db.session.commit()
