(function(){
  angular.module("bucketlist.resources")
  .factory("Item", Item)

  function Item(API, itemResourcePath, $resource){
    return $resource(API + itemResourcePath, {bucketlist_id: "@bucketlist_id", id: "@id"}, {
      save: {
        method: "POST",
        transformRequest: function(data){
          delete data.bucketlist_id
          return JSON.stringify(data)
        }
      }, 

      update: { 
        method: "PUT",
        transformRequest: function(data){
          delete data.id
          delete data.bucketlist_id
          return JSON.stringify(data)
        }
      }
    })
  }
  Item.$inject = ["API", "itemResourcePath", "$resource"]
})();