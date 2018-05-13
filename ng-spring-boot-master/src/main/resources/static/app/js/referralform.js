var referralformindex = angular.module('referralformindex', []);
var urlBase = "/sevenplus";

referralformindex.controller('referralFormController',
	function ($scope, $http, $window) {
	
	$scope.referralDetails=[];
	
	$scope.referralDetails = function saveReferralDetails(referralDetails) {
		alert(referralDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/saveReferralDetails', JSON.stringify(referralDetails),config)
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
	

	$scope.bmiDetails = function loadBmiChartDetails(clientDetails) {
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