var app=angular.module("expenseApp",[]);
app.controller('control', function() {
	this.incomeCatArr=[{Cat:'Salary',Amount:50000.00},{Cat:'Business',Amount:20000.00},{Cat:'intrest',Amount:10000.00},{Cat:'Deposit',Amount:5000.00}];
	this.expenseArr=[{Cat:'Rent',Amount:10000,mop:'Credit Card',date:'2015-04-23'},{Cat:'Travel',Amount:5000,mop:'Cash',date:'2015-05-28'},{Cat:'Party',Amount:10000,mop:'Cash',date:'2015-08-23'},{Cat:'Office',Amount:2000,mop:'Debit card',date:'2015-09-18'},{Cat:'Studies',Amount:10000,mop:'Electronic transfer',date:'2015-07-23'},{Cat:'Shopping',Amount:10000,mop:'Credit Card',date:'2015-02-23'}];

	this.sum = function(items, prop){
		return items.reduce( function(a, b){
			return a + b[prop];
		}, 0);
	};

	this.expTotal = this.sum(this.expenseArr, 'Amount');
	this.incomeTotal = this.sum(this.incomeCatArr, 'Amount');
	
});