<!DOCTYPE html>
<html ng-app="cp" ng-controller="ConsoleCtrl">
<head lang="it">
<meta charset="utf-8">
<title>{{ 'app_tab-title' | i18n }}</title>

<link href="../css/bootstrap.min.css" rel="stylesheet">
<link href="../css/bootstrap-theme.min.css" rel="stylesheet">
<link href="../css/xeditable.css" rel="stylesheet">
<link href="../css/modaldialog.css" rel="stylesheet">
<link href="../img/myweb.ico" rel="shortcut icon" type="image/x-icon" />

<!-- required libraries -->
<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../lib/angular.js"></script>
<script src="../lib/angular-file-upload.js"></script>
<script src="../js/localize.js" type="text/javascript"></script>
<script src="../js/dialogs.min.js" type="text/javascript"></script>
<script src="../lib/angular-route.js"></script>
<script src="../lib/angular-sanitize.js"></script>
<script src="../lib/ui-bootstrap-tpls.min.js"></script>
<script src="../lib/ng-google-chart.js"></script>
<script src="../i18n/angular-locale_it-IT.js"></script>
<!-- <script src="i18n/angular-locale_en-EN.js"></script> -->
<script src="../js/app.js"></script>
<!-- <script src="js/controllers.js"></script> -->
<script src="../js/controllers/ctrl.js"></script>
<script src="../js/controllers/ctrl_console.js"></script>
<script src="../js/controllers/ctrl_login.js"></script>
<script src="../js/controllers/ctrl_main.js"></script>
<script src="../js/controllers/ctrl_practice.js"></script>
<script src="../js/controllers/ctrl_info.js"></script>

<script src="../js/filters.js"></script>
<script src="../js/services.js"></script>
<script src="../js/directives.js"></script>

<!-- <script type="text/javascript" src="js/jquery.min.js" /></script> -->
<!-- <script type="text/javascript" src="js/jquery-ui.custom.min.js" ></script> -->
<!-- <script type="text/javascript" src="js/ui.datepicker-it.js" ></script> -->

<!-- optional libraries -->
<!-- <script src="lib/underscore-min.js"></script> -->
<!-- <script src="lib/moment.min.js"></script> -->
<!-- <script src="lib/fastclick.min.js"></script> -->
<!-- <script src="lib/prettify.js"></script> -->
<script src="../lib/angular-resource.min.js"></script>
<script src="../lib/angular-cookies.min.js"></script>
<script src="../lib/angular-route.min.js"></script>
<script src="../lib/xeditable.min.js"></script>
<script src="../lib/angular-base64.min.js"></script>
<script src="../lib/shim.js"></script>
<script src="../lib/xls.js"></script>
<!-- <script src="../lib/alasql.min.js"></script> -->
<!-- <script src="../lib/alasql-worker.js"></script>     -->
<base href="/myweb/" />

<script>
var token="<%=request.getAttribute("token")%>";
var userId="<%=request.getAttribute("user_id")%>";
var user_name="<%=request.getAttribute("user_name")%>";
var user_surname="<%=request.getAttribute("user_surname")%>";
var nome="<%=request.getAttribute("nome")%>";
var cognome="<%=request.getAttribute("cognome")%>";
var sesso="<%=request.getAttribute("sesso")%>";
var dataNascita="<%=request.getAttribute("dataNascita")%>";
var provinciaNascita="<%=request.getAttribute("provinciaNascita")%>";
var luogoNascita="<%=request.getAttribute("luogoNascita")%>";
var indirizzoRes="<%=request.getAttribute("indirizzoRes")%>";
var capRes="<%=request.getAttribute("capRes")%>";
var cittaRes="<%=request.getAttribute("cittaRes")%>";
var provinciaRes="<%=request.getAttribute("provinciaRes")%>";
var codiceFiscale="<%=request.getAttribute("codiceFiscale")%>";
var cellulare="<%=request.getAttribute("cellulare")%>";
var email="<%=request.getAttribute("email")%>";
var issuerdn="<%=request.getAttribute("issuerdn")%>";
var base64="<%=request.getAttribute("base64")%>";
var mailMessage="<%=request.getAttribute("mailMessage")%>";
var mailMessageErr="<%=request.getAttribute("mailMessageErr")%>";

