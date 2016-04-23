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

  .state('menu.medical', {
    url: '/medical',
    views: {
      'side': {
        templateUrl: 'templates/medical.html',
        controller: 'medicalCtrl'
      }
    }
  })

  .state('menu.listrdv', {
    url: '/listRdv',
    views: {
      'side': {
        templateUrl: 'templates/listrdv.html',
        controller: 'listRdvCtrl'
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

  .state('detail', {
    url: '/detail',
    params :{
      obj: null
    },
    templateUrl: 'templates/detail.html',
    controller: 'detailCtrl'
  })

  .state('menu.map', {
    url: '/map',
    views: {
      'side' : {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  if(window.localStorage['auth']) {
  	$urlRouterProvider.otherwise('/side/home');
  }else{
  	$urlRouterProvider.otherwise('/login');
  }
});
