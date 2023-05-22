# GREEN WHEELS

This software is for an university project. Its objective it's to serve as 
a resources manager for a electric car seller company.

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

8. To open django application in web browser, go to http://localhost:8000/

&nbsp;

## Initializing frontend application

1. In another terminal, move into **front-green-wheels** directory inside **client** directory and install node dependencies.

```
npm install
```

2. Start the react application

```
npm start
```

3. To open react application in web browser, go to http://localhost:3000/