</script>

<style>
.custom-file-input {
  color: transparent;
  width: 170px;
  height: 40px;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Seleziona un file';
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 8px 20px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 12pt;
  width: 170px;
  height: 40px;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); 
}

.scrollable-menu {
	height: auto;
	width: 220px;
	max-height: 300px;
	overflow-x: hidden;
}

.table>tbody>tr>td{
	vertical-align: middle;
}

td.container { 
	height: 80px;
}

td.container_mess {
	height: 40px;
}
</style>

</head>

<body>
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
    	<div class="container">
        	<div class="collapse navbar-collapse">
	          	<ul class="nav navbar-nav">
	            	<li class="active"><a href="#/console/" ng-click="home()">{{ 'menu_bar-home' | i18n }}</a></li>
	            	<li ng-show="(isActiveLinkSearch() == 'active')" class="active"><a href="#/Console/search" ng-click="hideHome()">{{ 'left_menu-search' | i18n }}</a></li>
	          	</ul>
	          	<ul class="nav navbar-nav navbar-right" ng-init="setItalianLanguage()">
	          		<li class="dropdown">
	          			<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ 'guide' | i18n }} <span class="caret"></span></a>
	          			<ul class="dropdown-menu" role="menu">
	            			<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Locazione-alloggio-pubblico-a-canone-sociale" target="_blank">{{ 'document_link_edil' | i18n }}</a></li>
	            			<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Contributo-sul-canone-di-affitto" target="_blank">{{ 'document_link_allowances' | i18n }}</a></li>
	            		</ul>
	          		</li>
	          		<li><a href="mailto:myweb.edilizia@comunitadellavallagarina.tn.it?Subject=Info%20MyWeb" target="_top" alt="myweb.edilizia@comunitadellavallagarina.tn.it" title="myweb.edilizia@comunitadellavallagarina.tn.it">{{ 'usefull_link'| i18n }}</a></li>
	          		<li class="{{ isActiveItaLang() }}"><a href ng-click="setItalianLanguage()">IT</a></li>
	          		<li class="{{ isActiveEngLang() }}"><a href ng-click="setEnglishLanguage()">EN</a></li>
	            	<li><a href="console/logout" ng-click="logout()">{{ 'menu_bar-logout' | i18n }}</a></li><!-- ng-click="logout()" -->
	          	</ul>
        	</div><!-- /.nav-collapse -->
      	</div><!-- /.container -->
    </div><!-- /.navbar -->
	<div class="container">
		<div class="row" style="margin-top:65px;">
			<div class="col-md-1"></div>
		<!-- Rights menu - List of links and other services (menu mensa etc) style="margin: 50px 20px 10px 0;" -->
<!-- 		<div class="col-md-2" style="margin-top:100px;" ng-show="!frameOpened"> -->
<!-- 			<div class="panel panel-default" style="height: 230px"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">{{ 'left_menu-availableServices_op' | i18n }}</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 					<ul class="nav nav-pills nav-stacked" style="font-size: 14px"> -->
<!-- 	            		<li class="{{ isActiveLinkSearch() }}"><a href="#/Console/search" ng-click="hideHome()">{{ 'left_menu-search' | i18n }}</a></li> -->
<!-- 					<li class="{{ isActiveLinkReport() }}"><a href="#/Console/report" ng-click="hideHome()">{{ 'left_menu-report' | i18n }}</a></li> -->
<!-- 	        		</ul> -->
<!-- 	        	</div> -->
<!-- 	        </div> -->
<!-- 		</div> -->
		<!-- Main section with informations and practices -->
