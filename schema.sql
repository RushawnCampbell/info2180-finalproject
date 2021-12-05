CREATE DATABASE IF NOT EXISTS `bugme`;

GRANT ALL PRIVILEGES ON bugme.* TO 'admin'@'localhost' IDENTIFIED BY 'password123';

USE `bugme`;

DROP TABLE IF EXISTS `userstable`;

CREATE TABLE userstable (
 id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(255),
  date_joined DATETIME
);

DROP TABLE IF EXISTS `issuestable`;

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

INSERT INTO `userstable` (`firstname`, `lastname`, `email`, `password`, `date_joined`) VALUES
('Super', 'User', 'admin@project2.com', '$2y$10$sjxkpqc9.E9efPFsO23fseSmhCA5.j2HpQR2zfmATQPwpYutfbcdi', '2021-11-13 16:08:27');