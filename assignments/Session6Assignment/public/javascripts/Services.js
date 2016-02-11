var app=angular.module("expenseApp");
app.factory('arrayFunc', ['$http', '$q',function($http, $q) {
	var factory = {};
	var transactions=null;
	var subCategory1=null;
	factory.getTransactionData=function(){
		return $http.get('http://localhost:3000/getTransaction')
				.then(function(response) {
					transactions = response.data;
					return transactions;
				})
				.catch(function(error) {
					console.log("An error occured: " + error);
				});
	}

	factory.getSubCategory=function(){
		return $http.get('http://localhost:3000/getSubCat')
				.then(function(response) {
					subCategory1 = response.data;
					return subCategory1;
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
					transactions = response.data;
					console.log("Added Transaction:"+JSON.stringify(transactions));
					return transactions;
				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	factory.removeTransaction=function(index){
		return $http.delete('http://localhost:3000/deleteTransaction?'+index)
				.then(function(response){
					transactions = response.data;
					console.log("deleted Transaction:"+JSON.stringify(transactions));
					return transactions;
				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	factory.updateTransactionSer=function(arr){
		return $http.post('http://localhost:3000/updateTransaction',JSON.stringify(arr))
				.then(function(response){
					transactions = response.data;
					return transactions;
				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	return factory;
}]);