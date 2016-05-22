(function(){
  angular.module("bucketlist.resources")
  .factory("Bucketlist", Bucketlist)

  function Bucketlist(API, bucketlistResourcePath, $resource){
    return $resource(API + bucketlistResourcePath)
  }
  Bucketlist.$inject = ["API", "bucketlistResourcePath", "$resource"]
})();