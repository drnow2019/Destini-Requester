angular.module('app.controllers', [])



   .controller('menuCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$ionicPopover) {
	 $ionicSideMenuDelegate.canDragContent(false);
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {

                              console.debug('[StoryController] $ionicView.beforeEnter');
                              viewData.enableBack = true;



                  $http({
                                  method: 'post',
                                  url: 'https://destini.io//ws_requester/notification/data',
                                  data: {
                                    'requester_id': localStorage['rId']    
                              },
                              headers: {
                               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                              }
                              }).success(function (response, status, header, config, message) {
                                 // $ionicLoading.hide();
                                  if (response) {
                                     $scope.count = response.count;
                                     $scope.details= response.Notification_data;
                                     localStorage.setItem('count', response.count);
                                   }
                              console.log('count'+localStorage['count']);
                              }).error(function (data, status, header, config, message) {
                                   // $ionicLoading.hide();
                              });
     });


	$scope.logOut = function(){
                    localStorage.clear();
                    //$ionicHistory.clearCache();
                    //$ionicHistory.clearHistory();
                     $state.go("loginAsRequester");
                };


     $scope.notification= function(){
     	$state.go("notification");

                  
                };           


})


   .controller('settingCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
   function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$ionicPopover){
     $scope.$on('$ionicView.beforeEnter', function(event, viewData) {

               $scope.email=localStorage['rEmail'];
               console.log($scope.email);
               viewData.enableBack = true;
               viewData.hideMenu = true;
               });
                $scope.logOut = function(){
                    localStorage.clear();
                    //$ionicHistory.clearCache();
                    //$ionicHistory.clearHistory();
                     $state.go("loginAsRequester");
                };
                 $scope.back = function(){

                     $state.go("myDashboard");
                 }
                 $scope.profile = function(){
                  
                     $state.go("requesterProfile");
                     
                 }
                 $scope.editProfile = function(){
                  
                     $state.go("requesterEditProfile");
                     
                 }
    
    
  })


  .controller('loginAsRequesterCtrl',function ($scope, $state,$ionicPush,$http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$ionicPopover){
                        console.log(localStorage['auth']);
                        if(localStorage['auth']=="true"){
                        console.log('login true hai');
                        $state.go('myDashboard');
                        }
                        console.log(localStorage['auth']);
                         $ionicSideMenuDelegate.canDragContent(false);
            $scope.login = function () {
                        $ionicLoading.show({
                             template: 'Redirecting...'
                        });
                            $http({
                                  method: 'POST',
                                  url: 'https://destini.io/ws_requester/login/activate',
                                  data: {
                                    'email': $scope.user.email,
                                    'password': $scope.user.password
                                  },
                                  headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                            }).success(function (data, status, header, config, message) {
                                 $ionicLoading.hide();
                                    if (data.response) {
                                                    localStorage.setItem('rId', data.result.id);
                                                    console.log('requesterid' + localStorage['rId']);
                                                    $scope.id= localStorage['rId'];
                                                    localStorage.setItem('auth', "true");
                                                    localStorage.setItem('rEmail', $scope.user.email);
                                                    console.log('requesterid' + localStorage['rEmail']);
                                                    logsuc();
                                                    $ionicPush.register().then(function(t) {
                                                                  return $ionicPush.saveToken(t);
                                                                }).then(function(t) {
                                                                  console.log('Token saved:', t.token);
                                                         });

                                                  //localStorage.setItem('status', data.result.status);
                                            } else {
                                                   logfail();
                                                    }

                                }).error(function (data, status, header, config, message) {
                                                   $ionicLoading.hide();
                                                   });

                                

             }

          logsuc = function () {
                                  var alertPopup = $ionicPopup.alert({
                                      title: 'Alert',
                                      template: 'Login Successfully'
                                  });
                                  alertPopup.then(function (res) {
                                        console.log('Login Successfully');
                                  });
                                  console.log('Login successfull');
                                  $state.go('myDashboard');
                      }
          logfail = function () {
                                  var alertPopup = $ionicPopup.alert({
                                      title: 'Alert',
                                      template: 'Either Email or Password is incorrect!'
                                  });
                                  alertPopup.then(function (res) {
                                          console.log(res);
                                          console.log('User not login');
                                  });
                          }
           $scope.fpass = function () {
                              $state.go('forgetPassword');
                   }


//            $scope.fbLogin = function () {
//             console.log('fblogin function');
//     ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
//         function (response) {
//             if (response.status === 'connected') {
//                 console.log('Facebook login succeeded');
//                 $scope.closeLogin();
//                 $state.go('myDashboard');
//             } else {
//                 alert('Facebook login failed');
//             }
//         });
// };        

    })
   

   /////////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////////////
   
    .controller('requesterSignUpCtrl', function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$ionicPopover){
            /*$ionicPlatform.ready(function() {
                  $scope.device_id=$cordovaDevice.getUUID();
                  $scope.device_type=$cordovaDevice.getPlatform();   
              });

              console.log("Device Id"+$scope.device_id);*/
              
                              
                            
              
              $ionicSideMenuDelegate.canDragContent(false);
              $scope.back = function(){

                     $state.go("loginAsRequester");
                   }
              $scope.register=function(){

                                    $ionicLoading.show({
                                       template: 'Please Wait...'
                                    });

                                    $http({
                                            method: 'POST',
                                            url: 'https://destini.io/ws_requester/signup', 
                                            data: 
                                            {  
                                               'first_name':$scope.firstName,
                                                'last_name':$scope.lastName,
                                                'organisation_name':$scope.organization,   
                                                'email':$scope.email,
                                                'contact':$scope.phone, 
                                                'password':$scope.password,
                                                //'device_id':   '74673',
                                                // 'device_type': 'android'*/
                                            }, 
                                            headers: 
                                            {
                                              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                            }
                                    }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data.response){
                                                $scope.firstName='';
                                                $scope.lastName='';
                                                $scope.organization='';   
                                                $scope.email='';
                                                $scope.phone='';
                                                $scope.password='';
                                            regsuc();
                                            $state.go("loginAsRequester");
                                          }else{
                                            regfail(); 
                                          }
                                  }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    regfail();
                                    });
                   }

                    regsuc = function() {
                            var alertPopup = $ionicPopup.alert({
                            title: 'Congratulations !',
                            template: 'Thank you for registering with us. Please check your email for the activation link, and activate your account. Check your junk folders, just incase you havent received anything. Please write to care@destini.io for any help'
                            });
                            alertPopup.then(function(res) {
                            console.log('User Registered');
                            });
                    };
                    regfail = function() {
                           var alertPopup = $ionicPopup.alert({
                           title: 'Alert',
                           template: 'You are registered before with this Email-Id!'
                           });
                           alertPopup.then(function(res) {
                            $state.reload('requesterSignUp');
                           console.log('User Not Registered');
                           });
            };
        
    })

 //////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////



    .controller('forgetPasswordCtrl', function ($scope, $state, $http, $ionicPopup, $ionicLoading,$ionicPopover, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
         $scope.$on('$ionicView.beforeEnter', function(event, viewData) {

                              console.debug('[StoryController] $ionicView.beforeEnter');

                               $scope.email=null;
                              viewData.enableBack =false;
                            });
        $ionicSideMenuDelegate.canDragContent(false);
       $scope.back = function(){

                     $state.go("loginAsRequester");
                   }


        $scope.passChange=function(){

                                    $ionicLoading.show({
                                        template: 'Please Wait...'
                                    });

                                    $http({
                                        method: 'POST',
                                        url: 'https://destini.io/ws_requester/forgetPassword', 
                                        data: 
                                        {  
                                               
                                            'email':$scope.email 
                                            
                                            //'device_id':   '74673',
                                            // 'device_type': 'android'*/
                                        }, 
                                        headers: 
                                        {
                                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                         
                                      $ionicLoading.hide();
                                      if(data.response){
                                          $scope.email= '';
                                        regsuc();
                                        
                                      }else{
                                        regfail(); 
                                      }
                                  }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });
                   }

                    regsuc = function() {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Alert',
                                        template: 'Password reset link send to your register mail id .Please check your email. Check your junk folders, just incase you haven’t received anything. Please write to support@destini.io for any help.'
                                    });
                                        alertPopup.then(function(res) {
                                          $state.go("loginAsRequester");
                                        console.log('password link send');
                                    });
                    };
                   regfail = function() {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Alert',
                                       template: 'You are not registered before with this Email-Id!'
                                   });
                                       alertPopup.then(function(res) {
                                       console.log('password link not send  Not Registered');
                                   });
                    };

    }) 


    .controller('myDashboardCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);

       $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
                                if(localStorage['auth']!="true"){
                                  console.log("ladka");
                                  $state.go('loginAsRequester');
                                 
                                }

                              console.debug('[StoryController] $ionicView.beforeEnter');


                              viewData.enableBack = false;
                               });

                           $scope.checklimit = function () {
                           	          

                           	           $ionicLoading.show({
                                        template: 'Please Wait...'
                                       });

                                    $http({
                                        method: 'POST',
                                        url: 'https://destini.io/ws_requester/limit/session/creation', 
                                        data: 
                                        {  
                                               
                                            'requester_id':localStorage['rId'] 
                                            
                                            //'device_id':   '74673',
                                            // 'device_type': 'android'*/
                                        }, 
                                        headers: 
                                        {
                                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                         
                                      $ionicLoading.hide();
                                      console.log('data'+data.message)
                                      if(data.message=='allow to create session'){
                                          $state.go("createNewAudition");
                                          // var confirmPopup = $ionicPopup.confirm({
                                          //       title: 'Confirmation',
                                          //       template:data.message+'.please subcribe again.if you want to subcribe press ok! otherwise cancel', 
                                          //   });
                                          //       confirmPopup.then(function(res) {
                                          //         window.open('https://plus.google.com/+NicRaboy', '_system', 'location=yes'); 
                                          //         return false 
                                            
                                          //       console.log('limit check');http://destini.io/
                                          //   }); 
                                        
                                      }
                                      else if(data.message=='please choose Plans on our website before proceeding further')
                                      {
                                       var confirmPopup = $ionicPopup.confirm({
                                                title: 'Confirmation',
                                                template:data.message+'.if you want to Proceed press ok! otherwise cancel', 
                                            });
                                                confirmPopup.then(function(res) {
                                                if(res){
                                                  window.open('https://destini.io/requester/choose/plan', '_system', 'location=yes'); 
                                                  return false
                                            }
                                                console.log('limit check');
                                            });
                                      }
                                      else if(data.message=='Please upgrade plan on our website to create more sessions'){
                                              var confirmPopup = $ionicPopup.confirm({
                                                title: 'Confirmation',
                                                template:'Your free plan limit completed '+data.message+'.if you want to subcribe press ok! otherwise cancel', 
                                            });
                                                confirmPopup.then(function(res) {
                                                  if(res){
                                                   window.open('https://destini.io/requester/subscription/payment', '_system', 'location=yes'); 
                                                  return false
                                            
                                               }
                                            });
                                      }
                                      else if(data.message=='Your Subscription period has expired, please upgrade Plan on our website'){
                                              var confirmPopup = $ionicPopup.confirm({
                                                title: 'Confirmation',
                                                template:data.message+'.if you want to proceed press ok! otherwise cancel', 
                                            });
                                                confirmPopup.then(function(res) {
                                                  if(res){
                                                   window.open('https://destini.io/requester/subscription/payment', '_system', 'location=yes'); 
                                                  return false
                                            
                                               }
                                            });
                                      }
                                      else{
                                             var confirmPopup = $ionicPopup.confirm({
                                                title: 'Confirmation',
                                                template: 'Network error please try after sometime.',
                                            });
                                                confirmPopup.then(function(res) {
                                                  if(res){
                                                 $state.go("myDashboard");
                                                }
                                            });
                                      }
                                  }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                     var confirmPopup = $ionicPopup.confirm({
                                                title: 'Confirmation',
                                                template: 'Network error please try after sometime.',
                                            });
                                                confirmPopup.then(function(res) {
                                              
                                                $state.go("myDashboard");
                                            });
                                    });
                   }

                   
                    
                           
             
                          $scope.open = function () {
                    
                            $state.go('openAuditions');
                           }

                           $scope.invite = function () {
                    
                            $state.go('inviteOnlyAuditions');
                           }
                           $scope.closed = function () {
                    
                            $state.go('closedAuditions');
                           }
                           $scope.drafted = function () {
                    
                            $state.go('draftedAuditions');
                           }
                           $scope.pool = function () {
                    
                            $state.go('talentPool');
                           }
                        
    })
   
    .controller('createNewAuditionCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {

                              console.debug('[StoryController] $ionicView.beforeEnter');


                              viewData.enableBack = false;


                              var currentDate = new Date();
                              $scope.today = currentDate.toISOString();

         var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1></ion-header-bar> <ion-content > Hello! </ion-content></ion-popover-view>';

                    $scope.popover = $ionicPopover.fromTemplate(template, {
                      scope: $scope
                    });

                    // .fromTemplateUrl() method
                    $ionicPopover.fromTemplateUrl('my-popover.html', {
                      scope: $scope
                    }).then(function(popover) {
                      $scope.popover = popover;
                    });


                    $scope.openPopover = function($event) {
                      $scope.popover.show($event);
                      
                      //$scope.index=index;
                    };
                    $scope.closePopover = function() {
                      $scope.popover.hide();
                    };
                    //Cleanup the popover when we're done with it!
                    $scope.$on('$destroy', function() {
                      $scope.popover.remove();
                    });
                    // Execute action on hide popover
                    $scope.$on('popover.hidden', function() {
                      // Execute action
                    });
                    // Execute action on remove popover
                    $scope.$on('popover.removed', function() {
                      // Execute action
                    });

                     });
            // $scope.closed=function()
            // {
            //   $scope.popover.hide();
            // }
                //       $scope.submittag=function(val){
                //              $scope.tag=""
                //            console.log(val);
                //            var arr = [];
                //           for(var i in val){
                //             if(val[i].SELECTED=='1')
                //                arr.push(val[i].value)
                //           }
                //            console.log("nnn"+arr);
                //            $scope.selectedtag=arr;
                //            $scope.tag=arr;

                //          // console.log(data);
                //          //                             $scope.arr = [];
                //          //                            for(var i in data){
                //          //                            if(data[i].SELECTED=='1')
                //          //                            $scope.arr.push(data[i].session_name)
                //          //                            }
                //     //     $scope.albumNameArray = [];
                //     // angular.forEach(val, function(item){
                //     //   if (!!val.selected) 
                //     //     $scope.albumNameArray.push(item);
                     
                //   // })
                //      console.log("array"+$scope.albumNameArray)
                // }


                //  $scope.suggetion=function(myval){
                // // var charCode = (e.which) ? e.which : e.keyCode; 
                //   console.log('a'+ myval);
                // //   console.log('e'+ e);
                //   //  console.log('char'+ charCode);
                //   var value= myval;


                //   $http({
                //                         method: 'POST',
                //                         url: 'https://destini.io/ws_requester/suggest/tags', 
                //                         data: 
                //                         {  
                                               
                //                             'val':value, 
                                           
                //                         }, 
                //                         headers: 
                //                         {
                //                         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                //                     }
                //                     }).success(function(data, status, header, config, message) {
                                         
                //                       $ionicLoading.hide();
                //                       $scope.tagdata=data.result;
                //                       //     $scope.email= '';
                //                       //   regsuc();
                                        
                //                       // }else{
                //                       //   regfail(); 
                //                       // }
                //                   }).error(function(data, status, header, config, message) {
                //                     $ionicLoading.hide();
                //                     });



                //    console.log("hhhhhdhshdhdhehjwdhjwedhdhhjdhjwdhhhd");



                //  }





                 
                                  
        $scope.sendData=function(){
                              var need_video;
                               var video_length;
                              var need_photo;
                                 if($scope.newAudition.type=='None'){ 
                                       need_video='';
                                       video_length='';
                                       need_photo='';
                                  }
                                else if($scope.newAudition.type=='Video'){
                                       need_video=$scope.newAudition.video;
                                       video_length=$scope.newAudition.videolength;
                                       need_photo='';
                                   }

                                   else if($scope.newAudition.type=='Photo'){
                                         need_video='';
                                         video_length='';
                                         need_photo=$scope.newAudition.photo;
                                   }
                                    else if($scope.newAudition.type=='Both'){
                                       need_video=$scope.newAudition.video;
                                       video_length=$scope.newAudition.videolength;
                                       need_photo=$scope.newAudition.photo;
                                   }

                        $ionicLoading.show({
                            template: 'Please Wait...'
                        });
                        console.log('responderid' + localStorage['rId']);
                        $http({
                            method: 'POST',
                            url: 'https://destini.io/ws_sessions/createAudition', 
                            data: 
                            { 
                                 'id': localStorage['rId'], 
                                 'session_name':$scope.newAudition.name,
                                 'full_description':$scope.newAudition.textarea,
                                 'country':$scope.newAudition.country,
                                 'state':$scope.newAudition.state,
                                 'city':$scope.newAudition.city,
                                 'zip_code':$scope.newAudition.zipcode,   
                                 'start_date':$scope.newAudition.startDate, 
                                 'end_date':$scope.newAudition.endDate,
                                 'invite_only':$scope.newAudition.invite,
                                 'who_apply':$scope.newAudition.whoapply,
                                 'respond':$scope.newAudition.respond,   
                                 'type':$scope.newAudition.type,
                                'need_video':need_video,
                                'video_length':video_length,
                                'need_photo':need_photo,
                                 'short_description':$scope.newAudition.addinfo,
                                 'tags':$scope.newAudition.tag, 
                                 'document_upload':$scope.newAudition.upload, 
                                 'question1':$scope.newAudition.ques1,
                                 'question2':$scope.newAudition.ques2,
                                 'question3':$scope.newAudition.ques3,
                                 'question4':$scope.newAudition.ques4,
                                 'question5':$scope.newAudition.ques5,
                                 'submit':$scope.newAudition.action,
                                //'device_id':   '74673',
                                // 'device_type': 'android'*/
                      }, 
                      headers: 
                          {
                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                          }
                      }).success(function(response, status, header, config, message) {

                                $ionicLoading.hide();
                                if(response){

                                 localStorage.setItem('createsessionId', response.session_id);
                                // localStorage.setItem('createsessionname',response.result.session_name);
                                console.log(' new session id'+ localStorage['createsessionId']);
                               // console.log(localStorage['createsessionname']);
                                createsuc();
                                console.log('data submitted');
                        }else{
                                 console.log('data fail to submitted');
                                 createfail();
                        }
                      }).error(function(data, status, header, config, message) {
                                 $ionicLoading.hide();
                      });
                   }


                   createsuc = function() {
                      if($scope.newAudition.ques1!=null || $scope.newAudition.ques2!=null || $scope.newAudition.ques3!=null || $scope.newAudition.ques4!=null || $scope.newAudition.ques4!=null)
                      {
                                   var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm',
                                        template: 'Your session is now Created. Share your sessions on Facebook, and/Or Twitter, using the share option . Do you want upload document for this Audition ? if yes press Ok otherwise cancel'
                                    });
                                        confirmPopup.then(function(res) {
                                          if(res){
                                          $state.go("Upload Documents");
                                        console.log('upload document page');
                                      }
                                        else{
                                          $state.go("myDashboard");
                                        }
                                    });
                      }else{
                        var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm',
                                        template: 'Your session is now Created. Share your sessions on Facebook, and/Or Twitter, using the share option. Do you want upload document for this Audition ? if yes press Ok otherwise cancel'
                                    });
                                        confirmPopup.then(function(res) {
                                          if(res){
                                          $state.go("Upload Documents");
                                        console.log('upload document page');
                                      }
                                        else{
                                          $state.go("myDashboard");
                                        }
                                    });
                      }
                    };
                   createfail = function() {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Alert',
                                       template: 'Something went worng !!. Please try again.'
                                   });
                                       alertPopup.then(function(res) {
                                       console.log('hh');
                                   });
                    };
  
})


