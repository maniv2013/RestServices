var enquiryformindex = angular.module('firstApplication', []);
var urlBase = "/sevenplus";


/*
enquiryformindex.directive("fileread", [function () {
	return {
		scope: {
			fileread: "="
			},
			link: function (scope, element, attributes) {
				element.bind("change", function (changeEvent) {
					var reader = new FileReader();
					reader.onload = function (loadEvent) {
						scope.$apply(function () {
							scope.fileread = loadEvent.target.result;
						});
					}
					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}
	}]);
*/

enquiryformindex.controller('enquiryFormController',
	function ($scope, $http, $window) {
	
		
	$scope.clientDetails=[{}];
	
	$scope.addClient= function(clientDetails){
		$scope.clientDetails.push({ 
	        'clientDetail.memid': clientDetails.memid, 
	        'clientDetail.joiningdate': clientDetails.joiningdate,
	        'clientDetail.middlename': clientDetails.middlename,
	        'clientDetail.lastname': clientDetails.lastname,
			'clientDetail.email': clientDetails.email, 
			'clientDetail.firstname': clientDetails.firstname, 
	        'clientDetail.dob': clientDetails.dob,
	        'clientDetail.weddingdate': clientDetails.weddingdate,
			'clientDetail.address': clientDetails.address,
			'clientDetail.homePhone': clientDetails.homePhone,
			'clientDetail.imgPhoto': clientDetails.imgPhoto
	        });
	    $scope.PD = {};
	};
	
	$scope.removeClient = function(){
	    var newDataList=[];
	    $scope.selectedAllClient = false;
	    angular.forEach($scope.clientDetails, function(selected){
	        if(!selected.selected){
	            newDataList.push(selected);
	        }
	    }); 
	    $scope.clientDetails = newDataList;
	};
	
	$scope.checkAllClient = function () {
	    if (!$scope.selectedAllClient) {
	        $scope.selectedAllClient = true;
	    } else {
	        $scope.selectedAllClient = false;
	    }
	    angular.forEach($scope.clientDetails, function (clientDetails) {
	        clientDetails.selected = $scope.selectedAllClient;
			});
	};
	
	//save new client/group of client details
	$scope.clientDetails = function saveClientDetails(clientDetails) {
		alert('@ saveclientdetails=');
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/saveClientDetails', JSON.stringify(clientDetails),config)
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
	
	// show client details click action
	$scope.showJobDetails = function searchClientByMobile(clientDetail) {
		alert(clientDetail.mobile);
		if(!clientDetail.mobile == ""){
			
			$http.get(urlBase+"/findbymobile/"+clientDetail.mobile+'/enquiryform/').
				success(function(data) {
					$scope.clientDetails = data;
					$scope.data.facilityFormLockFlag = false;
				});
			
		}
   	};
   	
   	
   	/*
   	$scope.$watch('clientDetail.dob', function searchByDobDate(clientDetail) {
		
		if(clientDetail.dob == null){
			return;
		}
		
		alert(clientDetail.dob);
		if(!clientDetail.dob == ""){
			
			$http.get(urlBase+"/findbydob/"+clientDetail.dob+'/enquiryform/').
				success(function(data) {
					$scope.clientDetails = data;
					$scope.data.facilityFormLockFlag = false;
				});
			
		}
	});*/
	
	//load next facility form details and fill
	$scope.facilityDetails = function loadFacilityDetails(clientDetails) {
		alert(clientDetails);
		
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		
		$http.post(urlBase+'/loadFacilityDetails', JSON.stringify(clientDetails),config)
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


