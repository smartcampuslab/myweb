<!DOCTYPE html>
<html lang="it" ng-app="cp" ng-controller="MainCtrl">
<head lang="it">
<meta charset="utf-8">
<title>{{ 'app_tab-title' | i18n }}</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-theme.min.css" rel="stylesheet">
<link href="css/xeditable.css" rel="stylesheet">
<link href="css/modaldialog.css" rel="stylesheet">
<!-- <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet"> -->
<link href="img/myweb.ico" rel="shortcut icon" type="image/x-icon" />

<!-- required libraries -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="lib/angular.js"></script>
<script src="js/localize.js" type="text/javascript"></script>
<script src="lib/angular-route.js"></script>
<script src="lib/angular-sanitize.js"></script>
<!-- <script src="lib/angular-strap.js"></script> -->
<!-- <script src="lib/xeditable.js"></script> -->
<!-- <script src="lib/ui-bootstrap-tpls.min.js"></script> -->
<script src="https://code.angularjs.org/1.0.8/i18n/angular-locale_it-it.js"></script>
<script src="lib/ui-bootstrap-tpls-0.11.0.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<script src="js/filters.js"></script>
<script src="js/services.js"></script>
<script src="js/directives.js"></script>
<!-- <script src="js/bootstrap-datetimepicker.min.js"></script> -->
<script src="js/dialogs.min.js" type="text/javascript"></script>

<!-- <script type="text/javascript" src="js/jquery.min.js" /></script> -->
<!-- <script type="text/javascript" src="js/jquery-ui.custom.min.js" ></script> -->
<!-- <script type="text/javascript" src="js/ui.datepicker-it.js" ></script> -->

<!-- optional libraries -->
<!-- <script src="lib/underscore-min.js"></script> -->
<!-- <script src="lib/moment.min.js"></script> -->
<!-- <script src="lib/fastclick.min.js"></script> -->
<!-- <script src="lib/prettify.js"></script> -->
<script src="lib/angular-resource.min.js"></script>
<script src="lib/angular-cookies.min.js"></script>
<script src="lib/angular-route.min.js"></script>
<script src="lib/xeditable.min.js"></script>
<script src="lib/angular-base64.min.js"></script>
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
            <li class="active"><a href="#" ng-click="home()">{{ 'menu_bar-home' | i18n }}</a></li>
            <li ng-show="frameOpened && (isActiveLinkEdil() == 'active')" class="active"><a href="#/PracticeList/edil/1" ng-click="showPractices(1, true)">{{ 'left_menu-bildings' | i18n }}</a></li>
            <li ng-show="frameOpened && (isActiveLinkAss() == 'active')" class="active"><a href="#/PracticeList/ass/1" ng-click="showPractices(2, true)">{{ 'left_menu-allowances' | i18n }}</a></li>
          	<li ng-show="frameOpened && (isActiveLinkEdilExtra() == 'active')" class="active"><a href="#/PracticeList/edil/2" ng-click="showPractices(1, false)">{{ 'left_menu-bildings' | i18n }}</a></li>
            <li ng-show="frameOpened && (isActiveLinkAssExtra() == 'active')" class="active"><a href="#/PracticeList/ass/2" ng-click="showPractices(2, false)">{{ 'left_menu-allowances' | i18n }}</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" ng-init="setItalianLanguage()">
          	<li class="{{ isActiveItaLang() }}"><a href="#" ng-click="setItalianLanguage()">IT</a></li>
          	<li class="{{ isActiveEngLang() }}"><a href="#" ng-click="setEnglishLanguage()">EN</a></li>
            <li class="active"><a href="#" ng-click="logout()">{{ 'menu_bar-logout' | i18n }}</a></li>
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
					<h4 class="panel-title">{{ 'left_menu-availableServices_eu' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-pills nav-stacked" style="font-size: 14px">
	            		<li class="{{ isActiveLinkEdil() }}"><a href="#/PracticeList/edil/1" ng-click="showPractices(1, true)">{{ 'left_menu-bildings' | i18n }}</a></li>
	            		<li class="{{ isActiveLinkAss() }}"><a href="#/PracticeList/ass/1" ng-click="showPractices(2, true)">{{ 'left_menu-allowances' | i18n }}</a></li>
	        		</ul>
	        	</div>
	        </div>
	        <div class="panel panel-default" style="height: 230px">
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'left_menu-availableServices_extraeu' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-pills nav-stacked" style="font-size: 14px">
	            		<li class="{{ isActiveLinkEdilExtra() }}"><a href="#/PracticeList/edil/2" ng-click="showPractices(1, false)">{{ 'left_menu-bildings' | i18n }}</a></li>
	            		<li class="{{ isActiveLinkAssExtra() }}"><a href="#/PracticeList/ass/2" ng-click="showPractices(2, false)">{{ 'left_menu-allowances' | i18n }}</a></li>
	        		</ul>
	        	</div>
	        </div>
<!-- 	        <div class="panel panel-default" style="height: 200px" ng-init="getServices()"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">{{ 'left_menu-moreServices' | i18n }}</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 					<ul class="nav nav-sidebar" style="font-size: 14px" ng-repeat="service in services"> -->
<!-- 	            		<li><a href="{{ service.addressUrl }}" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ service.name }}</a></li> -->
<!-- 	        		</ul> -->
<!-- 	        	</div>	 -->
<!-- 	        </div> -->
		</div>
		<!-- Main section with informations and practices -->
