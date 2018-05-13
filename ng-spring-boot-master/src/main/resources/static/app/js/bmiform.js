var bmiformindex = angular.module('bmiformindex', []);
var urlBase = "/sevenplus";

bmiformindex.controller('bmiFormController',
	function ($scope, $http, $window) {
	
	$scope.bmiDetails=[];
	
	$scope.bmiDetails = function saveBmiChartDetails(referralDetails) {
		alert(bmiDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/saveBmiChartDetails', JSON.stringify(bmiDetails),config)
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
	

	$scope.addBmiInfo = function(bmiDetails){
		$scope.bmiDetails.push({ 
					'bmiDetail.id': '1', 
					'bmiDetail.memid': bmiDetails.memid, 
					'bmiDetail.age': bmiDetails.age,
					'bmiDetail.height': bmiDetails.height,
					'bmiDetail.fat': bmiDetails.fat, 
					'bmiDetail.viscularFat': bmiDetails.viscularFat
		});$scope.PD = {};
	};
	
	
	
	$scope.removeBmiInfo = function(){
	    var newDataList=[];
	    $scope.selectedAllBmiInfo = false;
	    angular.forEach($scope.bmiDetails, function(selected){
	        if(!selected.selected){
	            newDataList.push(selected);
	        }
	    }); 
	    $scope.bmiDetails = newDataList;
	};
	
	
	
	$scope.checkAllBmiInfo = function () {
	    if (!$scope.selectedAllBmiInfo) {
	        $scope.selectedAllBmiInfo = true;
	    } else {
	        $scope.selectedAllBmiInfo = false;
	    }
	    angular.forEach($scope.bmiDetails, function (bmiDetails) {
	        bmiDetails.selected = $scope.selectedAllBmiInfo;
	    });
	};
   	
   	
});