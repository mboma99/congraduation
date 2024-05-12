


\connect CongraduationDB


CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);




--
-- Name: tbl_access; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_access (
    id character varying NOT NULL,
    created_at timestamp without time zone
);

--
-- Name: tbl_customer; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_customer (
    id character varying NOT NULL,
    person_id character varying,
    university_id character varying,
    email character varying,
    password character varying NOT NULL,
    address character varying,
    city character varying,
    postcode character varying
);

--
-- Name: tbl_person; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_person (
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone NOT NULL,
    id character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    phone_number character varying NOT NULL
);

--
-- Name: tbl_photo; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_photo (
    id character varying NOT NULL,
    portfolio_id character varying,
    image_url character varying,
    product_type_id character varying
);

--
-- Name: tbl_photographer; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_photographer (
    id character varying NOT NULL,
    person_id character varying,
    email character varying,
    password character varying NOT NULL
);

--
-- Name: tbl_portfolio; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_portfolio (
    id character varying NOT NULL,
    photographer_id character varying,
    university_id character varying,
    customer_first_name character varying,
    customer_last_name character varying,
    graduation_year integer,
    customer_email character varying,
    is_active boolean NOT NULL,
    created_at timestamp without time zone NOT NULL,
    edited_at timestamp without time zone NOT NULL
);

--
-- Name: tbl_product_type; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_product_type (
    id character varying NOT NULL,
    name character varying,
    description character varying,
    price double precision,
    stripe_id character varying
);

--
-- Name: tbl_university; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.tbl_university (
    id character varying NOT NULL,
    university character varying,
    city character varying,
    address character varying,
    postcode character varying
);
--

INSERT INTO public.alembic_version (version_num) VALUES ('31bd73e6b310');

INSERT INTO public.tbl_access (id, created_at) VALUES ('57ab', '2024-04-28 14:57:41.43043');

INSERT INTO public.tbl_customer (id, person_id, university_id, email, password, address, city, postcode) VALUES 
('ceb2e657-8984-4a56-bd24-e793651c9296', '0ffcbce4-0b30-45eb-8733-63d953237890', '2', 'fail@fail.com', '$2b$12$lyAnoEZsvYd5SWYIS3Uhm.zj7sZSmask7cbRpbxReAA7MOsBBkqSC', '5 Rydal Grove', 'Nottingham', 'NG6 0AH'),
('63fd89b9-a58d-4e7d-b6cc-0d59c3773ffd', '02bf366c-e215-4ec6-b6bb-e7d33ec3f1a6', '3', 'test@test.com', '$2b$12$DIBliFT2BrTAsqGD5jJPReNHWqEE/8Tj1RLT85kCcEv.nOWYmJGVO', '5 Rydal Grove', 'Nottingham', 'NG6 0AH'),
('9092be3e-76be-4a21-9ea9-c057dd10c49c', 'dab92e0e-3dd7-4aed-8cee-b4d5a9aefd4d', '2', 'jamesmboma99@gmail.com', '$2b$12$1dt3odJ4I3FuiUlXqHiQkeaWGInz5lf463ynO6bPWEFTAERxGBfau', '5 Rydal Grove, Basford', 'Nottingham', 'NG6 0AH');

INSERT INTO public.tbl_person (created_at, modified_at, id, first_name, last_name, phone_number) VALUES 
('2024-03-12 17:00:40.427414', '2024-03-12 17:00:40.726852', '6de7a9af-6af4-44ff-a2a7-1b635bcc4550', 'John', 'Doe', '+771234567890'),
('2024-03-13 00:32:28.730926', '2024-03-13 00:50:55.753407', 'da6b88e9-3a0b-444c-85c8-f0395dd84469', 'NotYapping', 'Smith', '+771234567890'),
('2024-01-31 03:11:27.001141', '2024-04-25 13:43:05.654287', '02bf366c-e215-4ec6-b6bb-e7d33ec3f1a6', 'Jame', 'Mboma', '+447711835054'),
('2024-04-28 16:23:29.171278', '2024-04-28 16:23:29.469739', '304ad8b8-a13e-43f9-8c74-7a00339b5bb0', 'John', 'Doe', '+447711112222'),
('2024-04-28 17:36:54.353258', '2024-04-28 17:36:54.619836', '0ffcbce4-0b30-45eb-8733-63d953237890', 'NULL', 'null', 'NULL'),
('2024-04-11 13:16:31.785648', '2024-04-29 21:57:37.74176', '6b018570-a56d-46ef-a40d-c4b1f3fe2cf0', 'Johns', 'Doe', '+440734567890'),
('2024-01-15 13:48:10.975699', '2024-05-01 20:11:24.531603', 'dab92e0e-3dd7-4aed-8cee-b4d5a9aefd4d', 'James', 'Mboma', '+44 7711834054'),
('2024-05-02 17:25:04.021027', '2024-05-02 17:25:04.320745', 'f4b0f674-c18a-4005-ad8a-6efbc2a17ed3', 'Test', 'Admin', '+44 0771183533');

