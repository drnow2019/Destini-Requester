// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ngCordova',  'ionic.cloud','ngSanitize','app.controllers', 'app.routes', 'app.directives','app.services','ui.utils.masks'])


.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "836bb59a"
    },
    "push": {
      "sender_id": "336335610812",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})

.run(function($ionicPlatform,$rootScope,$ionicPopup,$state) {


  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="loginAsRequester"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);


    $ionicPlatform.ready(function() {


      var permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionCallback, null);
             
            function checkPermissionCallback(status) {
              if(!status.hasPermission) {
                var errorCallback = function() {
                  console.warn('Camera permission is not turned on');
                }
             
                permissions.requestPermission(
                  permissions.WRITE_EXTERNAL_STORAGE,
                  function(status) {
                    if(!status.hasPermission) errorCallback();
                  },
                  errorCallback);
              }
            }
 
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    
})
.filter('trustAsResourceUrl', ['$sce', function($sce) {
return function(val) {
    return $sce.trustAsResourceUrl(val);
};

}])

.filter('trustAsResourceUrll', ['$sce', function($sce) {
return function(val) {
    return $sce.trustAsResourceUrl('http://destini.io/public/frontEnd/uploads/video/');
};

}])
.filter('tel', function () {
    return function (phoneNumber) {
        if (!phoneNumber)
            return phoneNumber;

        return formatLocal('US', phoneNumber);

    }
})
