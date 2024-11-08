-- Create Database
CREATE DATABASE IF NOT EXISTS opd_database;
USE opd_database;

-- Create Users Table
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `timings` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `meta` text,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

-- Create Patients Table
CREATE TABLE `patients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_patients_doctor_id` (`doctor_id`),
  KEY `idx_patients_doctor_id_name_contact_number_age` (`doctor_id`, `name`, `contact_number`, `age`)
);

-- Create Prescriptions Table
CREATE TABLE `prescriptions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `patient_id` bigint NOT NULL,
  `prescription_image_url` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_prescriptions_patient_id` (`patient_id`)
);

-- Insert a new user into the users table
INSERT INTO users (username, password, name, timings, address, meta, logo)
VALUES (
  'doctor1',
  '$2b$10$DABkJxGdqmGiygNGrxmh5.nVRK1LHlI3PBveP4JihsemedJNS5Qaa',
  'Dr. Maitri Jani',
  'Morning: 10am - 2pm\nEvening: 5pm - 8pm',
  '4, Ground floor, Krishna Krupa CHS, Shankar Lane, near Varahi Mata Temple, \n Malad, Adarsh Dugdhalaya, Kailash Nagar, Kandivali West, Mumbai, Maharashtra 400067',
  'BAMS, MD (MUM)\nReg No.: I-79972-A\n7777050388',
  '/uploads/1/logos/logo.png'
);

INSERT INTO patients (doctor_id, name, age, contact_number)
VALUES (1, 'Sachin', 34, '9920799589');


