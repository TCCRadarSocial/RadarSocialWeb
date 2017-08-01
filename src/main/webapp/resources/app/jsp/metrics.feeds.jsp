<%@include file="/header.jsp"%>

<div ng-app="myApp" ng-controller='feedController'>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class='col-lg-12' align="center">
				<Strong>Filtros:</Strong> <br> <span
					ng-if="labelDataInicial != ''">Data Inicial:
					{{labelDataInicial}} |</span> 
					<span ng-if="labelDataFinal != ''">Data
					Final: {{labelDataFinal}} <button type="button" class="btn btn-primary" 
					 ng-if="dataInicialAnterior !='' && dataFinalAnterior != ''" 
					 ng-click="RedefinirData()">Redefinir Filtro</button> 
					|</span>
					<span ng-if="labelLink != ''">Link:
					{{labelLink}} <button type="button" ng-if="link != ''" class="btn btn-primary" 
					ng-click="RedefinirLink()">Redefinir Filtro</button>|</span> 
					<span ng-if="labelPortais != ''">Portais:
					{{labelPortais}}</span> 
					<button type="button" class="btn btn-primary" ng-click="RedefinirPortal()" ng-if="portal != ''">Redefinir Filtro</button>
					<br>
			</div>
			
			<!-- <div class="col-lg-12" align="center"> -->
			
				<div class='col-sm-3'>
					Data Inicial:
					<div class='input-group date' id='datetimepicker1'
						data-ng-model="dataInicial">
						<input type='text' class="form-control" id="dataInicial" /> <span
							class="input-group-addon"> <span
							class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
				</div>
				<div class='col-sm-3'>
					Data Final:
					<div class='input-group date' id='datetimepicker2'
						data-ng-model="dataFinal">
						<input type='text' class="form-control" id="dataFinal"/> <span
							class="input-group-addon"> <span
							class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
				</div>
				
				<button type="button" class="btn btn-primary" ng-click="buscar()" id="botaoBuscar">
					<span class="glyphicon glyphicon-search"></span> Buscar
				</button>
		
			<!-- </div> -->
		</div>
	</div>
	
	<div masonry load-images="true">
	    <div class="masonry-brick" ng-repeat="metrica in metricas">
	        {{metrica.link }}
	    </div>
	</div>
	
	<!-- <table ng-repeat="metrica in metricas">
	<tr>
	<td>{{metrica.link }}</td>
					<td>{{ metrica.nomePagina }}</td>
					<td>{{ metrica.nomeTwitter }}</td>
					<td>{{ metrica.dataCriacao}}</td>
					<td>{{ metrica.comments.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.likes.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.shares.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.reactions.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.favorites.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.retweets.toLocaleString("pt-br") }}</td>
	</tr>
	</table> -->
</div>