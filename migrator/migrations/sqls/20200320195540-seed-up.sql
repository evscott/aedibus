CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE challenge_state AS ENUM ('pending', 'running', 'complete');

CREATE TABLE IF NOT EXISTS Users (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    admin boolean DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Courses (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    creator_id uuid REFERENCES Users(id) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Assignments (
    course_id uuid REFERENCES Courses(id) NOT NULL,
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    PRIMARY KEY (course_id)
);

CREATE TABLE IF NOT EXISTS Tests (
    assignment_id uuid REFERENCES Assignments(id) NOT NULL,
    name varchar(255) NOT NULL,
    time decimal,
    message varchar(255),
    failure boolean DEFAULT false,
    PRIMARY KEY (assignment_id, name)
);