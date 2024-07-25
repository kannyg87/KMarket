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
    def get(self):
        try:
            users = User.query.all()
            user_list = [user.to_dict() for user in users]
            return make_response(jsonify(user_list), 200)
        except Exception as e:
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

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
            print(f"Unexpected Error: {e}")
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
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

    def post(self):
        form_json = request.get_json()
        print(f"Received goods data: {form_json}")
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
            print(f"Unexpected Error: {e}")
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
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

api.add_resource(GoodssByID, '/goods/<int:id>')

class UserGoods(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            abort(404, description="User not found")
        user_goods = user.goods
        return [good.to_dict() for good in user_goods]

    def post(self, user_id):
        form_json = request.get_json()
        try:
            good_id = form_json['good_id']
            user = User.query.get(user_id)
            good = Goods.query.get(good_id)
            if user and good:
                if good in user.goods:
                    return make_response(jsonify({"message": "Good already added to user."}), 409)
                else:
                    user.goods.append(good)
                    db.session.commit()
                    return make_response(jsonify({"message": "Good added to user successfully."}), 200)
            else:
                abort(404, description="User or Good not found")
        except IntegrityError:
            db.session.rollback()
            abort(409, description="Database integrity error")
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

    def delete(self, user_id, good_id):
        try:
            user = User.query.get(user_id)
            good = Goods.query.get(good_id)
            if user and good and good in user.goods:
                user.goods.remove(good)
                db.session.commit()
                return make_response(jsonify({"message": "Good removed from user successfully."}), 200)
            else:
                abort(404, description="User or Good not found")
        except IntegrityError:
            db.session.rollback()
            abort(409, description="Database integrity error")
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

api.add_resource(UserGoods, '/users/<int:user_id>/goods', '/users/<int:user_id>/goods/<int:good_id>')

class Admins(Resource):
    def get(self):
        try:
            admin = Admin.query.all()
            admin_list = [ad.to_dict() for ad in admin]
            return make_response(jsonify(admin_list), 200)
        except Exception as e:
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

    def post(self):
        form_json = request.get_json()
        print(f"Received admin data: {form_json}")
        try:
            if not form_json:
                abort(400, description="Invalid data")

            # Check if all required fields are present
            if 'name' not in form_json or 'email' not in form_json or 'password' not in form_json:
                abort(400, description="Missing fields")

            new_admin = Admin(
                name=form_json['name'],
                email=form_json['email'],
                password=form_json['password']
            )
            db.session.add(new_admin)
            db.session.commit()
            response = make_response(jsonify(new_admin.to_dict()), 201)
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected Error: {e}")
            abort(500, description="Internal Server Error")

        return response

api.add_resource(Admins, '/admin')

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