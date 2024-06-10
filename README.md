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

## Werkzeug
it is WSGi library It includes a number of features that will come in handy as we start to build our first Python web applications:

- An in-browser debugger.
- Robust classes for requests and responses.
- Routing, auto-generation and management of URLs.
- A development server.
- A testing framework that does not require a running server.


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


# password: 
import bcrypt in the config and invoke it, and we need to run 
```sh
pip install flask-bcrypt
```
