
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;


CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin'
);


CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  talle VARCHAR(50),
  color VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  clientId INT,
  sale_date DATE NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  
  
  FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sale_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  saleId INT NOT NULL,
  productId INT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  

  FOREIGN KEY (saleId) REFERENCES sales(id) ON DELETE CASCADE,
 
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE SET NULL
);




INSERT INTO users (username, password, role) 
VALUES ('admin@tienda.com', '1234', 'admin')
ON DUPLICATE KEY UPDATE password='1234'; 


INSERT INTO clients (id, name, phone) VALUES 
  (1, 'Fabricio Toranzo', '3816367973'),
  (2, 'Benjamin Ibañez', '3816626552'),
  (3, 'Exequiel Rodriguez', '3817891234')
ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone);


INSERT INTO products (id, name, price, stock, talle, color) VALUES 
  (1, 'Pantalon Jeans', 20000, 50, 'M', 'Azul'),
  (2, 'Camisa Lino', 15000, 30, 'L', 'Blanco'),
  (3, 'Short Jeans', 10000, 40, 'S', 'Negro')
ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price), stock=VALUES(stock);