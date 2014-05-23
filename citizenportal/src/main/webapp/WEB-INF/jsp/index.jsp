<!DOCTYPE html>
<html lang="it" ng-app="cp">
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>

<head lang="it">
<meta charset="utf-8">
<title>{{ 'app_tab-title' | i18n }}</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<!-- <link href="css/prettify.css" rel="stylesheet"> -->
<link href="css/bootstrap-theme.min.css" rel="stylesheet">
<!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css"> -->
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
<!-- <script src="lib/underscore-min.js"></script> -->
<!-- <script src="lib/moment.min.js"></script> -->
<!-- <script src="lib/fastclick.min.js"></script> -->
<!-- <script src="lib/prettify.js"></script> -->
<script src="lib/angular-resource.min.js"></script>
<script src="lib/angular-cookies.min.js"></script>
<script src="lib/angular-route.min.js"></script>
<script src="lib/xeditable.min.js"></script>
<base href="/smartcampus.citizenportal/" />

<script>
var token="<%=request.getAttribute("token")%>";
var userId="<%=request.getAttribute("user_id")%>";
var user_name="<%=request.getAttribute("user_name")%>";
var user_surname="<%=request.getAttribute("user_surname")%>";
<%-- var current_view="<%=request.getAttribute("view")%>"; --%>
</script>

</head>

<body ng-controller="MainCtrl">
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div class="container">
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#" ng-click="home()">{{ 'menu_bar-home' | i18n }}</a></li>
            <li ng-show="frameOpened && (isActiveLinkEdil() == 'active')" class="active"><a href="#/PracticeList/edil" ng-click="showPractices(1)">{{ 'left_menu-bildings' | i18n }}</a></li>
            <li ng-show="frameOpened && (isActiveLinkAss() == 'active')" class="active"><a href="#/PracticeList/ass" ng-click="showPractices(2)">{{ 'left_menu-allowances' | i18n }}</a></li>
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
			<div class="panel panel-default" style="height: 300px">
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'left_menu-availableServices' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-pills nav-stacked" style="font-size: 14px">
	            		<li class="{{ isActiveLinkEdil() }}"><a href="#/PracticeList/edil" ng-click="showPractices(1)">{{ 'left_menu-bildings' | i18n }}</a></li>
	            		<li class="{{ isActiveLinkAss() }}"><a href="#/PracticeList/ass" ng-click="showPractices(2)">{{ 'left_menu-allowances' | i18n }}</a></li>
	        		</ul>
	        	</div>
	        	<hr/>
	        </div>
	        <div class="panel panel-default" style="height: 200px" ng-init="getServices()">
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'left_menu-moreServices' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-sidebar" style="font-size: 14px" ng-repeat="service in services">
	            		<li><a href="{{ service.addressUrl }}" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ service.name }}</a></li>
	        		</ul>
	        	</div>	
	        </div>
		</div>
		<!-- Main section with informations and practices -->
<!-- 		<div ng-class="{col-md-7:!frameOpened, col-md-9:frameOpened}"> -->
		<div ng-class="{'col-md-8':!frameOpened, 'col-md-10':frameOpened}">
			<div class="row" style="height: 100px; margin-top: 20px">
				<div style="text-align: center">
					<h1>{{ 'app_home-title' | i18n }}</h1>
				</div>
			</div>
			<div class="row" ng-show="isHomeShowed()">
				<div class="well" style="height: 250px">
					<table class="table" style="width: 98%" ng-init="retrieveUserData()">
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
						<td width="45%">{{ 'citizen_gender' | i18n }}: <strong>{{ translateUserGender(user.gender) }}</strong></td>
					</tr>
					<tr>
						<td>{{ 'citizen_surname' | i18n }}: <strong>{{ getUserSurname() }}</strong></td><!-- <span id="user_surname"></span> -->
						<td>{{ 'citizen_taxcode' | i18n }}: <strong>{{ user.taxCode }}</strong></td>
					</tr>
					<tr>
						<td>{{ 'citizen_address' | i18n }}: <strong>{{ user.address }}</strong></td>
						<td>{{ 'citizen_date_of_birth' | i18n }}: <strong>{{ (user.dateOfBirth | date:"dd/MM/yyyy") }}</strong></td>
					</tr>
					<tr>
						<td>{{ 'citizen_phone' | i18n }}: <strong>{{ user.phone }}</strong></td>
						<td>{{ 'citizen_mail' | i18n }}: <strong>{{ user.mail }}</strong></td>
					</tr>
					<tr>
						<td>{{ 'citizen_ueCitizen' | i18n }}: 
						<strong>
							<dev ng-show = "user.ue_citizen" >{{ 'citizen_ueCitizen_yes' | i18n }}</dev>
							<dev ng-show = "!user.ue_citizen" >{{ 'citizen_ueCitizen_no' | i18n }}</dev>
						</strong>
						</td>
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
			<div class="panel panel-default" style="height: 160px">
				<!-- <blockquote> -->
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'need_help' | i18n }}?</h4>
				</div>
				<div class="panel-body">
				<!-- <script type="text/javascript" src="http://www.skypeassets.com/i/scom/js/skype-uri.js"></script>
 					<div id="SkypeButton_Call_regolo985_1">
		  			<script type="text/javascript">
 		    		Skype.ui({
 		      		"name": "call",
 		      		"element": "SkypeButton_Call_regolo985_1",
 		      		"participants": ["regolo985"],
 		      		"imageSize": 24
  		    		});
 		  			</script>
 				</div> -->
					<a href="skype:echo123?call"><img src="img/skype.png" height="42" width="42"/><br> {{ 'call_skype' | i18n }}</a><br> {{ 'online_assistance_skype' | i18n }}
				<!-- </blockquote> -->
				</div>
				<hr/>
			</div>
			<div class="panel panel-default" style="height: 180px" >
				<div class="panel-heading">
					<h4 class="panel-title">{{ 'guide' | i18n }}</h4>
				</div>
				<div class="panel-body">
					<ul class="nav nav-sidebar">
						<li><a href="#"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ 'faq' | i18n }}</a></li>
						<li><a href="http://www.comunitadellavallagarina.tn.it/cId/192/lcMenu/InM9/idM/1521/ct/Presentazione/pagina.aspx" target="_blank"><span class="glyphicon glyphicon-minus"></span>&nbsp; {{ 'documents' | i18n }}</a></li>
					</ul>
				</div>
				<hr/>
			</div>
			<div ng-show="isActiveLinkEdil() == 'active'" class="panel panel-default" style="height: 200px">
				<div class="panel-heading">
					<h4 class="panel-title">Community</h4>
				</div>
				<div class="panel-body">
					<ul>
						<li>Mario Rossi</li>
					</ul>
					<ul>
						<li>Marco Bianchi</li>
					</ul>
					<ul>
						<li>Luigi Verdi</li>
					</ul>
				</div>
				<hr/>
			</div>
			<div ng-show="isActiveLinkAss() == 'active'" class="panel panel-default" style="height: 200px">
				<div class="panel-heading">
					<h4 class="panel-title">Community</h4>
				</div>
				<div class="panel-body">
					<ul>
						<li>Luigi Neri</li>
					</ul>
					<ul>
						<li>Maria Bianchi</li>
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