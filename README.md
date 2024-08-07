# KMarket


 # Generating a React Application

To get started, let's spin up our React application using `create-react-app`:

```sh
npx create-react-app client --use-npm
```

# Creating the Server Application

With the environment set up, let's get started on building our Flask application!

### Setting Up the Virtual Environment

1. Navigate to the root directory of your project.
2. Run the following command to create and activate a virtual environment using Pipenv:

```bash
pipenv install && pipenv shell
```

```console
$ tree -L 2
$ # the -L argument limits the depth at which we look into the directory structure
.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    └── seed.py
```
### Then enter the commands to create the instance and migrations folders and the database app.db file:
```bash
flask db init
flask db upgrade head
```

### Tools that have been used:
- `react-router-dom`v6
- React Context

### Client side:
## Building the Client Side with UseContext to Prevent Prop Drilling

To manage state and prevent prop drilling, we'll use the `useContext` hook. This allows us to share state across components without having to pass props down through multiple levels.

## Using React Router Dom v6 with Nested Routes

We will use React Router Dom v6 to handle routing in our application. Nested routes can be defined using the `children` property. To render these nested routes, you need to include the `Outlet` component in your parent component.


## Using Formik and Yup for Form Validation

To install Formik, run the following command:

```sh
npm install --save formik
```
To install Yup, run the following command:
```sh
npm install yup
```


### Client side:
Run `pipenv install` to install the dependencies and `pipenv shell` to enter your virtual environment before running your code.

```sh
pipenv install
pipenv shell
```
Change into the server directory and configure the FLASK_APP and FLASK_RUN_PORT environment variables:

```sh
cd server
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```

Let's create the database app.db with an empty user table:
```sh
flask db init
flask db migrate -m "Initial migration."
flask db upgrade head
```
And for delete the db 
```sh
rm -rf migrations
```

For adding new model we following to perform a migration:
```sh
flask db migrate -m 'add review'
flask db upgrade head
```

## Implement validations and error handling
we can add to the column when we first create a column ``` nullable=False``` that is mean it can not be no value 
```sh
name = db.Column(db.String, nullable=False)
```
we are going to import validates from sqlalchemy.orm and use validates decorator, 

```sh
@validates('email')
def validates_email(self, key, email_input):
    if '@' not in email_input:
        raise ValueError("wrong email format")
    return email_input
```
we can test that through flask shell

## Werkzeug
it is WSGi library It includes a number of features that will come in handy as we start to build our first Python web applications:

- An in-browser debugger.
- Robust classes for requests and responses.
- Routing, auto-generation and management of URLs.
- A development server.
- A testing framework that does not require a running server.


#Serializer
we import Serializer from SerializerMixin
```sh
from sqlalchemy_serializer import SerializerMixin
```

By using SQLAlchemy-Serializer, programmers can create faster and more efficient programs that can easily share data with others, we can include and not include some key, value pair from json file and also using .to_dict() to make it easier to loop on the data in the table as en example:
in model.py
```sh
class Goods(db.Model, SerializerMixin):
    __tablename__ = 'goods'
``` 

in the app.py 
```sh
class Goodss(Resource):
    def get(self):
        goods = Goods.query.all()
        goods_list = [good.to_dict() for good in goods]
        return make_response(jsonify(goods_list), 200)
```

# Seeding the database
Here is an example of how to add a user to the database:

```python
users.append(Admin(name="admin", email="admin@gmail.com", password="1234"))
db.session.add_all(users)
db.session.commit()
```
then run
```sh
python seed.py
```

# One-To-Many Relationships
A single User can have multiple Login entries. This is indicated by the logins attribute in the User class, which is a list of Login objects associated with the user.

```sh
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=True)
    admin = db.Column(db.Boolean, default=False)

    logins = relationship('Login', backref='user', lazy=True)

```

```sh
class Login(db.Model, SerializerMixin):
    __tablename__ = 'logins'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
```

# password: 
import bcrypt in the config and invoke it, and we need to run 
```sh
pip install flask-bcrypt
```

# Session
hold user info for us, allow some information between requests, no need to make query every time 

# secret Key 
to get the secret ket just run in the terminal 
```sh
$ python -c 'import os; print(os.urandom(16))'
```
then in the config file 
```sh
app.secret_key = b'Z\x9e&T\x87\xe5\xc1Q6|\xdaJ\xc7I\x87\xe6'
```

# Tailwindcss 
- [Tailwind CSS](https://tailwindcss.com/)
## Folder Structure

- `src/`
  - `style.css`
- `public/dist/`
  - `style.css`
  - `index.html`

## Setup
npm run build:css

### Step 1: Update `package.json`

Make sure your `package.json` includes the following script:

```json
"scripts": {
  "start": "react-scripts start",
  "build:css": "tailwind build src/style.css -o dist/style.css",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}

```