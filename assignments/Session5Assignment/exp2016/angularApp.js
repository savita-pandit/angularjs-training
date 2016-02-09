var app=angular.module("expenseApp",['ui.directives','ui.filters']);
app.controller('control',['arrayFunc','$scope', function(arrayFunc,$scope){
        $scope.init=(function(){
            arrayFunc.getTransactionData().then(function(response){
			$scope.transaction=JSON.parse(JSON.stringify(response));
			
			$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
			$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');})

			arrayFunc.getSubCategory().then(function(response){
			$scope.SubCategory1=JSON.parse(JSON.stringify(response));
			
			});
						
		})();
		$scope.evaluate=function(){
			$scope.currentObj={transactionID: $scope.transaction.length+1,payer: $scope.payer,payee: $scope.payee,Category: $scope.Cat,subCategory: $scope.subCat,Amount: $scope.amt,mop:$scope.mop,date:$scope.date,Notes:$scope.notes,type:$scope.type};
			arrayFunc.addTransaction($scope.currentObj)
				.then(function(response){
					$scope.transaction=JSON.parse(JSON.stringify(response));
					$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
					$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
				});
		}
		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				arrayFunc.removeTransaction($index)
				.then(function(response){
					$scope.transaction=JSON.parse(JSON.stringify(response));
					$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
					$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
				});
			}
		}
		$scope.edit=function(index){
			for(var i=0;i<$scope.transaction.length;i++)
			{
				if($scope.transaction[i]["transactionID"]==parseInt(index)){
					console.log($scope.transaction[i]["transactionID"]);
					$scope.edit1=1;
					$scope.tranId=$scope.transaction[i]["transactionID"];
					$scope.payer=$scope.transaction[i]["payer"];
					$scope.payee=$scope.transaction[i]["payee"];
					$scope.Cat=$scope.transaction[i]["Category"];
					$scope.subCat=$scope.transaction[i]["subCategory"];
					$scope.prevAmt=$scope.transaction[i]["Amount"];
					$scope.amt=$scope.transaction[i]["Amount"];
					$scope.mop=$scope.transaction[i]["mop"];
					$scope.date = $scope.transaction[i]["mop"];
					$scope.date=new Date($scope.transaction[i]["date"]);
					$scope.notes=$scope.transaction[i]["Notes"];
					$scope.type=$scope.transaction[i]["type"];
					$scope.type.disabled=true;
				}
			}
			
		}
		$scope.updateTransaction=function($index){
			for(var i=0;i<$scope.transaction.length;i++)
			{
				if($scope.transaction[i]["transactionID"]==parseInt($index)){
					$scope.currentObj={};
					$scope.currentObj=$scope.transaction[$index];
					$scope.currentObj["payer"]=$scope.payer;
					$scope.currentObj["payee"]=$scope.payee;
					$scope.currentObj["Category"]=$scope.Cat;
					$scope.currentObj["subCategory"]=$scope.subCat;
					$scope.currentObj["Amount"]=$scope.amt;
					$scope.currentObj["mop"]=$scope.mop;
					$scope.currentObj["date"]=$scope.date;
					$scope.currentObj["Notes"]=$scope.notes;
					$scope.currentObj["type"]=$scope.type;
					
					arrayFunc.updateTransaction($scope.currentObj)
					.then(function(response){
						$scope.transaction[$index]=JSON.parse(JSON.stringify(response));
						if($scope.currentObj["type"]=="Income")
						{
							$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
						}
						else if($scope.currentObj["type"]=="Expense"){
							$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
						}
						$scope.form.$setPristine();
						
					});
					$scope.edit1=0;
					$scope.temp="";
				}
			}
		}
	
	$scope.reset=function(){
		addForm.reset();
	}
	
}]);

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
	factory.updateTransaction=function(arr){
		return $http.post('http://localhost:3000/updateTransaction',JSON.stringify(arr))
				.then(function(response){
					arr = response.data;
					console.log("update Transaction:"+JSON.stringify(arr));
					return arr;
				},function(error){
					console.log("An error occured: " + JSON.stringify(error));
				})
	}
	return factory;
}]);