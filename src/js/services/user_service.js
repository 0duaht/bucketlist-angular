(function(){
  angular.module("bucketlist.services")
  .factory("userService", UserService);

  UserService.$inject = ["API", "registerPath", "loginPath", "$http"];
  function UserService(API, registerPath, loginPath, $http){
    return {
      registerUser: function(name, password, email){
        return $http.post(API + registerPath, {
          name: name,
          password: password,
          password_confirmation: password,
          email: email
        });
      },

      loginUser: function(email, password){
        return $http.post(API + loginPath, {
          email: email,
          password: password
        });
      }
    };
  };
}());