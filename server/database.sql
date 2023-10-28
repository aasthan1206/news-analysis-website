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

CREATE TABLE feedback(
    feedback_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_desc TEXT NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--psql -U postgres
--\c newsplatform
--\dt
--heroku pg:psql