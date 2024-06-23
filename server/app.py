#!/usr/bin/env python3

# Remote library imports
from flask import request, current_app, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Admin

# Views go here!
@app.route('/')
def index():
    host = request.headers.get("Host")
    appname = current_app.name
    return f'''<h1>The host for this page is {host}</h1>
                <h2>The name of this application is {appname}</h2>'''

class Newsletter(Resource):
    def get(self):
        return {"newsletter": "it's a beautiful 108 out in Austin today"}

api.add_resource(Newsletter, '/newsletters')

@app.route('/login')
def logon():
    admins = []
    for admin in Admin.query.all():
        admin_dict = {
            "name": admin.name,
            "email": admin.email,
            "password": admin.password,
        }
        admins.append(admin_dict)

    response = make_response(
        jsonify(admins),
        200
    )

    return response

@app.route('/cookie')
def cookie():
    response = make_response(jsonify({
        "cookies": request.cookies
    }), 200)
    return response

class Users(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(
            name=form_json['name'],
            email=form_json['email'], 
            is_select=form_json['is_select'], 
            phone_number=form_json['phone_number'],
            admin=form_json['admin']
        )
        new_user.password = form_json['password']
        db.session.add(new_user)
        db.session.commit()
        # session['user_id'] = new_user.id
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response

api.add_resource(Users, '/users') 


# class Register(Resource):
#     def post(self):
#         form_json = request.get_json()
#         new_user = User(
#             name=form_json['name'],
#             email=form_json['email'], 
#             is_select=form_json['is_select'], 
#             phone_number=form_json['phone_number'],
#             admin=form_json['admin']
#         )
#         new_user.password = form_json['password']
#         db.session.add(new_user)
#         db.session.commit()
#         response = make_response(
#             new_user.to_dict(),
#             201
#         )
#         return response

# api.add_resource(Register, '/signup')   

if __name__ == '__main__':
    app.run(port=5555, debug=True)
