'use strict';
angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', '$http', 
    function($scope, $rootScope, $window, $location, $http) {
      // var web_link = "https://docs.google.com/spreadsheets/d/12Fc2PeBYeOeQb5QtbpRVz4lOekIVPru0E8VF5hgjK60/pubhtml";
      
    }
  ])
  .controller('HomeCtrl', ['$scope', "$http","MyServices",
    function($scope, $http, MyServices) {
        var socket = io.connect('http://127.0.0.1:3001');
        socket.on('new row', function(data) {
          $scope.ideas =  MyServices.objectToArray(data);
          /*socket.emit('client', {
            my: 'data'
          });*/
        $scope.$apply();
        });
        //openssl pkcs12 -in documents\google_keys\my_google_key.p12 -out document\google_keys\my_google_pem.pem -nodes
       /* var web_link = "http://cors.io/spreadsheets.google.com/feeds/list/12Fc2PeBYeOeQb5QtbpRVz4lOekIVPru0E8VF5hgjK60/od6/public/values?alt=json"
        $http.get(web_link)
          .success(function(d) {
            $scope.ideas = d.feed.entry.map(function(d, i){
               return {
                  idea: d['gsx$idea'].$t,
                  details: d['gsx$details'].$t,
                  initiator: d['gsx$initiator'].$t
               }
            });
          })
          .error(function(d) {

          })*/
        $scope.getSheet = function() {
           $http.get('/sheet')
           .success(function(d){
             $scope.ideas =  MyServices.objectToArray(d);
           })
           .error(function(d){
             console.log(d);
           })
        }
        $scope.getSheet();
        $scope.postData=function(){
          if($scope.idea_statement &&  $scope.idea_details && $scope.idea_initiator){
                  var url = "/addrows";
                  var data = {
                    data: [$scope.idea_statement, $scope.idea_details, $scope.idea_initiator]
                  };
                  $http.post(url, data)
                    .success(function(d) {
                      console.log(d);
                    })
                    .error(function(d) {
                      console.log(d);
                    })
          }
          

        }
    }
  ])
  .factory("MyServices",[ function(){
     return {
        "objectToArray": function( array_like_object) {
            var array_data = [];
            Object.keys(array_like_object).map(function(d,i){
               array_data[+d] = array_like_object[d];
            })
            return array_data;
        }
     }
  }])
  
  