INSERT INTO public.tbl_photo (id, portfolio_id, image_url, product_type_id) VALUES 
('1', '87bd5642-d354-492f-b937-4b90e77c3a02', 'https://example.com/image1.jpg', '1'),
('2', '87bd5642-d354-492f-b937-4b90e77c3a02', 'https://example.com/image2.jpg', '1'),
('3', '87bd5642-d354-492f-b937-4b90e77c3a02', 'https://example.com/image3.jpg', '1'),
('0be15b7d-8e8f-4ac5-83c8-656640d3d54d', '09e9f455-01fc-47fa-98f2-90f80982753a', 'https://congraduation-dev.s3.amazonaws.com/09e9f455-01fc-47fa-98f2-90f80982753a/IMG_4634.jpeg', '1'),
('b2e6d7f2-83ce-4012-a43d-4e5dd5723f51', '09e9f455-01fc-47fa-98f2-90f80982753a', 'https://congraduation-dev.s3.amazonaws.com/09e9f455-01fc-47fa-98f2-90f80982753a/IMG_4635.jpeg', '1'),
('231cf7c7-b053-410e-a43c-e9ea464f5de5', '64cda43d-b556-4967-8a72-3633a0c00a4e', 'https://congraduation-dev.s3.amazonaws.com/64cda43d-b556-4967-8a72-3633a0c00a4e/IMG_5451.jpeg', '1'),
('3f4b99f4-a8d8-4001-933a-2baef0912ca0', '64cda43d-b556-4967-8a72-3633a0c00a4e', 'https://congraduation-dev.s3.amazonaws.com/64cda43d-b556-4967-8a72-3633a0c00a4e/IMG_5449.jpeg', '1'),
('da87b236-7789-4003-878f-5a0cfc64b18f', '1c55d4fd-4783-4a4f-ae89-7df7d8db01bc', 'https://congraduation-dev.s3.amazonaws.com/1c55d4fd-4783-4a4f-ae89-7df7d8db01bc/IMG_4635 (3).jpeg', '1');

INSERT INTO public.tbl_photographer (id, person_id, email, password) VALUES 
('b7180583-bd40-470e-9158-91dab254ca86', '6de7a9af-6af4-44ff-a2a7-1b635bcc4550', 'john.does@example.com', '$2b$12$.PvbqpuB66MOXoe53ruO5u.oDXk9jtTz9daGdms7XCQAGczVp7Ulm'),
('94e74db7-291a-4ceb-a2e6-31aa4c3bdd67', 'da6b88e9-3a0b-444c-85c8-f0395dd84469', 'yapper@example.com', '$2b$12$sv8Lnoy/SOuyNCT/YA5vOO/regF7hNhoblpBxkv1kgPiaK4f9dZj6'),
('f8885d1d-e9af-4bf2-a27a-b1b98beed1fe', '304ad8b8-a13e-43f9-8c74-7a00339b5bb0', 'admin@admin.com', '$2b$12$JbOREkNCLDH8DPLP3VGh0uxiKT.VZtBY4G47ClxN/HFBPJ9nH.zAi'),
('f8949451-cbca-4277-b558-08b634d34b35', '6b018570-a56d-46ef-a40d-c4b1f3fe2cf0', 'john.doe@example.com', '$2b$12$MDSAJdlcJQyrmgvG9VP5sOXGa5G1lvHuylaafDM7kTWK3EdPfSkAC'),
('f83dff4e-8f51-4a6b-84c7-8e030ddf365d', 'f4b0f674-c18a-4005-ad8a-6efbc2a17ed3', 'admin@example.com', '$2b$12$rQhajYpc//mdT32PahGaSedRepsB2OpzKUGPjH9vKpVFCdQzhUxYW');

