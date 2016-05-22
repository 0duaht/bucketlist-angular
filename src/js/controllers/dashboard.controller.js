(function(){
  angular.module("bucketlist.controllers")
  .controller("DashboardController", DashboardController)

  function DashboardController($scope, Bucketlist){
    $scope.$parent.loggedIn = true;

    $scope.addBucketlist = function(){
      if ($scope.bucketName == "") return
      var newBucket = new Bucketlist({name: $scope.bucketName})
      $scope.$parent.showDialog();
      newBucket.$save(function(){
        $scope.bucketName = "";
        $scope.refreshList();
        $scope.$parent.hideDialog();
      })
    }

    $scope.refreshList = function(){
      Bucketlist.query(function(data){
        $scope.bucketlists = data
      })
    }

    $scope.refreshList();
  }
  DashboardController.$inject = ["$scope", "Bucketlist"]
})();