<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	<script src="<c:url value="/resources/js/jquery-3.2.1.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery-3.2.1.min.js"/>" type="text/javascript"></script>
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap.css"/>" type="text/css"  />
	<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap.min.css"/>"  type="text/css" />
	<script src="<c:url value="/resources/js/bootstrap.js"/>" type="text/javascript"></script> 
	<script src="<c:url value="/resources/js/bootstrap.min.js"/>" type="text/javascript"></script>
	
	<!-- controller -->
	
	<script src="<c:url value="/resources/app/controller/app.controller.js"/>"></script>
	<script src="<c:url value="/resources/app/controller/metrics.facebook.controller.js"/>"></script>
	
	
	<!-- angular -->
	
	<script src="<c:url value="/resources/js/angular.js"/>" type="text/javascript"></script>
	
	
	<!-- nvd3 -->
	
	<script src="<c:url value="/resources/js/d3.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/nv.d3.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/angular-nvd3.js"/>" type="text/javascript"></script>
	<link rel="stylesheet" href="<c:url value="/resources/css/nv.d3.css"/>"  type="text/css" />
	
	
	<title>Radar Social</title>
</head>
<body ng-app="myApp">
