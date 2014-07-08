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
<script src="lib/angular-base64.min.js"></script>
<base href="/myweb/" />

</head>

<body ng-controller="LoginCtrl">

	<div class="container">
		<div class="row" style="margin-top: 50px;">
			<div ng-class="col-md-10">
<!-- 				<div class="row" style="height: 180px" align="center"> -->
<!-- 					<img src="img/myweb4.png" alt="Logo myWeb" title="Logo myWeb" /> -->
<!-- 				</div> -->
				<div class="row" style="height: 800px">
					<div class="well" style="margin: 10px 10px 10px 10px">
						<div style="margin: 20px" align="center">
<!-- 							<h2>MyWeb</h2> -->
							<img src="img/myweb4.png" alt="Logo myWeb" title="Logo myWeb" />
						</div>
						<p align="justify">Caro Utente, benvenuto in <b>My WEB</b>, il Portale dei Servizi della Comunit&agrave; di valle della Vallagarina, che in prospettiva ti permetter&agrave; di presentare le tue domande direttamente in formato elettronico, 
						di essere aggiornato con informazioni puntuali e di partecipare ad una community aperta che vuole essere uno strumento di semplificazione e miglioramento di accesso ai servizi erogati dal territorio.
						Il portale parte in via sperimentale il primo di luglio 2014 con un numero limitato di servizi; in particolare tutti i cittadini della Vallagarina potranno presentare in forma completamente digitale le domande: <br></p>
						<ul>
							<li><strong>di locazione di un alloggio;</strong></li>
							<li><strong>di contributo integrativo al canone di locazione.</strong></li>
						</ul>
						<p align="justify">Al portale My WEB ci accede utilizzando la <b>Carta Provinciale dei Servizi</b> che deve prima essere abilitata. 
						Essa &egrave; attivabile presso numerosi sportelli presenti sul territorio: Sportelli Periferici della Provincia, Sportelli dell'Azienda Sanitaria e Comuni. Per la Vallagarina gli uffici abilitati sono visibili <a href="http://www.cartaservizi.provincia.tn.it/contatti/pagina8.html"><strong>QUI</strong></a>. 
						Se vuoi approfondire l'argomento visita il sito ufficiale della <a href="http://www.cartaservizi.provincia.tn.it/attivazione/"><strong>Carta Provinciale dei Servizi</strong></a>. 
						All'atto dell'attivazione della carta ti verr&agrave; consegnato anche un apposito lettore che con una semplice proceduta dovrai installare sul tuo computer, fatto questo potrai accedere ai servizi del portale.</p>
						<table class="table" style="width: 98%">
							<tr>
								<td align="center"><a href="adc_login" class="btn btn-primary" role="button" ng-click="getLogin()">Procedi con l'autenticazione</a></td>
								<td align="center"><a href="login" class="btn btn-default" role="button" ng-click="getOldLogin()">Login TEST</a></td>
							</tr>
							<tr>
								<td colspan="2">&nbsp;</td>
							</tr>
						</table>
						<table class="table" style="width: 100%">
						<tr>
							<td width="50%">
								<table style="width: 100%">
									<tr>
										<td colspan="3"><p><i>Il progetto My WEB � un iniziativa ideata, realizzata e promossa da: </i></p></td>
									</tr>
									<tr>	
										<td align="center"><a target="_blank" href="http://www.formazione.comunitrentini.tn.it/home"><img src="img/consorzio_comuni_tn_small.png" alt="Logo comuni trentini" title="Logo comuni trentini"/></a></td>
										<td align="center"><a target="_blank" href="http://www.fbk.eu"><img src="img/fbk_small.png" alt="Logo Fbk" title="Logo Fbk"/></a></td>
										<td align="center"><a target="_blank" href="http://www.comunitadellavallagarina.tn.it"><img src="img/vallagarina_small.png" alt="Logo Vallagarina" title="Logo Vallagarina"/></a></td>
									</tr>
									<tr>
								</table>
							</td>
							<td width="50%">
								<table style="width: 100%">
									<tr>
										<td colspan="2"><p><i>Con la collaborazione di: </i></p></td>
									</tr>
									<tr>	
										<td width="50%" align="right"><a target="_blank" href="http://www.provincia.tn.it"><img src="img/pat_small.png" alt="Logo PAT" title="Logo Provincia Autonoma di Trento"/></a></td>
										<td width="50%" align="right"><a target="_blank" href="http://www.infotn.it"><img src="img/infotn_small.png" alt="Logo Informatica Trentina" title="Logo Informatica Trentina"/></a></td>
									</tr>
								</table>
							</td>
						</tr>		
						</table>
<!-- 						<p><i>Il progetto My WEB � un iniziativa ideata, realizzata e promossa da: stato realizzato grazie alla collaborazione del Consorzio dei comuni Trentini, la Comunit&agrave; di valle della Vallagarina, la Fondazione Bruno Kessler e Informatica Trentina.</i></p> -->
					</div>
				</div>

			</div>
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