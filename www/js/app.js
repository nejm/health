
angular.module('app', [ 'ionic',
                        'app.controllers',
                        'app.routes',
                        'app.directives',
                        'app.services',
                        'ngCordova',
                        'ionic-datepicker',
                        'ionic-timepicker',
                        'ng-mfb'
                        ])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        var push = new Ionic.Push({
          "debug": true
        });
        push.register(function(token) {
         console.log("Device token:",token.token);
       });
    });
});
