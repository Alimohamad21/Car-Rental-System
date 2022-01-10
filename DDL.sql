CREATE DATABASE car_rental_db;

CREATE TABLE USER
(
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    National_ID VARCHAR(255),
    phone_number VARCHAR(255)
);

CREATE TABLE ADMIN
(
    username VARCHAR(255),
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES USER(username)
);

CREATE TABLE OFFICE
(
  number INT PRIMARY KEY,
  location VARCHAR(255) UNIQUE
);

CREATE TABLE CAR
(
    plate VARCHAR(255) PRIMARY KEY,
    brand VARCHAR(255), #Tesla, BMW, Mercedes, ...etc.
    model VARCHAR(255),
    engine VARCHAR(255), #Gasoline, Diesel, Hybrid, Electric
    colour VARCHAR(255),
    current_office INT, #changed according to return_location in reservation
    rent_price DECIMAL,
    status VARCHAR(255),
    picture_url TEXT,
    FOREIGN KEY (current_office) REFERENCES OFFICE(number)
);

CREATE TABLE RESERVATION
(
    reservation_number INT UNIQUE AUTO_INCREMENT,
    username VARCHAR(255),
    car_plate VARCHAR(255),
    reservation_time TIMESTAMP,
    pickup_time DATE,
    return_time DATE,
    return_office INT, #pick_up location is redundant as it can be accessed by the car_plate
    payment VARCHAR(255),
    FOREIGN KEY(username) REFERENCES USER(username),
    FOREIGN KEY (car_plate) REFERENCES CAR(plate),
    FOREIGN KEY (return_office) REFERENCES OFFICE(number),
    PRIMARY KEY (reservation_number, username, car_plate)
);

