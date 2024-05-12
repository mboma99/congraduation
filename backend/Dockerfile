# Use the official Python image as a base
FROM python:3.9.6-slim

# Set the working directory in the container
WORKDIR .

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

