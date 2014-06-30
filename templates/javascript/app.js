'use strict';

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config(['formRoutesProvider' <% if (mongoPassportUser) { %>, $httpProvider<% } %>,
  function (formRoutes <% if (mongoPassportUser) { %>, $http<% }  %>) {
    formRoutes.setRoutes([
      {route: '/index', options: {templateUrl: 'partials/main', controller: 'MainCtrl'}},
      <% if (mongoPassportUser) { %>
      {route: '/login', options: {templateUrl: 'partials/login', controller: 'LoginCtrl'}},
      {route: '/signup', options: {templateUrl: 'partials/signup', controller: 'SignupCtrl'}},
      {route: '/settings', options: {templateUrl: 'partials/settings', controller: 'SettingsCtrl', authenticate: true}}, <% } %>
    {route: '/404', options: {templateUrl: 'partials/404.html'}}
    ] ,'/');

    <% if (mongoPassportUser) { %>
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('partials/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
 <%}%> }])
<% if (mongoPassportUser) { %>
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    }); }
  ) <%}%> <%}%>;

formsAngular.config(['urlServiceProvider', 'cssFrameworkServiceProvider', function (urlService, cssFrameworkService) {
  urlService.setOptions({html5Mode: true});
  cssFrameworkService.setOptions({framework: 'bs3'});
}]);
