<%@include file="/header.jsp"%>
<style>
.reticencias {
  max-width: 190px; /* Tamanho */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
</style>
<div ng-app="myApp" ng-controller='twitterController'>
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
	<div>
		<div class="col-md-8">
			<nvd3 options='options' data='data'></nvd3>
		</div>
		<div class="col-md-4">
			<svg id="test1" class="mypiechart" style="height: 450px;"></svg>
		</div>
	</div>
	<div class="col-md-12">
		<table class="table table-hover table-condensed" id="tabela">
			<thead>
				<tr>
					<th><button type="button" class="btn btn-default"
							ng-click="exportarExcel()" ng-show="metricas.length > 0">
							<span class="fa fa-file-excel-o"></span>
						</button>
						<button type="button" class="btn btn-default"
							ng-click="exportarPdf()" ng-show="metricas.length > 0">
							<span class="fa fa-file-pdf-o"></span>
						</button> <a href="" ng-click="sortBy('groupBy')"> URL <span
							ng-show="sortType == 'groupBy'" class="fa fa-caret-down"></span></a></th>
					<th><a href="" ng-click="sortBy('nomeTwitter')"> Twitter <span
							ng-show="sortType == 'nomeTwitter'" class="fa fa-caret-down"></span>
					</a></th>
					<th><a href="" ng-click="sortBy('texto')"> Tweet
							<span ng-show="sortType == 'texto'" class="fa fa-caret-down"></span>
					</a></th>
					<th><a href="" ng-click="sortBy('dataCriacao')" title="Data Criação">
							Data criação <span ng-show="sortType == 'dataCriacao'"
							class="fa fa-caret-down"></span>
					</a></th> 
					<th><a href="" ng-click="sortBy('retweets')"> Retweets
							<span ng-show="sortType == 'retweets'" class="fa fa-caret-down"></span>
					</a></th>
					<th><a href="" ng-click="sortBy('favorites')"> Favorites <span
							ng-show="sortType == 'favorites'" class="fa fa-caret-down"></span></a></th>
					<!-- <th><a href="" ng-click="sortBy('sharedPosts')" title="Posts Compartilhados"> Posts Compartilhados  <span ng-show="sortType == 'sharedPosts'"  class="fa fa-caret-down"></span></a></th> -->
					<!-- <th><a href="" ng-click="sortBy('shares')"
						title="Compartilhados"> Compartilhados <span
							ng-show="sortType == 'shares'" class="fa fa-caret-down"></span></a></th>
					<th><a href="" ng-click="sortBy('reactions')" title="Reações">
							Reações <span ng-show="sortType == 'reactions'"
							class="fa fa-caret-down"></span>
					</a></th>
					 -->
				</tr>

			</thead>
			<tbody>
				<!-- <tr ng-repeat="portal in portais |orderBy:sort.column:sort.descending| filter:paginate"> -->

				<!-- <tr ng-repeat="metrica in metricas"> -->
				<tr
					dir-paginate="metrica in metricas|orderBy:sortType:reverse|itemsPerPage:10 "
					current-page="currentPage">
					<td title="{{ metrica.link }}"><span
						class="glyphicon glyphicon-filter"
						ng-click="filtrarURL(metrica.link)"></span> <i
						class="fa fa-external-link" aria-hidden="true"
						ng-click="abrirLink(metrica.link)"></i> <a ng-href=""
						data-toggle="modal" data-target="#modalFbAnalytics"
						ng-click="defineModal(metrica.groupBy); buscaModalFbAnalytics();">{{
							metrica.link }}</a></td>
					<td>{{ metrica.nomeTwitter }}</td>
					<td title="{{ metrica.texto }}" class="reticencias">{{ metrica.texto }}</td>
					<td>{{ metrica.dataCriacao}}</td>
					<td>{{ metrica.retweets.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.favorites.toLocaleString("pt-br") }}</td>
					<!-- <td>{{ metrica.sharedPosts.toLocaleString("pt-br") }}</td> -->
					<!-- <td>{{ metrica.shares.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.reactions.toLocaleString("pt-br") }}</td> -->
				</tr>
			</tbody>
		</table>
		<div class="text-center">
			<dir-pagination-controls max-size="10" direction-links="true"
				boundary-links="true"></dir-pagination-controls>
		</div>

	</div>
</div>