.controller('addDocumentsCtrl', function ($scope,$state,$http, $cordovaFileTransfer,$ionicLoading,$ionicPopup) {
                            var i=1;
                            var res_id=localStorage['rId'];
                            var session_id=localStorage['createsessionId'];
                             console.log(' new session id'+ session_id);
                            $scope.showValue=function(){
                              fileChooser.open(function(uri) {
                              $scope.btn_val=uri;
                              uploadFile(uri,session_id);
                              });
                              }
                              function uploadFile(uri,session_id){
                           var url = encodeURI("https://destini.io/ws_requester/upload/session/document");
                           var params=new Object();
                             params.session_id=session_id;
                                    var filename = uri.split("/").pop();
                                    console.log('first '+filename);
                              filename=session_id+"."+filename.split(".").pop();
                                  console.log('second '+filename);
                                    var fileUrl = uri;
                                    var options = {
                                        fileKey: "session_id",
                                        fileName: filename,
                                        httpMethod: 'POST',
                                        trustAllHosts: true,
                                        chunkedMode: false,
                                params:params,
                                mimeType: 'Application/'+filename.split(".").pop()
                                     
                                    };
                                               options.headers = {
                                        Connection: "close"
                                    };
                                     $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function (result) {
                                        result = angular.fromJson(angular.fromJson(result));
                                        console.log("SUCCESS: " + result.response['message']);
                                        console.log("videoname " + result.response.result);
                                        console.log("result " + JSON.stringify(result));
                                $ionicLoading.hide();
                                

                                
                                 if(i<5){
			                                var confirmPopup = $ionicPopup.confirm({
			                                   title: 'Success!',
			                                   template: 'You successfully uploaded '+i+' document. Do you want to upload another document ? Press OK otherwise cancel',

			                              });
			                               confirmPopup.then(function(res) {  
			                                        
			                                        if(res)
			                                        { 
			                                            $scope.showValue();
			                                          }
			                                          else{

			                                          	$state.go("myDashboard");
			                                          	i=1;
			                                          }
                                        });
                                     i++;
                                    }
                                                 
                                          else{
                                          	i=1;
                                          	var alertPopup = $ionicPopup.alert({
			                                  title: 'Success!',
			                                  template: "You successfully uploaded 5 document!"

			                                });
			                                alertPopup.then(function (res) {
			                                    $state.go("myDashboard");
			                                    });

                                 	         }
                                }, function (err) {
                                    	console.log(JSON.stringify(err));
                              $ionicLoading.hide();
                                       var alertPopup = $ionicPopup.alert({
                                  title: 'Error!',
                                  template: "Network error please try after sometime."
                                });
                                alertPopup.then(function (err) {
                                    console.log(err);
                                        });
                                    }, function (progress) {
                                        var progress_status = (progress.loaded / progress.total) * 100;
                                        $ionicLoading.show({
                                            template: "Uploading "+ Math.floor(progress_status) +"%......"
                                        });
                                    });
                          
                          }

})





   
.controller('openAuditionsCtrl', function ($scope, $state, $http, $ionicPopup, $ionicPopover,$ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$cordovaSocialSharing){
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {

                              console.debug('[StoryController] $ionicView.beforeEnter');


                              viewData.enableBack = true;

                              $ionicLoading.show({
                                template: 'Please Wait...'
                              });
                              $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_sessions/openSession',
                                  data: {
                                    'id': localStorage['rId']    
                              },
                              headers: {
                               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                              }
                              }).success(function (data, status, header, config, message) {
                                  $ionicLoading.hide();
                                  if (data) {
                                     $scope.auditions = data.result;
                                   }
                              //LoadingSpinner.hide('pageLoading');
                              }).error(function (data, status, header, config, message) {
                                    $ionicLoading.hide();
                              });


                        });

                              /*localStorage['audi']=$stateParams.auditionId;
                              var aud_id = $stateParams.auditionId;
                              console.log(aud_id+'here it is');*/
                             
                    //////////////////////////////////////////popover///////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                $scope.deleteSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/session/delete', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data){
                                          deletesuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           deletefail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          deletesuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session has been successfully deleted.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        deletefail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went worng !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }



                                   $scope.closeSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/close/session', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data.response){
                                          closesuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           closefail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                       closesuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session closed with one week delay.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        closefail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went worng !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }



                $scope.shareAnywhere = function(n,s,e,d,l) {
                     var name=n;
                     var str=s;
                     var end=e;
                     var discription=d;
                     var location=l;
                     var sentence="Audition Name: "+name+", "+"Starting: "+str+", "+"Ending: "+end+", "+"Descripton: "+discription+", "+"Location: "+location;
                     console.log(name);
                     console.log(sentence);
                    $cordovaSocialSharing.share(sentence,"Audition Name: "+name,null,"https://destini.io/requester");
                }
                $scope.download=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/download/session/responses', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                            'requester_id':localStorage['rId']
                                          
                                          }, 
                                         headers : {
                                              'Content-type' : 'application/csv',
                                          },
                                     //  responseType : 'arraybuffer'
                                          }).success(function(data, status, header, config, message) {

                                                 if(data) {
                                                  downloadFile()
                                                 }        
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });
                                        downloadFile = function() {
                                        var url = "https://destini.io/public/frontEnd/uploads/documents/Audition.csv";
                                        var filename = url.split("/").pop();
                                        //alert(filename);
                                        var targetPath = cordova.file.externalRootDirectory + filename;
                                        var trustHosts = true;
                                        var options = {};

                                        var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Documents will be downloaded at location: '+cordova.file.externalRootDirectory
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    //$state.reload();
                                              });
                                       // alert('Documents will be downloaded at location: '+cordova.file.externalRootDirectory);
                                        
                                       // alert(cordova.file.externalRootDirectory);
                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                          .then(function(result) {
                                            // Success!
                                            $ionicLoading.hide();
                                           // alert(JSON.stringify(result));
                                          }, function(error) {
                                            // Error
                                            var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: JSON.stringify(error)
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    //$state.reload();
                                              });
                                           // alert(JSON.stringify(error));
                                          }, function (progress) {
                                            var downloadProgress = (progress.loaded / progress.total) * 100;
                                              console.log('downloadProgress'+downloadProgress);
                                              $ionicLoading.show({
				                                      template: "downloading please wait..."
				                                  });
                                          });
                                        }

                                 }
                                 $scope.downloadall=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/download/responses', 
                                          data: 
                                          { 

                                            
                                            'requester_id':localStorage['rId']
                                          
                                          }, 
                                         headers : {
                                              'Content-type' : 'application/csv',
                                          },
                                       //responseType : 'arraybuffer'
                                          }).success(function(data, status, header, config, message) {

                                                 if(data) {
                                                  downloadFile()
                                                 }        
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });
                                        downloadFile = function() {
                                        var url = "https://destini.io/public/frontEnd/uploads/documents/Audition.csv";
                                        var filename = url.split("/").pop();
                                       // alert(filename);
                                        var targetPath = cordova.file.externalRootDirectory + filename;
                                        var trustHosts = true
                                        var options = {};
                                      //  alert(cordova.file.externalRootDirectory);
                                       var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Documents will be downloaded at location: '+cordova.file.externalRootDirectory
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    //$state.reload();
                                              });

                                    //  alert('Documents will be downloaded at location: '+cordova.file.externalRootDirectory);
                                        
                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                          .then(function(result) {
                                            // Success!
                                           
                                            console.log(JSON.stringify(result));
                                             $ionicLoading.hide();
                                          }, function(error) {
                                            // Error
                                            var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: JSON.stringify(error)
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    //$state.reload();
                                              });
                                           // alert(JSON.stringify(error));
                                          }, function (progress) {
                                            var downloadProgress = (progress.loaded / progress.total) * 100;
                                              console.log('downloadProgress'+downloadProgress);
                                              $ionicLoading.show({
				                                      template: "downloading please wait..."
				                                  });
                                          });
                                        }
                                 }
    })
   
