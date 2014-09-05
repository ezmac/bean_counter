//http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
//
  /*
app.factory('socket', function($rootScope){
  var socket = io.connect();
  return {
    on: function (eventName, callback){
      socket.on(eventName, function(){
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args= arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    };
  });

function BeancounterCtrl($scope, socket){
  socket.on('init', function (data){
    $scope.name = data.name;
  });
  socket.on('send:message', function (message) {
    $scope.message.push(message);
  });
  socket.on('change:name
  dropped planned support for socket to learn a little angular.

  */
var beancounterServices = angular.module('BeanCounterServices', ['ngResource'])

.factory('Computer', ['$resource',
    function($resource){
      return $resource('computers/',{}, {
        query: { method:'GET', isArray:true}
      });
    }
  ])
.controller('BeanCounterCtrl', ['$scope', 'Computer', function($scope, Computer) {
  $scope.computers = Computer.query();
}]);
debugger



var app = angular.module('BeanCounterApp', [ 'BeanCounterServices'])
