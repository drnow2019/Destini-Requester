angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])


.factory('localstorage', ['$window', '$localStorage','$q', function ($window, $localStorage,$q) {
    return {
        set: function (key, value) {
            $window.localStorage.setItem(key, value);
        },
        get: function (key, defaultValue) {
            return $window.localStorage.getItem(key) || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage.getItem(key) || '{}');
        },
        clear: function () {
            $window.localStorage.clear();
        }
    }

}]);

