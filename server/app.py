from flask import Flask, abort, request, current_app, jsonify, make_response
from flask_restful import Api, Resource
from config import app, db, api  
from models import User, Admin
from flask_cors import CORS

CORS(app)
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
def login():
    admins = []
    for admin in Admin.query.all():
        admin_dict = {
            "name": admin.name,
            "email": admin.email,
            # Avoid returning password directly, it's for demo purpose only.
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
        try:
            new_user = User(
                name=form_json['name'],
                email=form_json['email'], 
                phone_number=form_json['phone_number'],
                admin=form_json['admin']
            )
            new_user.password = form_json['password']
        except ValueError as e:
            abort(422,e.args[0])
        db.session.add(new_user)
        db.session.commit()
        
        response = make_response(
            jsonify(new_user.to_dict()),
            201
        )
        return response

api.add_resource(Users, '/users') 

if __name__ == '__main__':
    app.run(port=5555, debug=True)
