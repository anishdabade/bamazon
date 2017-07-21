var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "United007&",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  
  display();
  runFunction();
  
});

function display() {
	var query = "SELECT * FROM bamazon"
	connection.query(query,function(err,res) {
	var table = new Table({
	    head: ['ID','product_name','product_sales','department_name','price','stock_quantity'], 
	    colWidths: [20, 20, 20, 20, 20, 20]
	});

		for (var i = 0; i < res.length; i++) {
		
				table.push([res[i].item_id,res[i].product_name,res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]);				
        }

        console.log(table.toString());
	});
}


function runFunction() {
	
    inquirer.prompt([
        {
            name:"id",
            type:"input",
            message:"Please Enter a product ID to buy that product:"
        },
        {
            name:"quantity",
            type:"input",
            message:"How much quantity you want to buy:"    
        }
        ]).then(function(answer) {
            
            connection.query("SELECT * FROM bamazon WHERE ?", [{ item_id : answer.id }], function(err, res) {
		           if (err) throw err; 
		          
		           var current_quantity = res[0].stock_quantity;
		           
		           var remaining_quantity = current_quantity - answer.quantity;
		           

		           if(current_quantity > answer.quantity) {

		           		console.log("Current quantity is: " + current_quantity);
		           		console.log("Remaining quantity is: " + remaining_quantity);

		           		connection.query("UPDATE bamazon SET stock_quantity=? WHERE item_id=?",
		                [
                    		remaining_quantity, answer.id
                    	],
		                function(err,res) {
		                    console.log("Updated inventory: ");
		                });
		                display();
		           }
		           else {
		           		console.log("Insufficient Quantity, please come again tomorrow!");
		           }
		           	connection.end();
		    });
     	});
}