var app=angular.module("expenseApp");
app.config(function($routeProvider) {
	$routeProvider
    .when("/", {
       
        controller: "control"
    })
	.when("/Income", {
        templateUrl: "Template/Income.html",
        controller: "controlIncome",
    })
    .when("/Expense", {
        templateUrl: "Template/Expense.html",
        controller: "controlExpense",
    })
    .when("/Reports", {
        templateUrl: "Template/Reports.html",
        controller: "controlReports",
    })
    .when("/configure", {
        templateUrl: "Template/configure.html",
        
    });
    
});