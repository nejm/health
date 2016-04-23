angular.module('app.services', [])

.service('LoginService', function($q, $http) {
    return {
        loginUser: function(cin, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            // getting the remote informations
            var link = "http://cnamapplication.alwaysdata.net/loginUser.php?username="+cin
                        +"&pwd="+password;
            console.log(link);
            $http.get(link, {cin : cin, password: password}).then(function (res){
              var response = res.data;
              if (response != "null"){
                deferred.resolve(response[0]);
              }else{
                deferred.reject();
              }
            });
            // manage the return on success and failure
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

.service('medicalService', function($q, $http) {
    return {
        getDoctors: function() {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var link = "http://cnamapplication.alwaysdata.net/getAllDoctors.php";
            $http.get(link).then(function (res){
              var response = res.data;
              if (res.data != null)
                deferred.resolve(response);
              else
                deferred.reject();
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        getFarmacies: function() {
            // Defining the promise
            var deferred = $q.defer();
            var promise = deferred.promise;
            // getting the list of pharmacies
            var link = "http://cnamapplication.alwaysdata.net/getAllPharmacies.php";
            $http.get(link).then(function (res){
              var response = res.data;
              if (response != null)
                deferred.resolve(response);
              else
                deferred.reject();
            });

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

.service('FeuilleService', function($q, $http){
  return {
      getFeuille: function(id) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          var link = "http://cnamapplication.alwaysdata.net/getAllInsuranceSheetsForPatient.php?idUser="
                      +id;
          $http.get(link).then(function (res){
            var response = res.data;
            if (response != null){
              deferred.resolve(response);
            }
            else
              deferred.reject();
          });
          promise.success = function(fn) {
              promise.then(fn);
              return promise;
          }
          promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
          }
          return promise;
      },
      getDocteurDetail: function(id) {

          var deferred = $q.defer();
          var promise = deferred.promise;

          var link = "http://cnamapplication.alwaysdata.net/getUserById.php?idUser="
                      +id;
          $http.get(link).then(function (res){
            var response = res.data[0];
            if (res.data != null)
              deferred.resolve(response);
            else
              deferred.reject();
          });
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

.service('RdvService', function($q, $http) {
    return {
        rendezVous: function(id) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            // getting the remote informations
            var link = "http://cnamapplication.alwaysdata.net/getAllAppointmentsForPatient.php?idPatient="+id;
            console.log(link);
            $http.get(link).then(function (res){
              var response = res.data;
              if (response != null){
                deferred.resolve(response);
              }else{
                deferred.reject();
              }
            });
            // manage the return on success and failure
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        rdvDetail: function(id){
          var deferred = $q.defer();
          var promise = deferred.promise;

          // getting the remote informations
          var link = "http://cnamapplication.alwaysdata.net/getAppointmentById.php?idRDV="+id;
          console.log(link);
          $http.get(link).then(function (res){
            var response = res.data;
            if (response != null){
              deferred.resolve(response);
            }else{
              deferred.reject();
            }
          });
          // manage the return on success and failure
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

.service('InfoService', function($q, $http) {
  return{
    getUserDetail: function(id) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      var link = "http://cnamapplication.alwaysdata.net/getUserById.php?idUser="
                  +id;
      console.log(link);
      $http.get(link).then(function (res){
        var response = res.data[0];
        if (res.data != null)
          deferred.resolve(response);
        else
          deferred.reject();
      });
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