.controller('inviteOnlyAuditionsCtrl',function ($scope, $state, $http, $ionicPopup, $ionicPopover,$ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
            console.debug('[StoryController] $ionicView.beforeEnter');
                             viewData.enableBack = true;
                            $ionicLoading.show({
                                template: 'Please Wait...'
                            });
                            $http({
                                method: 'post',
                                url: 'https://destini.io/ws_sessions/InviteOnlySession',
                                data: {
                                    'id': localStorage['rId']
                                    
                                },
                                headers: {
                                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                            }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data) {
                                   $scope.auditions = data.result;
                                 }
                            //LoadingSpinner.hide('pageLoading');
                            }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                            });
        });
                //////////////////////////////////////////popover///////////////////////////////////////////////////////////////////////////////////////////////////
               ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                $scope.deleteSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/session/delete', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data){
                                          deletesuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           deletefail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          deletesuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session has been successfully deleted.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        deletefail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went wrong !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }

                                   $scope.closeSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/close/session', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data.response){
                                          closesuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           closefail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          closesuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session closed with one week delay.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        closefail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went wrong !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                             }
                      $scope.shareAnywhere = function(n,s,e,d,l) {
                           var name=n;
                           var str=s;
                           var end=e;
                           var discription=d;
                           var location=l;
                           var sentence="Audition Name: "+name+", "+"Starting: "+str+", "+"Ending: "+end+", "+"Descripton: "+discription+", "+"Location: "+location;
                           console.log(name);
                           console.log(sentence);
                          $cordovaSocialSharing.share(sentence,"Audition Name: "+name,null,"https://destini.io/requester/invite/only");
                }


                $scope.download=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/download/session/responses', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                            'requester_id':localStorage['rId']
                                          
                                          }, 
                                         headers : {
                                              'Content-type' : 'application/csv',
                                          },
                                     //  responseType : 'arraybuffer'
                                          }).success(function(data, status, header, config, message) {

                                                 if(data) {
                                                  downloadFile()
                                                 }        
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });
                                        downloadFile = function() {
                                        var url = "https://destini.io/public/frontEnd/uploads/documents/Audition.csv";
                                        var filename = url.split("/").pop();
                                      //  alert(filename);
                                        var targetPath = cordova.file.externalRootDirectory + filename;
                                        var trustHosts = true
                                        var options = {};
                                       // alert(cordova.file.externalRootDirectory);
                                        var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Documents will be downloaded at location: '+cordova.file.externalRootDirectory
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    //$state.reload();
                                              });
                                      // alert('Documents will be downloaded at location: '+cordova.file.externalRootDirectory);
                                        
                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                          .then(function(result) {
                                            // Success!
                                            //alert(JSON.stringify(result));
                                            $ionicLoading.hide();
                                          }, function(error) {
                                            // Error
                                            var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: JSON.stringify(error)
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    //$state.reload();
                                              });
                                           //alert(JSON.stringify(error));
                                          }, function (progress) {
                                            var downloadProgress = (progress.loaded / progress.total) * 100;
                                              console.log('downloadProgress'+downloadProgress);
                                              $ionicLoading.show({
				                                      template: "downloading please wait..."
				                                  });
                                          });
                                        }
                                 }
                                 $scope.downloadall=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/download/responses', 
                                          data: 
                                          { 

                                            
                                            'requester_id':localStorage['rId']
                                          
                                          }, 
                                         headers : {
                                              'Content-type' : 'application/csv',
                                          },
                                       //responseType : 'arraybuffer'
                                          }).success(function(data, status, header, config, message) {

                                                 if(data) {
                                                  downloadFile()
                                                 }        
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });
                                        downloadFile = function() {
                                        var url = "https://destini.io/public/frontEnd/uploads/documents/Audition.csv";
                                        var filename = url.split("/").pop();
                                        //alert(filename);
                                        var targetPath = cordova.file.externalRootDirectory + filename;
                                        var trustHosts = true
                                        var options = {};
                                        //alert(cordova.file.externalRootDirectory);
                                        var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Documents will be downloaded at location: '+cordova.file.externalRootDirectory
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('documents upload');
                                                    //$state.reload();
                                              });
                                       // alert('Documents will be downloaded at location: '+cordova.file.externalRootDirectory);
                                        $ionicLoading.show({
				                                      template: "downloading please wait..."
				                                  });
                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                          .then(function(result) {
                                            // Success!
                                           // alert(JSON.stringify(result));
                                           $ionicLoading();
                                          }, function(error) {
                                            // Error
                                            var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: JSON.stringify(error)
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('documents upload');
                                                    //$state.reload();
                                              });
                                            //alert(JSON.stringify(error));
                                          }, function (progress) {
                                            var downloadProgress = (progress.loaded / progress.total) * 100;
                                              console.log('downloadProgress'+downloadProgress);
                                              $ionicLoading.show({
				                                      template: "downloading please wait..."
				                                  });
                                          });
                                        }
                                 }
        
})
   
.controller('closedAuditionsCtrl', function ($scope, $state, $http, $ionicPopup, $ionicPopover,$ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                              console.debug('[StoryController] $ionicView.beforeEnter');

                              viewData.enableBack = true;

                              $ionicLoading.show({
                                 template: 'Please Wait...'
                              });
                              $http({
                                      method: 'post',
                                      url: 'https://destini.io/ws_sessions/ClosedSession',
                                      data: {
                                      'id': localStorage['rId']
                                      },
                                      headers: {
                                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                      }
                              }).success(function (data, status, header, config, message) {
                                  $ionicLoading.hide();
                                  if (data) {
                                  $scope.auditions = data.result;
                                  }
                                //LoadingSpinner.hide('pageLoading');
                              }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                              });
                        });
       
                $scope.reopenSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_sessions/reopenSession', 
                                          data: 
                                          { 

                                           'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data){
                                          reopensuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                          }else{
                                           reopenfail();
                                        //  $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          reopensuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session has been reopend with one week time.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session reopend');
                                              });
                                              console.log('successfully');
                                             // $state.go('tabsController.myDashboard');
                                        }
                                        reopenfail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went wrong !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }



                                 $scope.deleteSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/session/delete', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data.response){
                                          deletesuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           deletefail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          deletesuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session has been successfully deleted.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        deletefail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went wrong !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }


   
})
   
.controller('draftedAuditionsCtrl',function ($scope, $state, $http, $ionicPopup,$ionicPopover, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
    $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                              console.debug('[StoryController] $ionicView.beforeEnter');

                              viewData.enableBack = true;

                              $ionicLoading.show({
                                    template: 'Please Wait...'
                              });
                              $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_sessions/DraftedSession',
                                  data: {
                                  'id': localStorage['rId']

                                  },
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                              }).success(function (data, status, header, config, message) {
                              $ionicLoading.hide();
                              if (data) {
                                $scope.auditions = data.result;
                              }
                              //LoadingSpinner.hide('pageLoading');
                              }).error(function (data, status, header, config, message) {
                                 $ionicLoading.hide();

                              });
                        });
                             $scope.deleteSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/session/delete', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data){
                                          deletesuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           deletefail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          deletesuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session has been successfully deleted.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        deletefail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went worng !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }



                                 $scope.publishSession=function(data){
                                        var session_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_sessions/publishSession', 
                                          data: 
                                          { 

                                            'session_id':session_id,
                                          
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data){
                                          pubsuc();
                                          
                                          console.log('data submitted');
                                          }else{
                                           pubfail();
                                         // $state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                          
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });

                                          pubsuc = function () {
                                              var alertPopup = $ionicPopup.alert({
                                                  title: 'Alert',
                                                  template: 'Session has been successfully publish.'
                                              });
                                              alertPopup.then(function (res) {
                                                    console.log('session deleted');
                                                    $state.reload();
                                              });
                                              console.log('successfully');
                                              
                                             //$state.go("tabsController.closedAuditions");
                                        }
                                        pubfail = function () {
                                                  var alertPopup = $ionicPopup.alert({
                                                      title: 'Alert',
                                                      template: 'Something went worng !!. Please try again.'
                                                  });
                                                  alertPopup.then(function (res) {
                                                          console.log(res);
                                                          console.log('not success');
                                                   });
                                     }
                                 }

        
})




