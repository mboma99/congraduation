-- Database: CongraduationDB
DROP TABLE IF EXISTS tbl_payment;
DROP TABLE IF EXISTS tbl_order_detail;
DROP TABLE IF EXISTS tbl_product;
DROP TABLE IF EXISTS tbl_order;
DROP TABLE IF EXISTS tbl_user;
DROP TABLE IF EXISTS tbl_user_role;
DROP TABLE IF EXISTS tbl_role;
DROP TABLE IF EXISTS tbl_user_university;
DROP TABLE IF EXISTS tbl_university;
DROP TABLE IF EXISTS tbl_person;

CREATE TABLE tbl_person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE,
    sex VARCHAR(50),
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_user (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES tbl_person(id) ON DELETE CASCADE,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255),
    address VARCHAR(255),
    postcode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tbl_role (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_user_role (
    user_id INTEGER REFERENCES tbl_user(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES tbl_role(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_university (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50),
    grad_year VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_user_university (
    user_id INTEGER REFERENCES tbl_user(id) ON DELETE CASCADE,
    university_id INTEGER REFERENCES tbl_university(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tbl_order (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES tbl_user(id) ON DELETE CASCADE,
    order_date TIMESTAMP,
    order_status VARCHAR(50)
);

CREATE TABLE tbl_product (
    id SERIAL PRIMARY KEY,
    prod_name VARCHAR(100),
    prod_price DECIMAL(5,2),
    prod_desc VARCHAR(255),
    prod_image VARCHAR(255),
    prod_available INTEGER
);

CREATE TABLE tbl_order_detail (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES tbl_order(id) ON DELETE CASCADE,
    prod_id INTEGER REFERENCES tbl_product(id) ON DELETE CASCADE
);

CREATE TABLE tbl_payment (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES tbl_order(id) ON DELETE CASCADE,
    payment_type VARCHAR(50),
    amount DECIMAL(5,2),
    payment_date TIMESTAMP
);