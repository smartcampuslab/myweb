<!DOCTYPE html>
<html lang="en" ng-app="cp">
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>

<head lang="en">
<meta charset="utf-8">
<title>Citizen Portal</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/prettify.css" rel="stylesheet">
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">
<link href="css/xeditable.css" rel="stylesheet">

<!-- required libraries -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="lib/angular.js"></script>
<script src="lib/angular-route.js"></script>
<script src="lib/angular-sanitize.js"></script>
<script src="lib/angular-strap.js"></script>
<script src="lib/xeditable.js"></script>
<script src="lib/ui-bootstrap-tpls.min.js"></script>
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<script src="js/filters.js"></script>
<script src="js/services.js"></script>

<!-- optional libraries -->
<script src="lib/underscore-min.js"></script>
<script src="lib/moment.min.js"></script>
<script src="lib/fastclick.min.js"></script>
<script src="lib/prettify.js"></script>
<script src="lib/angular-resource.min.js"></script>
<script src="lib/angular-cookies.min.js"></script>
<script src="lib/angular-route.min.js"></script>
<script src="lib/xeditable.min.js"></script>

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
            <li class="active"><a href="#" ng-click="home()">Home</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="#" ng-click="logout()">Logout</a></li>
          </ul>
        </div><!-- /.nav-collapse -->
      </div><!-- /.container -->
    </div><!-- /.navbar -->
	<div class="container">
		<div class="row" style="margin-top:70px;">
		<!-- Rights menu - List of links and other services (menu mensa etc) style="margin: 50px 20px 10px 0;" -->
		<div class="col-md-2" ng-show="!frameOpened">
			<div class="row" style="height: 300px">
				<blockquote>
				<h4>Servizi disponibili</h4>
				<ul class="nav nav-pills nav-stacked" style="font-size: 15px">
	            	<li class="{{ isActiveLinkEdil() }}"><a href="#/PracticeList/edil" ng-click="showPractices(1)">Edilizia abitativa</a></li>
	            	<li class="{{ isActiveLinkAss() }}"><a href="#/PracticeList/ass" ng-click="showPractices(2)">Assegni familiari</a></li>
	        	</ul>
	        	</blockquote>
	        	<hr/>
	        </div>
	        <div class="row" style="height: 200px" ng-init="getServices()">
				<blockquote>
				<h4>Servizi utili</h4>
				<ul class="nav nav-sidebar" style="font-size: 15px" ng-repeat="service in services">
	            	<li><a href="{{ service.addressUrl }}" target="_blank"><i class="icon-minus"></i>&nbsp; {{ service.name }}</a></li>
	        	</ul>
	        	</blockquote>
	        </div>
		</div>
		<!-- Main section with informations and practices -->
<!-- 		<div ng-class="{col-md-7:!frameOpened, col-md-9:frameOpened}"> -->
		<div class="col-md-7">
			<div class="row" style="height: 100px; margin-top: 20px">
				<div style="text-align: center">
					<h1>Portale Servizi del Cittadino</h1>
				</div>
			</div>
			<div class="row" ng-show="isHomeShowed()">
				<div class="well" style="height: 210px">
					<table class="table" style="width: 98%" ng-init="getUser()">
					<tr>
						<th colspan="3" align="center">
						<strong>Informazioni Cittadino </strong>
						</th>
					</tr>
					<tr>
						<td width="10%" rowspan="5" align="center">
							<a href="#"
								class="thumbnail"><img
								src="http://critterapp.pagodabox.com/img/user.jpg" alt="">
							</a>
						</td>
						<td width="45%">Nome: <strong><span id="user_name"></span></strong></td>
						<td width="45%">Sesso: <strong>{{ user.gender }}</strong></td>
					</tr>
					<tr>
						<td>Cognome: <strong><span id="user_surname"></span></strong></td>
						<td>CF: <strong>{{ user.taxCode }}</strong></td>
					</tr>
					<tr>
						<td>Indirizzo: <strong>{{ user.address }}</strong></td>
						<td>Data di nascita: <strong>{{ (user.dateOfBirth | date:"dd/MM/yyyy") }}</strong></td>
					</tr>
					<tr>
						<td>Telefono: <strong>{{ user.phone }}</strong></td>
						<td>E-mail: <strong>{{ user.mail }}</strong></td>
					</tr>
					</table>
				</div>
			</div>
			<div ng-view class="row" ng-hide="isNewPractice()" >Loading...</div>
<!-- 			<div class="row"> -->
<!-- 				<button type="button" class="btn btn-primary" -->
<!-- 					ng-hide="isNewPractice()" ng-click="newPracticeShow()">Add</button> -->
<!-- 				<button type="button" class="btn btn-default" -->
<!-- 					ng-show="isNewPractice()" ng-click="newPracticeHide()">Cancel</button> -->
<!-- 			</div> -->

			<!-- 		<div class="row" ng-show="isNewPractice()"> -->
			<!-- 			<iframe width="900" height="600" ng-src="./html/edit/create_practice.html"> -->
			<!-- 				Loading Iframe... -->
			<!-- 			</iframe> -->
			<!-- 		</div> -->
		</div>
		<!-- Left menu - List of usefull links (skype, how to, community) offset1 style="margin: 50px 10px 10px 50px;" -->
		<div class="col-md-2 col-md-offset-1">
			<div class="row" style="height: 150px">
				<blockquote>
				<h4>Ti serve aiuto?</h4>
<!-- 			<script type="text/javascript" src="http://www.skypeassets.com/i/scom/js/skype-uri.js"></script>
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
				<a href="skype:echo123?call"><img src="img/skype.png" height="42" width="42"/><br> Chiama</a><br> l'assistenza on-line
				</blockquote>
				<hr/>
			</div>
			<div class="row" style="height: 100px" >
				<blockquote>
				<h4>Guida</h4>
				<ul>
					<li><a href="#">Faq</a></li>
					<li><a href="http://www.comunitadellavallagarina.tn.it/cId/192/lcMenu/InM9/idM/1521/ct/Presentazione/pagina.aspx" target="_blank">Documenti</a></li>
				</ul>
				</blockquote>
				<hr/>
			</div>
			<div ng-show="isActiveLinkEdil() == 'active'" class="row" style="height: 200px">
				<blockquote>
				<h4>Community</h4>
					<ul>
						<li>Mario Rossi</li>
					</ul>
					<ul>
						<li>Marco Bianchi</li>
					</ul>
					<ul>
						<li>Luigi Verdi</li>
					</ul>
				</blockquote>	
				<hr/>
			</div>
			<div ng-show="isActiveLinkAss() == 'active'" class="row" style="height: 200px">
				<blockquote>
				<h4>Community</h4>
					<ul>
						<li>Luigi Neri</li>
					</ul>
					<ul>
						<li>Maria Bianchi</li>
					</ul>
				</blockquote>	
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