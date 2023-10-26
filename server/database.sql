CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE newsPlatform;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE,
    contact_no TEXT UNIQUE,
    password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (first_name, email, password) VALUES ('Alvin', 'alvin@mail.com', '12345');

--psql -U postgres
--\c newsplatform
--\dt
--heroku pg:psql