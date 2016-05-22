(function(){
  angular.module("bucketlistApp", ["bucketlist.controllers", "ui.router", "http.auth"])
  .config(StateProvider)
  .run(Run);

  function StateProvider($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "home/main.html",
      controller: "HomeController"
    })
    .state("login", {
      url: "/users/login",
      templateUrl: "home/login.html",
      controller: "HomeController"
    })
    .state("register", {
      url: "/users/register",
      templateUrl: "home/register.html",
      controller: "HomeController"
    })
    .state("dashboard", {
      url: "/users/home",
      templateUrl: "user/dashboard.html",
      controller: "DashboardController",
      resolve: {
        confirmLoggedIn: confirmLoggedIn
      }
    });
  }
  StateProvider.$inject = ["$stateProvider", "$urlRouterProvider"];

  function confirmLoggedIn($q, AuthProtector){
    var deferred = $q.defer();
    AuthProtector.protect(deferred)
    return deferred.promise;
  }
  confirmLoggedIn.$inject = ["$q", "AuthProtector"];

  function Run($state){
    $state.go("home");
  }
  Run.$inject = ["$state"];
})();