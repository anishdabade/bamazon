CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE bamazon(
item_id INT(50) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
product_sales FLOAT(30),
department_name VARCHAR(30),
price FLOAT(10),
stock_quantity DECIMAL(10,3),
PRIMARY KEY (item_id)
);

INSERT INTO bamazon(product_name,product_sales,department_name,price,stock_quantity)
VALUES ("Soap",10.23,"Bath",5.00,20),
       ("Chicken",11,"Frozen",10.00,40),
       ("Eggs",12,"Dairy",8,500),
       ("Milk",3,"Dairy",5,50),
       ("Noodles",7,"Snacks",4,100),
       ("Tomatos",10,"Fresh",1,100);