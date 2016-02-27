angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('menu.home', {
    url: '/home',
    views: {
      'side': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.medecins', {
    url: '/medecins',
    views: {
      'side': {
        templateUrl: 'templates/medecins.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('menu.rdv', {
    url: '/rdv',
    views: {
      'side': {
        templateUrl: 'templates/rdv.html',
        controller: 'rdvCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side',
    templateUrl: 'templates/menu.html',
    abstract:true,
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  if(window.localStorage['auth']) {
  	$urlRouterProvider.otherwise('/side/home');
  }else{
  	$urlRouterProvider.otherwise('/login');
  }
});
