
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
   ``` [python -m venv venv ]```

3. Activate the virtual enviroment
   ``` [venv\Scripts\Activate ]```

4. Install backend requirements
   ``` 
and install the necessary dependencies. For the backend, you might need to create a virtual environment and install the dependencies listed in the requirements.txt file. For the frontend, navigate to the frontend directory and run npm install.
  
8. **Environment variables:** Set up necessary environment variables. This includes database credentials, S3 credentials, and any other necessary variables.
  
9. **Run the application:** You can use Docker to run the application. In the root directory of the project, run docker-compose up.

Please note that these are general steps and might vary depending on the specific setup of the photo graduation web app. Always refer to any specific documentation provided with the application for more detailed setup instructions.


How to create the docker enviroment

once you have imported you git repo
in your ide terminal ensure your working dir is your [filespa]/congradution>
gte the latest postgres image
docker pull postgres

create docker container 
docker run --name congraduationdb -e POSTGRES_PASSWORD=P2421444 -p 5432:5432 -d postgres


copy the database over 
cat backend/app/db/dump_2024-05-02_20_45_53.sql | docker exec -i congraduationdb psql -U postgres -d postgres


to view database in your terminal you can use these steps

docker exec -it congraduation-postgres bash 

psql -U postgres

\c congraduation;

\dt;



 if you get permission error, use this line 
 Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

activate agaion  venv\Scripts\Activate


install requirements
pip install -r requirements.txt


uvicorn backend.app.main:app --host localhost --port 8000


once you have a version of node, use this specific version 

npm install -g node@10.3.0
 
npm install

npm start dev
