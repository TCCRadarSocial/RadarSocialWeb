//angular.module('myApp', []).controller('facebookController', ['$scope',function($scope){
angular.module('myApp').controller('facebookController', function($scope,$http,$q,$rootScope) {
	
	$scope.dataInicial = moment().subtract(1, 'days').utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
	$scope.dataFinal = moment().utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
	
	$scope.portal = "";
	$scope.link = "";
	$scope.labelPortais = "";
	$scope.labelLink = "";
	$scope.dataInicialAnterior = "";
    $scope.dataFinalAnterior = "";
	
	$(function () {
		$('#datetimepicker1').datetimepicker({
            locale: 'pt-br'
        });
		$('#datetimepicker2').datetimepicker({
            locale: 'pt-br'
        });
    });
	
	$rootScope.buscar = function(){


		if(angular.element(document.querySelector('#dataInicial')).val() != "" && angular.element(document.querySelector('#dataFinal')).val() != ""){
			
			$scope.dataInicial = angular.element(document.querySelector('#dataInicial')).val();
			$scope.dataInicial =   moment($scope.dataInicial, 'DD/MM/YYYY - HH:mm:ss').utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
			$scope.dataFinal = angular.element(document.querySelector('#dataFinal')).val();
			$scope.dataFinal =   moment($scope.dataFinal, 'DD/MM/YYYY - HH:mm:ss').utc().format('YYYY-MM-DDTHH:mm:ss')+'.000Z';
			
			if($scope.dataInicial > $scope.dataFinal){
				alert("Selecione as datas corretamente");
			}else{
				$scope.portal = "";
				carregaTudo();
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
		carregaGraficoLinha();
		carregaTabela();
		carregaGraficoPizza();
		$scope.labelDataInicial = moment($scope.dataInicial, 'YYYY-MM-DDTHH:mm:ss.000Z').format('DD/MM/YYYY - HH:mm:ss');
		$scope.labelDataFinal = moment($scope.dataFinal, 'YYYY-MM-DDTHH:mm:ss.000Z').format('DD/MM/YYYY - HH:mm:ss');
	}
	
	$scope.currentPage = 1;
	
	$scope.abrirLink = function(link){
		window.open(link);
	}
	
	
	$scope.dateFormat = {
			format: 'DD/MM/YYYY HH:mm:ss',
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
		               
		               $scope.dataInicialAnterior = $scope.dataInicial;
		               $scope.dataFinalAnterior = $scope.dataFinal;
		               
		               $scope.dataInicial =  moment.unix(data).utc().format("YYYY-MM-DDTHH:mm:ss")+'.000Z';
	            	   $scope.dataFinal = moment.unix(data).utc().add(1,'second').format("YYYY-MM-DDTHH:mm:ss")+'.000Z';
    	   
	            	   carregaTudo();

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

		var baseQuery = '[{"portal": "'+$scope.portal+'","dataInicial": "'+$scope.dataInicial+'","dataFinal": "'+$scope.dataFinal+'","link":"'+$scope.link+'"}]';
		var query = JSON.parse( baseQuery );
		var deferred = $q.defer();
			
		var method = 'POST';
		var url = '/RadarSocialRegras/facebookSearch';
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
    
    $scope.filtrarURL = function(link){
    	$scope.link = link;
    	$scope.labelLink = link;
    	carregaTudo();
    }
    
	//ordena colunas da tabela padrao
	 $scope.sortBy = function(keyname){
      $scope.sortType = keyname;   
      $scope.reverse = !$scope.reverse; 
  }
	
	
	//popula tabela padrao
	function carregaTabela(){
		
		
	    $scope.metricas = [];
		
	    var baseQuery = '[{"portal": "'+$scope.portal+'","dataInicial": "'+$scope.dataInicial+'","dataFinal": "'+$scope.dataFinal+'","link":"'+$scope.link+'"}]';
		var query = JSON.parse( baseQuery );
	    var deferred = $q.defer();
		
		var method = 'POST';
		var url = '/RadarSocialRegras/facebookSearch';
		var req = {
			method : method,
			url : url,
			data: query
			}
	
		$http(req).success(function(data, status, headers, config){ 
			 deferred.resolve(data);
		}).error(deferred.resolve);

		deferred.promise.then(function(data) {
			total = data.total;

			data.map(function(metric){
				
				data = moment(metric.dataCriacao.$date, 'YYYY-MM-DDTHH:mm:ss.000Z').utc().format('DD/MM/YYYY - HH:mm:ss');
				
				$scope.metricas.push({
					link : metric.link,
					nomePagina: metric.nomePagina,
					mensagem : metric.mensagem,
					comments: metric.comments,
					likes: metric.likes,
					shares: metric.shares,
					reactions: metric.reactions,
					dataCriacao : data
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
		$scope.labelPortais = [];

		var baseQuery = '[{"portal":"'+$scope.portal+'","dataInicial": "'+$scope.dataInicial+'","dataFinal": "'+$scope.dataFinal+'","link":"'+$scope.link+'"}]';
		var query = JSON.parse( baseQuery );
		var deferred = $q.defer();
			
		var method = 'POST';
		var url = '/RadarSocialRegras/facebookPortais';
		var req = {
			method : method,
			url : url,
			data: query
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
				$scope.labelPortais.push(portais[i]);
			}
			
			$scope.testdata2 = dataPie;
			
			
		    
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
		            
		            chart.pie.dispatch.on("elementClick", function(e) {
		            	$scope.$apply(function () {
		            		var key = e.data.key;
		            		
		            		$scope.portal = key;
		            		
		            		carregaTudo();
		                });
		            });
		        		            
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
			dado['Mensagem'] = item['mensagem'];
			dado['Página'] = item['nomePagina'];
			dado['Data Criação'] = item['dataCriacao'];
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
		var dados = [];
		$scope.metricas.map(function(item){
			var dado = {};
			
//			dado['URL'] = item['link'];
			dado['Página'] = item['nomePagina'];
			dado['Data Criação'] = item['dataCriacao'];
			dado['Comentários'] = item['comments'];
			dado['Curtidas'] = item['likes'];
//			dado['Posts Compartilhados'] = item['sharedPosts'];
			dado['Compartilhados'] = item['shares'];
			dado['Reações'] = item['reactions'];
			dados.push(dado);
		})
		
		callme(dados);
	};
	
	function callme(dados){
		var table = dados;
		var doc = new jsPDF('l','pt','letter',true);


		$.each(table, function(i, row){
			$.each(row, function(j,cell){
			if(j=="Data Criação"){
			 doc.cell(1,10,190,20,cell,i);	
			}
			else{
				doc.cell(1,10,90,20,cell,i);
			}
			
			});
		});

		doc.save('relatorio.pdf');
		}
	

});