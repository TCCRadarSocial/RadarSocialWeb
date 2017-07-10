var myApp = angular.module('myApp',['nvd3']);

myApp.directive("metricsFacebook", function() {
	  return {
	      templateUrl : '/web/resources/app/jsp/metrics.facebook.jsp'
	  };
	});
	
myApp.directive("metricsTwitter", function() {
		return {
		      templateUrl : '/web/resources/app/jsp/metrics.twitter.jsp'
		};
	});
	
myApp.directive("metricsFeeds", function() {
		  return {
		      templateUrl : '/web/resources/app/jsp/metrics.feeds.jsp'
		 };
	});

myApp.controller('AppCtrl', ['$scope', function($scope) {
  
	$scope.selectedTab = 'feed';
	
}]);