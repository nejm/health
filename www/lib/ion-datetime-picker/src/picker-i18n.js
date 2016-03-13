angular.module("ion-datetime-picker")
    .factory("$ionicPickerI18n", function($window) {
        return  {
            ok: "OK",
            cancel: "Annuler",

            weekdays: $window.moment ? $window.moment.weekdaysMin() : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
            months: $window.moment ? $window.moment.months() : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]

        };
    });
