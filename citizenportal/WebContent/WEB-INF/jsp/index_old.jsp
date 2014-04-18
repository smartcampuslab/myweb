<!DOCTYPE html>
<html lang="en" ng-app="cp">
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>

<head lang="en">
<meta charset="utf-8">
<title>Citizen Portal</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
<link href="css/prettify.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css"
	rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css"
	rel="stylesheet">
<link href="css/xeditable.css" rel="stylesheet">	

<!-- required libraries -->
<script src="lib/jquery.min.js"></script>
<script src="lib/angular.js"></script>
<script src="lib/angular-route.js"></script>
<script src="lib/angular-sanitize.js"></script>
<script src="lib/bootstrap.min.js"></script>
<script src="lib/angular-strap.js"></script>
<script src="lib/xeditable.js"></script>
<script src="lib/ui-bootstrap-tpls.min.js"></script>
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
	<div class="navbar navbar-fixed-top navbar-inverse">
		<div class="navbar-inner">
			<div class="container">
				<a class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse"> <span class="icon-bar"></span> <span
					class="icon-bar"></span> <span class="icon-bar"></span>
				</a>
				<div class="btn-group pull-right">
					<a class="btn" ng-click="logout()"> <i class="icon-user"></i>
						Logout
					</a>
				</div>
				<div class="nav-collapse">
					<ul class="nav">
						<li class="active">
								<%-- <a href="<c:url value="/" />">Home</a> --%>
								<a ng-click="home()">Home</a>
						</li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</div>
	</div>
	<div class="container" style="width: 100%; margin-top: 50px">
		<div class="span2">
		Link to services for practices
		</div>
		<div class="span4">
		<div class="row" style="height: 120px">
			<div class="span7">
				<h1>Citizen Service Portal</h1>
			</div>
			<div class="span3 well">
				<div class="row">
					<div class="span1">
						<a href="http://critterapp.pagodabox.com/others/admin"
							class="thumbnail"><img
							src="http://critterapp.pagodabox.com/img/user.jpg" alt=""></a>
					</div>
					<div class="span3">
						<%-- 					<c:out value="${user_surname}" /> --%>
						<p>
							Citizen Information <strong></strong>
						</p>
						<p>
							Name :<strong><span id="user_name"></span></strong>
						</p>
						<p>
							Surname :<strong><span id="user_surname"></span></strong>
						</p>
						<p>
							Address :<strong>via Pinco, 1 - Trento</strong>
						</p>
						<p>
							Phone :<strong>123 4567891</strong>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div ng-view class="row" ng-hide="isNewPractice()">Loading...</div>
		<div class="row">
			<button type="button" class="btn btn-primary" ng-hide="isNewPractice()" ng-click="newPracticeShow()">Add</button>
			<button type="button" class="btn btn-default" ng-show="isNewPractice()" ng-click="newPracticeHide()">Cancel</button>
		</div>				
		
		<div class="row" ng-show="isNewPractice()">
			<iframe width="900" height="600" ng-src="./html/edit/create_practice.html">
				Loading Iframe...
			</iframe>
		</div>
		</div>
		<div class="span2">
		Skype
		</div>
		<hr>
		<footer>
			<p>&copy; SmartCampus 2013</p>
		</footer>

	</div>
</body>

</html>
