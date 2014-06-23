<!DOCTYPE html>
<html lang="it" ng-app="cp">
<meta charset="utf-8">
<title>{{ 'app_tab-title' | i18n }}</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-theme.min.css" rel="stylesheet">
<link href="css/xeditable.css" rel="stylesheet">
<link href="css/modaldialog.css" rel="stylesheet">

<!-- required libraries -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="lib/angular.js"></script>
<script src="js/localize.js" type="text/javascript"></script>
<script src="lib/angular-route.js"></script>
<script src="lib/angular-sanitize.js"></script>
<!-- <script src="lib/angular-strap.js"></script> -->
<script src="lib/xeditable.js"></script>
<script src="lib/ui-bootstrap-tpls.min.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<script src="js/filters.js"></script>
<script src="js/services.js"></script>
<script src="js/directives.js"></script>
<script src="js/dialogs.min.js" type="text/javascript"></script>

<!-- optional libraries -->
<script src="lib/angular-resource.min.js"></script>
<script src="lib/angular-cookies.min.js"></script>
<script src="lib/angular-route.min.js"></script>
<script src="lib/xeditable.min.js"></script>
<base href="/myweb/" />

</head>

<body ng-controller="LoginCtrl">

<!-- 	<div class="navbar navbar-fixed-top navbar-inverse" role="navigation"> -->
<!--       <div class="container"> -->
<!--         <div class="collapse navbar-collapse"> -->
<!--           <ul class="nav navbar-nav"> -->
            
<!--           </ul> -->
<!--           <ul class="nav navbar-nav navbar-right" ng-init="setItalianLanguage()"> -->
<!--           	<li class="{{ isActiveItaLang() }}"><a href="#" ng-click="setItalianLanguage()">IT</a></li> -->
<!--           	<li class="{{ isActiveEngLang() }}"><a href="#" ng-click="setEnglishLanguage()">EN</a></li> -->
<!--           </ul> -->
<!--         </div>/.nav-collapse -->
<!--       </div>/.container -->
<!--     </div>/.navbar -->
	<div class="container">
		<div class="row" style="margin-top: 50px;">
			<!-- Rights menu - List of links and other services (menu mensa etc) style="margin: 50px 20px 10px 0;" -->