.controller('editAuditionCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http,$cordovaDatePicker, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
       $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');
      

                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var data={

                                session_id :id

                                };

                                $ionicLoading.show({
                                 template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_sessions/editAudition',
                                    data:data,
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (response, status, header, config, message) {
                                     $ionicLoading.hide();
                                if (response) {
                                    localStorage.setItem('session_Id', response.data.id)
                                    $scope.id= localStorage['session_Id'];
                                    $scope.editdata = response.data;
                                    $scope.editdata.max_sessions=parseInt(response.data.max_sessions);
                                
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                });
     
   $scope.editData=function(){

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                console.log('sesssrid' + localStorage['session_Id']);
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_sessions/submitEditAudition', 
                                    data:  { 
                                        'id': localStorage['session_Id'], 
                                        'session_name':$scope.editdata.session_name,
                                        'full_description':$scope.editdata.full_description,
                                        'country':$scope.editdata.country,
                                        'state':$scope.editdata.state,
                                        'city':$scope.editdata.city,
                                        'zip_code':$scope.editdata.zip_code,   
                                        'start_date':$scope.editdata.start_date, 
                                        'end_date':$scope.editdata.end_date,
                                        'invite_only':$scope.editdata.invite_only,
                                        'who_apply':$scope.editdata.type,
                                        'respond':$scope.editdata.max_sessions,   
                                        'type':$scope.editdata.session_type, 
                                        'need_video':$scope.editdata.video_needed,
                                        'video_length':$scope.editdata.video_length,
                                        'need_photo':$scope.editdata.photos_need,
                                        'short_description':$scope.editdata.short_description, 
                                        'tags':$scope.editdata.tags,
                                        'question1':$scope.editdata.question1,
                                        'question2':$scope.editdata.question2,
                                        'question3':$scope.editdata.question3,
                                        'question4':$scope.editdata.question4,
                                        'question5':$scope.editdata.question5,
                                        'submit':$scope.editdata.submit_type,
                                        //'device_id':   '74673',
                                        // 'device_type': 'android'*/
                                }, 
                                headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function(data, status, header, config, message) {
                                $ionicLoading.hide();
                                if(data.response){
                                 editsuc();
                                   // $state.go("openAuditions");
                                    console.log('data submitted');
                                 }else{
                                 	editfail();
                                  console.log('data fail to submitted');
                                }
                                }).error(function(data, status, header, config, message) {
                                $ionicLoading.hide();
                                });

            }


                   editsuc = function() {
                                   var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm',
                                        template: 'Audition edited successfully . Do you want upload replace or change previous uploaded document for this session ? if yes press Ok otherwise cancel'
                                    });
                                        confirmPopup.then(function(res) {
                                          if(res){
                                          $state.go("editDocuments");
                                        console.log('editdocument page');
                                      }
                                        else{
                                          $state.go("openAuditions");
                                        }
                                    });
                    };
                   editfail = function() {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Alert',
                                       template: 'Something went worng !!. Please try again.'
                                   });
                                       alertPopup.then(function(res) {
                                       console.log('hh');
                                   });
                    };
})

.controller('editDocumentsCtrl', function ($scope,$state,$http, $cordovaFileTransfer,$ionicLoading,$ionicPopup) {
                            var i=1;
                            var res_id=localStorage['rId'];
                            var session_id=localStorage['session_Id'];
                             console.log(' new session id'+ session_id);
                            $scope.showValue=function(){
                              fileChooser.open(function(uri) {
                              $scope.btn_val=uri;
                              uploadFile(uri,session_id);
                              });
                              }
                              function uploadFile(uri,session_id){
                           var url = encodeURI("https://destini.io/ws_requester/edit/document");
                           var params=new Object();
                             params.session_id=session_id;
                                    var filename = uri.split("/").pop();
                                    console.log('first '+filename);
                              filename=session_id+"."+filename.split(".").pop();
                                  console.log('second '+filename);
                                    var fileUrl = uri;
                                    var options = {
                                        fileKey: "session_id",
                                        fileName: filename,
                                        httpMethod: 'POST',
                                        trustAllHosts: true,
                                        chunkedMode: false,
                                params:params,
                                mimeType: 'Application/'+filename.split(".").pop()
                                     
                                    };
                                               options.headers = {
                                        Connection: "close"
                                    };
                                     $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function (result) {
                                        result = angular.fromJson(angular.fromJson(result));
                                        console.log("SUCCESS: " + result.response['message']);
                                        console.log("videoname " + result.response.result);
                                        console.log("result " + JSON.stringify(result));
                                $ionicLoading.hide();
                                
                                 if(i<5){
			                                var confirmPopup = $ionicPopup.confirm({
			                                   title: 'Success!',
			                                   template: 'You successfully replace '+i+' document. Do you want to upload another document ? Press OK otherwise cancel ',

			                              });
			                               confirmPopup.then(function(res) {  
			                                        
			                                        if(res)
			                                        { 
			                                            $scope.showValue();
			                                          }
			                                          else{

			                                          	$state.go("openAuditions");
			                                          	i=1;
			                                          }
                                        });
                                     i++;
                                    }
                                                 
                                          else{
                                          	i=1;
                                          	var alertPopup = $ionicPopup.alert({
			                                  title: 'Success!',
			                                  template: "You successfully uploaded 5 document!"

			                                });
			                                alertPopup.then(function (res) {
			                                    $state.go("openAuditions");
			                                    });

                                 	         }
                                }, function (err) {
                                    	console.log(JSON.stringify(err));
                              $ionicLoading.hide();
                                       var alertPopup = $ionicPopup.alert({
                                  title: 'Error!',
                                  template: "Network Error Occurred. Try again later!"
                                });
                                alertPopup.then(function (err) {
                                    console.log(err);
                                        });
                                    }, function (progress) {
                                        var progress_status = (progress.loaded / progress.total) * 100;
                                        $ionicLoading.show({
                                            template: "Uploading "+ Math.floor(progress_status) +"%......"
                                        });
                                    });
                          
                          }

})


.controller('editAuditionInviteCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){        $ionicSideMenuDelegate.canDragContent(false);
 $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var data={

                                session_id :id

                                };

                                $ionicLoading.show({
                                  template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_sessions/editAudition',
                                    data:data,
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (response, status, header, config, message) {
                                $ionicLoading.hide();
                                if (response) {
                                    localStorage.setItem('session_Id', response.data.id)
                                    $scope.id= localStorage['session_Id'];
                                    $scope.editdata = response.data;
                                    $scope.editdata.max_sessions=parseInt(response.data.max_sessions);
                                    //console.log('log'+data.response.session_name);
                                    //$scope.newAudition.name=data.result.session_name;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                   $ionicLoading.hide();

                                });
    });

   $scope.editData=function(){

                                  $ionicLoading.show({
                                        template: 'Please Wait...'
                                  });
                                  console.log('sesssrid' + localStorage['session_Id']);
                                  $http({
                                      method: 'POST',
                                      url: 'https://destini.io/ws_sessions/submitEditAudition', 
                                      data: 
                                       { 
                                      'id': localStorage['session_Id'], 
                                      'session_name':$scope.editdata.session_name,
                                      'full_description':$scope.editdata.full_description,
                                      'country':$scope.editdata.country,
                                      'state':$scope.editdata.state,
                                      'city':$scope.editdata.city,
                                      'zip_code':$scope.editdata.zip_code,   
                                      'start_date':$scope.editdata.start_date, 
                                      'end_date':$scope.editdata.end_date,
                                      'invite_only':$scope.editdata.invite_only,
                                      'who_apply':$scope.editdata.type,
                                      'respond':$scope.editdata.max_sessions,   
                                      'type':$scope.editdata.session_type, 
                                      'need_video':$scope.editdata.video_needed,
                                      'video_length':$scope.editdata.video_length,
                                      'need_photo':$scope.editdata.photos_need,
                                      'short_description':$scope.editdata.short_description,
                                      'tags':$scope.editdata.tags,
                                      'question2':$scope.editdata.question2,
                                      'question3':$scope.editdata.question3,
                                      'question4':$scope.editdata.question4,
                                      'question5':$scope.editdata.question5,
                                      'submit':$scope.editdata.submit_type,
                                      
                                  }, 
                                    headers: 
                                      {
                                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                      }
                                  }).success(function(data, status, header, config, message) {

                                  $ionicLoading.hide();
                                if(data.response){
                                 editsuc();
                                   // $state.go("openAuditions");
                                    console.log('data submitted');
                                 }else{
                                 	editfail();
                                  console.log('data fail to submitted');
                                }
                                }).error(function(data, status, header, config, message) {
                                $ionicLoading.hide();
                                });

            }


                   editsuc = function() {
                                   var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm',
                                        template: 'Audition edited successfully . Do you want replace or change previous uploaded document for this session ? if yes press Ok otherwise cancel'
                                    });
                                        confirmPopup.then(function(res) {
                                          if(res){
                                          $state.go("editDocumentsInvite");
                                        console.log('editdocument page');
                                      }
                                        else{
                                          $state.go("inviteOnlyAuditions");
                                        }
                                    });
                    };
                   editfail = function() {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Alert',
                                       template: 'Something went worng !!. Please try again.'
                                   });
                                       alertPopup.then(function(res) {
                                       console.log('hh');
                                   });
                    };
})
.controller('editDocumentsInviteCtrl', function ($scope,$state,$http, $cordovaFileTransfer,$ionicLoading,$ionicPopup) {
                            var i=1;
                            var res_id=localStorage['rId'];
                            var session_id=localStorage['session_Id'];
                             console.log(' new session id'+ session_id);
                            $scope.showValue=function(){
                              fileChooser.open(function(uri) {
                              $scope.btn_val=uri;
                              uploadFile(uri,session_id);
                              });
                              }
                              function uploadFile(uri,session_id){
                           var url = encodeURI("https://destini.io/ws_requester/edit/document");
                           var params=new Object();
                             params.session_id=session_id;
                                    var filename = uri.split("/").pop();
                                    console.log('first '+filename);
                              filename=session_id+"."+filename.split(".").pop();
                                  console.log('second '+filename);
                                    var fileUrl = uri;
                                    var options = {
                                        fileKey: "session_id",
                                        fileName: filename,
                                        httpMethod: 'POST',
                                        trustAllHosts: true,
                                        chunkedMode: false,
                                params:params,
                                mimeType: 'Application/'+filename.split(".").pop()
                                     
                                    };
                                               options.headers = {
                                        Connection: "close"
                                    };
                                     $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function (result) {
                                        result = angular.fromJson(angular.fromJson(result));
                                        console.log("SUCCESS: " + result.response['message']);
                                        console.log("videoname " + result.response.result);
                                        console.log("result " + JSON.stringify(result));
                                $ionicLoading.hide();
                                
                                 if(i<5){
			                                var confirmPopup = $ionicPopup.confirm({
			                                   title: 'Success!',
			                                   template: 'You successfully replace '+i+' document. Do you want to upload another document ? Press OK otherwise cancel',

			                              });
			                               confirmPopup.then(function(res) {  
			                                        
			                                        if(res)
			                                        { 
			                                            $scope.showValue();
			                                          }
			                                          else{

			                                          	$state.go("inviteOnlyAuditions");
			                                          	i=1;
			                                          }
                                        });
                                     i++;
                                    }
                                                 
                                          else{
                                          	i=1;
                                          	var alertPopup = $ionicPopup.alert({
			                                  title: 'Success!',
			                                  template: "You successfully replace 5 document!"

			                                });
			                                alertPopup.then(function (res) {
			                                    $state.go("inviteOnlyAuditions");
			                                    });

                                 	         }
                                }, function (err) {
                                    	console.log(JSON.stringify(err));
                              $ionicLoading.hide();
                                       var alertPopup = $ionicPopup.alert({
                                  title: 'Error!',
                                  template: "Network Error Occurred. Try again later!"
                                });
                                alertPopup.then(function (err) {
                                    console.log(err);
                                        });
                                    }, function (progress) {
                                        var progress_status = (progress.loaded / progress.total) * 100;
                                        $ionicLoading.show({
                                            template: "Uploading "+ Math.floor(progress_status) +"%......"
                                        });
                                    });
                          
                          }

})

