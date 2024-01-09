-- Insert data into tbl_person
INSERT INTO tbl_person (first_name, last_name, dob, sex, phone_number)
VALUES ('John', 'Doe', '1990-01-01', 'Male', '+12345678901');

-- Insert data into tbl_user
INSERT INTO tbl_user (username, email, password, person_id)
VALUES ('johndoe', 'john@example.com', 'hashedpassword', 1);

-- Insert data into tbl_role
INSERT INTO tbl_role (role_name)
VALUES ('Admin');

-- Insert data into tbl_user_role
INSERT INTO tbl_user_role (user_id, role_id)
VALUES (1, 1);

-- Insert data into tbl_university
INSERT INTO tbl_university (name, city, grad_year)
VALUES ('University of Example', 'Example City', '2022');

-- Insert data into tbl_user_university
INSERT INTO tbl_user_university (user_id, university_id)
VALUES (1, 1);

-- Insert data into tbl_order
INSERT INTO tbl_order (user_id, order_date, order_status)
VALUES (1, '2024-01-08', 'Pending');

-- Insert data into tbl_product
INSERT INTO tbl_product (prod_name, prod_price, prod_desc, prod_image, prod_available)
VALUES ('Example Product', 19.99, 'Description of the product', 'product_image.jpg', 10);

-- Insert data into tbl_order_detail
INSERT INTO tbl_order_detail (order_id, prod_id)
VALUES (1, 1);

-- Insert data into tbl_payment
INSERT INTO tbl_payment (order_id, payment_type, amount, payment_date)
VALUES (1, 'Credit Card', 19.99, '2024-01-08');