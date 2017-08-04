<%@include file="/header.jsp"%>
<%@include file="/navbar.jsp"%>
<div class="row" ng-controller="AppCtrl">
	<div>
	<ul class="nav nav-tabs" role="tablist" id="submenu" class="col-xs-12">

		<li role="presentation" class="active"><a href="#feed"
			aria-controls="home" role="tab" data-toggle="tab"
			ng-click="selectedTab = 'feed';"> <i class='fa fa-fw fa-qrcode'></i>
				Feeds
		</a></li>
		<li role="presentation" id="facebook" class=""><a
			href="#facebook" aria-controls="facebook" role="tab"
			data-toggle="tab" ng-click="selectedTab = 'facebook';"> <i
				class='fa fa-fw fa-line-chart'></i> Facebook

		</a></li>

		<li role="presentation" id="twitter" class=""><a href="#twitter"
			aria-controls="twitter" role="tab" data-toggle="tab"
			ng-click="selectedTab = 'twitter'"> <i
				class='fa fa-fw fa-line-chart'></i> Twitter

		</a></li>

	</ul>
	</div>
	<!-- Feeds -->

	<div metrics-feeds ng-if="selectedTab == 'feed'"
		infinite-scroll="infiniteScroll()" infinite-scroll-distance="0"
		style="min-height: 1300px; position: absolute; margin-top: 10px;" class="col-xs-12"></div>

	<!-- Facebook -->

	<div metrics-facebook ng-if="selectedTab == 'facebook'"
		class="col-xs-12" style="margin-top: 10px;"></div>

	<!-- Twitter -->

	<div metrics-twitter ng-if="selectedTab == 'twitter'"
		class="col-xs-12" style="margin-top: 10px;"></div>
</div>



