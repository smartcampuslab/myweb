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
<script src="../js/localize.js" type="text/javascript"></script>
<script src="../js/dialogs.min.js" type="text/javascript"></script>
<script src="../lib/angular-route.js"></script>
<script src="../lib/angular-sanitize.js"></script>
<script src="../lib/ui-bootstrap-tpls.min.js"></script>
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
<base href="/myweb/" />

<script>
var token="<%=request.getAttribute("token")%>";
var userId="<%=request.getAttribute("user_id")%>";
var user_name="<%=request.getAttribute("user_name")%>";
var user_surname="<%=request.getAttribute("user_surname")%>";
var user_mail="<%=request.getAttribute("e_mail")%>";
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
<%-- var subjectdn="<%=request.getAttribute("subjectdn")%>"; --%>
var base64="<%=request.getAttribute("base64")%>";

</script>

</head>

<body>
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div class="container">
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#/console/" ng-click="home()">{{ 'menu_bar-home' | i18n }}</a></li>
            <li ng-show="(isActiveLinkSearch() == 'active')" class="active"><a href="#/Console/search" ng-click="hideHome()">{{ 'left_menu-bildings' | i18n }}</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" ng-init="setItalianLanguage()">
          	<li class="{{ isActiveItaLang() }}"><a href="#" ng-click="setItalianLanguage()">IT</a></li>
          	<li class="{{ isActiveEngLang() }}"><a href="#" ng-click="setEnglishLanguage()">EN</a></li>
            <li class="active"><a href="#" ng-click="logout()">{{ 'menu_bar-logout' | i18n }}</a></li><!-- ng-click="logout()" -->
          </ul>
        </div><!-- /.nav-collapse -->
      </div><!-- /.container -->
    </div><!-- /.navbar -->
	<div class="container">
		<div class="row" style="margin-top:70px;">
		<!-- Rights menu - List of links and other services (menu mensa etc) style="margin: 50px 20px 10px 0;" -->
		<div class="col-md-2" style="margin-top:100px;" ng-show="!frameOpened">
			<div class="panel panel-default" style="height: 230px">
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'left_menu-availableServices_op' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-pills nav-stacked" style="font-size: 14px">
	            		<li class="{{ isActiveLinkSearch() }}"><a href="#/Console/search" ng-click="hideHome()">{{ 'left_menu-search' | i18n }}</a></li>
	        		</ul>
	        	</div>
	        </div>
		</div>
		<!-- Main section with informations and practices -->
<!-- 		<div ng-class="{col-md-7:!frameOpened, col-md-9:frameOpened}"> -->
		<div ng-class="{'col-md-8':!frameOpened, 'col-md-10':frameOpened}">
			<div class="row" style="height: 130px; margin-top: 20px">
				<div style="text-align: center">
					<table>
						<tr>
							<td width="30%" align="right"><img src="img/myweb4_small.png" alt="Logo myWeb" title="Logo myWeb" /></td>
							<td width="70%" align="left"><h1>{{ 'app_console-title' | i18n }}</h1></td>
						</tr>
					</table>
					
				</div>
			</div>
			<div class="row" ng-show="isHomeShowed()">
				<div class="well" style="height: 180px">
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
			<div ng-view class="row" ng-hide="isNewPractice()" >Loading...</div>
		</div>
		<!-- Left menu - List of usefull links (skype, how to, community) offset1 style="margin: 50px 10px 10px 50px;" -->
		<!-- col-md-offset-1 -->
		<div class="col-md-2" style="margin-top:100px;">
			<div class="panel panel-default" style="height: 230px" >
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'guide' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-sidebar">
						Documenti: 
<!-- 						<li><a href="#"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ 'faq' | i18n }}</a></li> -->
<!-- 						<li><a href="http://www.comunitadellavallagarina.tn.it/cId/192/lcMenu/InM9/idM/1521/ct/Presentazione/pagina.aspx" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ 'documents' | i18n }}</a></li> -->
<!-- 						<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Locazione-alloggio-pubblico-a-canone-sociale/Requisiti" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ 'documents' | i18n }}</a></li>	 -->
						<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Locazione-alloggio-pubblico-a-canone-sociale" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp;locazione alloggio</a></li>
						<li><a href="http://www.trentinosociale.it/index.php/Servizi-ai-cittadini/Guida-ai-servizi/per-destinatari/Anziani/Abitare-o-disporre-di-un-alloggio-adeguato-e-sicuro/Contributo-sul-canone-di-affitto" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; integrazione canone affitto</a></li>
					</ul>
				</div>
			</div>
			<div class="panel panel-default" style="height: 200px">
				<div class="panel-heading">
					<h4 class="panel-title">Contatti utili</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-sidebar">
						<li>Per informazioni o domante selezionare il seguente link <a href="mailto:myweb.edilizia@comunitadellavallagarina.tn.it?Subject=Info%20MyWeb" target="_top" alt="myweb.edilizia@comunitadellavallagarina.tn.it" title="myweb.edilizia@comunitadellavallagarina.tn.it">myweb.edilizia</a></li>
<!-- 						<li><a href="mailto:info@comunitadellavallagarina.tn.it?Subject=Info%20MyWeb" target="_top">Comunit&agrave; della Vallagarina</a></li> -->
					</ul>
				</div>
				<hr/>
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
<!-- 	</div> -->
</body>

</html>