var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var transactions=[{
		"transactionID": 1,
		"payer": "Globant",
		"payee": "self",
		"Category": "Salary",
		"subCategory": "Salary",
		"Amount": 50000,
		"mop":"electronic_transfer",
		"date":"2015-08-01",
		"Notes":"Ontime",
		"type":"Income"
	}, {
		"transactionID": 2,
		"payer": "LIC",
		"payee": "self",
		"Category": "Business",
		"subCategory": "Lic Agent",
		"Amount": 20000,
		"mop":"electronic_transfer",
		"date":"2015-08-10",
		"Notes":"Less business",
		"type":"Income"
	}, {
		"transactionID": 3,
		"payer": "Bank Of Maharashtra",
		"payee": "self",
		"Category": "Intrest",
		"subCategory": "Intrest",
		"Amount": 10000,
		"mop":"electronic_transfer",
		"date":"2015-05-01",
		"Notes":"4.5% of intrest recieved",
		"type":"Income"
	}, {
		"transactionID": 4,
		"payer": "Bank Of Maharashtra",
		"payee": "self",
		"Category": "Deposit",
		"subCategory": "Fixed Deposit",
		"Amount": 5000,
		"mop":"cheque",
		"date":"2015-07-10",
		"Notes":"4.5% of intrest recieved",
		"type":"Income"
	}, {
		"transactionID": 5,
		"payer": "self",
		"payee": "Satish Joshi",
		"Category": "Rent",
		"subCategory": "House Rent",
		"Amount": 10000,
		"mop": "Credit Card",
		"date": "2015-04-23",
		"Notes":"",
		"type":"Expense"
	}, {
		"transactionID": 6,
		"payer": "self",
		"payee": "PURPLE",
		"Category": "Travel",
		"subCategory":"Out Of City",
		"Amount": 5000,
		"mop": "Cash",
		"date": "2015-05-28",
		"Notes":"",
		"type":"Expense"
	}, {
		"transactionID": 7,
		"payer": "self",
		"payee": "Miami",
		"Category": "Party",
		"subCategory":"Personal Party",
		"Amount": 10000,
		"mop": "Cash",
		"date": "2015-08-23",
		"Notes":"",
		"type":"Expense"
	}, {
		"transactionID": 8,
		"payer": "self",
		"payee": "Prachi restaurant",
		"Category": "Office",
		"subCategory":"Lunch and Snacks",
		"Amount": 2000,
		"mop": "Debit card",
		"date": "2015-09-18",
		"Notes":"",
		"type":"Expense"
	}, {
		"transactionID": 9,
		"payer": "self",
		"payee": "Mnd Tree",
		"Category": "Studies",
		"subCategory":"Professional",
		"Amount": 10000,
		"mop": "Electronic transfer",
		"date": "2015-07-23",
		"Notes":"",
		"type":"Expense"
	}, {
		"transactionID": 10,
		"payer": "self",
		"payee": "Pantaloons",
		"Category": "Shopping",
		"subCategory":"Clothes and Accesories",
		"Amount": 10000,
		"mop": "Credit Card",
		"date": "2015-02-23",
		"Notes":"",
		"type":"Expense"
	}];

	var SubCategory1 =[{
		Category: 'Rent',
		subCategory: 'Office Rent'
	},
	{
		Category: 'Rent',
		subCategory: 'House Rent'
	},
	{
		Category: 'Travel',
		subCategory: 'In City'
	},
	{
		Category: 'Travel',
		subCategory: 'Out Of City'
	},
	{
		Category: 'Party',
		subCategory: 'Office Party'
	},
	{
		Category: 'Party',
		subCategory: 'Personal Party'
	},
	{
		Category: 'Studies',
		subCategory: 'Creative'
	},{
		Category: 'Studies',
		subCategory: 'Professional'
	},{
		Category: 'Shopping',
		subCategory: 'Grocery'
	},{
		Category: 'Shopping',
		subCategory: 'Household'
	},{
		Category: 'Shopping',
		subCategory: 'Clothes and Accesories'
	},{
		Category: 'Salary',
		subCategory: 'Salary'
	},{
		Category: 'Business',
		subCategory: 'Lic Agent'
	},{
		Category: 'Business',
		subCategory: 'Other'
	},{
		Category: 'Intrest',
		subCategory: 'Intrest on Savings'
	},{
		Category: 'Intrest',
		subCategory: 'Intrest'
	},{
		Category: 'Deposit',
		subCategory: 'Fixed Deposit'
	},
	{
		Category: 'Office',
		subCategory:'Lunch and Snacks'}
	];

