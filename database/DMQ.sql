-- SELECT Queries


-- SELECT from Franchisees table

SELECT * FROM Franchisees;


-- SELECT from Cafes table

SELECT * FROM Cafes;


-- SELECT from Cafe Intersection table

SELECT Cafe_Franchisees.ID FROM Cafe_Franchisees
INNER JOIN Franchisees ON Cafe_Franchisees.franchisee_id = Franchisees.franchisee_id
INNER JOIN Cafes ON Cafe_Franchisees.cafe_id = Cafes.cafe_id;



-- SELECT from Sales Items Table


SELECT * FROM Sale_Items;


-- SELECT from Sale table


SELECT sale_id, sale_amount, sale_date FROM Sales
INNER JOIN Sales_Items ON Sales.sale_item_id = Sale_Items.sale_item_id
INNER JOIN Cafes ON Sales.cafe_id = Cafes.cafe_id;


-- SELECT from Inventory Orders table

SELECT order_id, quantity_ordered, amount_due FROM Inventory_Orders
INNER JOIN Inventory_Items ON Inventory_Orders.item_ordered = Inventory_Items.item_ordered
INNER JOIN Cafes ON Inventory_Orders.cafe_id = Cafes.cafe_id;


-- SELECT from Dues Owed table

SELECT dues_invoice_id, amount_due, due_date, late_fees FROM Dues_Owed
INNER JOIN Franchisees ON Dues_Owed.franchisee_id = Franchisees.franchisee_id;


-- SELECT from Inventory Items

SELECT * FROM Inventory_Items;

-- INSERTING


-- Inserting fields and values to a Franchisee 
INSERT INTO Franchisees (
    first_name,
    last_name
)
VALUES 
(
    :first_nameInput,
    :last_nameInput
);

-- Inserting fields and values to a Cafe 
INSERT INTO Cafes (
    street_address,
    street_name, 
	city,
	state,
	country,
	zip_code
)
VALUES 
(
    :street_addressInput,
    :street_nameInput,
    :cityInput,
    :stateInput,
    :countryInput,
    :zip_codeInput
);

-- Inserting fields and values to a Cafe Franchisee
INSERT INTO Cafe_Franchisees (
    franchisee_id,
    cafe_id
)
VALUES
(
    :franchisee_id_from_dropdown_Input,
    :cafe_id_from_dropdown_Input
);

-- Inserting fields and values to Sale Items
INSERT INTO Sale_Items (
    item_name, 
	item_price
)
VALUES 
(
    :item_nameInput,
    :item_priceInput
);

-- Inserting fields and values to Sales
INSERT INTO Sales (
    cafe_id, 
	item_ordered, 
	quantity_ordered,
	amount_due
)
VALUES
(
    :cafe_id_from_dropdown_Input,
    :item_orderedInput,
    :quantity_orderedInput,
    :amount_dueInput
);

-- Inserting fields and values to Inventory Orders
INSERT INTO Inventory_Orders (
    cafe_id,
    item_ordered,
    quantity_ordered,
    amount_due
)
VALUES
(
    :cafe_id_from_dropdown_Input,
    :item_orderedInput,
    :quantity_orderedInput,
    :amount_dueInput
);

-- Inserting fields and values to Dues Owed
INSERT INTO Dues_Owed (
    franchisee_id, 
	amount_due, 
	due_date,
	late_fees
)
VALUES
(
    :franchisee_id_from_dropdown_Input,
    :amount_dueInput,
    :due_dateInput,
    :late_feesInput
);

-- Inserting fields and values to Inventory Items
INSERT INTO Inventory_Items(
	item_name, 
	item_price, 
	remaining_stock
)
VALUES
(
    :item_nameInput,
    :item_priceInput,
    :remaining_stockInput
);

-- UPDATING

-- Updating a Franchisee 
UPDATE Franchisees SET first_name = :first_nameInput, last_name = last_nameInput WHERE franchisee_id = :franchisee_id_from_the_edit_button;

-- Updating a Cafe
UPDATE Cafes SET street_address = :street_addressInput, street_name = :street_nameInput, city = :cityInput, state = :stateInput, country = :countryInput, zip_code = :zip_codeInput WHERE cafe_id = :cafe_id_from_the_edit_button;

-- Updating a Cafe Franchisee
UPDATE Cafes_Franchisees SET franchisee_id = :franchisee_id_from_dropdown_Input, cafe_id = :cafe_id_from_dropdown_Input WHERE id = :id_from_the_edit_button;

-- Updating a Sale Item
UPDATE Sale_Items SET item_name = :item_nameInput, item_price = :item_priceInput WHERE sale_item_id = :sale_item_id_from_the_edit_button;

-- Updating a Sale
UPDATE Sales SET cafe_id = :cafe_id_from_dropdown_Input, item_ordered = :item_orderedInput, quantity_ordered = :quantity_orderedInput, amount_due = :amount_dueInput WHERE sale_id = :sale_id_from_the_edit_button;

-- Updating an Inventory Order
UPDATE Inventory_Orders SET cafe_id = :cafe_id_from_dropdown_Input, item_ordered = :item_orderedInput, quantity_ordered = :quantity_orderedInput, amount_due = :amount_dueInput WHERE order_id = :order_id_from_the_edit_button;

-- Updating a Due Owed
UPDATE Dues_Owed SET franchisee_id = :franchisee_id_from_dropdown_Input, amount_due = :amount_dueInput, due_date = due_dateInput, late_fees = late_feesInput WHERE dues_invoice_id = :dues_invoice_id_from_the_edit_button;

-- Updating an Inventory Item
UPDATE Inventory_Items SET item_name = :item_nameInput, item_price = :item_priceInput, remaining_stock = :remaining_stockInput WHERE item_id = :item_id_from_the_edit_button;

-- DELETE

-- Deleting a Franchisee
DELETE FROM Franchisees WHERE franchisee_id = :franchisee_id_selected_from_the_delete_button;

-- Deleting a Cafe
DELETE FROM Cafes WHERE cafe_id = :cafe_id_selected_from_the_delete_button;

-- Dis-associate a Cafe from a franchisee (M:M)
DELETE FROM Cafe_Franchisees WHERE cafe_id = :cafe_id_selected_from_cafe_and_franchisee_list AND franchisee_id = :franchisee_id_selected_from_cafe_and_franchisee_list;

-- Deleting a Sale Item
DELETE FROM Sale_Items WHERE sale_item_id = :sale_item_id_from_the_delete_button;

-- Deleting a Sale
DELETE FROM Sales WHERE sale_id = :sale_item_id_from_the_delete_button;

-- Deleting an Inventory Order
DELETE FROM Inventory_Orders WHERE order_id = :order_id_from_the_delete_button;

-- Deleting a Due Owed
DELETE FROM Dues_Owed WHERE dues_invoice_id = :dues_invoice_id_from_the_delete_button;

-- Deleting an Inventory Item
DELETE FROM Inventory_Items WHERE item_id = :item_id_from_the_delete_button;


