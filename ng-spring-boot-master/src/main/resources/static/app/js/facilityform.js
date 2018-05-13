var facilityformindex = angular.module('facilityformindex', []);
var urlBase = "/sevenplus";

facilityformindex.controller('facilityFormController',
	function ($scope, $http, $window) {
	
	$scope.facilityDetails = [];
	
	$scope.addNew = function(facilityDetails){
	
	    $scope.facilityDetails.push({ 
	        'facilityDetail.selfacility': facilityDetails.selfacility, 
	        'facilityDetail.selpackage': facilityDetails.selpackage,
	        'facilityDetail.selgoal': facilityDetails.selgoal,
			'facilityDetail.workouttimefrom': facilityDetails.workouttimefrom, 
	        'facilityDetail.workouttimeto': facilityDetails.workouttimeto,
	        'facilityDetail.startdate': facilityDetails.startdate,
	    });
	    $scope.PD = {};
	};
	
	$scope.remove = function(){
	    var newDataList=[];
	    $scope.selectedAll = false;
	    angular.forEach($scope.facilityDetails, function(selected){
	        if(!selected.selected){
	            newDataList.push(selected);
	        }
	    }); 
	    $scope.facilityDetails = newDataList;
	};
	
	$scope.checkAll = function () {
	    if (!$scope.selectedAll) {
	        $scope.selectedAll = true;
	    } else {
	        $scope.selectedAll = false;
	    }
	    angular.forEach($scope.facilityDetails, function (facilityDetails) {
	        facilityDetails.selected = $scope.selectedAll;
	    });
	};    
	
	$scope.facilityDetails = function saveFacilityDetails(facilityDetails) {
		alert(facilityDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/saveFacilityDetails', JSON.stringify(facilityDetails),config)
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

	$scope.paymentDetails = function loadPaymentDetails(clientDetails) {
		alert(clientDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/loadPaymentDetails', JSON.stringify(clientDetails),config)
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