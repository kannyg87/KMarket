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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
