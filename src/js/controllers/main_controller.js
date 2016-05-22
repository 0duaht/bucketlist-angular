(function(){
  angular.module("bucketlist.controllers")
  .controller("MainController", MainCtrl)
  

  MainCtrl.$inject = ["$scope", "$uibModal", "AuthService", "$state", "$cookies"]
  function MainCtrl($scope, $uibModal, AuthService, $state, $cookies){
    var loggedIn = $cookies.get("loggedIn")
    if (loggedIn && loggedIn == "1") $scope.loggedIn = true;
    else $scope.loggedIn = false;

    $scope.showDialog = function(){
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "modals/loading.html",
        controller: ModalInstanceCtrl
      });
    }

    $scope.hideDialog = function(){
      $scope.modalInstance.dismiss();
    }

    $scope.logOut = function(){
      $scope.showDialog();
      AuthService.logOut()
      .then(function(){
        $cookies.remove("jwt-token")
        $cookies.remove("loggedIn")
        $scope.loggedIn = false;
        $scope.hideDialog()
        $state.go("home")
      }, function(){

      })
    }
  }

  function ModalInstanceCtrl($scope, $uibModalInstance){
    $scope.cancel = function(){
      $uibModalInstance.dismiss();
    }
  }
  ModalInstanceCtrl.$inject = ["$scope", "$uibModalInstance"]
})();