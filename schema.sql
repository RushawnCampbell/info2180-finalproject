
CREATE DATABASE bugme;

CREATE TABLE userstable (
 id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  date_joined DATETIME
);

CREATE TABLE issuestable (
 id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  description TEXT NOT NULL,
  type varchar(255) NOT NULL,
  priority varchar(255),
  status varchar(255) ,
  assigned_to  int NOT NULL,
  created_by int NOT NULL,
  created DATETIME,
  updated DATETIME
);