INSERT INTO public.tbl_portfolio (id, photographer_id, university_id, customer_first_name, customer_last_name, graduation_year, customer_email, is_active, created_at, edited_at) VALUES 
('87bd5642-d354-492f-b937-4b90e77c3a02', '94e74db7-291a-4ceb-a2e6-31aa4c3bdd67', '1', 'Travis', 'Kelsey', '2022', 'customer@example.com', 't', '2024-03-13 02:24:24.605046', '2024-03-13 02:24:24.605078'),
('8b4223e0-7af8-493f-b7aa-6e9b7dde1cea', '94e74db7-291a-4ceb-a2e6-31aa4c3bdd67', '1', 'John', 'Snow', '2032', 'customer@example.com', 't', '2024-03-13 02:25:24.703249', '2024-03-13 02:25:24.703286'),
('09e9f455-01fc-47fa-98f2-90f80982753a', 'f8949451-cbca-4277-b558-08b634d34b35', '2', 'Lisa', 'Moyo', '2024', 'lisa@staffs.ac.uk', 'f', '2024-04-25 17:22:02.068585', '2024-05-01 12:40:30.892939'),
('7aed38a5-55c1-4c4e-92de-561590dcf5e2', 'f8949451-cbca-4277-b558-08b634d34b35', '1', 'John', 'Doe', '2022', 'customer@example.com', 'f', '2024-05-01 12:53:50.38582', '2024-05-01 12:53:50.385835'),
('233e6634-6d24-463b-97c9-36023335e53e', 'f8949451-cbca-4277-b558-08b634d34b35', '1', 'James', 'Mboma', '2034', 'jamesmboma99@googlemail.com', 't', '2024-05-01 12:53:59.195844', '2024-05-01 12:53:59.195884'),
('64cda43d-b556-4967-8a72-3633a0c00a4e', 'f8949451-cbca-4277-b558-08b634d34b35', '1', 'Jaka', 'Kranjc', '2024', 'JakaKranjc@gmail.com', 't', '2024-04-26 20:51:16.297447', '2024-05-01 12:55:02.701096'),
('1c55d4fd-4783-4a4f-ae89-7df7d8db01bc', 'f83dff4e-8f51-4a6b-84c7-8e030ddf365d', '1', 'James', 'Mboma', '2024', 'jamesmboma08@googlemail.com', 't', '2024-05-02 17:36:49.738906', '2024-05-02 17:40:44.416061');

INSERT INTO public.tbl_product_type (id, name, description, price, stripe_id) VALUES 
('1', 'Portrait Photos', 'These are portraits taken by professional photographers', '4.99', 'price_1PAHHKAxTn6e6ofyNsic18gU');

INSERT INTO public.tbl_university (id, university, city, address, postcode) VALUES 
('1', 'De Montfort University', 'Leicester', 'Gateway House', 'LE1 9BH'),
('2', 'Staffordshire University', 'Stoke-on-Trent', 'College Rd', 'ST4 2DE'),
('3', 'Nottingham Trent University', 'Nottingham', '50 Shakespeare St', 'NG1 4FQ'),
('4', 'Birmingham University', 'Birmingham', 'Birmingham', 'B15 2TT');











-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: tbl_access tbl_access_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_access
    ADD CONSTRAINT tbl_access_pkey PRIMARY KEY (id);


--
-- Name: tbl_customer tbl_customer_email_key; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_customer
    ADD CONSTRAINT tbl_customer_email_key UNIQUE (email);


--
-- Name: tbl_customer tbl_customer_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_customer
    ADD CONSTRAINT tbl_customer_pkey PRIMARY KEY (id);


--
-- Name: tbl_person tbl_person_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_person
    ADD CONSTRAINT tbl_person_pkey PRIMARY KEY (id);


--
-- Name: tbl_photo tbl_photo_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_photo
    ADD CONSTRAINT tbl_photo_pkey PRIMARY KEY (id);


--
-- Name: tbl_photographer tbl_photographer_email_key; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_photographer
    ADD CONSTRAINT tbl_photographer_email_key UNIQUE (email);


--
-- Name: tbl_photographer tbl_photographer_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_photographer
    ADD CONSTRAINT tbl_photographer_pkey PRIMARY KEY (id);


--
-- Name: tbl_portfolio tbl_portfolio_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_portfolio
    ADD CONSTRAINT tbl_portfolio_pkey PRIMARY KEY (id);


--
-- Name: tbl_product_type tbl_product_type_name_key; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_product_type
    ADD CONSTRAINT tbl_product_type_name_key UNIQUE (name);


--
-- Name: tbl_product_type tbl_product_type_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_product_type
    ADD CONSTRAINT tbl_product_type_pkey PRIMARY KEY (id);


--
-- Name: tbl_university tbl_university_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_university
    ADD CONSTRAINT tbl_university_pkey PRIMARY KEY (id);


--
-- Name: tbl_university tbl_university_university_key; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_university
    ADD CONSTRAINT tbl_university_university_key UNIQUE (university);


--
-- Name: tbl_customer tbl_customer_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_customer
    ADD CONSTRAINT tbl_customer_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.tbl_person(id);


--
-- Name: tbl_customer tbl_customer_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_customer
    ADD CONSTRAINT tbl_customer_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.tbl_university(id);


--
-- Name: tbl_photo tbl_photo_portfolio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_photo
    ADD CONSTRAINT tbl_photo_portfolio_id_fkey FOREIGN KEY (portfolio_id) REFERENCES public.tbl_portfolio(id);


--
-- Name: tbl_photo tbl_photo_product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_photo
    ADD CONSTRAINT tbl_photo_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.tbl_product_type(id);


--
-- Name: tbl_photographer tbl_photographer_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_photographer
    ADD CONSTRAINT tbl_photographer_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.tbl_person(id);


--
-- Name: tbl_portfolio tbl_portfolio_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_portfolio
    ADD CONSTRAINT tbl_portfolio_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.tbl_photographer(id);


--
-- Name: tbl_portfolio tbl_portfolio_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.tbl_portfolio
    ADD CONSTRAINT tbl_portfolio_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.tbl_university(id);



--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1