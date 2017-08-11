//angular.module('myApp', []).controller('facebookController', ['$scope',function($scope){
angular.module('myApp').controller('feedController', function($scope,$http,$q,$rootScope) {
	
	$scope.dataInicial = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
	$scope.dataFinal = moment().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
	
	
	$scope.redeSocial = "";
	$scope.portal = "";
	$scope.link = "";
	$scope.labelPortais = "";
	$scope.labelLink = "";
	$scope.dataInicialAnterior = "";
    $scope.dataFinalAnterior = "";
    $scope.checkRedeSocial = "redeAmbos";
    var url = null;
	
	$(function () {
		$('#datetimepicker1').datetimepicker({
            locale: 'pt-br'
        });
		$('#datetimepicker2').datetimepicker({
            locale: 'pt-br'
        });
    });
	
<<<<<<< HEAD
	
//	$scope.selecionaPortal = function(portal){
//		$scope.portal = portal;
//	}
	$scope.selecionaRede = function(){
//		alert($scope.checkRedeSocial);
		if($scope.checkRedeSocial == "redeAmbos"){
			url = '/RadarSocialRegras/facebookTodosPortais';
			$scope.rede = [];
			$scope.rede.push("facebook");
			
=======
	$scope.selecionaRede = function(){
		alert($scope.checkRedeSocial);
		if($scope.checkRedeSocial == "redeAmbos"){
			url = '/RadarSocialRegras/facebookTodosPortais';
>>>>>>> b6c98dd267d4efb4b1875f20346df337e563f9e6
			carregaPortais();
			$scope.portaisFacebook = $scope.portais;
			
			url = '/RadarSocialRegras/twitterTodosPortais';
<<<<<<< HEAD
			$scope.rede.push("twitter");
=======
>>>>>>> b6c98dd267d4efb4b1875f20346df337e563f9e6
			carregaPortais();
			$scope.portaisTwitter = $scope.portais;
			
			$scope.portais.push($scope.portaisFacebook,$scope.portaisTwitter);
		}
		else if($scope.checkRedeSocial == "redeFacebook"){
			url = '/RadarSocialRegras/facebookTodosPortais';
<<<<<<< HEAD
			$scope.rede = [];
			$scope.rede.push("facebook");
=======
>>>>>>> b6c98dd267d4efb4b1875f20346df337e563f9e6
			carregaPortais();
		}		
		else if($scope.checkRedeSocial == "redeTwitter"){
			url = '/RadarSocialRegras/twitterTodosPortais';
<<<<<<< HEAD
			$scope.rede = [];
			$scope.rede.push("twitter");
=======
>>>>>>> b6c98dd267d4efb4b1875f20346df337e563f9e6
			carregaPortais();
		}
	}
	

	$scope.selecionaRede();
	
	$rootScope.buscar = function(){


		if(angular.element(document.querySelector('#dataInicial')).val() != "" && angular.element(document.querySelector('#dataFinal')).val() != ""){
			
			$scope.dataInicial = angular.element(document.querySelector('#dataInicial')).val();
			$scope.dataInicial =   moment($scope.dataInicial, 'DD/MM/YYYY - HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
			$scope.dataFinal = angular.element(document.querySelector('#dataFinal')).val();
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
		}else{
			alert("Selecione as datas corretamente");
		}
	}
	
	$scope.RedefinirData = function(){
		$scope.dataInicial = $scope.dataInicialAnterior;
		$scope.dataFinal = $scope.dataFinalAnterior;
		$scope.dataInicialAnterior = "";
        $scope.dataFinalAnterior = "";
        
        carregaTudo();
	}
	
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
		if($scope.opcaoPortal != undefined)
			$scope.portal=$scope.opcaoPortal;
		

//		$scope.dataInicial = moment($scope.dataInicial).add(3, 'hour');
//		$scope.dataFinal = moment($scope.dataFinal).add(3, 'hour');
		
		
		$scope.dataInicial = moment().subtract(1, 'days').utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
		$scope.dataFinal = moment().utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
		
		carregaFeeds();
		$scope.labelDataInicial = moment($scope.dataInicial, 'YYYY-MM-DDTHH:mm:ss.000Z').format('DD/MM/YYYY - HH:mm:ss');
		$scope.labelDataFinal = moment($scope.dataFinal, 'YYYY-MM-DDTHH:mm:ss.000Z').format('DD/MM/YYYY - HH:mm:ss');
	}
	
//	$scope.currentPage = 1;
	
//	$scope.abrirLink = function(link){
//		window.open(link);
//	}
	
	function carregaFeeds(){
	
	
    $scope.metricas = [];
	
    var baseQuery = '[{"redeSocial":"'+$scope.redeSocial+'","portal": "'+$scope.portal+'","dataInicial": "'+$scope.dataInicial+'","dataFinal": "'+$scope.dataFinal+'"}]';
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
	
<<<<<<< HEAD
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
=======
	$scope.checkDataGravacao = function(){
		
		$scope.dataOptionCheck = "gravacao";
		$scope.dataOption = true;
	}
	
	$scope.checkDataCriacao = function(){
		
		$scope.dataOptionCheck = "criacao";
		$scope.dataOption = true;
	}
	
>>>>>>> b6c98dd267d4efb4b1875f20346df337e563f9e6
	
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
<<<<<<< HEAD
					$scope.portais.push(metric._id);
=======
				$scope.portais.push(metric._id);
>>>>>>> b6c98dd267d4efb4b1875f20346df337e563f9e6
			})
				        		  
		    });
		    
	}
	

});