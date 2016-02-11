
var app=angular.module("expenseApp",['ui.directives','ui.filters','ngRoute']);
app.controller('control',['arrayFunc','$scope','$rootScope', function(arrayFunc,$scope,$rootScope){
		$rootScope.init=function(){
            arrayFunc.getTransactionData().then(function(response){
			$rootScope.transaction=JSON.parse(JSON.stringify(response));
			
			$rootScope.incomeTotal = arrayFunc.sum($rootScope.transaction,'Income');
			$rootScope.expTotal = arrayFunc.sum($rootScope.transaction,'Expense');})

			arrayFunc.getSubCategory().then(function(response){
			$rootScope.SubCategory1=JSON.parse(JSON.stringify(response));
			
			});
						
		}
		$rootScope.init();
		$scope.evaluate=function(){
			$scope.currentObj={transactionID: $scope.transaction.length+1,payer: $scope.payer,payee: $scope.payee,Category: $scope.Cat,subCategory: $scope.subCat,Amount: $scope.amt,mop:$scope.mop,date:$scope.date,Notes:$scope.notes,type:$scope.type};
			arrayFunc.addTransaction($scope.currentObj)
				.then(function(response){
					$rootScope.transaction=JSON.parse(JSON.stringify(response));
					$rootScope.incomeTotal = arrayFunc.sum($rootScope.transaction,'Income');
					$rootScope.expTotal = arrayFunc.sum($rootScope.transaction,'Expense');
				});
		}
	$scope.reset=function(){
		addForm.reset();
	}
	
}]);
app.controller('controlExpense',['arrayFunc','$scope','$rootScope', function(arrayFunc,$scope,$rootScope){

$scope.$on('edit',function(event, mass){
	if(mass["type"]=="Expense"){
		$rootScope.edit1=1;
		$rootScope.tranId=mass["transactionID"];
		$rootScope.payer=mass["payer"];
		$rootScope.payee=mass["payee"];
		$rootScope.Cat=mass["Category"];
		$rootScope.subCat=mass["subCategory"];
		$rootScope.amt=mass["Amount"];
		$rootScope.mop=mass["mop"];
		$rootScope.date=new Date(mass["date"]);
		$rootScope.notes=mass["Notes"];
		$rootScope.type=mass["type"];
		$rootScope.type.disabled=true;
	}
});


		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				arrayFunc.removeTransaction($index)
				.then(function(response){
					$scope.transaction=JSON.parse(JSON.stringify(response));
					$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
					$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
					$rootScope.init();
				});
			}
		}
		$scope.edit=function(index){
			
			for(var i=0;i<$scope.transaction.length;i++)
			{
				if($scope.transaction[i]["transactionID"]==parseInt(index)){
					
					$rootScope.$broadcast('edit',$scope.transaction[i]);
					
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
							$scope.transaction=JSON.parse(JSON.stringify(response));
							
							if($scope.currentObj["type"]=="Income")
							{
								$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
								
							}
							else if($scope.currentObj["type"]=="Expense"){
								$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
								
							}
							
							
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

		$scope.$on('edit',function(event, mass){
			if(mass["type"]=="Income"){
				$rootScope.edit1=1;
				$rootScope.tranId=mass["transactionID"];
				$rootScope.payer=mass["payer"];
				$rootScope.payee=mass["payee"];
				$rootScope.Cat=mass["Category"];
				$rootScope.subCat=mass["subCategory"];
				$rootScope.amt=mass["Amount"];
				$rootScope.mop=mass["mop"];
				$rootScope.date=new Date(mass["date"]);
				$rootScope.notes=mass["Notes"];
				$rootScope.type=mass["type"];
				$rootScope.type.disabled=true;
			}
		});

		$scope.remove=function($index){
			var r = confirm("Are you sure you want to delete this transaction?");
			if(r==true){
				arrayFunc.removeTransaction($index)
				.then(function(response){
					$scope.transaction=JSON.parse(JSON.stringify(response));
					$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
					$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
					$rootScope.init();
				});
			}
		}
		$scope.edit=function(index){
			
			for(var i=0;i<$scope.transaction.length;i++)
			{
				if($scope.transaction[i]["transactionID"]==parseInt(index)){
					
					$rootScope.$broadcast('edit',$scope.transaction[i]);
					
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
							$scope.transaction=JSON.parse(JSON.stringify(response));
						
							if($scope.currentObj["type"]=="Income")
							{
								$scope.incomeTotal = arrayFunc.sum($scope.transaction,'Income');
								
							}
							else if($scope.currentObj["type"]=="Expense"){
								$scope.expTotal = arrayFunc.sum($scope.transaction,'Expense');
								
							}
							
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