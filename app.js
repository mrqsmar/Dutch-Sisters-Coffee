/*
    SETUP
*/

const cors=require('cors');
require('dotenv').config({path: __dirname + '/.env'})

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(cors());
app.use(express.json());

const PORT = process.env.DB_PORT;

// Database
var db = require('./db-connector')


/*
    ROUTES
*/

////////////////////////
// Cafes table routes //
////////////////////////

// Get all cafes
app.get("/cafes", (req, res) => {
	const q = "SELECT * FROM Cafes";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete a cafe
app.delete("/cafes/:id", (req, res) => {
	const cafeID = req.params.id;
	
	const q = "DELETE FROM Cafes WHERE cafe_id=" + cafeID + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [cafeID], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add a cafe
app.post('/cafes', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let street_address = data.street_address;
	let street_name = data.street_name;
	let city = data.city;
	let state = data.state;
	let country = data.country;
	let zip_code = data.zip_code;

    // Create the query and run it on the database
    q = `INSERT INTO Cafes (street_address, street_name, city, state, country, zip_code) VALUES ('${street_address}', '${street_name}', '${city}', '${state}', '${country}', '${zip_code}');`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update a cafe
app.put('/cafes', function(req,res,next){
	let data = req.body;

	let street_address = data.street_address;
	let street_name = data.street_name;
	let city = data.city;
	let state = data.state;
	let country = data.country;
	let zip_code = data.zip_code;
	let cafe_id = data.cafe_id;


	let q = `UPDATE Cafes SET street_address = "${street_address}", street_name = "${street_name}", city = "${city}", state = "${state}", country = "${country}", zip_code = ${zip_code} WHERE cafe_id = ${cafe_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


//////////////////////////////
// Franchisees table routes //
//////////////////////////////

// Get all franchisees
app.get("/franchisees", (req, res) => {
	const q = "SELECT * FROM Franchisees";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete a franchisee
app.delete("/franchisees/:id", (req, res) => {
	const franchiseeId = req.params.id;
	
	const q = "DELETE FROM Franchisees WHERE franchisee_id=" + franchiseeId + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [franchiseeId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add a franchisee
app.post('/franchisees', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let first_name = data.first_name;
	let last_name = data.last_name;

    // Create the query and run it on the database
    q = `INSERT INTO Franchisees (first_name, last_name) VALUES ('${first_name}', '${last_name}');`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update a franchisee
app.put('/franchisees', function(req,res,next){
	let data = req.body;

	let first_name = data.first_name;
	let last_name = data.last_name;
	let franchisee_id = data.franchisee_id;

	let q = `UPDATE Franchisees SET first_name = "${first_name}", last_name = "${last_name}" WHERE franchisee_id = ${franchisee_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


////////////////////////////
// Dues_Owed table routes //
////////////////////////////

// Get all dues owed
app.get("/dues_owed", (req, res) => {
	const q = "SELECT * FROM Dues_Owed";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete a due owed
app.delete("/dues_owed/:id", (req, res) => {
	const dues_invoice_id = req.params.id;
	
	const q = "DELETE FROM Dues_Owed WHERE dues_invoice_id=" + dues_invoice_id + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [dues_invoice_id], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add a new due owed
app.post('/dues_owed', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let franchisee_id = data.franchisee_id;
	let amount_due = data.amount_due;
	let due_date = data.due_date;
	let late_fees = data.late_fees;

    // Create the query and run it on the database
    q = `INSERT INTO Dues_Owed (franchisee_id, amount_due, due_date, late_fees) VALUES ('${franchisee_id}', '${amount_due}', '${due_date}', '${late_fees}');`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update a due owed
app.put('/dues_owed', function(req,res,next){
	let data = req.body;

	let franchisee_id = data.franchisee_id;
	let amount_due = data.amount_due;
	let due_date = data.due_date;
	let late_fees = data.late_fees;
	let dues_invoice_id = data.dues_invoice_id;

	let q = `UPDATE Dues_Owed SET franchisee_id = ${franchisee_id}, amount_due = ${amount_due}, due_date = "${due_date}", late_fees = ${late_fees} WHERE dues_invoice_id = ${dues_invoice_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


////////////////////////
// Sales table routes //
////////////////////////

// Get all sales
app.get("/sales", (req, res) => {
	const q = "SELECT * FROM Sales";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete a sale
app.delete("/sales/:id", (req, res) => {
	const saleId = req.params.id;
	
	const q = "DELETE FROM Sales WHERE sale_id=" + saleId + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [saleId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add a sale
app.post('/sales', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let sale_amount = data.sale_amount;
	let sale_item_id = data.sale_item_id;
	let sale_date = data.sale_date;
	let cafe_id = data.cafe_id;

	if (cafe_id == '') {
		cafe_id = "NULL"
	}

    // Create the query and run it on the database
    q = `INSERT INTO Sales (sale_amount, sale_item_id, sale_date, cafe_id) VALUES (${sale_amount}, ${sale_item_id}, '${sale_date}', ${cafe_id});`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update a sale
app.put('/sales', function(req,res,next){
	let data = req.body;

	let sale_amount = data.sale_amount;
	let sale_date = data.sale_date;
	let sale_item_id = data.sale_item_id;
	let cafe_id = data.cafe_id;
	let sale_id = data.sale_id;

	if (cafe_id == '') {
		cafe_id = "NULL"
	}

	let q = `UPDATE Sales SET sale_amount = ${sale_amount}, sale_item_id = ${sale_item_id}, sale_date = '${sale_date}', cafe_id = ${cafe_id} WHERE sale_id = ${sale_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


/////////////////////////////
// Sale Items table routes //
/////////////////////////////

// Get all sale items
app.get("/sale_items", (req, res) => {
	const q = "SELECT * FROM Sale_Items";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete a sale item
app.delete("/sale_items/:id", (req, res) => {
	const saleItemId = req.params.id;
	
	const q = "DELETE FROM Sale_Items WHERE sale_item_id=" + saleItemId + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [saleItemId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add a sale item
app.post('/sale_items', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let item_name = data.item_name;
	let item_price = data.item_price;

    // Create the query and run it on the database
    q = `INSERT INTO Sale_Items (item_name, item_price) VALUES ('${item_name}', ${item_price});`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update a sale item
app.put('/sale_items', function(req,res,next){
	let data = req.body;

	let sale_item_id = data.sale_item_id;
	let item_name = data.item_name;
	let item_price = data.item_price;

	let q = `UPDATE Sale_Items SET item_name = '${item_name}', item_price = ${item_price} WHERE sale_item_id = ${sale_item_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


//////////////////////////////////
// Inventory Items table routes //
//////////////////////////////////

// Get all inventory items
app.get("/inventory_items", (req, res) => {
	const q = "SELECT * FROM Inventory_Items";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete an inventory item
app.delete("/inventory_items/:id", (req, res) => {
	const itemId = req.params.id;
	
	const q = "DELETE FROM Inventory_Items WHERE item_id=" + itemId + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [itemId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add an inventory item
app.post('/inventory_items', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let item_name = data.item_name;
	let item_price = data.item_price;
	let remaining_stock = data.remaining_stock;

    // Create the query and run it on the database
    q = `INSERT INTO Inventory_Items (item_name, item_price, remaining_stock) VALUES ('${item_name}', ${item_price}, ${remaining_stock});`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update an inventory item
app.put('/inventory_items', function(req,res,next){
	let data = req.body;

	let item_name = data.item_name;
	let item_price = data.item_price;
	let remaining_stock = data.remaining_stock;
	let item_id = data.item_id;

	let q = `UPDATE Inventory_Items SET item_name = '${item_name}', item_price = ${item_price}, remaining_stock = ${remaining_stock} WHERE item_id = ${item_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


///////////////////////////////////
// Inventory Orders table routes //
///////////////////////////////////

// Get all inventory orders
app.get("/inventory_orders", (req, res) => {
	const q = "SELECT * FROM Inventory_Orders";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete an inventory orders
app.delete("/inventory_orders/:id", (req, res) => {
	const orderId = req.params.id;
	
	const q = "DELETE FROM Inventory_Orders WHERE order_id=" + orderId + ";";
	console.log("Delete query is: " + q);

	db.pool.query(q, [orderId], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Add an inventory orders
app.post('/inventory_orders', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let cafe_id = data.cafe_id;
	let quantity_ordered = data.quantity_ordered;
	let amount_due = data.amount_due;
	let item_id = data.item_id;

	if (cafe_id == '') {
		cafe_id = "NULL"
	}

    // Create the query and run it on the database
    q = `INSERT INTO Inventory_Orders (cafe_id, quantity_ordered, amount_due, item_id) VALUES (${cafe_id}, ${quantity_ordered}, ${amount_due}, ${item_id});`;
	console.log("Add query is: " + q);

    db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update an inventory orders
app.put('/inventory_orders', function(req,res,next){
	let data = req.body;

	let order_id = data.order_id;
	let cafe_id = data.cafe_id;
	let quantity_ordered = data.quantity_ordered;
	let amount_due = data.amount_due;
	let item_id = data.item_id;

	let q = `UPDATE Inventory_Orders SET cafe_id = ${cafe_id}, quantity_ordered = ${quantity_ordered}, amount_due = ${amount_due}, item_id = ${item_id} WHERE order_id = ${order_id};`
	console.log("Update query is: " + q);

	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


////////////////////////////////////////
// Cafes and Franchisees table routes //
////////////////////////////////////////

// Get all cafes franchisees
app.get("/cafes_franchisees", (req, res) => {
	const q = "SELECT * FROM Cafes_Franchisees";
	db.pool.query(q, (err, data) => {
		if (err) {
			console.log(err);
			return res.json(err);
		}
		return res.json(data);
	});
});

// Delete a row 
app.delete("/cafes_franchisees/:id", (req, res) => {
	const cafesFranchiseesID = req.params.id;
	const q = "DELETE FROM Cafes_Franchisees WHERE id=" + cafesFranchiseesID + ";";
	console.log("Delete query is: " + q);
	db.pool.query(q, [cafesFranchiseesID], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Create a row
app.post('/cafes_franchisees', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

	let franchisee_id = data.franchisee_id;
	let cafe_id = data.cafe_id;

    // Create the query and run it on the database
    query1 = `INSERT INTO Cafes_Franchisees (franchisee_id, cafe_id) VALUES ('${franchisee_id}', '${cafe_id}')`;
    db.pool.query(query1, function(err){
		if (err) return res.send(err);
		return res.json(data);
    })
});

// Update a row
app.put('/cafes_franchisees', function(req,res,next){
	let data = req.body;

	let franchisee_id = data.franchisee_id;
	let cafe_id = data.cafe_id;
	let id = data.id;

	let q = `UPDATE Cafes_Franchisees SET franchisee_id = ${franchisee_id}, cafe_id = ${cafe_id} WHERE id = ${id};`
	console.log("Update query is: " + q);
	
	// Run the query
	db.pool.query(q, function(err){
		if (err) return res.send(err);
		return res.json(data);	
  	})
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on ' + process.env.DB_URL + '; press Ctrl-C to terminate.')
});
