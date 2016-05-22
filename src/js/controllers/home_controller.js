(function(){
  angular.module("bucketlist.controllers")
  .controller("HomeController", HomeCtrl)
  
  HomeCtrl.$inject = ["$scope", "userService", "$state", "$cookies"];

  function HomeCtrl($scope, userService, $state, $cookies){
    $scope.email = ""
    $scope.password = ""
    $scope.password_confirm = ""
    $scope.name = ""
    $scope.error = ""
    
    $scope.loginUser = function(){
      if (!$scope.email && !$scope.passsword) {
        $scope.error = "Fill in required values."
        return
      }
      $scope.$parent.showDialog();
      userService.loginUser($scope.email, $scope.password)
      .then(treatSuccess, treatError)

      $scope.email = ""
      $scope.password = ""
    }

    $scope.registerUser = function(){
      if ($scope.password != $scope.password_confirm){
        $scope.error = "Passwords do not match"
        return;
      }

      if (!$scope.email && !$scope.passsword &&
          !$scope.passsword_confirm && !$scope.name) {
        $scope.error = "Fill in required values."
        return
      }

      if (!$scope.email && !$scope.passsword) return
      $scope.error = ""

      $scope.$parent.showDialog();
      userService.registerUser($scope.name, $scope.password, $scope.email)
      .then(startLogin, treatError)
    }

    function startLogin(){
      userService.loginUser($scope.email, $scope.password)
      .then(treatSuccess, treatError)
    }

    function treatSuccess(res){
      $scope.$parent.hideDialog();
      $scope.$parent.loggedIn = true;
      $cookies.put("jwt-token", res.data.token)
      $cookies.put("loggedIn", "1")
      $state.go("dashboard")
    }

    function treatError(res){
      $scope.$parent.hideDialog();
      if (res.data && res.data.message){
        $scope.error = res.data.message
      }
    }
  }
})();