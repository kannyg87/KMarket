from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    is_select = db.Column(db.Boolean, default=False)
    phone_number = db.Column(db.String, nullable=True)
    admin = db.Column(db.String, default=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))

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
