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

// Cafes table routes
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

app.delete("/cafes/:id", (req, res) => {
	const cafeID = req.params.id;
	const q = "DELETE FROM Cafes WHERE cafe_id=" + cafeID + ";";
	console.log("Delete query is: " + q);
	db.pool.query(q, [cafeID], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});



// Franchisees table routes
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


// Dues_Owed table routes
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


// Sales table routes
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


// Sale Items table routes
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


// Inventory Items table routes
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


// Inventory Orders table routes
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


// Cafes and Franchisees table routes

// Read
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

// Delete
app.delete("/cafes_franchisees/:id", (req, res) => {
	const cafesFranchiseesID = req.params.id;
	const q = "DELETE FROM Cafes_Franchisees WHERE id=" + cafesFranchiseesID + ";";
	console.log("Delete query is: " + q);
	db.pool.query(q, [cafesFranchiseesID], (err, data) => {
		if (err) return res.send(err);
		return res.json(data);
	});
});

// Create
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

// Update
app.put('/cafes_franchisees', function(req,res,next){
	let data = req.body;

	let franchisee_id = data.franchisee_id;
	let cafe_id = data.cafe_id;
	let id = data.id;

	let q = `UPDATE Cafes_Franchisees SET franchisee_id = ${franchisee_id}, cafe_id = ${cafe_id} WHERE id = ${id};`
	
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
