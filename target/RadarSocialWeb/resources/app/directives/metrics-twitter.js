//var app = angular.module("myApp", []);
//app.directive("metricsTwitter", function() {
//    return {
//        template : "<h1>twitter!</h1>"
//    };
//});

angular.module('myApp').directive('metricsTwitter', function() {

  return {

    templateUrl: 'resources/app/jsp/metrics.twitter.jsp'

  };

});