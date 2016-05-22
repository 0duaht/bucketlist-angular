(function(){
  angular.module("bucketlist.misc")
  .constant("API", "https://b-list.herokuapp.com")
  .constant("tokenValidationPath", "/auth/valid")
  .constant("registerPath", "/users/new")
  .constant("loginPath", "/auth/login")
  .constant("logoutPath", "/auth/logout")
  .constant("noAuthState", "login")
  .constant("bucketlistResourcePath", "/bucketlists/:id")
  .constant("itemResourcePath", "/bucketlists/:bucketlist_id/items/:id");
}());