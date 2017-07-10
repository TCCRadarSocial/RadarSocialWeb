<%@include file="/header.jsp"%>
<div ng-app="myApp" ng-controller='facebookController'>
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
					<th><a href="" ng-click="sortBy('nomePagina')"> Página <span
							ng-show="sortType == 'nomePagina'" class="fa fa-caret-down"></span>
					</a></th>
					<th><a href="" ng-click="sortBy('comments')"> Comentários
							<span ng-show="sortType == 'comments'" class="fa fa-caret-down"></span>
					</a></th>
					<th><a href="" ng-click="sortBy('likes')"> Curtidas <span
							ng-show="sortType == 'likes'" class="fa fa-caret-down"></span></a></th>
					<!-- <th><a href="" ng-click="sortBy('sharedPosts')" title="Posts Compartilhados"> Posts Compartilhados  <span ng-show="sortType == 'sharedPosts'"  class="fa fa-caret-down"></span></a></th> -->
					<th><a href="" ng-click="sortBy('shares')"
						title="Compartilhados"> Compartilhados <span
							ng-show="sortType == 'shares'" class="fa fa-caret-down"></span></a></th>
					<th><a href="" ng-click="sortBy('reactions')" title="Reações">
							Reações <span ng-show="sortType == 'reactions'"
							class="fa fa-caret-down"></span>
					</a></th>
				</tr>

			</thead>
			<tbody>
				<!-- <tr ng-repeat="portal in portais |orderBy:sort.column:sort.descending| filter:paginate"> -->

				<!-- <tr ng-repeat="metrica in metricas"> -->
				<tr dir-paginate="metrica in metricas|orderBy:sortType:reverse|itemsPerPage:10 "current-page="currentPage">
					<td title="{{ metrica.link }}"><span
						class="glyphicon glyphicon-filter"
						ng-click="filtrarURL(metrica.link)"></span> <i
						class="fa fa-external-link" aria-hidden="true"
						ng-click="abrirLink(metrica.link)"></i> <a ng-href=""
						data-toggle="modal" data-target="#modalFbAnalytics"
						ng-click="defineModal(metrica.groupBy); buscaModalFbAnalytics();">{{
							metrica.link }}</a></td>
					<td>{{ metrica.nomePagina }}</td>
					<td>{{ metrica.comments.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.likes.toLocaleString("pt-br") }}</td>
					<!-- <td>{{ metrica.sharedPosts.toLocaleString("pt-br") }}</td> -->
					<td>{{ metrica.shares.toLocaleString("pt-br") }}</td>
					<td>{{ metrica.reactions.toLocaleString("pt-br") }}</td>
				</tr>
			</tbody>
		</table>
		<div class="text-center">
			<dir-pagination-controls max-size="10" direction-links="true"
				boundary-links="true"></dir-pagination-controls>
		</div>

	</div>
</div>