<!-- 			<div class="col-md-2" style="margin-top: 100px;" -->
<!-- 				ng-show="!frameOpened"> -->
<!-- 				<div class="panel panel-default" style="height: 200px"> -->
<!-- 					<div class="panel-heading"> -->
<!-- 						<h4 class="panel-title">{{ 'left_menu-availableServices_eu' | -->
<!-- 							i18n }}</h4> -->
<!-- 					</div> -->
<!-- 					<div class="panel-body"> -->
<!-- 						<ul class="nav nav-pills nav-stacked" style="font-size: 14px"> -->
<!-- 							<li class="{{ isActiveLinkEdil() }}"><a -->
<!-- 								href="#/PracticeList/edil" ng-click="showPractices(1, true)">{{ -->
<!-- 									'left_menu-bildings' | i18n }}</a></li> -->
<!-- 							<li class="{{ isActiveLinkAss() }}"><a -->
<!-- 								href="#/PracticeList/ass" ng-click="showPractices(2, true)">{{ -->
<!-- 									'left_menu-allowances' | i18n }}</a></li> -->
<!-- 						</ul> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="panel panel-default" style="height: 250px"> -->
<!-- 					<div class="panel-heading"> -->
<!-- 						<h4 class="panel-title">{{ -->
<!-- 							'left_menu-availableServices_extraeu' | i18n }}</h4> -->
<!-- 					</div> -->
<!-- 					<div class="panel-body"> -->
<!-- 						<ul class="nav nav-pills nav-stacked" style="font-size: 14px"> -->
<!-- 							<li class="{{ isActiveLinkEdilExtra() }}"><a -->
<!-- 								href="#/PracticeList/edil" ng-click="showPractices(1, false)">{{ -->
<!-- 									'left_menu-bildings' | i18n }}</a></li> -->
<!-- 							<li class="{{ isActiveLinkAssExtra() }}"><a -->
<!-- 								href="#/PracticeList/ass" ng-click="showPractices(2, false)">{{ -->
<!-- 									'left_menu-allowances' | i18n }}</a></li> -->
<!-- 						</ul> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
			<!-- Main section with informations and practices -->
			<!-- 		<div ng-class="{col-md-7:!frameOpened, col-md-9:frameOpened}"> -->
			<div ng-class="col-md-10">
				<div class="row" style="height: 500px">
					<div class="well" style="margin: 10px 10px 10px 10px">
						<div align="center">
							<h2>MyWeb</h2>
						</div>
						<p align="justify">Caro Utente, benvenuto in <b>My WEB</b>, il Portale dei Servizi della Comunità di valle della Vallagarina, che in prospettiva ti permetterà di presentare le tue domande direttamente in formato elettronico, 
						di essere aggiornato con informazioni sempre puntuali e di partecipare ad una community aperta che vuole essere uno strumento di semplificazione e miglioramento di accesso ai servizi erogati dal territorio.
						Il portale parte in via sperimentale il primo di luglio 2014 con un numero limitato di servizi; in particolare tutti i cittadini della Vallagarina potranno sottomettere in forma completamente digitale le domande: <br></p>
						<ul>
							<li><strong>di assegnazione di un alloggio;</strong></li>
							<li><strong>di integrazione al canone.</strong></li>
						</ul>
						<p align="justify">Al portale ci accede attraverso la <b>Carta Provinciale dei Servizi</b> che deve prima essere abilitata. All'atto dell'attivazione ti verr&agrave; consegnato anche un apposito lettore che con una semplice proceduta dovrai installare sul tuo computer. 
						La Carta Provincia dei Servizi &egrave; attivabile presso numerosi sportelli presenti sul territorio: Sportelli Periferici della Provincia, Sportelli dell'Azienda Sanitaria e Comuni. Per la Vallagarina gli uffici abilitati sono visibili <a href="http://www.cartaservizi.provincia.tn.it/contatti/pagina8.html"><strong>QUI</strong></a>. 
						Se vuoi approfondire l'argomento visita il sito ufficiale della <a href="http://www.cartaservizi.provincia.tn.it/attivazione/"><strong>Carta Provinciale dei Servizi</strong></a>.</p>
						<table class="table" style="width: 98%">
							<tr>
								<td align="center"><a href="adc_login" class="btn btn-primary" role="button" ng-click="getLogin()">Procedi con l'autenticazione</a></td>
								<td align="center"><a href="login" class="btn btn-default" role="button" ng-click="getOldLogin()">Login VAS-DEV</a></td>
							</tr>
							<tr>
								<td colspan="2">&nbsp;</td>
							</tr>
						</table>
						<p><i>Il progetto My WEB è stato realizzato grazie alla collaborazione del Consorzio dei comuni Trentini, la Comunità di valle della Vallagarina, la Fondazione Bruno Kessler e Informatica Trentina.</i></p>
					</div>
				</div>

			</div>
			<!-- Left menu - List of usefull links (skype, how to, community) offset1 style="margin: 50px 10px 10px 50px;" -->
			<!-- col-md-offset-1 -->
<!-- 			<div class="col-md-2" style="margin-top: 100px;"> -->
<!-- 				<div class="panel panel-default" style="height: 160px"> -->
<!-- 					<div class="panel-heading"> -->
<!-- 						<h4 class="panel-title">{{ 'need_help' | i18n }}?</h4> -->
<!-- 					</div> -->
<!-- 					<div class="panel-body"></div> -->
<!-- 					<hr /> -->
<!-- 				</div> -->
<!-- 				<div class="panel panel-default" style="height: 180px"> -->
<!-- 					<div class="panel-heading"> -->
<!-- 						<h4 class="panel-title">{{ 'guide' | i18n }}</h4> -->
<!-- 					</div> -->
<!-- 					<div class="panel-body"> -->
<!-- 						<ul class="nav nav-sidebar"> -->
<!-- 							<li><a href="#"><span class="glyphicon glyphicon-minus"></span>&nbsp; -->
<!-- 									{{ 'faq' | i18n }}</a></li> -->
<!-- 							<li><a -->
<!-- 								href="http://www.comunitadellavallagarina.tn.it/cId/192/lcMenu/InM9/idM/1521/ct/Presentazione/pagina.aspx" -->
<!-- 								target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; -->
<!-- 									{{ 'documents' | i18n }}</a></li> -->
<!-- 						</ul> -->
<!-- 					</div> -->
<!-- 					<hr /> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
		<div class="row">
			<div class="col-md-12">
				<hr>
				<footer>
				<p>&copy; SmartCampus 2013</p>
				</footer>
			</div>
		</div>
	</div>

</body>

</html>