.controller('editAuditionClosedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);

$scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                    console.debug('[StoryController] $ionicView.beforeEnter');


                                  viewData.enableBack = true;
                                  console.log($stateParams);
                                  console.log($stateParams.id);
                                  var id =$stateParams.id;
                                  console.log(id);
                                  var data={

                                     session_id :id
                                  };

                                  $ionicLoading.show({
                                     template: 'Please Wait...'
                                  });
                                  $http({
                                      method: 'post',
                                      url: 'https://destini.io/ws_sessions/editAudition',
                                      data:data,
                                      headers: {
                                           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                       }
                                  }).success(function (response, status, header, config, message) {
                                      $ionicLoading.hide();
                                      if (response) {
                                          localStorage.setItem('session_Id', response.data.id)
                                          $scope.id= localStorage['session_Id'];
                                          $scope.editdata = response.data;
                                           $scope.editdata.max_sessions=parseInt(response.data.max_sessions);
                                          //console.log('log'+data.response.session_name);
                                          //$scope.newAudition.name=data.result.session_name;
                                       }
                                  //LoadingSpinner.hide('pageLoading');
                                  }).error(function (data, status, header, config, message) {
                                  $ionicLoading.hide();

                                  });
                                 
                     });

   $scope.editData=function(){

                                    $ionicLoading.show({
                                    template: 'Please Wait...'
                                    });
                                    console.log('sesssrid' + localStorage['session_Id']);
                                    $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_sessions/submitEditAudition', 
                                    data: 
                                        { 
                                        'id': localStorage['session_Id'], 
                                        'session_name':$scope.editdata.session_name,
                                        'full_description':$scope.editdata.full_description,
                                        'country':$scope.editdata.country,
                                        'state':$scope.editdata.state,
                                        'city':$scope.editdata.city,
                                        'zip_code':$scope.editdata.zip_code,   
                                        'start_date':$scope.editdata.start_date, 
                                        'end_date':$scope.editdata.end_date,
                                        'invite_only':$scope.editdata.invite_only,
                                        'who_apply':$scope.editdata.type,
                                        'respond':$scope.editdata.max_sessions,   
                                        'type':$scope.editdata.session_type, 
                                        'need_video':$scope.editdata.video_needed,
                                        'video_length':$scope.editdata.video_length,
                                        'need_photo':$scope.editdata.photos_need,
                                        'short_description':$scope.editdata.short_description, 
                                        'tags':$scope.editdata.tags,
                                        'question1':$scope.editdata.question1,
                                        'question2':$scope.editdata.question2,
                                        'question3':$scope.editdata.question3,
                                        'question4':$scope.editdata.question4,
                                        'question5':$scope.editdata.question5,
                                        'submit':$scope.editdata.submit_type,
                                        //'device_id':   '74673',
                                        // 'device_type': 'android'*/
                                        }, 
                                    headers: 
                                      {
                                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                      }
                                    }).success(function(data, status, header, config, message) {

                                    $ionicLoading.hide();
                                if(data.response){
                                 editsuc();
                                   // $state.go("openAuditions");
                                    console.log('data submitted');
                                 }else{
                                 	editfail();
                                  console.log('data fail to submitted');
                                }
                                }).error(function(data, status, header, config, message) {
                                $ionicLoading.hide();
                                });

            }


                   editsuc = function() {
                                   var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm',
                                        template: 'Audition edited successfully . Do you want replace or change previous uploaded document for this session ? if yes press Ok otherwise cancel'
                                    });
                                        confirmPopup.then(function(res) {
                                          if(res){
                                          $state.go("editDocumentsClosed");
                                        console.log('editdocument page');
                                      }
                                        else{
                                          $state.go("closedAuditions");
                                        }
                                    });
                    };
                   editfail = function() {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Alert',
                                       template: 'Something went worng !!. Please try again.'
                                   });
                                       alertPopup.then(function(res) {
                                       console.log('hh');
                                   });
                    };
})

.controller('editDocumentsClosedCtrl', function ($scope,$state,$http, $cordovaFileTransfer,$ionicLoading,$ionicPopup) {
                            var i=1;
                            var res_id=localStorage['rId'];
                            var session_id=localStorage['session_Id'];
                             console.log(' new session id'+ session_id);
                            $scope.showValue=function(){
                              fileChooser.open(function(uri) {
                              $scope.btn_val=uri;
                              uploadFile(uri,session_id);
                              });
                              }
                              function uploadFile(uri,session_id){
                           var url = encodeURI("https://destini.io/ws_requester/edit/document");
                           var params=new Object();
                             params.session_id=session_id;
                                    var filename = uri.split("/").pop();
                                    console.log('first '+filename);
                              filename=session_id+"."+filename.split(".").pop();
                                  console.log('second '+filename);
                                    var fileUrl = uri;
                                    var options = {
                                        fileKey: "session_id",
                                        fileName: filename,
                                        httpMethod: 'POST',
                                        trustAllHosts: true,
                                        chunkedMode: false,
                                params:params,
                                mimeType: 'Application/'+filename.split(".").pop()
                                     
                                    };
                                               options.headers = {
                                        Connection: "close"
                                    };
                                     $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function (result) {
                                        result = angular.fromJson(angular.fromJson(result));
                                        console.log("SUCCESS: " + result.response['message']);
                                        console.log("videoname " + result.response.result);
                                        console.log("result " + JSON.stringify(result));
                                $ionicLoading.hide();
                                
                                 if(i<5){
			                                var confirmPopup = $ionicPopup.confirm({
			                                   title: 'Success!',
			                                   template: 'You successfully replace '+i+' document. Do you want to upload another document ? Press OK otherwise cancel',

			                              });
			                               confirmPopup.then(function(res) {  
			                                        
			                                        if(res)
			                                        { 
			                                            $scope.showValue();
			                                          }
			                                          else{

			                                          	$state.go("closedAuditions");
			                                          	i=1;
			                                          }
                                        });
                                     i++;
                                    }
                                                 
                                          else{
                                          	i=1;
                                          	var alertPopup = $ionicPopup.alert({
			                                  title: 'Success!',
			                                  template: "You successfully replace 5 document!"

			                                });
			                                alertPopup.then(function (res) {
			                                    $state.go("closedAuditions");
			                                    });

                                 	         }
                                }, function (err) {
                                    	console.log(JSON.stringify(err));
                              $ionicLoading.hide();
                                       var alertPopup = $ionicPopup.alert({
                                  title: 'Error!',
                                  template: "Network Error Occurred. Try again later!"
                                });
                                alertPopup.then(function (err) {
                                    console.log(err);
                                        });
                                    }, function (progress) {
                                        var progress_status = (progress.loaded / progress.total) * 100;
                                        $ionicLoading.show({
                                            template: "Uploading "+ Math.floor(progress_status) +"%......"
                                        });
                                    });
                          
                          }

})

.controller('editAuditionDraftedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
   function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);

          $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                              console.debug('[StoryController] $ionicView.beforeEnter');


                              viewData.enableBack = false;
                              console.log($stateParams);
                              console.log($stateParams.id);
                              var id =$stateParams.id;
                              console.log(id);
                              var data={

                              session_id :id

                              };

                              $ionicLoading.show({
                                 template: 'Please Wait...'
                              });
                              $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_sessions/editAudition',
                                  data:data,
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                              }).success(function (response, status, header, config, message) {
                              $ionicLoading.hide();
                              if (response) {
                                  localStorage.setItem('session_Id', response.data.id)
                                  $scope.id= localStorage['session_Id'];
                                  $scope.editdata = response.data;
                                   $scope.editdata.max_sessions=parseInt(response.data.max_sessions);
                                  //console.log('log'+data.response.session_name);
                                  //$scope.newAudition.name=data.result.session_name;
                              }
                              //LoadingSpinner.hide('pageLoading');
                              }).error(function (data, status, header, config, message) {
                              $ionicLoading.hide();
                              });
                              /*localStorage['audi']=$stateParams.auditionId;
                              var aud_id = $stateParams.auditionId;
                              console.log(aud_id+'here it is');*/

              });

   $scope.editData=function(){

                              $ionicLoading.show({
                                   template: 'Please Wait...'
                              });
                              console.log('sesssrid' + localStorage['session_Id']);
                              $http({
                                method: 'POST',
                                url: 'https://destini.io/ws_sessions/submitEditAudition', 
                                data: 
                                { 
                                  'id': localStorage['session_Id'], 
                                  'session_name':$scope.editdata.session_name,
                                  'full_description':$scope.editdata.full_description,
                                  'country':$scope.editdata.country,
                                  'state':$scope.editdata.state,
                                  'city':$scope.editdata.city,
                                  'zip_code':$scope.editdata.zip_code,   
                                  'start_date':$scope.editdata.start_date, 
                                  'end_date':$scope.editdata.end_date,
                                  'invite_only':$scope.editdata.invite_only,
                                  'who_apply':$scope.editdata.type,
                                  'respond':$scope.editdata.max_sessions,   
                                  'type':$scope.editdata.session_type, 
                                  'need_video':$scope.editdata.video_needed,
                                  'video_length':$scope.editdata.video_length,
                                  'need_photo':$scope.editdata.photos_need,
                                  'short_description':$scope.editdata.short_description,
                                    'tags':$scope.editdata.tags,
                                    'question1':$scope.editdata.question1,
                                  'question2':$scope.editdata.question2,
                                  'question3':$scope.editdata.question3,
                                  'question4':$scope.editdata.question4,
                                  'question5':$scope.editdata.question5,
                                  'submit':$scope.editdata.submit_type,
                                  //'device_id':   '74673',
                                  // 'device_type': 'android'*/
                              }, 
                              headers: 
                              {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                              }
                              }).success(function(data, status, header, config, message) {
                               $ionicLoading.hide();
                                if(data.response){
                                 editsuc();
                                   // $state.go("openAuditions");
                                    console.log('data submitted');
                                 }else{
                                 	editfail();
                                  console.log('data fail to submitted');
                                }
                                }).error(function(data, status, header, config, message) {
                                $ionicLoading.hide();
                                });

            }


                   editsuc = function() {
                                   var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm',
                                        template: 'Audition edited successfully . Do you want  replace or change previous uploaded document for this session ? if yes press Ok otherwise cancel'
                                    });
                                        confirmPopup.then(function(res) {
                                          if(res){
                                          $state.go("editDocumentsDrafted");
                                        console.log('editdocument page');
                                      }
                                        else{
                                          $state.go("draftedAuditions");
                                        }
                                    });
                    };
                   editfail = function() {
                                   var alertPopup = $ionicPopup.alert({
                                       title: 'Alert',
                                       template: 'Something went worng !!. Please try again.'
                                   });
                                       alertPopup.then(function(res) {
                                       console.log('hh');
                                   });
                    };
})


