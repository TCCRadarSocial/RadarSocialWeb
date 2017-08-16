<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script> --> 
	 <script src="<c:url value="/resources/js/angular.min.js"/>" type="text/javascript"></script> 
	 <script src="<c:url value="/resources/js/angular-masonry.min.js"/>" type="text/javascript"></script>	 
	 
	<script src="<c:url value="/resources/js/jquery-3.2.1.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery-3.2.1.min.js"/>" type="text/javascript"></script>
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap.css"/>" type="text/css"  />
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap.min.css"/>"  type="text/css" />
	<script src="<c:url value="/resources/js/bootstrap.js"/>" type="text/javascript"></script> 
	<script src="<c:url value="/resources/js/bootstrap.min.js"/>" type="text/javascript"></script>
	<!-- <script src="<c:url value="/resources/js/bootstrapValidator.min.js"/>" type="text/javascript"></script> -->
	<!-- <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.3/js/bootstrapValidator.min.js"> </script> -->
	
	
	
	
	<link rel="stylesheet" href="<c:url value="/resources/css/font-awesome.min.css"/>"  type="text/css" />
	
	<!-- controller -->
	
	<script src="<c:url value="/resources/app/controller/app.controller.js"/>"></script>
	<script src="<c:url value="/resources/app/controller/metrics.facebook.controller.js"/>"></script>
	<script src="<c:url value="/resources/app/controller/metrics.twitter.controller.js"/>"></script> 
	<script src="<c:url value="/resources/app/controller/metrics.feed.controller.js"/>"></script> 

	<!-- angular -->
	
	<!--<script src="<c:url value="/resources/js/angular.js"/>" type="text/javascript"></script>  -->
	
	
	<!-- nvd3 -->
	
	<script src="<c:url value="/resources/js/d3.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/nv.d3.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/angular-nvd3.js"/>" type="text/javascript"></script>
	<link rel="stylesheet" href="<c:url value="/resources/css/nv.d3.css"/>"  type="text/css" />
	
	
	<!-- moment.js -->
	<script src="<c:url value="/resources/js/moment.js"/>" type="text/javascript"></script>
	
	<!-- alasql -->
	<script src="<c:url value="/resources/js/alasql.min.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/xlsx.core.min.js"/>" type="text/javascript"></script>
	
	<!-- DirPagination -->
	<script src="<c:url value="/resources/js/dirPagination.js"/>" type="text/javascript"></script>
	
	<!-- datetimepicker -->
	<script src="<c:url value="/resources/js/bootstrap-datetimepicker.min.js"/>" type="text/javascript"></script>
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap-datetimepicker.min.css"/>"  type="text/css" />
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap-datetimepicker.css"/>"  type="text/css" />
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap-datetimepicker-standalone.css"/>"  type="text/css" />
	<script src="<c:url value="/resources/js/pt-br.js"/>" type="text/javascript"></script>
	
	<!-- jsPdf -->
	<script src="<c:url value="/resources/js/jsPdf.js"/>" type="text/javascript"></script>
	
	
	<!-- Masonry - Pinterest like grid -->
  <script src="<c:url value='/resources/js/masonry.pkgd.min.js'/>"></script>
  <script src="<c:url value='/resources/js/imagesloaded.pkgd.min.js'/>"></script>
  <script src="<c:url value='/resources/js/angular-masonry-directive.js'/>"></script>
 
	
	<title>Radar Social</title>
</head>
<body ng-app="myApp">
