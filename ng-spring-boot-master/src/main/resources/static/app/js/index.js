var firstApplication= angular
            .module('firstApplication', ['ngMaterial', 'ngMessages','ImageCropper','ngStorage','material.svgAssetsCache']);
			
firstApplication.directive('chart', function () {
    return {
        restrict:'E',
        template:'<div></div>',
        transclude:true,
        replace:true,
        scope: '=',
        link:function (scope, element, attrs) {
            console.log('oo',attrs,scope[attrs.formatter])
            var opt = {
                chart:{
                    renderTo:element[0],
                    type:'line',
                    marginRight:130,
                    marginBottom:40
                },
                title:{
                    text:attrs.title,
                    x:-20 //center
                },
                subtitle:{
                    text:attrs.subtitle,
                    x:-20
                },
                xAxis:{
                    //categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    tickInterval:1,
                    title:{
                        text:attrs.xname
                    }
                },
                plotOptions:{
                    lineWidth:0.5
                },
                yAxis:{
                    title:{
                        text:attrs.yname
                    },
                    tickInterval:(attrs.yinterval)?new Number(attrs.yinterval):null,
                    max:attrs.ymax,
                    min: attrs.ymin
//                    ,
//                    plotLines:[
//                        {
//                            value:0,
//                            width:1,
//                            color:'#808080'
//                        }
//                    ]
                },
                tooltip:{
                    formatter:scope[attrs.formatter]||function () {
                        return '<b>' + this.y + '</b>'
                    }
                },
                legend:{
                    layout:'vertical',
                    align:'right',
                    verticalAlign:'top',
                    x:-10,
                    y:100,
                    borderWidth:0
                },
                series:[
                    {
                        name:'Tokyo',
                        data:[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }
                ]
            }


            //Update when charts data changes
            scope.$watch(function (scope) {
                return JSON.stringify({
                    xAxis:{
                        categories:scope[attrs.xdata]
                        },
                    series:scope[attrs.ydata]
                });
            }, function (news) {
                console.log('ola')
//                if (!attrs) return;
                news = JSON.parse(news)
                if (!news.series)return;
                angular.extend(opt,news)
                console.log('opt.xAxis.title.text',opt)
                



                var chart = new Highcharts.Chart(opt);
            });
        }
    }

});
		
		firstApplication.directive("fileread", [function () {
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
		
		
		
		
		firstApplication.controller('tabController', 
         function  ($scope,$window,$mdDialog,$localStorage) {
			
			var data = {"xData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],"yData":[{
                "name": "Fat",
                "data": [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                "name": "Visceral",
                "data": [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                "name": "Weight",
                "data": [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            },{
                "name": "Age",
                "data": [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            },{
                "name": "Body Age",
                "data": [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                "name": "Height",
                "data": [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]};
            
            $scope.lineChartYData=data.yData
            $scope.lineChartXData=data.xData
			
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
			$scope.saveClientDetails = function (clientDetails) {
				alert(clientDetails);
				
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

			//save new client/group of client details
			$scope.clientDetails = function saveClientDetails(clientDetails) {
				alert('@ saveclientdetails=');
				
				
		   	};

        	 $scope.steps2Model = [];
			 
			 $scope.facilityList = [
				{ id: 'G', name: 'Gym' },
				{ id: 'Y', name: 'Yoga' },
				{ id: 'ZK', name: 'Zumba-Kids' },
				{ id: 'DK', name: 'Dance-Kids' },
				{ id: 'DA', name: 'Dance-Adults' },
				{ id: 'ZA', name: 'Zumba-Adults' },
				{ id: 'K', name: 'Karate' }
			  ];
			  
			 $scope.packageList= [
				{ id: 'A', name: 'Annual' },
				{ id: 'HY', name: 'Half-Yearly' },
				{ id: 'Q', name: 'Quarterly' },
				{ id: 'M', name: 'Monthly' },
				{ id: 'S', name: 'Session' }
			  ];
        	 
        	 $scope.image2Upload = function(element) {
        	    	alert(element.id);
        	      var reader = new FileReader();
        	        reader.onload = $scope.imageIs2Loaded;
        	        reader.readAsDataURL(element.files[0]);
        	    }
        	    
        	    $scope.imageIs2Loaded = function(e){
					alert(e.target);
        	        $scope.$apply(function() {
        	            $scope.steps2Model.push(e.target.result);
        	        });
        	    }
        	    
			$scope.fileChanged = function(e) {			
		
				var files = e.target.files;
			
				var fileReader = new FileReader();
				fileReader.readAsDataURL(files[0]);		
				
				fileReader.onload = function(e) {
					$scope.imgSrc = this.result;
					$scope.$apply();
				};
				
			};		
		   
			$scope.clear = function() {
				 $scope.imageCropStep = 1;
				 delete $scope.imgSrc;
				 delete $scope.result;
				 delete $scope.resultBlob;
			};

			$scope.fitnessTileFlag = true;
			$scope.loginTileFlag = false;
			$scope.timesheetTileFlag = false;
			
			$scope.showFitnessTile = function() {
				$scope.fitnessTileFlag = true;
				$scope.loginTileFlag = false;
				$scope.timesheetTileFlag = false;
			};
			
			$scope.showTimeSheetTile = function() {
				$scope.fitnessTileFlag = false;
				$scope.loginTileFlag = false;
				$scope.timesheetTileFlag=true;
			};
			
			$scope.showLoginTile= function() {
				$scope.fitnessTileFlag = false;
				$scope.loginTileFlag = true;
				$scope.timesheetTileFlag = false;
			};
			
			
            $scope.data = {
               selectedIndex: 0,
               facilityFormLockFlag:  false,
			   paymentFormLockFlag: false,
			   bmiFormLockFlag: false,
			   reportFormLockFlag: false,
               secondLabel:   "2",
               bottom:        false
            };
             
            $scope.next = function() {
               $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
            };
             
            $scope.previous = function() {
               $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
            };
			
			
			$scope.clientDetails=[{}];
			$scope.facilityDetails = [];
			$scope.paymentDetails = [];
			$scope.referralDetails=[];
			$scope.bmiDetails=[];
			
			$scope.fillReferralForm = function(clientDetails) {
				$scope.referralDetails = [];
				for (var i=0;i<clientDetails.length;i++)
				{
					/*if (facilityDetails[i].isAbsent === true) 
					{*/
						$scope.referralDetails.push({ 
							'referralDetail.subscriptionFee': '100', 
							'referralDetail.discount': '1',
							'referralDetail.modeOfPayment': 'CS',
							'referralDetail.totAmount': '1000', 
							'referralDetail.balanceAmt': '1',
							'referralDetail.amtPayable': '1',
							'referralDetail.discAmount': '1',
							'referralDetail.amtReceived': '1'
						});
					//}
				} 
	            $scope.PD = {};
				
			};
			
			$scope.fillPaymentForm = function(facilityDetails) {
				$scope.paymentDetails = [];
				for (var i=0;i<facilityDetails.length;i++)
				{
					/*if (facilityDetails[i].isAbsent === true) 
					{*/
						$scope.paymentDetails.push({ 
							'paymentDetail.subscriptionFee': '100', 
							'paymentDetail.regFee': '100', 
							'paymentDetail.discount': '1',
							'paymentDetail.modeOfPayment': 'CS',
							'paymentDetail.totAmount': '1000', 
							'paymentDetail.flag': 'true'
						});
					//}
				} 
	            $scope.PD = {};
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
			
			$scope.addClient= function(clientDetails){
				
				$scope.clientDetails.push({ 
	                'clientDetail.memid': clientDetails.memid, 
	                'clientDetail.joiningdate': clientDetails.joiningdate,
					'clientDetail.firstname': clientDetails.firstname, 
	                'clientDetail.middlename': clientDetails.middlename,
	                'clientDetail.lastname': clientDetails.lastname,
					'clientDetail.email': clientDetails.email, 
	                'clientDetail.dob': clientDetails.dob,
	                'clientDetail.weddingdate': clientDetails.weddingdate,
					'clientDetail.address': clientDetails.address,
					'clientDetail.homePhone': clientDetails.homePhone,
					'clientDetail.imgPhoto': clientDetails.imgPhoto
	            });
	            $scope.PD = {};
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

			$scope.OpenPopupWindow = function (clientDetail,index) {
				alert('hi');
				alert(index);
				var photoElem = angular.element( document.querySelector( 'photo_id_'+index ) );
				alert(photoElem);
				
				$localStorage.FirstName = clientDetail.firstname;
				// center the popup window
				var left = screen.width/2 - 200
					, top = screen.height/2 - 250
					, popup = $window.open("app/view/crop-popup-window.html", 'popup', "top=" + top + ",left=" + left + ",width=400,height=500")
					, interval = 1000;
				
				photoElem.value=$localStorage.result;
				alert(photoElem.value);
				// create an ever increasing interval to check a certain global value getting assigned in the popup
				var i = $interval(function(){
				  interval += 500;
				  try {
					
					// value is the user_id returned from paypal
					if (popup.value){
					  $interval.cancel(i);
					  popup.close();
					}
				  } catch(e){
					console.error(e);
				  }
				}, interval);
			};
			$scope.status = '  ';
			  $scope.customFullscreen = false;
			  
			  function DialogController($scope, $mdDialog) {
				  
				    $scope.hide = function() {
				      $mdDialog.hide();
				    };

				    $scope.cancel = function() {
				      $mdDialog.cancel();
				    };

				    $scope.answer = function(answer) {
				      $mdDialog.hide(answer);
				    };
				  }
				  $scope.showPrerenderedDialog = function(ev) {
					    $mdDialog.show({
					      contentElement: '#myDialog',
					      parent: angular.element(document.body),
					      targetEvent: ev,
					      clickOutsideToClose: true
					    });
					  };
			$scope.showAdvanced = function(ev) {
				$mdDialog.show({
				  controller: DialogController,
				  templateUrl: 'app/view/dialog1.tmpl.html',
				  parent: angular.element(document.body),
				  scope: $scope,
				  targetEvent: ev,
				  clickOutsideToClose:true,
				  fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
				})
				.then(function(answer) {
				  $scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				  $scope.status = 'You cancelled the dialog.';
				});
			};
			
			
         }	  );