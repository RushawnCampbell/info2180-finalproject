CREATE DATABASE IF NOT EXISTS `bugme` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

GRANT ALL PRIVILEGES ON bugme.* TO 'admin'@'localhost' IDENTIFIED BY 'password123';

USE `bugme`;

DROP TABLE IF EXISTS `userstable`;

CREATE TABLE IF NOT EXISTS `userstable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE userstable AUTO_INCREMENT=6705;

DROP TABLE IF EXISTS `issuestable`;

CREATE TABLE IF NOT EXISTS `issuestable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `assigned_to` int NOT NULL,
  `created_by` int NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `userstable` (`firstname`, `lastname`, `email`, `password`, `date_joined`) VALUES
('Super', 'User', 'admin@project2.com', '$2y$10$sjxkpqc9.E9efPFsO23fseSmhCA5.j2HpQR2zfmATQPwpYutfbcdi', '2021-11-13 16:08:27');