var mysql = require("mysql");
var inquirer = require("inquirer");

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
function selectAvailableProducts(callBack) {
	connection.query(
		"SELECT * from products where stock_quantity > 0",

		function (err, res) {
			if (err) throw err;
			// availableProductIds = res;
			// console.log(res);
			callBack(res);
		}
	)
}

//get remaining qty
function getAvailableQty(id,callBack) {
	connection.query(
		"SELECT stock_quantity from products where ?",
		{
			id:id
		},
		function (err, res) {
			if (err) throw err;
			// console.log(res[0].stock_quantity);
			callBack(res[0].stock_quantity);
		}
	)
}

//update qty
function updateStockQty(id, newQty) {
	connection.query(
		"UPDATE products SET ? WHERE ?",
		[
			{
				stock_quantity: newQty
			},
			{
				id: id
			}
		],
		function (err, res) {
			if (err) throw err;
			console.log("Thank You For Your Purchase");
			console.log("Stock Quantity Remaining = " + newQty);
		}
	)
}

var promptSelectProduct = function () {
	selectAvailableProducts(function(availableProducts){
		var selectList = [];
		for(let i = 0; i < availableProducts.length; i++){
			selectList.push(availableProducts[i].id + ": " + availableProducts[i].product_name + " Quantity: " + availableProducts[i].stock_quantity);
		}
		console.log(selectList);
		inquirer.prompt([
			{
				name: "product",
				message: "What product would you like to buy? ",
				// choices: selectList,
				validate: function(input){
					for(let i = 0; i<availableProducts.length; i++){
						if(parseInt(input,10) === availableProducts[i].id){
							return true;
						}
					}
					return false;
				}
			}
		]).then(function(res){
			promptSelectQty(res.product);
		});
	});
	
}

function promptSelectQty(id){
	getAvailableQty(id,function(maxQty){
		inquirer.prompt([
			{
				name: "qty",
				message: "How many would you like to purchase?",
				validate: function(input){
					if(isNaN(input)){
						return false;
					}
					var inputNum = parseInt(input,10);
					if(inputNum > 0 && inputNum <= maxQty){
						return true;
					}
					return false;
				}
			}
		]).then(function(res){
			updateStockQty(id,maxQty - res.qty);
			closeConnection();
		});
	});
}

// function promptContinue(){
// 	inquirer.prompt()
// }

function closeConnection(){
	connection.end();
}
promptSelectProduct();
// selectAvailableProducts();
// getAvailableQty(2);
// updateStockQty(2, 20);
// selectAvailableProducts();
