CREATE DATABASE devopsdb;
\c devopsdb;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT
);
INSERT INTO users (name, email)
VALUES ('Alice', 'alice@example.com');
