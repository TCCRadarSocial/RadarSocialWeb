//angular.module('myApp', []).controller('facebookController', ['$scope',function($scope){
angular.module('myApp').controller('feedController', function($scope,$http,$q,$rootScope) {
	
	
	$scope.modalFace = function(link){
		$('#myModal').modal();
		$scope.link = link;
		carregaGraficoLinhaFacebook();
		setTimeout(function(){ $scope.api.refresh(); }, 500);
		
		
	}
	
	$scope.modalTwitter = function(link){
		$('#myModal').modal();
		$scope.link = link;
		carregaGraficoLinhaTwitter();
		setTimeout(function(){ $scope.api.refresh(); }, 500);
	}

	
	  
	
	$scope.inicial = moment().subtract(1, 'days').format('DD/MM/YYYY - HH:mm:ss');
	$scope.final = moment().format('DD/MM/YYYY - HH:mm:ss');
	
	$scope.dataInicial = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
	$scope.dataFinal = moment().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
	
	
	$scope.redeSocial = "";
	$scope.portal = "";
	$scope.link = "";
	$scope.labelPortais = "";
	$scope.labelLink = "";
//	$scope.dataInicialAnterior = "";
//    $scope.dataFinalAnterior = "";
    $scope.checkRedeSocial = "redeAmbos";
    $scope.ordenacao = "dataCriacao";
//    $scope.portais = [];
    var url = null;
	
	$(function () {
		$('#datetimepicker1').datetimepicker({
            locale: 'pt-br'
        });
		$('#datetimepicker2').datetimepicker({
            locale: 'pt-br'
        });
    });
	
	
//	$scope.selecionaPortal = function(portal){
//		$scope.portal = portal;
//	}
	$scope.selecionaRede = function(){
//		alert($scope.checkRedeSocial);
		if($scope.checkRedeSocial == "redeAmbos"){
			url = '/RadarSocialRegras/facebookTodosPortais';
			$scope.rede = [];
			$scope.rede.push("facebook");
			
			carregaPortais();
			
			setTimeout(function(){ $scope.portaisFacebook = $scope.portais; }, 500);
			
			url = '/RadarSocialRegras/twitterTodosPortais';
			$scope.rede.push("twitter");
			carregaPortais();
			setTimeout(function(){ $scope.portaisTwitter = $scope.portais; }, 500);
			
			setTimeout(function(){ $scope.portais.push($scope.portaisFacebook,$scope.portaisTwitter); }, 500);
			
		}
		else if($scope.checkRedeSocial == "redeFacebook"){
			url = '/RadarSocialRegras/facebookTodosPortais';
			$scope.rede = [];
			$scope.rede.push("facebook");
			carregaPortais();
		}		
		else if($scope.checkRedeSocial == "redeTwitter"){
			url = '/RadarSocialRegras/twitterTodosPortais';
			$scope.rede = [];
			$scope.rede.push("twitter");
			carregaPortais();
		}
	}
	

	$scope.selecionaRede();
	
	$rootScope.buscar = function(){


//		if(angular.element(document.querySelector('#dataInicial')).val() != "" && angular.element(document.querySelector('#dataFinal')).val() != ""){
			
			$scope.dataInicial = angular.element(document.querySelector('#dataInicial')).val() != "" ? angular.element(document.querySelector('#dataInicial')).val() : $scope.inicial;
			$scope.dataInicial =   moment($scope.dataInicial, 'DD/MM/YYYY - HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
			$scope.dataFinal = angular.element(document.querySelector('#dataFinal')).val() != "" ? angular.element(document.querySelector('#dataFinal')).val() : $scope.final;
			$scope.dataFinal =   moment($scope.dataFinal, 'DD/MM/YYYY - HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
			

			
			if($scope.dataInicial > $scope.dataFinal){
				alert("Selecione as datas corretamente");
			}else{
				$scope.portal = "";
				
				if($scope.rede.length == 2){
					$scope.redeSocial = "Facebook";
					carregaTudo();					
					
					$scope.redeSocial = "Twitter";
					carregaTudo();
				}else{
					if($scope.rede[0] == "facebook"){
						$scope.redeSocial = "Facebook";
						carregaTudo();
					
					}else if($scope.rede[0] == "twitter"){
						$scope.redeSocial = "Twitter";
						carregaTudo();
					}
				}
			}
//		}else{
//			alert("Selecione as datas corretamente");
//		}
	}
	
//	$scope.RedefinirData = function(){
//		$scope.dataInicial = $scope.dataInicialAnterior;
//		$scope.dataFinal = $scope.dataFinalAnterior;
//		$scope.dataInicialAnterior = "";
//        $scope.dataFinalAnterior = "";
//        
//        carregaTudo();
//	}
	
	$scope.RedefinirLink = function(){
		$scope.link = "";
		$scope.labelLink = "";
		carregaTudo();		
	}
	$scope.RedefinirPortal = function(){
		$scope.portal = "";
		carregaTudo();
	}
	
	carregaTudo();
	
	function carregaTudo(){
		if($scope.opcaoPortal != undefined){
			$scope.portal=$scope.opcaoPortal;
			$scope.labelPortais = $scope.portal;
		}
		else
			$scope.portal = "";
		

//		$scope.dataInicial = moment($scope.dataInicial).subtract(3, 'hour');
//		$scope.dataFinal = moment($scope.dataFinal).subtract(3, 'hour');
		
		
		//$scope.dataInicial = moment($scope.dataInicial).subtract(1, 'days').utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
		//$scope.dataFinal = moment($scope.dataFinal).utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
		
		carregaFeeds();
		$scope.labelDataInicial = moment($scope.dataInicial, 'YYYY-MM-DDTHH:mm:ss.000Z').utc().format('DD/MM/YYYY - HH:mm:ss');
		$scope.labelDataFinal = moment($scope.dataFinal, 'YYYY-MM-DDTHH:mm:ss.000Z').utc().format('DD/MM/YYYY - HH:mm:ss');
	}
	
//	$scope.currentPage = 1;
	
//	$scope.abrirLink = function(link){
//		window.open(link);
//	}
	
	function carregaFeeds(){
	
	
    $scope.metricas = [];
	
    var baseQuery = '[{"redeSocial":"'+$scope.redeSocial+'","portal": "'+$scope.portal+'","dataInicial": "'+$scope.dataInicial+'","dataFinal": "'+$scope.dataFinal+'","orderBy": "'+$scope.ordenacao+'"}]';
	var query = JSON.parse( baseQuery );
    var deferred = $q.defer();
	
	var method = 'POST';
	var url = '/RadarSocialRegras/feedSearch';
	var req = {
		method : method,
		url : url,
		data: query
		}

	$http(req).success(function(data, status, headers, config){ 
		 deferred.resolve(data);
	}).error(deferred.resolve);

	deferred.promise.then(function(data) {
		data.map(function(metric){
			
			data = moment(metric.dataCriacao.$date, 'YYYY-MM-DDTHH:mm:ss.000Z').utc().format('DD/MM/YYYY - HH:mm:ss');
			
			$scope.metricas.push({
				link : metric.link,
				nomePagina: metric.nomePagina,
				nomeTwitter: metric.nomeTwitter,
				comments: metric.comments,
				likes: metric.likes,
				shares: metric.shares,
				reactions: metric.reactions,
				favorites: metric.favorites,
				retweets: metric.retweets,
				imagem: metric.imagem,
				texto : metric.texto,
				mensagem : metric.mensagem,
				dataCriacao : data
			});
			
		})
		
     });
}
	
	$scope.dateFormat = {
			format: 'DD/MM/YYYY HH:mm:ss',
			name: 'Dia/Mês/Ano'
	}
	
//	$scope.checkDataGravacao = function(){
//		
//		$scope.dataOptionCheck = "gravacao";
//		$scope.dataOption = true;
//	}
//	
//	$scope.checkDataCriacao = function(){
//		
//		$scope.dataOptionCheck = "criacao";
//		$scope.dataOption = true;
//	}
//	
	
	function carregaPortais(){
		
		$scope.portais = [];

		var deferred = $q.defer();
			
		var method = 'GET';
		var req = {
			method : method,
			url : url
		}

		$http(req).success(function(data, status, headers, config){ 
			deferred.resolve(data);
		}).error(deferred.resolve);

		deferred.promise.then(function(data) {
			
			
			data.result.map(function(metric){
					$scope.portais.push(metric._id);
			})
				        		  
		    });
		    
	}
	
	
	function carregaGraficoLinhaFacebook(){

		var comments = [], 
        	likes = [], 
        	shares = [],
        	reactions = [],
        	totalMetrics = [];
		
		var baseQuery = '[{"link":"'+$scope.link+'"}]';
		var query = JSON.parse( baseQuery );
		var deferred = $q.defer();
			
		var method = 'POST';
		var url = '/RadarSocialRegras/feedSearchPublicacao';
		var req = {
			method : method,
			url : url,
			data: query
			}

		$http(req).success(function(data, status, headers, config){ 
			deferred.resolve(data);
		}).error(deferred.resolve);

		deferred.promise.then(function(data) {
			
			data.map(function(metric){
				
					comments.push({x: moment(metric.dataGravacao.$date).unix(), y: metric.comments}),
					likes.push({x: moment(metric.dataGravacao.$date).unix(), y: metric.likes}), 
					shares.push({x: moment(metric.dataGravacao.$date).unix(), y: metric.shares}); 
					reactions.push({x: moment(metric.dataGravacao.$date).unix(), y: metric.reactions}); 
					$scope.mensagem = metric.mensagem;
					$scope.link = metric.link;
					$scope.imagem = metric.imagem;
					
			
			})
			
			$scope.data = [ 
			               { values: comments, key: 'Comentários', color: '#7777ff', area: false },
			               { values: likes, key: 'Curtidas', color: '#2ca02c' },
			               { values: shares, key: 'Compartilhados', color: '#ff00bf' },
			               { values: reactions, key: 'Reações', color: '#ff0000' }
	            ];
         });
		
	}
	
	
	function carregaGraficoLinhaTwitter(){

		var retweets = [], 
    	favorites = [], 
    	link = [],
//    	texto = [],
    	totalMetrics = [];

		var baseQuery = '[{"link":"'+$scope.link+'"}]';
		var query = JSON.parse( baseQuery );
		var deferred = $q.defer();
			
		var method = 'POST';
		var url = '/RadarSocialRegras/feedSearchPublicacao';
		var req = {
			method : method,
			url : url,
			data: query
			}

		$http(req).success(function(data, status, headers, config){ 
			deferred.resolve(data);
		}).error(deferred.resolve);

		deferred.promise.then(function(data) {
			
			data.map(function(metric){
				
				retweets.push({x: moment(metric.dataGravacao.$date).unix(), y: metric.retweets}),
				favorites.push({x: moment(metric.dataGravacao.$date).unix(), y: metric.favorites}) 
				$scope.mensagem = metric.texto;
				$scope.link = metric.link;
				$scope.imagem = metric.imagem;
		
		})
		
		$scope.data = [ 
		               { values: retweets, key: 'Retweets', color: '#7777ff', area: false },
		               { values: favorites, key: 'Favorites', color: '#2ca02c' }
            ];
         });
		
	}
	
	/* Chart options */
	$scope.options = {
		chart : {
			type : 'lineWithFocusChart',
			height : 450,
			margin : {
				top : 20,
				right : 60,
				bottom : 40,
				left : 70
			},
			x : function(d) {
				return d.x;
			},
			y : function(d) {
				return d.y;
			},
			useInteractiveGuideline : true,
			focusEnable: true,
			dispatch : {
				stateChange : function(e) {
					console.log("stateChange");
				},
				changeState : function(e) {
					console.log("changeState");
				},
				tooltipShow : function(e) {
					console.log("tooltipShow");
				},
				tooltipHide : function(e) {
					console.log("tooltipHide");
				}
			},
			noData: 'Não há dados a serem exibidos',
			xAxis : {
				axisLabel : 'Data/Hora',
				tickFormat : function(d) {
					return moment.unix(d).format($scope.dateFormat.format);
					
				},
				ticks : 1,
				axisLabelDistance : 100
			},
			yAxis : {
				tickFormat : function(d) {
					return d.toLocaleString("pt-br");
				},
				axisLabelDistance : 100000
			},
			x2Axis : {
				tickFormat : function(d) {
					return moment.unix(d).format($scope.dateFormat.format);
				},
				ticks : 1,
				axisLabelDistance : 100
			},
			y2Axis : {},
			legend :{
				dispatch: {},
				width: 500,
				height: 20,
				align: true,
				rightAlign: true
			}
		}
	};
	

});