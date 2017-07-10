//angular.module('myApp', []).controller('facebookController', ['$scope',function($scope){
angular.module('myApp').controller('facebookController', function($scope,$http,$q,$rootScope) {
	    	
	carregaTudo();
	
	function carregaTudo(){
		carregaGraficoLinha();
		carregaTabela();
		carregaGraficoPizza();
	}
	
	$scope.currentPage = 1;
	
	$scope.abrirLink = function(link){
		window.open(link);
	}
	
	
	$scope.dateFormat = {
			format: 'DD/MM/YYYY HH:mm',
			name: 'Dia/Mês/Ano'
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
			callback : function(chart) {
				 chart.lines.dispatch.on('elementClick', function(e){
		                 
		               var data;
		               data = e[0].point.x;
		               
//		               $rootScope.dataInicialAnterior = $rootScope.dataInicial;
//		               $rootScope.dataFinalAnterior = $rootScope.dataFinal;
//		               
//		               $rootScope.dataInicial =  moment(data).format("YYYY-MM-DDTHH:mm:ss");
//	            	   $rootScope.dataFinal = moment(data).format("YYYY-MM-DDTHH:mm:ss");
//	            	   
//	            	   getMetrics();

		            });
			},
			legend :{
				dispatch: {},
				width: 500,
				height: 20,
				align: true,
				rightAlign: true
			}
		}
	};

	
	function carregaGraficoLinha(){

		var comments = [], 
        	likes = [], 
        	shares = [],
        	reactions = [],
        	totalMetrics = [];

//		var baseQuery = '{ "references": ['+$rootScope.arrayReferencia+'],"slug":['+$rootScope.filtroSlug+'], "dateStart": "'+$rootScope.dataInicial+'", "dateFinish": "'+$rootScope.dataFinal+'", "groupBy" : "'+agrupamento+'","orderBy" : "" ,"orderByDirection" : "ASC"}';
//		var query = JSON.parse( baseQuery );
		var deferred = $q.defer();
			
		var method = 'GET';
		var url = '/RadarSocialRegras/facebook';
		var req = {
			method : method,
			url : url
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
			
			})
			
			$scope.data = [ 
			               { values: comments, key: 'Comentários', color: '#7777ff', area: false },
			               { values: likes, key: 'Curtidas', color: '#2ca02c' },
			               { values: shares, key: 'Compartilhados', color: '#ff00bf' },
			               { values: reactions, key: 'Reações', color: '#ff0000' }
	            ];
         });
		
	}
	
	$scope.sortType = "likes";   
    $scope.reverse = !$scope.reverse;
    
	//ordena colunas da tabela padrao
	 $scope.sortBy = function(keyname){
      $scope.sortType = keyname;   
      $scope.reverse = !$scope.reverse; 
  }
	
	
	//popula tabela padrao
	function carregaTabela(){
		
		
	    $scope.metricas = [];
		
	    var deferred = $q.defer();
		
		var method = 'GET';
		var url = '/RadarSocialRegras/facebook';
		var req = {
			method : method,
			url : url
			}
	
		$http(req).success(function(data, status, headers, config){ 
			 deferred.resolve(data);
		}).error(deferred.resolve);

		deferred.promise.then(function(data) {
			total = data.total;

			data.map(function(metric){

				$scope.metricas.push({
					link : metric.link,
					nomePagina: metric.nomePagina,
					comments: metric.comments,
					likes: metric.likes,
					shares: metric.shares,
					reactions: metric.reactions
				});
				
			})
			
         });
	}
	
	//popula grafico de pizza
	function carregaGraficoPizza(){
		
		var totalReactions = [];
		var portais = [];
		var dataPie = [];
		var total = 0;
		var totalOutros = 0;
		var dataPieFinal = [];
		$scope.testdata2 = [];

//		var baseQuery = '{ "references": ['+$rootScope.arrayReferencia+'], "slug":['+$rootScope.filtroSlug+'],"dateStart": "'+$rootScope.dataInicial+'", "dateFinish": "'+$rootScope.dataFinal+'", "groupBy" : "referencia","orderBy" : "" ,"orderByDirection" : "DESC"}';
//		var query = JSON.parse( baseQuery );
		var deferred = $q.defer();
			
		var method = 'GET';
		var url = '/RadarSocialRegras/facebookPortais';
		var req = {
			method : method,
			url : url
		}

		$http(req).success(function(data, status, headers, config){ 
			deferred.resolve(data);
		}).error(deferred.resolve);

		deferred.promise.then(function(data) {
			data.result.map(function(metric){
				totalReactions.push(metric.sum);
				portais.push(metric._id);
			})
			
			
			for(var i = 0; i < totalReactions.length; i++){
				dataPie.push({key: portais[i], y: totalReactions[i]});
			}
			
			$scope.testdata2 = dataPie;
//		    $scope.filtroReferencia = dataPie[0].key;
//		    
//		    if($scope.testdata2.length == 1){
//			    $rootScope.labelPortais = $scope.filtroReferencia;
//				$rootScope.arrayReferencia ="\""+$scope.filtroReferencia+"\"";
//		    }else if($scope.testdata2.length > 1){
//		    	$rootScope.arrayReferencia = [];
//		    	for(var i = 0; i < $scope.testdata2.length;i++)
//		    		$rootScope.arrayReferencia.push("\"" + $scope.testdata2[i].key + "\"");
//		    	$rootScope.arrayReferencia = $rootScope.arrayReferencia.join(", ");
//		    	
//		    	$rootScope.labelPortais = $rootScope.arrayReferencia;
//		    }
//		    
//		    $scope.qtdResultados = dataPie.length;
		    //var testdata2 = dataPieFinal;
		    
		    var height = 400;
		    var width = 480;
	
		    nv.addGraph(function() {
		        var chart = nv.models.pieChart()
		            .x(function(d) { return d.key })
		            .y(function(d) { return d.y })
		            .width(width)
		            .height(height)
		            .showTooltipPercent(true)
		            .noData("Não há dados a serem exibidos")
		            .showLegend(false)
		            .labelsOutside(true);

		            chart.tooltip.valueFormatter(function(d){return d.toLocaleString("pt-br")});
		            
//		            chart.pie.dispatch.on("elementClick", function(e) {
//		            	$scope.$apply(function () {
//		            		var key = e.data.key;
//		            		if ($scope.selection.indexOf(key) < 0) {
//		            			$scope.selection.push(e.data.key);
//		            		}
//		                });
//		            });
		        		            
		        d3.select("#test1")
		            .datum($scope.testdata2)
		            .transition().duration(1200)
		            .attr('width', width)
		            .attr('height', height)
		            .call(chart);
		       
		        return chart;
		    });
		    
		});
	}
	
	$scope.exportarExcel = function(){
	      
		var dados = [];
		$scope.metricas.map(function(item){
			var dado = {};
			
			dado['URL'] = item['link'];
			dado['Página'] = item['nomePagina'];
			dado['Comentários'] = item['comments'];
			dado['Curtidas'] = item['likes'];
//			dado['Posts Compartilhados'] = item['sharedPosts'];
			dado['Compartilhados'] = item['shares'];
			dado['Reações'] = item['reactions'];
			dados.push(dado);
		})
		alasql('SELECT * INTO XLSX("relatorio.xlsx",{headers:true}) FROM ? ORDER BY Curtidas DESC',[dados]);
	  
	};
	
	$scope.exportarPdf = function(){
	      
	};
	

});