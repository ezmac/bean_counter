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
var controllers = angular.module('BeanCounterControllers',[])
var app = angular.module('BeanCounterApp', [ 'BeanCounterServices'])
app.controller('BeanCounterCtrl', ['$scope', 'Computer', function($scope, Computer) {
  var computers = Computer.query(function(data){

    var modified_computers = data;
/*
    angular.forEach(data, function(computer, key){
      console.log(computer);
      modified_computers[key]['x'] = ((computer.x / image_width * 100)) + '%';
      modified_computers[key]['y'] = ((computer.y / image_height * 100)) + '%';
    });
    */
    $scope.computers = modified_computers;
  });
  $scope.img = $("#floorplanimage");
  $scope.real_img = $("<img/>")
    .attr("src", $($scope.img).attr("src"))
    .load(function() {
        $scope.pic_real_width = this.width;   // Note: $(this).width() will not
        $scope.pic_real_height = this.height; // work for in memory images.
    });
  $scope.real_img.on('load', function(){
    $scope.$apply();
  });
  $scope.display = function(computer) {
    if (computer.status == 'used') {
      return 'unavailable';
    }
    if (computer.status == 'free') {
      return 'available';
    }

  }
  $scope.percent_x = function(computer){
    var image_width = $scope.pic_real_width;
    percent = ((computer.x / image_width * 100)) ;
    //console.log(computer.name + " X:"+ computer.x+ " %:" +percent + "  iw:"+ image_width +" " + percent/100*image_width);
    return percent+'%';
  }
  $scope.percent_y = function(computer){
    var image_height = $scope.pic_real_height;
    return ((computer.y / image_height * 100)) + '%';
  }
  //.success(
    //somewhere in here, we should set the X and Y to the correct %.
    //);

}]);




var beancounterServices = angular.module('BeanCounterServices', ['ngResource'])
.factory('Computer', ['$resource',
    function($resource){
      return $resource('api/computers/',{}, {
        query: { method:'GET', isArray:true}
      });
    }
  ])