var futureTransactions=[
	{
		"recursiveID": 1,
		"payer": "Globant",
		"payee": "self",
		"Category": "Salary",
		"subCategory": "Salary",
		"Amount": 50000,
		"mop":"electronic_transfer",
		"date":"2016-02-25",
		"Notes":"Ontime",
		"type":"Income",
		"modeOfRecursion":'monthly'
	},
	{
		"recursiveID": 5,
		"payer": "self",
		"payee": "Satish Joshi",
		"Category": "Rent",
		"subCategory": "House Rent",
		"Amount": 10000,
		"mop": "Credit Card",
		"date": "2015-04-23",
		"Notes":"",
		"type":"Expense",
		"modeOfRecursion":'monthly'
	}
	
];

/* GET home page. */
router.get('/getTransaction', function(req, res) {
  	res.json(transactions);
});

router.get('/getSubCat', function(req, res) {
  	res.json(SubCategory1);
});
router.post('/addTransaction', function(req, res) {
	transactions.push(req.body);
    res.send(transactions);
});
router.post('/updateTransaction', function(req, res) {
	var resend=null;
	var index=parseInt(req.body.transactionID);
	for(var i=0;i<=transactions.length;i++){

		if(transactions[i]["transactionID"]==index)
		{

			transactions[i]=JSON.parse(JSON.stringify(req.body));
			res.send(transactions);
			break;
		}
	}
	
});
router.delete('/deleteTransaction', function(req, res) {
	var url=req.url;
	var index=parseInt(url.substr(url.indexOf("?")+1));
	for(var i=0;i<=transactions.length;i++){
		if(transactions[i]["transactionID"]==index)
		{
			console.log(transactions[i]["transactionID"]);
			transactions.splice(i,1);
			break;
		}
	}
	res.send(transactions);
});


function comp(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime() ;
}

router.get('/getRecursiveTransaction',function(req,res){

futureTransactions.sort(comp);
var arr=[];
	var dt= new Date();
	for(var i=0;i<futureTransactions.length;i++){
		if(dt <= new Date(futureTransactions[i].date)){
			arr.push(futureTransactions[i]);
		}
	}
		res.json(arr);
})
router.post('/addRecursiveTransaction',function(req,res){
	var id=parseInt(req.body.index);
	var index=null;
	for(var i=0;i<futureTransactions.length;i++){
		if(futureTransactions[i].recursiveID==id){
			index=i;
			break;
		}
	}
	
	var maxValue = 0;
	for (var i=0;i<transactions.length;i++)
	{
	     if (transactions[i]['transactionID'] > maxValue)
	     {
	          maxValue = transactions[i]['transactionID'];   
	     }
	}
	var newTransaction={};
	newTransaction['transactionID']=maxValue+1;
	newTransaction['payer']=futureTransactions[index].payer;
	newTransaction['payee']=futureTransactions[index].payee;
	newTransaction['Category']=futureTransactions[index].Category;
	newTransaction['subCategory']=futureTransactions[index].subCategory;
	newTransaction['Amount']=futureTransactions[index].Amount;
	newTransaction['mop']=futureTransactions[index].mop;
	newTransaction['date']=new Date();
	newTransaction['notes']=futureTransactions[index].Notes;
	newTransaction['type']=futureTransactions[index].type;
	transactions.push(newTransaction);
	console.log(transactions);
	var dt=new Date(futureTransactions[index].date);
	
    dt.setMonth(dt.getMonth()+1);
    console.log(dt);
    futureTransactions[index].date=dt;

    res.send(JSON.parse(JSON.stringify(transactions)));
    
})

router.delete('/deleteRecursive', function(req, res) {
	var id=parseInt(req.body.index);
	var index=null;
	for(var i=0;i<futureTransactions.length;i++){
		if(futureTransactions[i].recursiveID==id){
			index=i;
			break;
		}
	}
	futureTransactions.splice(index,1);
	res.send(futureTransactions);
});

module.exports = router;