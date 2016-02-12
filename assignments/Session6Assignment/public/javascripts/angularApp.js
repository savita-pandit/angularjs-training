
var app=angular.module("expenseApp",['ui.directives','ui.filters','ngRoute']);
app.controller('control',['arrayFunc','$scope','$rootScope', function(arrayFunc,$scope,$rootScope){
		$rootScope.init=function(){
			if($rootScope.transactions==null)
			{
	            arrayFunc.getTransactionData().then(function(response){
				$rootScope.transaction=arrayFunc.transactions;
				$rootScope.incomeTotal = arrayFunc.incomeTotal;
				$rootScope.expTotal = arrayFunc.expTotal;

				});
	       	}
            else{
            	$rootScope.transaction=arrayFunc.transactions;
				$rootScope.incomeTotal = arrayFunc.incomeTotal;
				$rootScope.expTotal = arrayFunc.expTotal;
            }
            if($rootScope.SubCategory1==null)
			{
				arrayFunc.getSubCategory().then(function(response){
				$rootScope.SubCategory1=JSON.parse(JSON.stringify(response));
				});
			}
			else{
				$rootScope.SubCategory1=arrayFunc.subCategory1;
			}
		}				
		$rootScope.init();
		$scope.evaluate=function(){
			$scope.currentObj={transactionID: $scope.transaction.length+1,payer: $scope.payer,payee: $scope.payee,Category: $scope.Cat,subCategory: $scope.subCat,Amount: $scope.amt,mop:$scope.mop,date:$scope.date,Notes:$scope.notes,type:$scope.type};
			arrayFunc.addTransaction($scope.currentObj)
				.then(function(response){
					$rootScope.transaction=arrayFunc.transactions;
					$rootScope.incomeTotal=arrayFunc.incomeTotal;
					$rootScope.expTotal=arrayFunc.expTotal;
				});
		}
	$scope.reset=function(){
		addForm.reset();
	}
	
}]);
app.controller('controlExpense',['arrayFunc','$scope','$rootScope', function(arrayFunc,$scope,$rootScope){


		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				arrayFunc.removeTransaction($index)
				.then(function(response){
					$scope.transaction=arrayFunc.transactions;
					$scope.incomeTotal = arrayFunc.incomeTotal;
					$scope.expTotal = arrayFunc.expTotal;
					$rootScope.init();
				});
			}
		}
		$scope.edit=function(index){
			
			for(var i=0;i<arrayFunc.transactions.length;i++)
			{
				if(arrayFunc.transactions[i]["transactionID"]==parseInt(index)){
					
					$rootScope.edit1=1;
					$rootScope.tranId=arrayFunc.transactions[i]["transactionID"];
					$rootScope.payer=arrayFunc.transactions[i]["payer"];
					$rootScope.payee=arrayFunc.transactions[i]["payee"];
					$rootScope.Cat=arrayFunc.transactions[i]["Category"];
					$rootScope.subCat=arrayFunc.transactions[i]["subCategory"];
					$rootScope.amt=arrayFunc.transactions[i]["Amount"];
					$rootScope.mop=arrayFunc.transactions[i]["mop"];
					$rootScope.date=new Date(arrayFunc.transactions[i]["date"]);
					$rootScope.notes=arrayFunc.transactions[i]["Notes"];
					$rootScope.type=arrayFunc.transactions[i]["type"];
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
						arrayFunc.updateTransactionSer($scope.currentObj)
						.then(function(response){
							$scope.transaction=arrayFunc.transactions;
							$scope.incomeTotal = arrayFunc.incomeTotal;
							$scope.expTotal = arrayFunc.expTotal;
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
app.controller('controlIncome',['arrayFunc','$scope','$rootScope', function(arrayFunc,$scope,$rootScope){

		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				arrayFunc.removeTransaction($index)
				.then(function(response){
					$scope.transaction=arrayFunc.transactions;
					$scope.incomeTotal = arrayFunc.incomeTotal;
					$scope.expTotal = arrayFunc.expTotal;
					$rootScope.init();
				});
			}
		}
		$scope.edit=function(index){
			
			for(var i=0;i<$scope.transaction.length;i++)
			{
				if($scope.transaction[i]["transactionID"]==parseInt(index)){
					
					$rootScope.edit1=1;
					$rootScope.tranId=arrayFunc.transactions[i]["transactionID"];
					$rootScope.payer=arrayFunc.transactions[i]["payer"];
					$rootScope.payee=arrayFunc.transactions[i]["payee"];
					$rootScope.Cat=arrayFunc.transactions[i]["Category"];
					$rootScope.subCat=arrayFunc.transactions[i]["subCategory"];
					$rootScope.amt=arrayFunc.transactions[i]["Amount"];
					$rootScope.mop=arrayFunc.transactions[i]["mop"];
					$rootScope.date=new Date(arrayFunc.transactions[i]["date"]);
					$rootScope.notes=arrayFunc.transactions[i]["Notes"];
					$rootScope.type=arrayFunc.transactions[i]["type"];
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
						arrayFunc.updateTransactionSer($scope.currentObj)
						.then(function(response){
							$scope.transaction=arrayFunc.transactions;
							$scope.incomeTotal = arrayFunc.incomeTotal;
							$scope.expTotal = arrayFunc.expTotal;
							
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
app.controller('controlReports',['arrayFunc','$scope','$rootScope', function(arrayFunc,$scope,$rootScope){
		
}]);