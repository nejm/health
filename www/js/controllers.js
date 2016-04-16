
angular.module('app.controllers', [])


/************* Login controller ********************/
.controller('loginCtrl', function($scope, LoginService, $state,$ionicPopup){
  $scope.data = {};
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });

  $scope.login = function() {
    /*LoginService.loginUser($scope.data.cin,$scope.data.password)
    /* to delete
    if($scope.data.password === undefined){
      window.localStorage['auth'] = $scope.data.cin;
      $state.go('menu.home');
    }

/*********************************************/
    LoginService.loginUser($scope.data.cin, $scope.data.password).success(function(data) {
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
  .controller('profileCtrl', function($scope, InfoService){
    $scope.$on('$ionicView.afterEnter', function(){
        document.getElementById("custom-overlay").style.display = "none";
    });
    /*$scope.toogle = [{
      text : "Notifications",
      checked : true
    },
    {
      text : "Connexion auto",
      checked : true
    }]*/
    var id = window.localStorage['auth'];
    InfoService.getUserDetail(id).success(function(data){
      $scope.info = data;
    });

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
.controller('homeCtrl', function($scope, $state, FeuilleService){
    $scope.feuille = {};
    $scope.$on('$ionicView.afterEnter', function(){
        document.getElementById("custom-overlay").style.display = "none";
    });

    FeuilleService.getFeuille("2016")
      .success(function(data){
        $scope.feuille.id= data.idFeuilleAssurance;
        $scope.feuille.rdv = data.idRDV;
        $scope.feuille.pharmacie = data.idPharmacie;
        $scope.feuille.assureur = data.idAssureur;
        $scope.feuille.prix = data.prixConsultation;
        $scope.feuille.nomMaladie = data.nomMaladie;
        $scope.feuille.idDocteur = data.idDocteur;
        console.log(" Docteur : "+ data);
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
          console.log("Docteur assurence : "  , dt);
          $scope.feuille.docteur = dt.nom + " " + dt.prenom ;
          $scope.feuille.specialite = dt.salt;
        });

    })
    .error(function(){
      console.log("Erreur Feuille Assurence");
    });


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

  var d = new Date();
  d.setDate(d.getDate() - 1);

  $scope.datepickerObject = {
    titleLabel: 'Choisissez la date',  //Optional
    todayLabel: 'Aujourd\'hui',  //Optional
    closeLabel: 'Annuler',  //Optional
    setLabel: 'Enregistrer',  //Optional
    setButtonType : 'button-assertive',  //Optional
    todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    inputDate: new Date(),  //Optional
    mondayFirst: true,  //Optional
    //disabledDates: disabledDates, //Optional
    //weekDaysList: weekDaysList, //Optional
    //monthList: monthList, //Optional
    templateType: 'modal', //Optional
    showTodayButton: 'true', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: d, //Optional
    to: new Date(2018, 8, 25),  //Optional
    callback: function (val) {  //Mandatory
      angular.element(document.querySelector('#time').click());
      datePickerCallback(val);
    },
    dateFormat: 'dd/MM/yyyy', //Optional
    closeOnSelect: false, //Optional
  };

  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    step: 30,  //Optional
    format: 24,  //Optional
    titleLabel: 'Selectionné l\'heure',  //Optional
    setLabel: 'Enregistrer',  //Optional
    closeLabel: 'Annuler',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      timePickerCallback(val);
    }
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
.controller('listRdvCtrl', function($scope, RdvService){

  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });

  $scope.events = [];

  RdvService.rendezVous("2016").success(function(data){

    $scope.events = data;
    console.log(data);
  })
  .error(function(){
    console.log("Erreur Rendez-Vous");
  });
/*  $scope.events = [{
    "date" : "20/09/2016",
    "description" : "Rendez-Vous avec Ophtalmologie"
  }];*/

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
