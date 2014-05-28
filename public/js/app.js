'use strict';
angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'ui.bootstrap',
     "xeditable"
], function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).
run(function(editableOptions) {
  editableOptions.theme = 'bs2';
}).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/',{
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);
angular.module('filters', [])
    .filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function(a, b) {
                return (a[field] > b[field]);
            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    });