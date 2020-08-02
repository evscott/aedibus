CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Users (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    teacher boolean DEFAULT false,
    admin boolean DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Courses (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    teacher_id uuid REFERENCES Users(id) NOT NULL,
    title varchar(255) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Enrollments (
    course_id uuid REFERENCES Courses(id) NOT NULL,
    student_id uuid REFERENCES Users(id) NOT NULL,
    PRIMARY KEY (course_id, student_id)
);

CREATE TABLE IF NOT EXISTS Assignments (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    course_id uuid REFERENCES Courses(id) NOT NULL,
    title varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Submissions (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    assignment_id uuid REFERENCES Assignments(id) NOT NULL,
    student_id uuid REFERENCES Users(id) NOT NULL,
    PRIMARY KEY (assignment_id, student_id)
);

CREATE TABLE IF NOT EXISTS Tests (
    id uuid DEFAULT uuid_generate_v1() UNIQUE,
    submission_id uuid REFERENCES Submissions(id) NOT NULL,
    name varchar(255) NOT NULL,
    time decimal,
    message varchar(255),
    failure boolean DEFAULT false,
    PRIMARY KEY (id)
);