.controller('editDocumentDraftedCtrl', function ($scope,$state,$http, $cordovaFileTransfer,$ionicLoading,$ionicPopup) {
                            var i=1;
                            var res_id=localStorage['rId'];
                            var session_id=localStorage['session_Id'];
                             console.log(' new session id'+ session_id);
                            $scope.showValue=function(){
                              fileChooser.open(function(uri) {
                              $scope.btn_val=uri;
                              uploadFile(uri,session_id);
                              });
                              }
                              function uploadFile(uri,session_id){
                           var url = encodeURI("https://destini.io/ws_requester/edit/document");
                           var params=new Object();
                             params.session_id=session_id;
                                    var filename = uri.split("/").pop();
                                    console.log('first '+filename);
                              filename=session_id+"."+filename.split(".").pop();
                                  console.log('second '+filename);
                                    var fileUrl = uri;
                                    var options = {
                                        fileKey: "session_id",
                                        fileName: filename,
                                        httpMethod: 'POST',
                                        trustAllHosts: true,
                                        chunkedMode: false,
                                params:params,
                                mimeType: 'Application/'+filename.split(".").pop()
                                     
                                    };
                                               options.headers = {
                                        Connection: "close"
                                    };
                                     $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function (result) {
                                        result = angular.fromJson(angular.fromJson(result));
                                        console.log("SUCCESS: " + result.response['message']);
                                        console.log("videoname " + result.response.result);
                                        console.log("result " + JSON.stringify(result));
                                $ionicLoading.hide();
                                
                                 if(i<5){
			                                var confirmPopup = $ionicPopup.confirm({
			                                   title: 'Success!',
			                                   template: 'You successfully replace '+i+' document. Do you want to upload another document ? Press OK otherwise cancel',

			                              });
			                               confirmPopup.then(function(res) {  
			                                        
			                                        if(res)
			                                        { 
			                                            $scope.showValue();
			                                          }
			                                          else{

			                                          	$state.go("draftedAuditions");
			                                          	i=1;
			                                          }
                                        });
                                     i++;
                                    }
                                                 
                                          else{
                                          	i=1;
                                          	var alertPopup = $ionicPopup.alert({
			                                  title: 'Success!',
			                                  template: "You successfully replace 5 document!"

			                                });
			                                alertPopup.then(function (res) {
			                                    $state.go("draftedAuditions");
			                                    });

                                 	         }
                                }, function (err) {
                                    	console.log(JSON.stringify(err));
                              $ionicLoading.hide();
                                       var alertPopup = $ionicPopup.alert({
                                  title: 'Error!',
                                  template: "Network Error Occurred. Try again later!"
                                });
                                alertPopup.then(function (err) {
                                    console.log(err);
                                        });
                                    }, function (progress) {
                                        var progress_status = (progress.loaded / progress.total) * 100;
                                        $ionicLoading.show({
                                            template: "Uploading "+ Math.floor(progress_status) +"%......"
                                        });
                                    });
                          
                          }

})


.controller('inviteUsersCtrl', function ($scope, $state, $http, $ionicPopup, $ionicPopover,$ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
 $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                $ionicLoading.show({
                                   template: 'Please Wait...'
                                });
                                var data={

                                session_id :id

                                };

                                
                                $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_responder/talent_pool',
                                  data:data,
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                                }).success(function (response, status, header, config, message) {
                                $ionicLoading.hide();
                                if (response) {
                                    localStorage.setItem('session_Id', response.data.id)
                                   // localStorage.setItem('inviteusers', response.data)
                                    $scope.id= localStorage['session_Id'];
                                   $scope.invite = response.data;
                                   // console.log('log'+localStorage['inviteusers']);
                                   
                                    //$scope.newAudition.name=data.result.session_name;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                   $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/



                   
                                        
           

                      var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1></ion-header-bar> <ion-content > Hello! </ion-content></ion-popover-view>';

                    $scope.popover = $ionicPopover.fromTemplate(template, {
                      scope: $scope
                    });

                    // .fromTemplateUrl() method
                    $ionicPopover.fromTemplateUrl('my-popover.html', {
                      scope: $scope
                    }).then(function(popover) {
                      $scope.popover = popover;
                    });


                    $scope.openPopover = function($event) {
                      $scope.popover.show($event);
                      
                      //$scope.index=index;
                    };
                    $scope.closePopover = function() {
                      $scope.popover.hide();
                    };
                    //Cleanup the popover when we're done with it!
                    $scope.$on('$destroy', function() {
                      $scope.popover.remove();
                    });
                    // Execute action on hide popover
                    $scope.$on('popover.hidden', function() {
                      // Execute action
                    });
                    // Execute action on remove popover
                    $scope.$on('popover.removed', function() {
                      // Execute action
                    });
                    
            $scope.submitInvite=function(data){



              console.log(data);
                                                   $scope.arr = [];
                                                
                                                  for(var i in data){
                                                  if(data[i].SELECTED=='1')
                                                  $scope.arr.push(data[i].id+","+data[i].device_type)

                                                  }
                                                  console.log('chhhgdcjksdcscnscskjvkjjkc '+$scope.arr);

                                          
                                       
                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_responder/inviteReponder', 
                                          data: 
                                          { 

                                            session_Id:id,
                                            invite:$scope.arr
                                            
                                         // 'id':arr.id,
                                         //'device_id':arr.device_id
                                         // 'session_name':$scope.editdata.session_name,
                                          
                                          //'device_id':   '74673',
                                          // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                          if(data.response){
                                          // regsuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                          invitesuc();
                                          }else{
                                          $state.go("inviteUsers");
                                          console.log('data fail to submitted');
                                         // invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });
                                           }



                   $scope.inviteEmail=function(){
                                          $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/inviteUnregiterResponder', 
                                              data: 
                                          { 
                                                'session_Id':id,
                                                'mail_id':$scope.data.email,
                                                'first_name':$scope.data.firstname,
                                                'last_name':$scope.data.lastname
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                                invitesuc();
                                                $state.go("inviteUsers");
                                                console.log('data submitted');
                                          }else{
                                              $state.go("inviteUsers");
                                              console.log('data fail to submitted');
                                             invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }                        
                     });
                                         

                              invitesuc = function() {
                                              var alertPopup = $ionicPopup.alert({
                                              title: 'Alert',
                                              template: 'Invitations successfully send.'
                                              });
                                              alertPopup.then(function(res) {
                                              console.log('Invitations send');
                                               $scope.popover.hide();
                                              });
                              };
                             invitefail = function() {
                                             var alertPopup = $ionicPopup.alert({
                                             title: 'Alert',
                                             template: 'Invitations not send,Please try again.'
                                             });
                                             alertPopup.then(function(res) {
                                             console.log('Invitations not send,Please try again');
                                             });
                              };
 })
   
 .controller('talentPoolCtrl',function ($scope, $state, $http, $ionicPopup, $ionicPopover,$ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
   $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                          console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                            
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                $ionicLoading.show({
                                    template: 'Please Wait...'
                                });
                                var data={

                                session_id :id

                                };

                                
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/talent_pool',
                                    data:data,
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (response, status, header, config, message) {
                                $ionicLoading.hide();
                                if (response) {
                                      localStorage.setItem('session_Id', response.data.id)
                                      $scope.id= localStorage['session_Id'];
                                      $scope.talentpool = response.data;
                                      //console.log('log'+data.response.session_name);
                                      //$scope.newAudition.name=data.result.session_name;
                                    // $ionicLoading.hide();

                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                             
                             /////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////

            /*                                           POPpup       */

            ///////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////


                      var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1></ion-header-bar> <ion-content > Hello! </ion-content></ion-popover-view>';

                    $scope.popover = $ionicPopover.fromTemplate(template, {
                      scope: $scope
                    });

                    // .fromTemplateUrl() method
                    $ionicPopover.fromTemplateUrl('my-popover.html', {
                      scope: $scope
                    }).then(function(popover) {
                           $scope.popover = popover;
                      $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_sessions/invite/session/data',
                                    data:{
                                        requester_id: localStorage['rId'],
                                    },
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (response, status, header, config, message) {
                                //$ionicLoading.hide();
                                if (response) {
                                      $scope.invite = response.result;
                                      
                                }
                                
                                }).error(function (data, status, header, config, message) {
                              //  $ionicLoading.hide();

                                });
                    });


                    $scope.openPopover = function($event,data) {
                      $scope.popover.show($event);
                      //$scope.index=index;
                      var id=data;
                      console.log('requester id :'+id);
                      localStorage.setItem('responder_id',id)
                      console.log(localStorage['responder_id'])

                    };
                    $scope.closePopover = function() {
                      $scope.popover.hide();
                    };
                    //Cleanup the popover when we're done with it!
                    $scope.$on('$destroy', function() {
                      $scope.popover.remove();
                    });
                    // Execute action on hide popover
                    $scope.$on('popover.hidden', function() {
                      // Execute action
                    });
                    // Execute action on remove popover
                    $scope.$on('popover.removed', function() {
                      // Execute action
                    });



                    $scope.sendinvite=function(data){
                                     console.log(data);
                                                   $scope.arr = [];
                                                  for(var i in data){
                                                  if(data[i].SELECTED=='1')
                                                  $scope.arr.push(data[i].session_name)
                                                  }
                                                  console.log('chhhgdcjksdcscnscskjvkjjkc '+$scope.arr);

                                          
                                       
                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/invite/single/responder', 
                                          data: 
                                          { 

                                            'session_name':$scope.arr,
                                            'responder_id':localStorage['responder_id'],
                                           
                                            
                                         // 'id':arr.id,
                                         //'device_id':arr.device_id
                                         // 'session_name':$scope.editdata.session_name,
                                          
                                          //'device_id':   '74673',
                                          // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          //$ionicLoading.hide();
                                          if(data.response){
                                          // regsuc();
                                         // $state.go("openAuditions");
                                          console.log('data submitted');
                                         invitesuc();
                                          }else{
                                         // $state.go("inviteUsers");
                                          console.log('data fail to submitted');
                                         invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                          $ionicLoading.hide();
                                          });
                                           } 


                                    invitesuc = function () {
                                  var alertPopup = $ionicPopup.alert({
                                      title: 'Alert',
                                      template: 'You have successfully sent invitation'
                                  });
                                  alertPopup.then(function (res) {
                                        console.log('Successfully send invite');
                                        $scope.popover.hide();
                                        $scope.popover.remove();
                                  });
                                  console.log('Successfully send invite');
                                  $state.go('talentPool');
                                     }

                                invitesfail = function () {
                                  var alertPopup = $ionicPopup.alert({
                                      title: 'Alert',
                                      template: 'Something went worng!!. Please try again.'
                                  });
                                  alertPopup.then(function (res) {
                                          console.log(res);
                                          console.log(' invite not send');


                                        $scope.popover.hide();
                                      

                                  });
                                   $state.go('talentPool');
                          }                           
    });
                    
  })


  .controller('dashboardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){


  }]) 




    .controller('abouttalentpoolCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);

          $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var data={

                                id :id

                                };

                                $ionicLoading.show({
                                  template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/talentPoolInfo',
                                    data:data,
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (response, status, header, config, message) {
                                $ionicLoading.hide();
                                if (response) {
                                    localStorage.setItem('session_Id', response.data.id)
                                    $scope.id= localStorage['session_Id'];
                                    $scope.abouttalent= response.data;
                                    //console.log('log'+data.response.session_name);
                                    //$scope.newAudition.name=data.result.session_name;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                  $ionicLoading.hide();

                                });
                  });
  })

      .controller('newSubmissionCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Submissions";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                    template: 'Please Wait...'
                                });
                                $http({
                                method: 'post',
                                url: 'https://destini.io/ws_responder/responderData',
                                data:{
                                    'session_id':id,
                                    'flag':info,

                                },
                                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                   $scope.newsubmisson=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                  $scope.selected = function(data) {
                              var responses_id=data;

                              var confirmPopup = $ionicPopup.confirm({

                                   template: 'Are you sure you want to Select this responder for now',

                              });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

                  $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({ 

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });
                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });
                 };
                
                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                    });
                   };
                   $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });
                   };
                   $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.newsubmisson.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("newsubmission");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }

                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
                });
  })  


  .controller('selectedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);  
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Selected";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";

                                $ionicLoading.show({
                                   template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                    },
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                     $scope.selecteddata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                   $ionicLoading.hide();

                                });
                      $scope.rejected = function(data) {
                            var responses_id=data;

                            var confirmPopup = $ionicPopup.confirm({

                            template: 'Are you sure you want to Reject this responder for now',

                          });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                  });

                };

                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                  });
               };
              $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({
                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                    });
             };
             $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.selecteddata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("selected");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         } 


                           $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
        });
    })  
    .controller('rejectedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
             console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Rejected";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                    },
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                    $scope.rejecteddata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                 $ionicLoading.hide();

                                });
                                
               $scope.selected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({
                      template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                  };

                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.rejecteddata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("rejected");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }


                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
          });
    })  
    .controller('pendingCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$ionicPopover,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
         $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Pending";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_responder/responderData',
                                  data:{
                                      'session_id':id,
                                      'flag':info,

                                  },
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                  $scope.pendingdata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                    $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

                  $scope.selected = function(data) {
                    var responses_id=data;

                    var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                  };
                 $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.pendingdata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("pending");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }



                           $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
                });
  })  
   .controller('trashCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicPopover,$cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Trash";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                 template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                },
                                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                  $ionicLoading.hide();
                                  if (data.response) {
                                    $scope.trashdata=data.result;
                                 
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                     $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

             $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                         template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                   });

                  };
                  $scope.selected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                       template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("openAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                      };
                      $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.trashdata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("trash");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }





                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
                  });
  }) 



  .controller('invitenewSubmissionCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
   function ($scope, $state, $http, $ionicPopup, $ionicLoading,$ionicPopover, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Submissions";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                    template: 'Please Wait...'
                                });
                                $http({
                                method: 'post',
                                url: 'https://destini.io/ws_responder/responderData',
                                data:{
                                    'session_id':id,
                                    'flag':info,

                                },
                                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                   $scope.newsubmisson=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                  $scope.selected = function(data) {
                              var responses_id=data;

                              var confirmPopup = $ionicPopup.confirm({

                                   template: 'Are you sure you want to Select this responder for now',

                              });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

                  $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({ 

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });
                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });
                 };
                
                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                    });
                   };
                   $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });
                   };
                   $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.newsubmisson.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("invitenSubmission");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }
                      
                        $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
              

                });
  })  


  .controller('inviteselectedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
 function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicPopover,$cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Selected";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";

                                $ionicLoading.show({
                                   template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                    },
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                     $scope.selecteddata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                   $ionicLoading.hide();

                                });
                      $scope.rejected = function(data) {
                            var responses_id=data;

                            var confirmPopup = $ionicPopup.confirm({

                            template: 'Are you sure you want to Reject this responder for now',

                          });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                  });

                };

                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                  });
               };
              $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({
                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                    });
             };
             $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.selecteddata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("inviteSelected");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         } 

                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
        });
    })  
    .controller('inviterejectedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicPopover,$cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
          $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
             console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Rejected";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                    },
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                    $scope.rejecteddata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                 $ionicLoading.hide();

                                });
                                
               $scope.selected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({
                      template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                  };

                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.rejecteddata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("inviteRejected");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }

                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
          });
    })  
    .controller('invitependingCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
   function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicPopover,$cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Pending";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_responder/responderData',
                                  data:{
                                      'session_id':id,
                                      'flag':info,

                                  },
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                  $scope.pendingdata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                    $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

                  $scope.selected = function(data) {
                    var responses_id=data;

                    var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                  };
                 $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.pendingdata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("invitePending");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }
                          

                           $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }


                });
  })  
   .controller('invitetrashCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup, $ionicLoading,$ionicPopover, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Trash";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                 template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                },
                                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                  $ionicLoading.hide();
                                  if (data.response) {
                                    $scope.trashdata=data.result;
                                 
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                     $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

             $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                         template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditionss");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                   });

                  };
                  $scope.selected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                       template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("inviteOnlyAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                      };
                      $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.trashdata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("inviteTrash");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }


                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
                  });
  }) 