<!-- 		<div ng-class="{'col-md-8':!frameOpened, 'col-md-10':frameOpened}"> -->
			<div class="col-md-10">
				<div class="panel panel-default" ng-init="ctInitMenu()"><!-- ng-init="ctInitMenu()" -->
			  		<div class="panel-body">
			  			<div style="margin:5px 15px;">
							<div class="row" style="height: 140px; margin-top: 20px">
								<div style="text-align: center">
									<table>
										<tr>
											<td width="30%" align="right" valign="middle"><img src="img/myweb4_small.png" alt="Logo myWeb" title="Logo myWeb" /></td>
											<td width="70%" align="left" valign="middle"><h1>{{ 'app_console-title' | i18n }}</h1></td>
										</tr>
									</table>
								</div>
							</div>
							<div class="row" ng-show="isHomeShowed()">
								<div class="well"><!-- style="height: 180px" -->
									<table class="table" style="width: 98%"><!-- ng-init="retrieveUserData()" -->
									<tr>
										<th colspan="3" align="center">
										<strong>{{ 'comunity_info' | i18n }}</strong>
										</th>
									</tr>
									<tr>
										<td width="10%" rowspan="5" align="center">
											<a href="#"
												class="thumbnail"><img
												src="img/vallagarina.png" alt="Comunita della Vallagarina">
											</a>
										</td>
										<td width="45%">{{ 'comunity_name' | i18n }}: <strong>Comunit&agrave; della Vallagarina</strong></td>
										<td width="45%">{{ 'comunity_address' | i18n }}: <strong>Via Tommaseo 5 - 38068 Rovereto</strong></td>
									</tr>
									<tr>
										<td>{{ 'operator_name' | i18n }}: <strong>{{ getOperatorName() }}</strong></td><!-- <span id="user_surname"></span> -->
										<td></td>
									</tr>
									</table>
								</div>
							</div>
							<div class="row" ng-show="!frameOpened && !waitForWS">
								<div class="panel panel-primary" style="height: 220px"><!-- style="height: 120px" -->
									<div class="panel-heading">
										<h4 class="panel-title">{{ 'left_menu-availableServices_op' | i18n }}</h4>
									</div>
									<div class="panel-body">
<!-- 										<table class="table table-striped" style="width: 100%"> -->
<!-- 											<tr valign="middle"> -->
<!-- 												<td width="80%" rowspan="3"> -->
													<ul class="nav nav-pills nav-stacked" style="font-size: 14px">
						            					<li class="{{ isActiveLinkSearch() }}"><a href="#/Console/search" ng-click="setActiveLinkSearch()">{{ 'left_menu-search' | i18n }}</a></li>
						            					<li class="{{ isActiveLinkClassificationProvv() }}"><a href="#/Console/classification/provv/1" ng-click="setActiveLinkClassificationProvv()">{{ 'left_menu-classification_provv' | i18n }}</a></li>
														<li class="{{ isActiveLinkClassificationFinal() }}"><a href="#/Console/classification/final/1" ng-click="setActiveLinkClassificationFinal()">{{ 'left_menu-classification_final' | i18n }}</a></li>
<!-- 														<li class="{{ isActiveLinkClassificationBenefits() }}"><a href="#/Console/classification/benefits" ng-click="setActiveLinkClassificationBenefits()">{{ 'left_menu-classification_benefits' | i18n }}</a></li> -->
<!-- 														<li class="{{ isActiveLinkClassificationNotifics() }}"><a href="#/Console/classification/notifics" ng-click="setActiveLinkClassificationNotifics()">{{ 'left_menu-classification_notifics' | i18n }}</a></li> -->
													<!-- <li class="{{ isActiveLinkReport() }}"><a href="#/Console/report" ng-click="hideHome()">{{ 'left_menu-report' | i18n }}</a></li> -->
						        					</ul>
