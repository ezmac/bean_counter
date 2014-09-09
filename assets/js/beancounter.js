//http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
//
var app = angular.module('BeanCounterApp', [ 'BeanCounterServices'])

app.controller('BeanCounterCtrl', ['$scope', 'Computer', function($scope, Computer) {

  //connect to the websocket.
  io.socket.get('/api/computers/');
  io.socket.on('connect', function(){console.log('connect')});
  var computers = Computer.query(function(data){
    var modified_computers = data;
    $scope.computers = modified_computers;
  });

  io.socket.on('computer', function(data){
    angular.forEach(data.data, function(data, idx){

      var comp = _.find($scope.computers, function(computer){return computer.id ==data.id;});
      angular.extend(comp, data);
    });
    $scope.$apply();
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
