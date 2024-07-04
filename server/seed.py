#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Admin, User, Login, Goods

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        # Delete existing data
        Admin.query.delete()
        User.query.delete()
        Login.query.delete()
        Goods.query.delete()
        
        # Seed admins
        admins = [
            Admin(name="admin", email="admin@gmail.com", password="1234"),
            Admin(name="admin2", email="admin2@gmail.com", password="1234"),
            Admin(name="kanny", email="kanny.ghafour87@gmail.com", password="1234")
        ]
        db.session.add_all(admins)
        db.session.commit()

        # Seed users and logins
        users = []
        logins = []
        goods = []

        for _ in range(10):
            user = User(
                name=fake.name(),
                email=fake.unique.email(),
                phone_number=fake.phone_number()
            )
            user.password = fake.password()
            users.append(user)
            db.session.add(user)
            db.session.commit()

            login = Login(
                email=user.email,
                user_id=user.id
            )
            login.password = user.password  # Assign the same password for simplicity
            logins.append(login)

            # Seed goods for each user
            for _ in range(randint(1, 5)):  # Each user will have between 1 and 5 goods
                good = Goods(
                    img=fake.image_url(),
                    price=f"{randint(10, 100)}.{randint(0, 99):02d}",
                    description=fake.sentence(),
                    user_id=user.id
                )
                goods.append(good)

        db.session.add_all(logins)
        db.session.add_all(goods)
        db.session.commit()

        print("Seeding completed.")