.controller('deletenewSubmissionCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicPopover,$cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Submissions";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                    template: 'Please Wait...'
                                });
                                $http({
                                method: 'post',
                                url: 'https://destini.io/ws_responder/responderData',
                                data:{
                                    'session_id':id,
                                    'flag':info,

                                },
                                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                   $scope.newsubmisson=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                  $scope.selected = function(data) {
                              var responses_id=data;

                              var confirmPopup = $ionicPopup.confirm({

                                   template: 'Are you sure you want to Select this responder for now',

                              });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

                  $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({ 

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });
                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });
                 };
                
                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                    });
                   };
                   $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });
                   };
                   $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.newsubmisson.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("deleteSubmission");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }

                         $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
                });
  })  


  .controller('deleteselectedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicPopover,$cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
           $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Selected";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";

                                $ionicLoading.show({
                                   template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                    },
                                    headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                     $scope.selecteddata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                   $ionicLoading.hide();

                                });
                      $scope.rejected = function(data) {
                            var responses_id=data;

                            var confirmPopup = $ionicPopup.confirm({

                            template: 'Are you sure you want to Reject this responder for now',

                          });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                  });

                };

                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                  });
               };
              $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({
                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }
                    });
             };
             $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.selecteddata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("deleteSelected");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         } 


                        $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
        });
    })  
    .controller('deleterejectedCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $state, $http, $ionicPopup, $ionicLoading,$ionicPopover, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
            $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
             console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Rejected";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                    },
                                headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                    $scope.rejecteddata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                 $ionicLoading.hide();

                                });
                                
               $scope.selected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({
                      template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                  };

                $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.rejecteddata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("deleteRejected");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }


                         $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
          });
    })  
    .controller('deletependingCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
   function ($scope, $state, $http, $ionicPopup, $ionicLoading,$ionicPopover, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
         $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Pending";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_responder/responderData',
                                  data:{
                                      'session_id':id,
                                      'flag':info,

                                  },
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                                }).success(function (data, status, header, config, message) {
                                $ionicLoading.hide();
                                if (data.response) {
                                  $scope.pendingdata=data.result;
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                    $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

                  $scope.selected = function(data) {
                    var responses_id=data;

                    var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                  };
                 $scope.trash = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      

                      template: 'Are you sure you want to Trash the responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Trash,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };
                  $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.pendingdata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("deletePending");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }

                        $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }
                });
  })  
   .controller('deletetrashCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup, $ionicLoading,$ionicPopover, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
            $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                var info="Trash";
                                var Selected="Selected";
                                var Rejected="Rejected";
                                var Pending="Pending";
                                var Trash="Trash";
                               

                                $ionicLoading.show({
                                 template: 'Please Wait...'
                                });
                                $http({
                                    method: 'post',
                                    url: 'https://destini.io/ws_responder/responderData',
                                    data:{
                                        'session_id':id,
                                        'flag':info,

                                },
                                headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                }
                                }).success(function (data, status, header, config, message) {
                                  $ionicLoading.hide();
                                  if (data.response) {
                                    $scope.trashdata=data.result;
                                 
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                                /*localStorage['audi']=$stateParams.auditionId;
                                var aud_id = $stateParams.auditionId;
                                console.log(aud_id+'here it is');*/
                     $scope.rejected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                      template: 'Are you sure you want to Reject this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Rejected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                    });

                  };

             $scope.pending = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                         template: 'Are you sure you want to put in the Pending list this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Pending,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                   });

                  };
                  $scope.selected = function(data) {
                      var responses_id=data;

                      var confirmPopup = $ionicPopup.confirm({

                       template: 'Are you sure you want to Select this responder for now',

                      });

                      confirmPopup.then(function(res) {

                      if (res) {

                         console.log('You clicked on "OK" button');
                                $http({
                                    method: 'POST',
                                    url: 'https://destini.io/ws_responder/SRPTSresponders', 
                                    data: 
                                    { 
                                      'response_id':responses_id,
                                       'flag':Selected,

                                    }, 
                                    headers: 
                                    {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                    }).success(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    if(data.response){
                                    // regsuc();
                                          console.log('data submitted');
                                        //  invitesuc();
                                          $state.go("closedAuditions");
                                          console.log('data submitted');
                                    }else{
                                    //$state.go("tabsController.inviteUsers");
                                          console.log('data fail to submitted');
                                       //   invitesfail();
                                    }
                                    }).error(function(data, status, header, config, message) {
                                    $ionicLoading.hide();
                                    });

                      } else {

                         console.log('You clicked on "Cancel" button');

                      }

                      });

                      };
                      $scope.submitcomment=function(data){
                                         var responses_id=data;
                                           $http({
                                              method: 'POST',
                                              url: 'https://destini.io/ws_responder/editComment', 
                                              data: 
                                          { 
                                                'respons_id':data,
                                                'comments':$scope.trashdata.comment,
                                                
                                                
                                             // 'id':arr.id,
                                             //'device_id':arr.device_id
                                             // 'session_name':$scope.editdata.session_name,
                                              
                                              //'device_id':   '74673',
                                              // 'device_type': 'android'*/
                                          }, 
                                          headers: 
                                          {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                          }
                                          }).success(function(data, status, header, config, message) {

                                          $ionicLoading.hide();
                                              if(data.response){
                                              // regsuc();
                                                console.log('data submitted');
                                               // invitesuc();
                                                $state.reload("deleteTrash");
                                                console.log('data submitted');
                                          }else{
                                              //$state.go("tabsController.inviteUsers");
                                              console.log('data fail to submitted');
                                            //invitesfail();
                                          }
                                          }).error(function(data, status, header, config, message) {
                                            $ionicLoading.hide();
                                          });
                         }
                         
                          $scope.save = function(responder,session,responses) {
                             var responder=responder;
                             var session=session;
                             var responses=responses;
                            localStorage.setItem('viewresponderId',responder);
                            localStorage.setItem('viewsession',session);
                            localStorage.setItem('responseId',responses);
                            console.log('localresponder'+localStorage['viewresponderId']);
                            console.log('localresponses'+localStorage['responseId']);
                            var responses_id=localStorage['viewsession'];
                            console.log('local'+responses_id);
                            $state.go("tabsController.profile");
                    }

                  });
  })


  .controller('viewCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $timeout,$ionicPopup, $ionicLoading,$ionicPopover,$cordovaInAppBrowser, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams){
        $ionicSideMenuDelegate.canDragContent(false);
            $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');


                                viewData.enableBack = true;
                                console.log($stateParams);
                                console.log($stateParams.id);
                                var id =$stateParams.id;
                                console.log(id);
                                $scope.id=id;
                                
                               

                                $ionicLoading.show({
                                template: 'Please Wait...'
                                });
                                $http({
                                  method: 'post',
                                  url: 'https://destini.io/ws_responder/responderSData',
                                  data:{
                                      'response_id':localStorage['responseId'],
                                    

                                },
                                  headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                                }).success(function (response, status, header, config, message) {
                                $ionicLoading.hide();
                                if (response) {
                                  $scope.viewdata=response;
                                 // $scope.viewvideo='http://destini.io/public/frontEnd/uploads/video/'+response.video[0];//+'?s=43df5df0d733011263687d20a47557e4';
                                }
                                //LoadingSpinner.hide('pageLoading');
                                }).error(function (data, status, header, config, message) {
                                $ionicLoading.hide();

                                });
                               });

   var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };

   $scope.openBrowser= function(link) {
    console.log('link :'+link)
     var linkvideo=link;
     console.log('linkvideo :'+linkvideo)
      $cordovaInAppBrowser.open(linkvideo, '_blank')
    
      .then(function(event) {
         // success
      })
    
      .catch(function(event) {
         // error
      });
   }
   $scope.openvideo= function() {
  //  console.log('link :'+link)
  //   var link=link;
      $cordovaInAppBrowser.open('http://destini.io/public/frontEnd/uploads/video/164_1050526642001475837745.mp4', '_blank')
    
      .then(function(event) {
         // success
      })
    
      .catch(function(event) {
         // error
      });
   }
   
                         $scope.download=function(data){

                         	            console.log('ssssssss');
                                        var responder_id=data;

                                          $http({
                                          method: 'POST',
                                          url: 'https://destini.io/ws_requester/download/responder/document', 
                                          data: 
                                          { 

                                            'session_id':localStorage['viewsession'],
                                            'responder_id':localStorage['viewresponderId'],
                                          
                                          }, 
                                         headers : {
                                              'Content-type' : 'application/zip',
                                          },
                                     //  responseType : 'arraybuffer'
                                          }).success(function(data, status, header, config, message) {
                                                  console.log('reeee'+JSON.stringify(data.response));
                                                 if(data.response==true) {
                                                 localStorage.setItem('link',data.result);
                                                 console.log('gdgd'+localStorage['link']);
                                                  downloadFile()
                                                 }
                                                 else{
                                                 	alert('No document to download');
                                                 }        
                                          }).error(function(data, status, header, config, message) {
                                         // $ionicLoading.hide();
                                           console.log('reeeretggrte'+JSON.stringify(data));
                                          });
                                        downloadFile = function() {
                                        var url = "http://destini.io/public/frontEnd/uploads/documents/"+localStorage['link'];
                                        var filename = url.split("/").pop();
                                       //alert(filename);
                                        var targetPath = cordova.file.externalRootDirectory + filename;
                                        var trustHosts = true;
                                        var options = {};
                                        alert('Documents will be downloaded at location: '+cordova.file.externalRootDirectory);
                                        
				                                  
                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                          .then(function(result) {
                                          	
                                            console.log('result'+JSON.stringify(result));
                                           // alert('Documents downloaded successfully plese check on location: '+targetPath);
                                            $ionicLoading.hide();
                                          }, function(error) {
                                            console.log('errror :'+JSON.stringify(error));
                                            alert(JSON.stringify(error));
                                          }, function (progress) {
                                          	var downloadProgress = (progress.loaded / progress.total) * 100;
                                              console.log('downloadProgress'+downloadProgress);
                                              $ionicLoading.show({
				                                      template: "downloading please wait... "+ Math.floor(downloadProgress)+'%'
				                                  });
                  
                                          });
                                        // $ionicLoading.hide();
                                        }

                                 }


             
})  

