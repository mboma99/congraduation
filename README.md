
## Photo Graduation Web App

This application is a photo graduation web app that uses a variety of technologies including S3, PostgreSQL, FastAPI, React.js, and Docker. 

This will be a step by step guide in how to run this application

## Software Requirements
  
- **FastAPI:** This is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.
  
- **React.js:** This is a JavaScript library for building user interfaces.
  
- **Docker:** This is a platform used for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

## Installation on Windows


1. **Install Python:** Download python 3.9.6 from https://www.python.org/downloads/ download the correct system type. ensure that you add pyhton 3.9 to PATH. this video helps install to loacl enviroments https://youtu.be/91SGaK7_eeY?si=ueN80MXfl1cMPV6j. 

2. **Install Docker:** Download Docker Desktop for Windows from the Docker Hub [https://docs.docker.com/desktop/install/windows-install/]. Follow the installation guide provided by the platform.
  
3. **Install Node.js and npm:** Download Node.js and npm from the official website [https://nodejs.org/en/download]. Follow the installation guide provided.

4. **IDE Selection** Select IDE, recommend to you install vscode [https://code.visualstudio.com/download], but IDE of choice is also welcomed.

# Install dependencies:

1. Navigate to the project directory.
it should be like this `wkdir\congraduation`.

2. create virtual enviroment within python 3.9.6
   ```
   python -m venv venv
   ```

3. Activate the virtual enviroment
   ```
   venv\Scripts\Activate
   ```

6. Install backend requirements
   ```
  pip install -r requirements.txt
  ```
some times the install wont work depending on your deivice, commobn trtouble shooting method is
```
pip install --force-reinstall -r requirements.txt   
```
7. create a new terminal tab and cd to frontedn folder  `wkdir\congraduation\frontend`
```
cd frontend
```
now  its time to install node and its packages. fFirstly going to a specific version of node 

```
npm install -g node@10.3.0
 
npm install
```

## Setting up docker
launch you dokcer desktop app as an admin, we'll get back to it later 

1. firstly go back to you project directory in terminal this `wkdir\congraduation`
2. get the latest postgres image
```
docker pull postgres
```
2. create a container based of that image and call it congraduationdb.
 ```
docker run --name congraduationdb -e POSTGRES_PASSWORD=P2421444 -p 5432:5432 -d postgres
  ```
3. now the container has been created go to the docker desktop app, run ththe newly creasted container and go back to the terminal, its time to import the data.
```
cat backend/app/db/dump_2024-05-02_20_45_53.sql | docker exec -i congraduationdb psql -U postgres -d postgres
```
this will upload the data to docker.

## RUN THE APP
now its time to run the app !
In your project directory `wkdir\congraduation`

```
uvicorn backend.app.main:app --host localhost --port 8000
```
in other the other terminal  `wkdir\congraduation\frontend`
use ``` 
npm start dev
``` to start the front end


#misc
ig you want to see the database and its data whilst the docker container is running, in anpother terminal tab

```
docker exec -it congraduation-postgres bash 

psql -U postgres

\c congraduation;

```
these commands will take you do the database 

```
\dt;
```
to view all the table in the database.



starting venv isnt working its probably a system permissoin issue you can use
```
 Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
to bypass that. 
