(function(){
  angular.module("http.auth")
  .factory("AuthService", AuthService)

  function AuthService(API, $timeout, tokenValidationPath, logoutPath, $http, $cookies, $state){
    return {
      userAuthenticated: function(){
        if ($cookies.get("jwt-token")){
          return $http.get(API + tokenValidationPath)
        }else{
          return false;
        }
      },

      logOut: function(){
        var token = $cookies.get("jwt-token")
        if (token){
          return $http.get(API + logoutPath)
        }
      },

      changeState: function(state){
        $timeout(function(){
          $state.go(state)
        })
      }
    };
  };
  AuthService.$inject = ["API", "$timeout", "tokenValidationPath", "logoutPath", "$http", "$cookies", "$state"]
})();