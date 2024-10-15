CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE movies (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   year VARCHAR(4) NOT NULL,
   director VARCHAR(255),
   genre VARCHAR(100),
   imdbID VARCHAR(50) NOT NULL
);