<!-- 												</td> -->
<!-- 												<td align="center" width="20%">&nbsp;</td> -->
<!-- 											</tr> -->
<!-- 											<tr valign="middle"> -->
<!-- 												<td align="center" width="20%">&nbsp;<a href="#/console/home" type="button" class="btn btn-info" ng-show="showNextStateProvv==true" ng-click="ctUpdate(1, true)" >Prossimo Stato</a></td> -->
<!-- 											</tr> -->
<!-- 											<tr valign="middle"> -->
<!-- 												<td align="center" width="20%">&nbsp;<a href="#/console/home" type="button" class="btn btn-info" ng-show="showNextStateDef==true" ng-click="ctUpdate(2, true)" >Prossimo Stato</a></td> -->
<!-- 											</tr> -->
<!-- 											<tr valign="middle"> -->
<!-- 												<td align="center" width="20%">&nbsp;<a href="#/console/home" type="button" class="btn btn-info" ng-show="showNextStateAss==true" ng-click="ctUpdate(3, true)" >Prossimo Stato</a></td> -->
<!-- 											</tr> -->
<!-- 											<tr valign="middle"> -->
<!-- 												<td align="center" width="20%">&nbsp;</td> -->
<!-- 											</tr> -->
<!-- 										</table> -->
										
						        	</div>
						        </div>
							</div>
							<div class="row" style="height: 200px; margin-top: 20px" ng-show="waitForWS">
								<div style="text-align: center">
									<img src="img/ajax-loader.gif" width="70" height="70" /><br>
									<h2>{{ 'loading_text' | i18n }}...</h2>
								</div>
							</div>
							<div class="row" ng-show="getMailMessages()!='null'"><!-- ng-show="getMailMessages()!=''" -->
								<div class="panel panel-success" ><!-- style="height: 80px" -->
<!-- 									<div class="panel-heading"> -->
<!-- 										<h4 class="panel-title">Esito Invio Mail</h4> -->
<!-- 									</div> -->
									<div class="panel-body">
										<div class="alert alert-success" role="alert">
											<ul>
												<li ng-repeat="message in messageFromWsMail track by $index"><strong>{{ message }}</strong></li>
											</ul>
										</div>
						        	</div>
						        </div>
							</div>
							<div class="row" ng-show="getMailMessagesErr()!='null'"><!-- ng-show="getMailMessages()!=''" -->
								<div class="panel panel-danger" ><!-- style="height: 80px" -->
<!-- 									<div class="panel-heading"> -->
<!-- 										<h4 class="panel-title">Esito Invio Mail</h4> -->
<!-- 									</div> -->
									<div class="panel-body">
										<div class="alert alert-danger" role="alert">
											<ul>
												<li ng-repeat="message in messageFromWsMailErr track by $index"><strong>{{ message }}</strong></li>
											</ul>
										</div>
						        	</div>
						        </div>
							</div>
							<div ng-view class="row" ng-hide="isNewPractice()" >Loading...</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-1"></div>
		<!-- Left menu - List of usefull links (skype, how to, community) offset1 style="margin: 50px 10px 10px 50px;" -->
		<!-- col-md-offset-1 -->
<!-- 		<div class="col-md-2" style="margin-top:100px;"> -->
<!-- 			<div class="panel panel-default" style="height: 230px" > -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">{{ 'guide' | i18n }}</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 					<ul class="nav nav-sidebar"> -->
<!-- 						Documenti:  -->
<!-- 						<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Locazione-alloggio-pubblico-a-canone-sociale" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp;locazione alloggio</a></li> -->
<!-- 						<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Contributo-sul-canone-di-affitto" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; integrazione canone affitto</a></li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="panel panel-default" style="height: 200px"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">Contatti utili</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 					<ul class="nav nav-sidebar"> -->
<!-- 						<li>Per informazioni o domante selezionare il seguente link <a href="mailto:myweb.edilizia@comunitadellavallagarina.tn.it?Subject=Info%20MyWeb" target="_top" alt="myweb.edilizia@comunitadellavallagarina.tn.it" title="myweb.edilizia@comunitadellavallagarina.tn.it">myweb.edilizia</a></li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
<!-- 				<hr/> -->
<!-- 			</div> -->
<!-- 			</div> -->
		</div>
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
			<hr>
			<footer>
<!-- 				<p>&copy; SmartCampus 2013</p> -->
			</footer>
			</div>
			<div class="col-md-1"></div>
		</div>
	</div>	
	
<!-- 	</div> -->
</body>

</html>