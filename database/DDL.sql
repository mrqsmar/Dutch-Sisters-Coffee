SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Franchisees;
DROP TABLE IF EXISTS Cafes;
DROP TABLE IF EXISTS Cafes_Franchisees;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS Sale_Items;
DROP TABLE IF EXISTS Inventory_Orders;
DROP TABLE IF EXISTS Inventory_Items;
DROP TABLE IF EXISTS Dues_Owed;
DROP TABLE IF EXISTS Inventory_Items;

-- Write the query to create the 8 tables below.

-- Franchisees table
CREATE TABLE Franchisees (
    franchisee_id int(11) NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
    PRIMARY KEY (franchisee_id)
);

-- Cafes table
CREATE TABLE Cafes (
    cafe_id int(11) NOT NULL AUTO_INCREMENT,
	street_address int NOT NULL,
    street_name varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	state varchar(255) NOT NULL,
	country varchar(255) NOT NULL,
	zip_code int NOT NULL,
    PRIMARY KEY (cafe_id)
);

-- Intersection table
CREATE TABLE Cafes_Franchisees (
	id int(11) NOT NULL AUTO_INCREMENT,
	franchisee_id INT(11) NOT NULL,
	cafe_id INT(11) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_Cafe_Franchisees_franchisee_id FOREIGN KEY (franchisee_id) REFERENCES Franchisees(franchisee_id) ON UPDATE CASCADE,
	CONSTRAINT FK_Cafe_Franchisees_cafe_id FOREIGN KEY (cafe_id) REFERENCES Cafes(cafe_id) ON UPDATE CASCADE
);

-- Sale_Items table
CREATE TABLE Sale_Items (
    sale_item_id int(11) NOT NULL AUTO_INCREMENT,
    item_name varchar(255) NOT NULL,
	item_price decimal(10,2) NOT NULL,
    PRIMARY KEY (sale_item_id)
);

-- Sales table
CREATE TABLE Sales (
    sale_id int(11) NOT NULL AUTO_INCREMENT,
	sale_amount decimal(10,2) NOT NULL,
	item_sold int(11) NOT NULL,
	sale_date date NOT NULL,
	cafe_id int(11) NOT NULL,
    PRIMARY KEY (sale_id),
	CONSTRAINT FK_Sales_item_sold FOREIGN KEY (item_sold) REFERENCES Sale_Items(sale_item_id) ON DELETE CASCADE,
	CONSTRAINT FK_Sales_cafe_id FOREIGN KEY (cafe_id) REFERENCES Cafes(cafe_id) ON DELETE CASCADE
);

-- Inventory_Orders table
CREATE TABLE Inventory_Orders (
    order_id int(11) NOT NULL AUTO_INCREMENT,
	cafe_id int(11),
	item_ordered int(11),
	quantity_ordered int(11) NOT NULL,
	amount_due decimal(10,2) NOT NULL,
    PRIMARY KEY (order_id),
	CONSTRAINT FK_Inventory_Orders_item_ordered FOREIGN KEY (item_ordered) REFERENCES Inventory_Items(item_id) ON DELETE CASCADE,
	CONSTRAINT FK_Inventory_Orders_cafe_id FOREIGN KEY (cafe_id) REFERENCES Cafes(cafe_id) ON DELETE CASCADE
);

-- Dues_Owed table
CREATE TABLE Dues_Owed (
    dues_invoice_id int(11) NOT NULL AUTO_INCREMENT,
	franchisee_id int(11) NOT NULL,
	amount_due decimal(10,2) NOT NULL,
	due_date date NOT NULL,
	late_fees decimal(10,2),
    PRIMARY KEY (dues_invoice_id),
	CONSTRAINT FK_Dues_Owed_franchisee_id FOREIGN KEY (franchisee_id) REFERENCES Franchisees(franchisee_id) ON DELETE CASCADE
);

