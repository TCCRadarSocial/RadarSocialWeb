var myApp = angular.module('myApp',['nvd3','angularUtils.directives.dirPagination']);

myApp.directive("metricsFacebook", function() {
	  return {
	      templateUrl : '/RadarSocialWeb/resources/app/jsp/metrics.facebook.jsp'
	  };
	});
	
myApp.directive("metricsTwitter", function() {
		return {
		      templateUrl : '/RadarSocialWeb/resources/app/jsp/metrics.twitter.jsp'
		};
	});
	
myApp.directive("metricsFeeds", function() {
		  return {
		      templateUrl : '/RadarSocialWeb/resources/app/jsp/metrics.feeds.jsp'
		 };
	});

myApp.controller('AppCtrl', ['$scope', function($scope) {
  
	$scope.selectedTab = 'feed';
	
}]);