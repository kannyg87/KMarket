#!/usr/bin/env python3

# Remote library imports
from flask import request, current_app
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User

# Views go here!
@app.route('/')
def index():
    host = request.headers.get("Host")
    appname = current_app.name
    return f'''<h1>The host for this page is {host}</h1>
                <h2>The name of this application is {appname}</h2>'''

if __name__ == '__main__':
    app.run(port=5555, debug=True)
