
# Use the official Python image from the Docker Hub
FROM python:3.7.9

# Set the working directory within the container
WORKDIR /congraduation

# Copy the requirements file to the working directory
COPY ./requirements.txt /congraduation/backend/requirements.txt

# Install dependencies from the requirements file
RUN pip install --no-cache-dir --upgrade -r /congraduation/backend/requirements.txt

# Copy the entire project to the working directory
COPY . /congraduation/backend

# Expose port 80 for the application
EXPOSE 80

# Set the command to run on container start
CMD ["uvicorn", "backend.app.main:app", "--reload", "--host", "0.0.0.0", "--port", "80"]


