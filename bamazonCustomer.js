var mysql = require("mysql");

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Some?pass105350',
	database: 'bamazon'
});

//connection.connect(function (error) { });
connection.connect(error => {
	if (error) throw error;
	// console.log("You are connected with id: ", connection.threadId);
});

//get all available items
function selectAvailableProducts(){
	connection.query(
		"SELECT * from product where ?",
		{
			stock_quantity: "> 0"
		},
		function(err,res){
			if(err) throw err;
			console.log(res);
			connection.end();
		}
	)
}