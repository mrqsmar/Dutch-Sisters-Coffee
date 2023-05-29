/*
    SETUP
*/

const cors=require('cors');

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8299;                 // Set a port number at the top so it's easy to change in the future

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

// Bug on delete here, fk constraint
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

/////////////////////////////
// Sale Items table routes //
/////////////////////////////

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


//////////////////////////////////
// Inventory Items table routes //
//////////////////////////////////

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


///////////////////////////////////
// Inventory Orders table routes //
///////////////////////////////////

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
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
