CREATE DATABASE newsPlatform;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(50),
    contact_no VARCHAR(15),
    password VARCHAR(50)
);
