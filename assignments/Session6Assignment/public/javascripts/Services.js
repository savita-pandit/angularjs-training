var app=angular.module("expenseApp");
app.factory('arrayFunc', ['$http', '$q',function($http, $q) {
	var factory = {};
	factory.transactions=null;
	factory.incomeTotal=null;
	factory.expTotal=null;
	factory.subCategory1=null;
	factory.getTransactionData=function(){
		return $http.get('http://localhost:3000/getTransaction')
				.then(function(response) {
					factory.transactions= JSON.parse(JSON.stringify(response.data));
					factory.incomeTotal=factory.sum(factory.transactions,"Income");
					factory.expTotal=factory.sum(factory.transactions,"Expense");
					return factory.transactions;
				})
				.catch(function(error) {
					console.log("An error occured: " + error);
				});
	}

	factory.getSubCategory=function(){
		return $http.get('http://localhost:3000/getSubCat')
				.then(function(response) {
					factory.subCategory1 = response.data;
					return factory.subCategory1;
				})
				.catch(function(error) {
					console.log("An error occured: " + error);
				});
	}
	
	factory.sum = function(items,type){
		return items.reduce(function(a, b){

			if(b["type"]===type){
				return a + b["Amount"];
			}
			else{return a;}
		}, 0);
	};
	factory.addTransaction=function(arr){
		return $http.post('http://localhost:3000/addTransaction',JSON.stringify(arr))
				.then(function(response){
					factory.transactions= JSON.parse(JSON.stringify(response.data));
					factory.incomeTotal=factory.sum(factory.transactions,"Income");
					factory.expTotal=factory.sum(factory.transactions,"Expense");
					return factory.transactions;

				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	factory.removeTransaction=function(index){
		return $http.delete('http://localhost:3000/deleteTransaction?'+index)
				.then(function(response){
					factory.transactions= JSON.parse(JSON.stringify(response.data));
					factory.incomeTotal=factory.sum(factory.transactions,"Income");
					factory.expTotal=factory.sum(factory.transactions,"Expense");
					return factory.transactions;
				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	factory.updateTransactionSer=function(arr){
		return $http.post('http://localhost:3000/updateTransaction',JSON.stringify(arr))
				.then(function(response){
					factory.transactions= JSON.parse(JSON.stringify(response.data));
					factory.incomeTotal=factory.sum(factory.transactions,"Income");
					factory.expTotal=factory.sum(factory.transactions,"Expense");
					return factory.transactions;
				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	return factory;
}]);