<!-- 		<div ng-class="{col-md-7:!frameOpened, col-md-9:frameOpened}"> -->
		<div ng-class="{'col-md-8':!frameOpened, 'col-md-10':frameOpened}">
			<div class="row" style="height: 130px; margin-top: 20px">
				<div style="text-align: center">
					<table>
						<tr>
							<td width="30%" align="right"><img src="img/myweb4_small.png" alt="Logo myWeb" title="Logo myWeb" /></td>
							<td width="70%" align="left"><h1>{{ 'app_home-title' | i18n }}</h1></td>
						</tr>
					</table>
					
				</div>
			</div>
			<div class="row" ng-show="isHomeShowed()">
				<div class="well" style="height: 250px">
					<table class="table" style="width: 98%"><!-- ng-init="retrieveUserData()" -->
					<tr>
						<th colspan="3" align="center">
						<strong>{{ 'citizen_info' | i18n }}</strong>
						</th>
					</tr>
					<tr>
						<td width="10%" rowspan="5" align="center">
							<a href="#"
								class="thumbnail"><img
								src="img/user.jpg" alt="">
							</a>
						</td>
						<td width="45%">{{ 'citizen_name' | i18n }}: <strong>{{ getUserName() }}</strong></td><!-- <span id="user_name"></span> -->
						<td width="45%">{{ 'citizen_gender' | i18n }}: <strong>{{ utenteCS.sesso }}</strong></td><!-- {{ translateUserGender(user.gender) }} -->
					</tr>
					<tr>
						<td>{{ 'citizen_surname' | i18n }}: <strong>{{ getUserSurname() }}</strong></td><!-- <span id="user_surname"></span> -->
						<td>{{ 'citizen_taxcode' | i18n }}: <strong>{{ utenteCS.codiceFiscale }}</strong></td>
					</tr>
					<tr>
						<td>{{ 'citizen_address' | i18n }}: <strong>{{ utenteCS.indirizzoRes }},{{ utenteCS.capRes }},{{ utenteCS.cittaRes }}-{{ utenteCS.provinciaRes }}</strong></td>
						<td>{{ 'citizen_date_of_birth' | i18n }}: <strong>{{ utenteCS.dataNascita }} , {{ utenteCS.luogoNascita }} ({{ utenteCS.provinciaNascita }})</strong></td>
					</tr>
					<tr>
						<td>{{ 'citizen_phone' | i18n }}: <strong>{{ utenteCS.cellulare }}</strong></td>
						<td>{{ 'citizen_mail' | i18n }}: <strong>{{ utenteCS.email }}</strong></td>
					</tr>
<!-- 					<tr> -->
<!-- 						<td>{{ 'citizen_ueCitizen' | i18n }}: {{ utenteCS.cittadinanza }} -->
<!-- 						<strong> -->
<!-- 							<dev ng-show = "user.ue_citizen" >{{ 'citizen_ueCitizen_yes' | i18n }}</dev> -->
<!-- 							<dev ng-show = "!user.ue_citizen" >{{ 'citizen_ueCitizen_no' | i18n }}</dev> -->
<!-- 						</strong> -->
<!-- 						</td> -->
<!-- 						<td></td> -->
<!-- 					</tr> -->
					</table>
				</div>
			</div>
			<div ng-view class="row" ng-hide="isNewPractice()" >Loading...</div>
		</div>
		<!-- Left menu - List of usefull links (skype, how to, community) offset1 style="margin: 50px 10px 10px 50px;" -->
		<!-- col-md-offset-1 -->
		<div class="col-md-2" style="margin-top:100px;">
<!-- 			<div class="panel panel-default" style="height: 160px"> -->
<!-- 				<blockquote> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">{{ 'need_help' | i18n }}?</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 				<script type="text/javascript" src="http://www.skypeassets.com/i/scom/js/skype-uri.js"></script>
<!--  					<div id="SkypeButton_Call_regolo985_1"> -->
<!-- 		  			<script type="text/javascript"> -->
<!--  		    		Skype.ui({ -->
<!--  		      		"name": "call", -->
<!--  		      		"element": "SkypeButton_Call_regolo985_1", -->
<!--  		      		"participants": ["regolo985"], -->
<!--  		      		"imageSize": 24 -->
<!--   		    		}); -->
<!--  		  			</script> -->
<!--  				</div> -->
<!-- 					<a href="skype:echo123?call"><img src="img/skype.png" height="42" width="42"/><br> {{ 'call_skype' | i18n }}</a><br> {{ 'online_assistance_skype' | i18n }} -->
<!-- 				</blockquote> -->
<!-- 				</div> -->
<!-- 				<hr/> -->
<!-- 			</div> -->
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
<!-- 			<div ng-show="isActiveLinkEdil() == 'active'" class="panel panel-default" style="height: 200px"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">Community</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 					<ul> -->
<!-- 						<li>Mario Rossi</li> -->
<!-- 					</ul> -->
<!-- 					<ul> -->
<!-- 						<li>Marco Bianchi</li> -->
<!-- 					</ul> -->
<!-- 					<ul> -->
<!-- 						<li>Luigi Verdi</li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
<!-- 				<hr/> -->
<!-- 			</div> -->
<!-- 			<div ng-show="isActiveLinkAss() == 'active'" class="panel panel-default" style="height: 200px"> -->
<!-- 				<div class="panel-heading"> -->
<!-- 					<h4 class="panel-title">Community</h4> -->
<!-- 				</div> -->
<!-- 				<div class="panel-body"> -->
<!-- 					<ul> -->
<!-- 						<li>Luigi Neri</li> -->
<!-- 					</ul> -->
<!-- 					<ul> -->
<!-- 						<li>Maria Bianchi</li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
<!-- 				<hr/> -->
<!-- 			</div> -->
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