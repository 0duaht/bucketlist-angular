(function(){
  angular.module("http.auth")
  .factory("AuthProtector", AuthProtector)

  function AuthProtector($timeout, $q, AuthService, noAuthState, $cookies){
    return {
      protect: function(statePromise){
        var authPromise = AuthService.userAuthenticated()
        if (authPromise){
          $q.all([authPromise])
          .then(
            function(res){
              if (res == undefined) { 
                cookies.remove("loggedIn");
                return;
              }
              $cookies.put("loggedIn", "1")
              statePromise.resolve();
            }, 
            function(){
              processUnauthorised(statePromise, AuthService, noAuthState, $cookies)
            }
          )
        }else{
          processUnauthorised(statePromise, AuthService, noAuthState, $cookies)
        }
      }
    }
  }
  AuthProtector.$inject = ["$timeout", "$q", "AuthService", "noAuthState", "$cookies"]

  function processUnauthorised(statePromise, authService, noAuth, cookies){
    cookies.remove("loggedIn")
    statePromise.reject();
    authService.changeState(noAuth);
  }
})();