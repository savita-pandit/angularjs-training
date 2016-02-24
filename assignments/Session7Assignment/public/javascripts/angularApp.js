
var app=angular.module("expenseApp",['ui.directives','ui.filters','ngRoute']);
app.controller('control',['trasactionService','recursiveService','$scope','$rootScope', function(trasactionService,recursiveService,$scope,$rootScope){
		$rootScope.init=function(){
			$rootScope.showMode=0;
			
			if($rootScope.transactions==null)
			{
	            trasactionService.getTransactionData().then(function(response){
				$rootScope.transaction=trasactionService.transactions;
				$rootScope.incomeTotal = trasactionService.incomeTotal;
				$rootScope.expTotal = trasactionService.expTotal;

				});
	       	}
            else{
            	$rootScope.transaction=trasactionService.transactions;
				$rootScope.incomeTotal = trasactionService.incomeTotal;
				$rootScope.expTotal = trasactionService.expTotal;
            }
            if($rootScope.SubCategory1==null)
			{
				trasactionService.getSubCategory().then(function(response){
				$rootScope.SubCategory1=JSON.parse(JSON.stringify(response));
				});
			}
			else{
				$rootScope.SubCategory1=trasactionService.subCategory1;
			}
			if($rootScope.recursiveTransaction==null){
				recursiveService.getRecursiveTransactions().then(function(response){
					$rootScope.recursiveTransaction=JSON.parse(JSON.stringify(response));
				})
			}
		
		}				
		$rootScope.init();
		$scope.evaluate=function(){
			$scope.currentObj={transactionID: $scope.transaction.length+1,payer: $scope.payer,payee: $scope.payee,Category: $scope.Cat,subCategory: $scope.subCat,Amount: $scope.amt,mop:$scope.mop,date:$scope.date,Notes:$scope.notes,type:$scope.type};
			trasactionService.addTransaction($scope.currentObj)
				.then(function(response){
					$rootScope.transaction=trasactionService.transactions;
					$rootScope.incomeTotal=trasactionService.incomeTotal;
					$rootScope.expTotal=trasactionService.expTotal;
				});
		}
	$scope.reset=function(){
		addForm.reset();
	}
	
}]);
app.controller('controlExpense',['trasactionService','$scope','$rootScope', function(trasactionService,$scope,$rootScope){


		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				trasactionService.removeTransaction($index)
				.then(function(response){
					$scope.transaction=trasactionService.transactions;
					$scope.incomeTotal = trasactionService.incomeTotal;
					$scope.expTotal = trasactionService.expTotal;
					$rootScope.init();
				});
			}
		}
		$scope.edit=function(index){
			
			for(var i=0;i<trasactionService.transactions.length;i++)
			{
				if(trasactionService.transactions[i]["transactionID"]==parseInt(index)){
					
					$rootScope.edit1=1;
					$rootScope.tranId=trasactionService.transactions[i]["transactionID"];
					$rootScope.payer=trasactionService.transactions[i]["payer"];
					$rootScope.payee=trasactionService.transactions[i]["payee"];
					$rootScope.Cat=trasactionService.transactions[i]["Category"];
					$rootScope.subCat=trasactionService.transactions[i]["subCategory"];
					$rootScope.amt=trasactionService.transactions[i]["Amount"];
					$rootScope.mop=trasactionService.transactions[i]["mop"];
					$rootScope.date=new Date(trasactionService.transactions[i]["date"]);
					$rootScope.notes=trasactionService.transactions[i]["Notes"];
					$rootScope.type=trasactionService.transactions[i]["type"];
					$rootScope.type.disabled=true;
					
				}
			}
			
		}
		$rootScope.updateTransaction=function($index){
			
			for(var i=0;i<$scope.transaction.length;i++)
			{

				if($scope.transaction[i]["transactionID"]==parseInt($index)){
					
					$scope.currentObj={};
					$scope.currentObj["transactionID"]=parseInt($index);
					$scope.currentObj["payer"]=$scope.payer;
					$scope.currentObj["payee"]=$scope.payee;
					$scope.currentObj["Category"]=$scope.Cat;
					$scope.currentObj["subCategory"]=$scope.subCat;
					$scope.currentObj["Amount"]=$scope.amt;
					$scope.currentObj["mop"]=$scope.mop;
					$scope.currentObj["date"]=$scope.date;
					$scope.currentObj["Notes"]=$scope.notes;
					$scope.currentObj["type"]=$scope.type;
					if($scope.currentObj["payer"]!='')
					{
						trasactionService.updateTransactionSer($scope.currentObj)
						.then(function(response){
							$scope.transaction=trasactionService.transactions;
							$scope.incomeTotal = trasactionService.incomeTotal;
							$scope.expTotal = trasactionService.expTotal;
						});
						$rootScope.edit4=0;
						$scope.reset();
						$rootScope.edit1=0;
						$scope.temp="";
						$rootScope.init();
					}
					break;
				}
		}
		}
	
	$scope.reset=function(){
		addForm.reset();
	}
	
}]);
app.controller('controlIncome',['trasactionService','$scope','$rootScope', function(trasactionService,$scope,$rootScope){

		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				trasactionService.removeTransaction($index)
				.then(function(response){
					$scope.transaction=trasactionService.transactions;
					$scope.incomeTotal = trasactionService.incomeTotal;
					$scope.expTotal = trasactionService.expTotal;
					$rootScope.init();
				});
			}
		}
		$scope.edit=function(index){
			
			for(var i=0;i<$scope.transaction.length;i++)
			{
				if($scope.transaction[i]["transactionID"]==parseInt(index)){
					
					$rootScope.edit1=1;
					$rootScope.tranId=trasactionService.transactions[i]["transactionID"];
					$rootScope.payer=trasactionService.transactions[i]["payer"];
					$rootScope.payee=trasactionService.transactions[i]["payee"];
					$rootScope.Cat=trasactionService.transactions[i]["Category"];
					$rootScope.subCat=trasactionService.transactions[i]["subCategory"];
					$rootScope.amt=trasactionService.transactions[i]["Amount"];
					$rootScope.mop=trasactionService.transactions[i]["mop"];
					$rootScope.date=new Date(trasactionService.transactions[i]["date"]);
					$rootScope.notes=trasactionService.transactions[i]["Notes"];
					$rootScope.type=trasactionService.transactions[i]["type"];
					$rootScope.type.disabled=true;
					
				}
			}
			
		}
		$rootScope.updateTransaction=function($index){

			
				for(var i=0;i<$scope.transaction.length;i++)
			{

				if($scope.transaction[i]["transactionID"]==parseInt($index)){
					
					$scope.currentObj={};
					$scope.currentObj["transactionID"]=parseInt($index);
					$scope.currentObj["payer"]=$scope.payer;
					$scope.currentObj["payee"]=$scope.payee;
					$scope.currentObj["Category"]=$scope.Cat;
					$scope.currentObj["subCategory"]=$scope.subCat;
					$scope.currentObj["Amount"]=$scope.amt;
					$scope.currentObj["mop"]=$scope.mop;
					$scope.currentObj["date"]=$scope.date;
					$scope.currentObj["Notes"]=$scope.notes;
					$scope.currentObj["type"]=$scope.type;
					if($scope.currentObj["payer"]!='')
					{
						trasactionService.updateTransactionSer($scope.currentObj)
						.then(function(response){
							$scope.transaction=trasactionService.transactions;
							$scope.incomeTotal = trasactionService.incomeTotal;
							$scope.expTotal = trasactionService.expTotal;
							
							$rootScope.init();
						});
						$rootScope.edit4=0;
						$scope.reset();
						$rootScope.edit1=0;
						$scope.temp="";
						$rootScope.init();
					}
					break;
				}
		}
			
		}
	
	$scope.reset=function(){
		addForm.reset();
	}
	
}]);
app.controller('controlReports',['trasactionService','$scope','$rootScope', function(trasactionService,$scope,$rootScope){
		
}]);