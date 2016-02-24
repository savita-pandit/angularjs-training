var app=angular.module("expenseApp");
app.directive('notificationDirective',['recursiveService','$rootScope','trasactionService',function(recursiveService,$rootScope,trasactionService){
	return {
		templateUrl:'../Template/notifyDir.html',
		controller:function($scope,$rootScope,recursiveService,trasactionService){
			$scope.addRecursive=function($index){
				var index={'index':$index};
				recursiveService.addRecursiveTransactions(index).then(function(response){
					recursiveService.getRecursiveTransactions().then(function(res){
						$rootScope.recursiveTransaction=JSON.parse(JSON.stringify(res));
					})
				});
				
				trasactionService.getTransactionData().then(function(response){
					$rootScope.transaction=trasactionService.transactions;
					$rootScope.incomeTotal = trasactionService.incomeTotal;
					$rootScope.expTotal = trasactionService.expTotal;
				});
			}
			$scope.deleteRecursive=function($index){
				var index={'index':$index};
				recursiveService.deleteRecursiveTransactions(index).then(function(response){
				$rootScope.recursiveTransaction=JSON.parse(JSON.stringify(response));
				});
			}
		},
		link:function($scope, $element, $attrs){
		}
	}
}])