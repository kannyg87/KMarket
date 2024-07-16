from flask import Flask, abort, request, current_app, jsonify, make_response, session
from flask_restful import Api, Resource
from config import app, db, api
from models import Login, User, Admin, Goods
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

CORS(app)

@app.route('/')
def index():
    host = request.headers.get("Host")
    appname = current_app.name
    return f'''<h1>The host for this page is {host}</h1>
                <h2>The name of this application is {appname}</h2>'''

class Users(Resource):
    def post(self):
        form_json = request.get_json()
        try:
            email_exists = User.query.filter_by(email=form_json['email']).first()
            if email_exists:
                abort(409, description="Email already exists")

            new_user = User(
                name=form_json['name'],
                email=form_json['email'], 
                phone_number=form_json.get('phone_number'),
                admin=form_json.get('admin', False)
            )
            new_user.password = form_json['password']
            db.session.add(new_user)
            db.session.commit()

            new_login = Login(
                email=form_json['email'],
                user_id=new_user.id
            )
            new_login.password = form_json['password']
            db.session.add(new_login)
            db.session.commit()

            session['user_id'] = new_user.id
            response = make_response(jsonify(new_user.to_dict()), 201)
        except ValueError as e:
            db.session.rollback()
            print(f"ValueError: {e}")
            abort(422, description=str(e))
        except IntegrityError as e:
            db.session.rollback()
            print(f"IntegrityError: {e}")
            abort(409, description="Database integrity error")
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

        return response

api.add_resource(Users, '/users')

class Logins(Resource):
    def post(self):
        form_json = request.get_json()
        try:
            user = User.query.filter_by(email=form_json['email']).first()
            if not user:
                abort(404, description="User not found")

            if not user.authenticate(form_json['password']):
                abort(401, description="Invalid password")

            session['user_id'] = user.id
            response = make_response(jsonify(user.to_dict()), 200)
        except ValueError as e:
            db.session.rollback()
            abort(422, description=str(e))
        except IntegrityError:
            db.session.rollback()
            abort(409, description="Database integrity error")
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected Error: {e}")  # Log the error
            abort(500, description="Internal Server Error")

        return response

api.add_resource(Logins, '/logins')

class Goodss(Resource):
    def get(self):
        try:
            goods = Goods.query.all()
            goods_list = [good.to_dict() for good in goods]
            return make_response(jsonify(goods_list), 200)
        except Exception as e:
            print(f"Unexpected Error: {e}")  # Log the error
            abort(500, description="Internal Server Error")

    def post(self):
        form_json = request.get_json()
        print(f"Received goods data: {form_json}")  # Add logging for received data
        try:
            new_goods = Goods(
                img=form_json['img'],
                price=form_json['price'],
                description=form_json['description']
            )
            db.session.add(new_goods)
            db.session.commit()
            response = make_response(jsonify(new_goods.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected Error: {e}")  # Log the error
            abort(500, description="Internal Server Error")

        return response

api.add_resource(Goodss, '/goods')

class GoodssByID(Resource):
    def get(self, id):
        try:
            goods = Goods.query.filter(Goods.id == id).first()
            if goods:
                return make_response(jsonify(goods.to_dict()), 200)
            else:
                abort(404, description="Goods not found")
        except Exception as e:
            print(f"Unexpected Error: {e}")  # Log the error
            abort(500, description="Internal Server Error")

api.add_resource(GoodssByID, '/goods/<int:id>')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session.get('user_id')).first()
            if user:
                response = make_response(user.to_dict(), 200)
                return response
            else:
                abort(401, description="Unauthorized")
        except Exception as e:
            print(f"Error occurred: {e}")
            abort(500, description="Internal Server Error")

api.add_resource(AuthorizedSession, '/authorized')

class Logout(Resource):
    def delete(self):
        if 'user_id' in session:
            session.pop('user_id')
            print("User session cleared")
        else:
            print("No user session found")
        response = make_response('', 204)
        return response

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)