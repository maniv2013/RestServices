var paymentformindex = angular.module('paymentformindex', []);
var urlBase = "/sevenplus";

paymentformindex.controller('paymentFormController',
	function ($scope, $http, $window) {
	
	$scope.paymentDetails = [];
	
	$scope.paymentDetails = function savePaymentDetails(paymentDetails) {
		alert(paymentDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/savePaymentDetails', JSON.stringify(paymentDetails),config)
		.then(
			function successCallback (response) {
				$scope.showSuccessCommentMessage= true;
				$scope.submitStatus=1;
				$scope.alert = data;
				$scope.showSuccessMessage= true;
			}, 
			function errorCallback(response) {
				$scope.submitStatus=0;
				console.log(response);
			}
		);
   	};
	

	$scope.referralDetails = function loadReferralDetails(clientDetails) {
		alert(clientDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/loadReferralDetails', JSON.stringify(clientDetails),config)
		.then(
			function successCallback (response) {
				$scope.showSuccessCommentMessage= true;
				$scope.submitStatus=1;
				$scope.alert = data;
				$scope.showSuccessMessage= true;
			}, 
			function errorCallback(response) {
				$scope.submitStatus=0;
				console.log(response);
			}
		);
   	};
   	
   	
});