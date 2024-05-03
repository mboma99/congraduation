# Use the official PostgreSQL image from Docker Hub
FROM postgres

# Set the environment variable for PostgreSQL password
ENV POSTGRES_PASSWORD P2421444

# Expose the PostgreSQL port
EXPOSE 5432

# Copy the database dump file into the container
COPY ./app/db/dump_2024-05-02_20_45_53.sql /docker-entrypoint-initdb.d/dump_2024-05-02_20_45_53.sql

# Start PostgreSQL and automatically restore the database dump
CMD ["postgres"]

