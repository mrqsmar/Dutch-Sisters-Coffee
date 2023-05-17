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


// const { engine } = require('express-handlebars');
// var exphbs = require('express-handlebars');     // Import express-handlebars
// app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
// app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// app.get('/test', (req, res) => {
// 	res.json("Hello there, I am JSON Darula");
// })


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




// Send the index.html file at the base route
app.get('/', function(req, res)
{
	res.sendFile(`${__dirname}/views/index.html`);
})

// Send Franchisees html
app.get('/franchisees', function(req, res)
{
	res.sendFile(`${__dirname}/views/franchisees.html`);
})

// Send Cafes html
// app.get('/cafes', function(req, res)
// {
// 	res.sendFile(`${__dirname}/views/cafes.html`);
// })

// Send Cafes_Franchisees html
app.get('/cafes_franchisees', function(req, res)
{
	res.sendFile(`${__dirname}/views/cafes_franchisees.html`);
})

// Send Dues_Owed html
app.get('/dues_owed', function(req, res)
{
	res.sendFile(`${__dirname}/views/dues_owed.html`);
})

// Send Inventory_Items html 
app.get('/inventory_items', function(req, res)
{
	res.sendFile(`${__dirname}/views/inventory_items.html`);
})

// Send Inventory_Orders html 
app.get('/inventory_orders', function(req, res)
{
	res.sendFile(`${__dirname}/views/inventory_orders.html`);
})

// Send Sales html 
app.get('/sales', function(req, res)
{
	res.sendFile(`${__dirname}/views/sales.html`);
})

// Send Sale Items html 
app.get('/sale_items', function(req, res)
{
	res.sendFile(`${__dirname}/views/sale_items.html`);
})



// app.post('/', (req, res) => {
// 	res.send('Got a POST request')
// })
	
// app.put('/user', (req, res) => {
// 	res.send('Got a PUT request at /user')
// })

// app.delete('/user', (req, res) => {
// 	res.send('Got a DELETE request at /user')
// })

// app.get('/', function(req, res)
// {
// 	// Define our queries
// 	query1 = 'DROP TABLE IF EXISTS diagnostic;';
// 	query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
// 	query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
// 	query4 = 'SELECT * FROM diagnostic;';

// 	// Execute every query in an asynchronous manner, we want each query to finish before the next one starts

// 	// DROP TABLE...
// 	db.pool.query(query1, function (err, results, fields){

// 		// CREATE TABLE...
// 		db.pool.query(query2, function(err, results, fields){

// 			// INSERT INTO...
// 			db.pool.query(query3, function(err, results, fields){

// 				// SELECT *...
// 				db.pool.query(query4, function(err, results, fields){

// 					// Send the results to the browser
// 					let base = "<h1>MySQL Results:</h1>"
// 					res.send(base + JSON.stringify(results));
// 				});
// 			});
// 		});
// 	});
// });
	
	
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
