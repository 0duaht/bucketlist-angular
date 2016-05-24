(function(){
  angular.module("bucketlist.resources")
  .factory("Bucketlist", Bucketlist)

  function Bucketlist(API, bucketlistResourcePath, $resource){
    return $resource(API + bucketlistResourcePath, {id: "@id"}, {
      update: { 
        method: "PUT",
        transformRequest: function(data){
          delete data.id
          return JSON.stringify(data)
        }
      }
    })
  }
  Bucketlist.$inject = ["API", "bucketlistResourcePath", "$resource"]
})();