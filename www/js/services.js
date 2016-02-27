angular.module('app.services', [])

.service('LoginService', function($q, $http) {
    return {
        loginUser: function(cin, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            /************************************/
            var link = "http://192.168.56.1:8088/users/";
            $http.post(link, {cin : cin, password: password}).then(function (res){
              var response = res.data;
              if (response == true){
                deferred.resolve('Welcome ' + cin + '!');
              }else{
                deferred.reject('Wrong credentials.');
              }
            });
            /*************************************/
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
