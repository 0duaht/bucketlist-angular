(function(){
  angular.module("bucketlist.controllers")
  .controller("DashboardController", DashboardController)

  function DashboardController($scope, Bucketlist, Item, $timeout){
    $scope.$parent.loggedIn = true;
    $scope.addBucketlist = function(){
      if ($scope.names.bucketlist == "") return
      var newBucket = new Bucketlist({name: $scope.names.bucketlist})
      $scope.$parent.showDialog();
      newBucket.$save(function(){
        $scope.names.bucketlist = "";
        $scope.refreshList();
        $scope.$parent.hideDialog();
      })
    }

    $scope.refreshList = function(){
      Bucketlist.query(function(data){
        $scope.bucketlists = data
      })
    }

    $scope.saveItem = function(bucketId, item){
      var newItem = new Item({bucketlist_id: bucketId, id: item.id})
      newItem.name = item.name
      newItem.done = item.done
      newItem.$update(function(res){
        $scope.messages.success = "Item Updated";
        $timeout(function(){
          $scope.messages.success = "";
        }, 1500);
      })
    }

    $scope.addItem = function(bucketId){
      $scope.$parent.showDialog();
      var newItem = new Item({bucketlist_id: bucketId})
      newItem.name = $scope.names.item
      newItem.$save(function(res){
        var id = res.id
        angular.forEach($scope.bucketlists, function(bucketlist){
          if (bucketlist.id == bucketId){
            bucketlist.items.push({name: $scope.names.item, id: id})
          }
        })
        $scope.names.item = ""
        $scope.$parent.hideDialog();
      })
    }

    $scope.deleteItem = function(bucketId, item, index){
      var newItem = new Item({bucketlist_id: bucketId, id: item.id})
      newItem.$delete(function(res){
        angular.forEach($scope.bucketlists, function(bucketlist){
          if (bucketlist.id == bucketId){
            bucketlist.items.splice(index, 1)
            $scope.messages.success = "Item Deleted";
            $timeout(function(){
              $scope.messages.success = "";
            }, 1500);
          }
        })
      })
    }

    $scope.delete = function(bucketId){
      $scope.$parent.showDialog();
      Bucketlist.delete({id: bucketId}, function(){
        $scope.refreshList();
        $scope.$parent.hideDialog();
      })
    }

    $scope.update = function(bucketId, bucketName){
      $scope.$parent.showDialog();
      var currentBucketlist = new Bucketlist({
        id: bucketId,
        name: bucketName
      });
      currentBucketlist.$update(function(){
        $scope.refreshList();
        $scope.$parent.hideDialog();
      })
    }

    $scope.message = false
    $scope.messages = {success: "", error: ""}
    $scope.names = { bucketlist: "", item: ""};
    $scope.refreshList();
  }
  DashboardController.$inject = ["$scope", "Bucketlist", "Item", "$timeout"]
})();