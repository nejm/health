
angular.module('app.controllers', [])


/************* Login controller ********************/
.controller('loginCtrl', function($scope, LoginService, $state,$ionicPopup){
  $scope.data = {};
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });

  $scope.login = function() {
    LoginService.loginUser($scope.data.cin, $scope.data.password)
    .success(function(data) {
        window.localStorage['auth'] = data.idUser;
        console.log(data);
        $state.go('menu.home');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
      });
  }
})

/************* Profile controller ********************/
  .controller('profileCtrl', function($scope, InfoService, $ionicModal){
    $scope.$on('$ionicView.afterEnter', function(){
        document.getElementById("custom-overlay").style.display = "none";
    });
    var id = window.localStorage['auth'];
    InfoService.getUserDetail(id).success(function(data){
      $scope.info = data;
    });

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.editInfo = function(){
      $scope.modal.show();
      console.log($scope.info);
    }

    $scope.endEdit = function(){
      $scope.modal.remove();
    }
  })

/************* Menu controller ********************/
.controller('menuCtrl', function($scope, $state){
  $scope.logout = function(){
    window.localStorage.removeItem('auth');
      $state.go('login');
  };
})
/*************** Medical controller ********************/
.controller('medicalCtrl', function($scope, $state, medicalService){

  $scope.datetimeValue = new Date();

  $scope.rolefilter = "medecin" ;
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
    });
    var dataDoctors = [];
    var dataPharmacie = [];

    $scope.test = function(){

    }

    medicalService.getDoctors().success(function(data){
      dataDoctors = data;
    });

    medicalService.getFarmacies().success(function(data){
      dataPharmacie = data;
    });

    $scope.dataC = [];
    $scope.image;
    $scope.rdv;

    $scope.filterRole = function(role){
      if(role.toLowerCase() == "medecin"){
        $scope.image = "medecin.jpg";
        $scope.dataC = dataDoctors;
        $scope.rdv = true;
      }
      else{
        $scope.rdv = false;
        $scope.image = "pharmacy.png";
        $scope.dataC = dataPharmacie;
      }
    };
    $scope.surLaMap = function(){
      $state.go('menu.map');
    };
    $scope.rendezVous = function(){
    };
})
/************* Home controller ********************/
.controller('homeCtrl', function($scope, $state, FeuilleService, RdvService){
    $scope.listFeuilles = [];
    $scope.dates = [];

    $scope.$on('$ionicView.afterEnter', function(){
        document.getElementById("custom-overlay").style.display = "none";
    });

    FeuilleService.getFeuille("2016")
      .success(function(data){
        $scope.listFeuilles = data;
    })
      .error(function(){
        console.log("Erreur Feuille Assurence");
      })
      .then(function(){
        angular.forEach($scope.listFeuilles, function(value) {
          RdvService.rdvDetail(value.idRDV)
          .success(function(rdvData){
              $scope.dates.push(rdvData[0].jour+"/"+rdvData[0].mois+"/"+rdvData[0].annee);
            });
        });
      });
      $scope.loadDetail = function(item){
        $state.go('detail',{obj : item});
      }
  })

.controller('rdvCtrl', function($scope){
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });
  $scope.events = [];
  $scope.hideTime = true;
  $scope.date = new Date();

  $scope.chooseDate = function() {
    angular.element(document.querySelector('#date').click());
  };

  var datePickerCallback = function (val) {
  if (typeof(val) === undefined) {
    console.log('No date selected');
  } else {
    console.log(new Date(val));
    $scope.date = new Date(val);
  }
  };

  function timePickerCallback(val) {
    if (typeof (val) === undefined) {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      var d = new Date($scope.date);
      d.setHours(selectedTime.getUTCHours());
      d.setMinutes(selectedTime.getUTCMinutes());
      if(d != 'Invalid Date')
        $scope.events.push({"header": d,"description": "blabla"});
    }
  };
})
/*********************** listRdv controller *******************************/
.controller('listRdvCtrl', function($scope, RdvService, InfoService){

  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });

  $scope.events = [];

  RdvService.rendezVous("2016")
    .success(function(data){
      angular.forEach(data, function(value) {
        var event = {};
        event.id = value.idRDV;
        event.date = value.jour+"/"+value.mois+"/"+value.annee+" "+value.heure;
        InfoService.getUserDetail(value.idDocteur)
          .success(function(doctorData){
            event.doctor = doctorData.nom+" "+doctorData.prenom;
        });
        $scope.events.push(event);
      });
  })
    .error(function(){
      console.log("Erreur Rendez-Vous");
  });
})
/********************** Map controller ******************************/
.controller('mapCtrl', function($scope, $ionicLoading, $cordovaGeolocation){
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });
  var options = {timeout: 10000, enableHighAccuracy: true};
  var enabled="enabled";
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
  $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: true
    });
    //cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
        if(enabled == "enabled"){
          $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            $scope.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
              center: $scope.latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map.setCenter($scope.latLng);
            $ionicLoading.hide();
            // draw the marker
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

              var marker = new google.maps.Marker({
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  position: $scope.latLng
              });
            });

          }, function(error){
            alert("problème de connexion");
            $ionicLoading.hide();
        });
      }else{
        alert("Please turn on your GPS");
      }
    /*}, function(error) {
        alert("The following error occurred: " + error);
    });*/
})

/***************** Detail controller *********************/
.controller('detailCtrl', function($scope, $ionicLoading, $stateParams, FeuilleService, $state){
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });
  var data = $stateParams.obj;
  if (data == null) {
    $state.go("menu.home");
    return;
  }
  $scope.feuille = {};
  $scope.feuille.id= data.idFeuilleAssurance;
  $scope.feuille.rdv = data.idRDV;
  $scope.feuille.pharmacie = data.idPharmacie;
  $scope.feuille.assureur = data.idAssureur;
  $scope.feuille.prix = data.prixConsultation;
  $scope.feuille.maladie = data.nomMaladie;
  $scope.feuille.idDocteur = data.idDocteur;
  $scope.feuille.description = data.descriptionMaladie;
  switch(data.etape) {
  case 1:
      $scope.feuille.etape = "Medecin";
      break;
  case 2:
      $scope.feuille.etape = "Pharmacie";
      break;
  default:
      $scope.feuille.etape = "CNAM";
    }

  var id = $scope.feuille.idDocteur;

  FeuilleService.getDocteurDetail(id).success(function(dt){
    $scope.feuille.docteur = dt.nom + " " + dt.prenom ;
    $scope.feuille.specialite = dt.salt;
  });

})
