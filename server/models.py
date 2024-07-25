from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, relationship
from config import db, bcrypt, app
from flask_cors import CORS

CORS(app)

# Association table for the many-to-many relationship
user_goods = db.Table('user_goods',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('goods_id', db.Integer, db.ForeignKey('goods.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=True)
    admin = db.Column(db.Boolean, default=False)

    logins = relationship('Login', backref='user', cascade='all, delete, delete-orphan', lazy=True)
    goods = relationship('Goods', secondary=user_goods, back_populates='users')

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number,
            'admin': self.admin,
            'goods': [good.to_dict() for good in self.goods]  # Include goods in to_dict
        }

    @validates('email')
    def validates_email(self, key, email_input):
        if '@' not in email_input:
            raise ValueError("Invalid email format")
        return email_input

    def __repr__(self):
        return f'<User {self.name} {self.email} {self.phone_number}>'

class Login(db.Model, SerializerMixin):
    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'user_id': self.user_id
        }

    @validates('email')
    def validates_email(self, key, email_input):
        if ('@' not in email_input):
            raise ValueError("Invalid email format")
        return email_input

    def __repr__(self):
        return f'<Login {self.email}>'

class Goods(db.Model, SerializerMixin):
    __tablename__ = 'goods'

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String(255), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    # serialize_rules = ('-img',)

    users = relationship('User', secondary=user_goods, back_populates='goods', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'img': self.img,
            'price': self.price,
            'description': self.description
        }

    def __repr__(self):
        return f'<Goods {self.img}>'

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'password': self.password
        }

    def __repr__(self):
        return f'<Admin {self.name} {self.email}>'