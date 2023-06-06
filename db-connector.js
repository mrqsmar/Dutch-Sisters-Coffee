// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
// 	connectionLimit	: 10,
// 	host		: 'classmysql.engr.oregonstate.edu',
// 	user            : 'cs340_kowalsan',
// 	password        : '3018',
// 	database        : 'cs340_kowalsan'
// })
var pool = mysql.createPool({
	connectionLimit	: 10,
	host			: process.env.DB_HOST,
	user            : process.env.DB_USER,
	password        : process.env.DB_PASSWORD,
	database        : process.env.DB_NAME
})

// Export it for use in our application
module.exports.pool = pool;
