# GREEN WHEELS

## Initializing backend application.

1. Download or clone the repository.

2. Open a terminal and move into the repository directory.

3. Create a virtual environment for the django application.

```
virtualenv venv
```

4. Activate the virtual environment.

* Windows:


```
.\venv\Scripts\activate
```

* Linux:

```
source ./venv/bin/activate
```

5. Install python dependencies:

```
pip install -r requirements.txt
```

6. Create and migrate schema data in database

```
python manage.py makemigrations

python manage.py migrate

```

7. Now, start django application.
Keep in mind that, by default, the application will run in: http://localhost:8000

```
python manage.py runserver
```

8. To open django restframework interface, go to http://localhost:8000/api/

&nbsp;

## Initializing frontend application

1. Move into **client** directory and install node dependencies.

```
npm install
```

2. Start the react application
```
npm start
```
