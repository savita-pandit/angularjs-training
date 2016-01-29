var app=angular.module("expenseApp",['ui.directives','ui.filters']);
app.controller('control',['arrayFunc', function(arrayFunc){
this.transaction = arrayFunc.getTransaction();
this.SubCategory1=arrayFunc.getsubCategoryArr();
	
	this.incomeTotal = arrayFunc.sum(this.transaction,'Income');
	this.expTotal = arrayFunc.sum(this.transaction,'Expense');
	
	this.evaluate=function(){
		arrayFunc.addTransaction({transactionID: this.transaction.length+1,payer: this.payer,payee: this.payee,Category: this.Cat,subCategory: this.subCat,Amount: this.amt,mop:this.mop,date:this.date,Notes:this.notes,type:this.type},this.type);
		if(this.type=="Income")
		{ 
			this.incomeTotal=arrayFunc.calculate(this.incomeTotal,this.amt,"add");
		}
		else
		{
			this.expTotal=arrayFunc.calculate(this.expTotal,this.amt,"add")
		}
	}
	this.remove=function($index){
		if(this.type=="Income")
		{ 
			this.incomeTotal=arrayFunc.calculate(this.incomeTotal,this.transaction[$index]['Amount'],"remove");
		}
		else
		{
			this.expTotal=arrayFunc.calculate(this.expTotal,this.transaction[$index]['Amount'],"remove")
		}
		arrayFunc.removeTransaction($index);
	}
	this.edit=function(index){
		this.edit1=1;
		this.tranId=this.transaction[index]["transactionID"];
		this.payer=this.transaction[index]["payer"];
		this.payee=this.transaction[index]["payee"];
		this.Cat=this.transaction[index]["Category"];
		this.subCat=this.transaction[index]["subCategory"];
		this.prevAmt=this.transaction[index]["Amount"];
		this.amt=this.transaction[index]["Amount"];
		this.mop=this.transaction[index]["mop"];
		this.date = this.transaction[index]["mop"];
		this.date=this.transaction[index]["date"];
		this.notes=this.transaction[index]["Notes"];
		this.type=this.transaction[index]["type"];
		type.disabled=true;
		
	}
	this.update=function($index){
		this.currentObj={};
		this.currentObj=this.transaction[$index];
		this.currentObj["payer"]=this.payer;
		this.currentObj["payee"]=this.payee;
		this.currentObj["Category"]=this.Cat;
		this.currentObj["subCategory"]=this.subCat;
		this.currentObj["Amount"]=this.amt;
		this.currentObj["mop"]=this.mop;
		this.currentObj["date"]=this.date;
		this.currentObj["notes"]=this.notes;
		this.currentObj["type"]=this.type;
		

		if(this.type=="Income"){
			this.incomeTotal=arrayFunc.updateAmount(this.incomeTotal,this.prevAmt,this.amt)
		}
		else{
			this.expTotal=arrayFunc.updateAmount(this.expTotal,this.prevAmt,this.amt)
		}

		this.transaction[$index]=this.currentObj;
		arrayFunc.update(this.transaction);
		this.edit1=0;
		this.temp="";
	}
	
	this.reset=function(){
		addForm.reset();
	}
}]);

app.factory('arrayFunc', function() {
	var transaction=[{
		transactionID: 1,
		payer: 'Globant',
		payee: 'self',
		Category: 'Salary',
		subCategory: 'Salary',
		Amount: 50000,
		mop:'electronic_transfer',
		date:new Date('2015-08-01'),
		Notes:'Ontime',
		type:'Income'
	}, {
		transactionID: 2,
		payer: 'LIC',
		payee: 'self',
		Category: 'Business',
		subCategory: 'Lic Agent',
		Amount: 20000,
		mop:'electronic_transfer',
		date:new Date('2015-08-10'),
		Notes:'Less business',
		type:'Income'
	}, {
		transactionID: 3,
		payer: 'Bank Of Maharashtra',
		payee: 'self',
		Category: 'Intrest',
		subCategory: 'Intrest',
		Amount: 10000,
		mop:'electronic_transfer',
		date:new Date('2015-05-01'),
		Notes:'4.5% of intrest recieved',
		type:'Income'
	}, {
		transactionID: 4,
		payer: 'Bank Of Maharashtra',
		payee: 'self',
		Category: 'Deposit',
		subCategory: 'Fixed Deposit',
		Amount: 5000,
		mop:'cheque',
		date:new Date('2015-07-10'),
		Notes:'4.5% of intrest recieved',
		type:'Income'
	}, {
		transactionID: 5,
		payer: 'self',
		payee: 'Satish Joshi',
		Category: 'Rent',
		subCategory: 'House Rent',
		Amount: 10000,
		mop: 'Credit Card',
		date: new Date('2015-04-23'),
		Notes:'',
		type:'Expense'
	}, {
		transactionID: 6,
		payer: 'self',
		payee: 'PURPLE',
		Category: 'Travel',
		subCategory:'Out Of City',
		Amount: 5000,
		mop: 'Cash',
		date: new Date('2015-05-28'),
		Notes:'',
		type:'Expense'
	}, {
		transactionID: 7,
		payer: 'self',
		payee: 'Miami',
		Category: 'Party',
		subCategory:'Personal Party',
		Amount: 10000,
		mop: 'Cash',
		date: new Date('2015-08-23'),
		Notes:'',
		type:'Expense'
	}, {
		transactionID: 8,
		payer: 'self',
		payee: 'Prachi restaurant',
		Category: 'Office',
		subCategory:'Lunch and Snacks',
		Amount: 2000,
		mop: 'Debit card',
		date: new Date('2015-09-18'),
		Notes:'',
		type:'Expense'
	}, {
		transactionID: 9,
		payer: 'self',
		payee: 'Mnd Tree',
		Category: 'Studies',
		subCategory:'Professional',
		Amount: 10000,
		mop: 'Electronic transfer',
		date: new Date('2015-07-23'),
		Notes:'',
		type:'Expense'
	}, {
		transactionID: 10,
		payer: 'self',
		payee: 'Pantaloons',
		Category: 'Shopping',
		subCategory:'Clothes and Accesories',
		Amount: 10000,
		mop: 'Credit Card',
		date: new Date('2015-02-23'),
		Notes:'',
		type:'Expense'
	}]

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
	var factory = {};
	factory.sum = function(items,type){
		return items.reduce( function(a, b){
			if(b["type"]===type){
				return a + b["Amount"];
			}
			else{return a;}
		}, 0);
	};
	
	factory.getTransaction=function(){
		return transaction;
	}
	factory.getsubCategoryArr=function(){
		return SubCategory1;
	}
	factory.addTransaction=function(arr,type){
		transaction.push(arr);
	}
	factory.removeTransaction=function($index){
		transaction.splice($index,1);
	}
	factory.calculate=function(total,amount,action){
		if(action==="add"){return total+amount;}
		else if(action==="remove"){return total-amount}
	}
	factory.updateAmount=function(total,prevAmt,currAmt){
		if(prevAmt>currAmt){
			return (total-prevAmt)+currAmt;
		}
		else{
			return total+(currAmt-prevAmt)
		}
	}
	factory.update=function(arr){
		transaction=arr;
	}
	return factory;
});