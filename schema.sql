DROP DATABASE IF EXISTS sharebnb_photos;

CREATE DATABASE sharebnb_photos;

USE sharebnb_photos;

CREATE TABLE photo (
  id int NOT NULL AUTO_INCREMENT,
  house_id int NOT NULL,
  url varchar(100) NOT NULL,
  description varchar(200) NOT NULL,
  PRIMARY KEY (id)
);
