DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE employees(
  id INT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  category_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  category_name VARCHAR(30) NOT NULL
);

CREATE TABLE departments(
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