-- Inventory_Items table
CREATE TABLE Inventory_Items (
    item_id int(11) NOT NULL AUTO_INCREMENT,
    item_name varchar(255) NOT NULL,
	item_price decimal(10,2) NOT NULL,
	remaining_stock int NOT NULL,
    PRIMARY KEY (item_id)
);


-- DESCRIBE each table to verify it was set up correctly
DESCRIBE Franchisees;
DESCRIBE Cafes;
DESCRIBE Cafes_Franchisees;
DESCRIBE Sales;
DESCRIBE Sale_Items;
DESCRIBE Inventory_Orders;
DESCRIBE Dues_Owed;
DESCRIBE Inventory_Items;

-- Insert data into the tables

-- Franchisees
INSERT INTO Franchisees(
	first_name, 
	last_name
)
VALUES 
(
	"Bob",
	"Gumbo"
),
(
	"Jeff",
	"Trombone"
),
(
	"Tiffany",
	"Wiffney"
),
(
	"Lugubrious",
	"Jackson"
),
(
	"Felix",
	"Felicia"
);

-- Cafes
INSERT INTO Cafes(
	street_address, 
	street_name, 
	city,
	state,
	country,
	zip_code
)
VALUES 
(
	123,
	"Santa Clause Lane",
	"North Pole",
	"AK",
	"USA",
	99999
),
(
	1040,
	"Trucker Ave",
	"Modesto",
	"CA",
	"USA",
	95350
),
(
	1001,
	"Fairview Ave N",
	"Seattle",
	"WA",
	"USA",
	98109
);

-- Intersection table
INSERT INTO Cafes_Franchisees(
	franchisee_id, 
	cafe_id
)
VALUES 
(
	1,
	1
),
(
	1,
	2
),
(
	2,
	3
);

-- Sales Table
INSERT INTO Sales(
	sale_amount, 
	item_sold, 
	sale_date,
	cafe_id
)
VALUES 
(
	2.49,
	1,
	'2023-05-03',
	1
),
(
	4.49,
	2,
	'2023-03-25',
	1
),
(
	5.29,
	4,
	'2023-04-01',
	3
);

-- Sale_Items
INSERT INTO Sale_Items(
	item_name, 
	item_price
)
VALUES 
(
	"12oz Drip Coffe",
	2.49
),
(
	"Small Latte",
	4.49
),
(
	"Medium Latte",
	4.99
),
(
	"Large Latte",
	5.29
);

-- Inventory_Orders
INSERT INTO Inventory_Orders(
	cafe_id, 
	item_ordered, 
	quantity_ordered,
	amount_due
)
VALUES 
(
	3,
	1,
	2,
	0.2
),
(
	3,
	2,
	1,
	4.99
),
(
	2,
	3,
	10,
	8.9
);

-- Dues_Owed
INSERT INTO Dues_Owed(
	franchisee_id, 
	amount_due, 
	due_date,
	late_fees
)
VALUES 
(
	1,
	500,
	'2024-04-01',
	0
),
(
	1,
	500,
	'2024-04-01',
	0
),
(
	2,
	1000,
	'2024-04-01',
	50.0
),
(
	3,
	750,
	'2024-04-01',
	0
);


-- Inventory_Items
INSERT INTO Inventory_Items(
	item_name, 
	item_price, 
	remaining_stock
)
VALUES 
(
	"12oz Cup",
	0.10,
	10234
),
(
	"1lb Coffee",
	4.99,
	2000
),
(
	"Milk (gallon)",
	0.89,
	5000
);

-- Show the data in the tables to confirm it worked
SELECT * FROM Franchisees;
SELECT * FROM Cafes;
SELECT * FROM Cafes_Franchisees;
SELECT * FROM Sales;
SELECT * FROM Sale_Items;
SELECT * FROM Inventory_Orders;
SELECT * FROM Dues_Owed;
SELECT * FROM Inventory_Items;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;