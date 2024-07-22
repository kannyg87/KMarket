#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Admin, User, Login, Goods

VALID_IMAGE_URLS = [
    "https://picsum.photos/seed/picsum1/200/300",
    "https://picsum.photos/seed/picsum2/200/300",
    "https://picsum.photos/seed/picsum3/200/300",
    "https://picsum.photos/seed/picsum4/200/300",
    "https://picsum.photos/seed/picsum5/200/300",
    "https://picsum.photos/seed/picsum6/200/300",
    "https://picsum.photos/seed/picsum7/200/300",
    "https://picsum.photos/seed/picsum8/200/300",
    "https://picsum.photos/seed/picsum9/200/300",
    "https://picsum.photos/seed/picsum10/200/300"
]
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

        # Seed goods
        goods = []
        for _ in range(10):  # Seed 50 goods
            good = Goods(
                img=rc(VALID_IMAGE_URLS),
                price=f"{randint(10, 100)}.{randint(0, 99):02d}",
                description=fake.sentence()
            )
            goods.append(good)
        
        db.session.add_all(goods)
        db.session.commit()

        print("Seeding completed.")