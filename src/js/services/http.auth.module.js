(function(){
  angular.module("http.auth", ["ngCookies", "bucketlist.misc", "ui.router"])
  .factory("HttpTokenMod", HttpTokenMod)
  .config(AuthConfig)


  function AuthConfig($httpProvider){
    $httpProvider.interceptors.push("HttpTokenMod")
  }
  AuthConfig.$inject = ["$httpProvider"]

  function HttpTokenMod($q, $cookies){
    return {
      request: function(config){
        config.headers["Cache-Control"] = "no-cache"
        config.headers["Pragma"] = "no-cache"
        var jwt_token = $cookies.get("jwt-token")
        if (jwt_token){
          config.headers.Authorization = "token " + jwt_token
          return config;
        }else return config;
      }
    }
  }
  HttpTokenMod.$inject = ["$q", "$cookies"]
})();