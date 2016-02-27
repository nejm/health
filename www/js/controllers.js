
angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, LoginService, $state){
  $scope.data = {};
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });

  $scope.login = function() {
    /* to delete */
    if($scope.data.password === undefined){
      window.localStorage['auth'] = $scope.data.cin;
      $state.go('menu.home');
    }

      /*********************************************/
    LoginService.loginUser($scope.data.cin, $scope.data.password).success(function(data) {
        window.localStorage['auth'] = $scope.data.cin;
        $state.go('menu.home');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
      });
  }
})


  .controller('profileCtrl', function($scope){
    $scope.toogle = [{
      text : "Notifications",
      checked : true
    },
    {
      text : "Connexion auto",
      checked : true
    }]
  })

.controller('menuCtrl', function($scope, $state){
  $scope.logout = function(){
    window.localStorage.removeItem('auth');
      $state.go('login');
  };
})

.controller('homeCtrl', function($scope){
  $scope.$on('$ionicView.afterEnter', function(){
      document.getElementById("custom-overlay").style.display = "none";
  });
  $scope.isExpanded = false;
})

.controller('rdvCtrl', function($scope){
  $scope.events = [];
  $scope.hideTime = true;
  $scope.date = new Date();

  $scope.chooseDate = function() {
    angular.element(document.querySelector('#date').click());
  };
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
    //templateType: 'popup', //Optional
    showTodayButton: 'true', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(), //Optional
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

.controller('mapCtrl', function($scope, $ionicLoading, $cordovaGeolocation){
  var options = {timeout: 10000, enableHighAccuracy: true};

  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: true
    });

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
        console.log("Could not get location");
    });
})
