<%@include file="/header.jsp"%>
<style>
.reticencias {
  max-width: 180px; /* Tamanho */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
</style>
<div ng-app="myApp" ng-controller='feedController' style="padding-left:20px" class="col-lg-12 col-md-12 col-sm-12">
	<div class="panel panel-default">
		<div class="panel-body">
			<div class='col-lg-12' align="center" style="margin-bottom:25px;">
				<Strong>Filtros:</Strong> <br> <span
					ng-if="labelDataInicial != ''">Data Inicial:
					{{labelDataInicial}} |</span> 
					<span ng-if="labelDataFinal != ''">Data
					Final: {{labelDataFinal}} <button type="button" class="btn btn-primary" 
					 ng-if="dataInicialAnterior !='' && dataFinalAnterior != ''" 
					 ng-click="RedefinirData()">Redefinir Filtro</button> 
					|</span>
					<span ng-if="labelPortais != ''">Portais:
					{{labelPortais}}</span> 
					<button type="button" class="btn btn-primary" ng-click="RedefinirPortal()" ng-if="portal != ''">Redefinir Filtro</button>
					<br>
			</div>
			<div>
			<div class="col-lg-10">
				<div class="col-lg-2" >
				Rede Social:
					<div class="radio">
					  <label><input type="radio" name="option" ng-model="checkRedeSocial" value="redeAmbos" ng-click="selecionaRede()" checked>Ambos</label>
					</div>
					<div class="radio">
					  <label><input type="radio" name="option" ng-model="checkRedeSocial" value="redeFacebook" ng-click="selecionaRede()">Facebook</label>
					</div>
					<div class="radio">
					  <label><input type="radio" name="option"  ng-model="checkRedeSocial" value="redeTwitter" ng-click="selecionaRede()">Twitter</label>
					</div>
				</div>
				<div class="form-group col-lg-2">
				  <label for="portais">Portais:</label>
				  <select class="form-control" id="portais" ng-options="p for p in portais">
				    	<!-- <option ng-repeat="p in portais" ng-if="p != '' && p != []" value="{{p}}">{{p}}</option> -->
				  </select>
				</div>
				<div class="col-lg-2" >
					Data:
					<div class="radio">
					  <label><input type="radio" name="dataOption" ng-model="dataOption" value="gravacao" checked>Grava��o</label>
					</div>
					<div class="radio">
					  <label><input type="radio" name="dataOption" ng-model="dataOption" value="criacao">Cria��o</label>
					</div>
				</div>
				<div class="col-sm-3" ng-switch="dataOption" >
					<div class='col-sm-12' ng-switch-when="criacao">
						Data Inicial:
						<div class='input-group date' id='datetimepicker1'
							data-ng-model="dataInicial">
							<input type='text' class="form-control" id="dataInicial" /> <span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
					<br><br><br>
					<div class='col-sm-12' ng-switch-when="criacao">
						Data Final:
						<div class='input-group date' id='datetimepicker2'
							data-ng-model="dataFinal">
							<input type='text' class="form-control" id="dataFinal"/> <span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>
			</div>
				<div class="col-lg-12" style="text-align:center;margin-top:15px;">
					<button type="button" class="btn btn-primary" ng-click="buscar()" id="botaoBuscar">
						<span class="glyphicon glyphicon-search"></span> Buscar
					</button>
				</div>
		
			</div> 
		</div>
	</div>
	<!-- <div masonry='{ "transitionDuration" : "0.4s" , "itemSelector" : ".tile"}' class="tile-wall" width="100%">
	  <div masonry-tile ng-repeat="metrica in metricas" class="tile">
	  		<div class="col-xs-12">
				<img src="{{metrica.imagem}}" style="width:100%" />
				<label>
					<a	href="http://{{metrica.link}}" target="_blank">
						<span ng-if="metrica.name != null">{{metrica.name}}</span>
						<span ng-if="metrica.name == null" class="textoResumido">{{metrica.link}}</span>
					</a>
				</label>
			</div>
		</div>
	 </div>
	 <div masonry load-images="true">
	  -->
	 <div masonry='{ "transitionDuration" : "0.4s" , "itemSelector" : ".tile"}' class="tile-wall" width="100%">
	    <div class="masonry-brick" ng-repeat="metrica in metricas">
	        <div class="col-xs-12" style="width:200px;padding:10px;box-shadow:2px 2px 2px 2px #888888;margin:13px;">
	        	<div style="text-align:right;">
	        		<span><strong style="font-size:11px">Criado em: {{metrica.dataCriacao}}</strong></span>
	        	</div>
				<div  ng-if="metrica.imagem != ''">
					<img src="{{metrica.imagem}}" style="width:100%" />
				</div>
					<div>
						<a href="http://{{metrica.link}}"  target="_blank" title="{{metrica.mensagem}}{{metrica.texto}}">
							<span class="reticencias" ng-if="metrica.imagem != ''">{{metrica.mensagem | limitTo:25}}{{metrica.texto | limitTo:25}}...</span>
							<span ng-if="metrica.imagem == ''">{{metrica.mensagem}}{{metrica.texto}}</span>
						</a>
					</div>
					<span ng-if="metrica.nomePagina != null">P�gina Facebook: {{metrica.nomePagina}}<br></span>
					<span ng-if="metrica.nomeTwitter != null" >Twitter: {{metrica.nomeTwitter}}<br></span>
					<div style="text-align:right;" ng-if="metrica.reactions > 0">
						<button type="button" class="btn btn-primary"><i class="fa fa-facebook" aria-hidden="true"></i> {{metrica.reactions}}</button>
					</div>
					<div style="text-align:right;" ng-if="metrica.retweets > 0">
						<button type="button" class="btn btn-info"><i class="fa fa-twitter" aria-hidden="true"></i> {{metrica.retweets}}</button>
					</div>
					
					<!-- <span ng-if="metrica.retweets > 0">Retweets: {{metrica.retweets}}<br></span>
					<span ng-if="metrica.favorites > 0" >Favorites: {{metrica.favorites}}<br></span>
					<span ng-if="metrica.likes > 0">Curtidas: {{metrica.likes}}<br></span>
					<span ng-if="metrica.comments > 0" >Coment�rios: {{metrica.comments}}<br></span>
					<span ng-if="metrica.shares > 0">Compartilhamentos: {{metrica.shares}}<br></span>
					<span ng-if="metrica.reactions > 0" >Rea��es: {{metrica.reactions}}<br></span> -->
					
			</div>
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