.controller('requesterProfileCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $http, $ionicPopup,$ionicPopover, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$cordovaCamera,$cordovaImagePicker){
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    
                                console.debug('[StoryController] $ionicView.beforeEnter');
             $ionicLoading.show({
                             template: 'Please Wait..'
                        });
                            $http({
                                  method: 'POST',
                                  url: 'https://destini.io/ws_sessions/sessions/count',
                                  data: {
                                    'requester_id': localStorage['rId'],
                                  },
                                  headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                            }).success(function (data, status, header, config, message) {
                                 $ionicLoading.hide();
                                 console.log('data');
                                        console.log(data);
                                    if (data) {
                                                  $scope.count=data.result;
                                                  console.log('asgh'+$scope.count);
                                            } else {
                                                   //logfail();
                                                    }

                                }).error(function (data, status, header, config, message) {
                                                   $ionicLoading.hide();
                                                   });


                                    $http({
                                  method: 'POST',
                                  url: 'https://destini.io/ws_requester/profile',
                                  data: {
                                    'requester_id': localStorage['rId'],
                                  },
                                  headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                  }
                            }).success(function (response, status, header, config, message) {
                                 $ionicLoading.hide();
                                 console.log('response');
                                        console.log(response.result.age);
                                    if (response) {
                                                  $scope.profile=response.result;
                                                  console.log('asgh'+$scope.profile.age);
                                            } else {
                                                   //logfail();
                                                    }

                                }).error(function (data, status, header, config, message) {
                                                   $ionicLoading.hide();
                                                   });


               $scope.editProfileData=function(){

                        $ionicLoading.show({
                            template: 'Please Wait...'
                        });
                        console.log('requester id' + localStorage['rId']);
                        $http({
                            method: 'POST',
                            url: 'https://destini.io/ws_requester/profile/edit', 
                            data: 
                            { 
                                 'requester_id': localStorage['rId'], 
                                 'first_name':$scope.profile.first_name,
                                 'last_name':$scope.profile.last_name,
                                 'email':$scope.profile.email,
                                 'contact':$scope.profile.contact,
                                 'organisation_name':$scope.profile.organisation_name,
                                 'age':$scope.profile.age,   
                                 'movies_credits':$scope.profile.movies_credits, 
                                 'zipcode':$scope.profile.zipcode,
                                 'Website':$scope.profile.website,
                                 'about_me':$scope.profile.about_me,
                                 'intro_video':$scope.profile.intro_video,
                                 'facebook_profile_link':$scope.profile.facebook_profile_link,
                                 'twitter_profile_link':$scope.profile.twitter_profile_link,  
                      }, 
                      headers: 
                          {
                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                          }
                      }).success(function(data, status, header, config, message) {

                                $ionicLoading.hide();
                                if(data.response){
                                
                                
                                editsuc();
                                console.log('data submitted');
                        }else{
                                 console.log('data fail to submitted');
                                 editfail();
                        }
                      }).error(function(data, status, header, config, message) {
                                 $ionicLoading.hide();
                                  editfail();
                      });
                   }


                    editsuc = function () {
                                $state.go("requesterProfile")
                               /* var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: 'Profile change successfully.'
                                });
                                alertPopup.then(function (res) {
                                      console.log('session deleted');
                                      
                                });*/
                                console.log('successfully');
                                
                               //$state.go("tabsController.closedAuditions");
                                        }
                  editfail = function () {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert',
                                    template: 'Something went worng !!. Please try again.'
                                });
                                alertPopup.then(function (res) {
                                        console.log(res);
                                        console.log('not success');
                                 });
                                     }


               $scope.takePicture = function (options) {
                           console.log("this is camera function");
                          var path;
                          var options = {
                              quality: 100,
                              targetWidth: 200,
                              targetHeight: 200,
                              sourceType: 1
                          };
                          console.log(options);
                             $cordovaCamera.getPicture(options).then(function (imageData) {
                              var url = encodeURI("https://destini.io/ws_requester/upload/profile/image");
                              var filename = localStorage['rId']  + '.jpeg';
                              var fileUrl = imageData;
                              $scope.picture = imageData.split('?')[0];
                              console.log($scope.picture);
                              path = imageData;
                              var options = {
                                  fileKey: "img",
                                  fileName: filename,
                                  httpMethod: 'POST',
                                  params: {
                                      requester_id:localStorage['rId'] 
                                  },
                                  trustAllHosts: true,
                                  chunkedMode: false,
                                  mimeType: "image/jpeg",
                              };
                              options.headers = {
                                  Connection: "close"
                              };
                              console.log("requester id " + localStorage['rId']);
                              var fileTransfer = new FileTransfer();
                              $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function (result) {
                                  console.log("SUCCESS: " + JSON.stringify(result));

                                  //alert("success");
                                  console.log("uploading image");
                                  $scope.picture = imageData.split('?')[0];
                                  console.log("result is" + result);
                                  console.log("result is" + JSON.stringify(result));
                                  //
                              }, function (err) {
                                  console.log("ERROR: " + JSON.stringify(err));
                                  $ionicLoading.hide();
                                  alert('ERROR:' + JSON.stringify(err));
                              }, function (progress) {
                                 console.log('progress');
                                  var progress_status = (progress.loaded / progress.total) * 100;
                                  $ionicLoading.show({
                                      template: "Uploading please wait... "+ Math.floor(progress_status)
                                  });
                                  $ionicLoading.hide();
                                   
                              });
                           
                                 
                                alert('Photo Saved Sucessfully!');
                                  $state.reload();
                               
                          }, function (err) {
                              console.log(err);
                          });
                      
              };
            });
  })

.controller('stripeCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$ionicPopover) {
    $scope.results=[];
    $scope.cardType = {};
    $scope.card = {};

    $scope.makeStripePayment = makeStripePayment;


    /**
     */
    function makeStripePayment(_cardInformation) {

      if (!window.stripe) {
        alert("stripe plugin not installed");
        return;
      }

      if (!_cardInformation) {
        alert("Invalid Card Data");
        return;
      }
      stripe.charges.create({
          // amount is in cents so * 100
          amount: _cardInformation.amount * 100,
          currency: 'usd',
          card: {
            "number": _cardInformation.number,
            "exp_month": _cardInformation.exp_month,
            "exp_year": _cardInformation.exp_year,
            "cvc": '123',
            "name": "Aaron Saunders"
          },
          description: "Stripe Test Charge"
        },
        function(response) {
          $scope.results=angular.fromJson(response);
          console.log(JSON.stringify(response, null, 2));
          //alert(JSON.stringify(response, null, 2));
          pay($scope.results)
        },
        function(response) {
           $scope.result=angular.fromJson(response);
         // alert(JSON.stringify(response))
        } // error handler
      );
    }



       pay = function(results){
                     var paydata=results;
                       console.log('data'+paydata);     

                   $ionicLoading.show({
                            template: 'Please Wait...'
                        });
                        console.log('requester id' + localStorage['rId']);
                        $http({
                            method: 'POST',
                            url: 'https://destini.io/ws_requester/subscription/details', 
                            data: 
                            { 
                                 'requester_id': localStorage['rId'], 
                                 'transaction_id':paydata.id,
                                 
                      }, 
                      headers: 
                          {
                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                          }
                      }).success(function(data, status, header, config, message) {

                                $ionicLoading.hide();
                                if(data.response){
                                   console.log('pay responsce'+data.response)
                               //  $state.go("stripes");
                              //  editsuc();
                                console.log('data submitted');
                        }else{
                                 console.log('data fail to submitted');
                               //  editfail();
                        }
                      }).error(function(data, status, header, config, message) {
                                 $ionicLoading.hide();
                               //   editfail();
                      });
                    
                     
                };
})

 .controller('membershipCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
   function ($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaFileTransfer,$cordovaDevice, $ionicPlatform,$ionicSideMenuDelegate,$stateParams,$ionicPopover){
     $scope.$on('$ionicView.beforeEnter', function(event, viewData) {

               $scope.email=localStorage['rEmail'];
               console.log($scope.email);
               viewData.enableBack = true;
               viewData.hideMenu = true;
               });
                $scope.member = function(){

                            

                   $ionicLoading.show({
                            template: 'Please Wait...'
                        });
                        console.log('requester id' + localStorage['rId']);
                        $http({
                            method: 'POST',
                            url: 'https://destini.io/ws_requester/subscription', 
                            data: 
                            { 
                                 'requester_id': localStorage['rId'], 
                                 
                      }, 
                      headers: 
                          {
                          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                          }
                      }).success(function(data, status, header, config, message) {
                                 $state.go("stripes");
                                $ionicLoading.hide();
                                if(data.response==true){
                                   
                                 $state.go("stripes");
                              //  editsuc();
                                console.log('data submitted'+ JSON.stringify(data));
                        }else{
                                 console.log('data fail to submitted');
                                 alreadypay(data.message);
                        }
                      }).error(function(data, status, header, config, message) {
                                 $ionicLoading.hide();
                               console.log('data fail to submitted'+data.response);
                      });
                    
                     
                };



               alreadypay = function (data) {
                    var data=data;
                                  var alertPopup = $ionicPopup.alert({
                                      title: 'Alert',
                                      template: 'data'
                                  });
                                  alertPopup.then(function (res) {
                                        // $state.go('myDashboard');
                                        console.log('Login Successfully');
                                  });
                                
                                  
                      }
                 $scope.back = function(){

                    
                 }
                 
    
  })


.controller('videoPlayCtrl',   function($scope,  $ionicModal, $ionicPlatform, $cordovaMedia, $timeout, $fileFactory,$cordovaCamera) {

$scope.video1="";



var src = "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
   var media = $cordovaMedia.newMedia(src);
   
   var iOSPlayOptions = {
    numberOfLoops: 2,
    playAudioWhenScreenIsLocked : false
  }

            // promise completion
            
        

    $scope.play = function(){
         media.play();
    };
    $scope.pause = function(){
        media.pause();
    };



    var fs = new $fileFactory();

    $ionicPlatform.ready(function() {
        fs.getEntriesAtRoot().then(function(result) {
            $scope.files = result;
        }, function(error) {
            console.error(error);
        });

        $scope.getContents = function(path) {
            fs.getEntries(path).then(function(result) {
                $scope.files = result;
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }
    });

    $scope.pickVideo = function() {

      var options = {

        mediaType: Camera.MediaType.VIDEO,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY

        };

      $cordovaCamera.getPicture(options).then(function(videoUrl) {
          console.log("file:/"+videoUrl);
          video1="file:/"+videoUrl;
          $scope.video1=video1;
      $scope.videoUrl = 'file//'+videoUrl+"test";      console.log("select:"+videoUrl);
      console.log("path"+video1);
    // alert('$scope.videoUrl: '+ video1);
      });

    };
    var res_id=localStorage['rId'];
var audi_id=localStorage['audi'];
$scope.showValue=function(){
    fileChooser.open(function(uri) {
    $scope.btn_val=uri;
    console.log("select path:"+uri);
 //   $scope.video2=uri
    // alert('Url: '+video2);
    
    });
    }

})

