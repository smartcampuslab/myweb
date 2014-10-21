<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>
<%-- <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %> --%>
<%-- <%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %> --%>
<html>
<head lang="it">
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>MyWeb-Console</title>

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
<!-- <script src="../i18n/angular-locale_it-IT.js"></script> -->
<!-- <script src="i18n/angular-locale_en-EN.js"></script> -->
<script src="../js/app.js?1001"></script>
<!-- <script src="js/controllers.js"></script> -->
<script src="../js/controllers/ctrl.js?1001"></script>
<script src="../js/controllers/ctrl_login.js?1000"></script>
<script src="../js/controllers/ctrl_main.js?1000"></script>
<script src="../js/controllers/ctrl_practice.js?1001"></script>
<script src="../js/controllers/ctrl_info.js"></script>

<script src="../js/filters.js?1001"></script>
<script src="../js/services.js?1001"></script>
<script src="../js/directives.js"></script>
<script src="../lib/ui-bootstrap-tpls.min.js"></script>

<!-- <script type="text/javascript" src="js/jquery.min.js" /></script> -->
<!-- <script type="text/javascript" src="js/jquery-ui.custom.min.js" ></script> -->
<!-- <script type="text/javascript" src="js/ui.datepicker-it.js" ></script> -->

<!-- optional libraries -->
<script src="../lib/angular-resource.min.js"></script>
<script src="../lib/angular-cookies.min.js"></script>
<script src="../lib/angular-route.min.js"></script>
<script src="../lib/xeditable.min.js"></script>
<script src="../lib/angular-base64.min.js"></script>
<base href="/myweb/" />

<script type="text/javascript">
function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}
</script>

</head>
	<body>
	
		<div class="container"><!-- ng-controller="LoginCtrl" ng-init="checkLogin()" -->
			<div class="row" style="margin-top: 20px;">
				<div ng-class="col-md-8">
					<div class="panel panel-default" >
		  				<div class="panel-body">
		<!-- 				<div class="row" style="height: 800px"> -->
							<div style="margin: 10px 10px 10px 10px">
								<!--[if lt IE 9]>
								<div class="row" style="height: 20px" align="center" ng-init="hideLogin()">
									<h4><font color="red">Alcune funzionalit&agrave; del portale non sono supportate in Internet Explorer 8 e versioni inferiori. Aggiorna Internet Explorer ad un versione successiva o utilizza un altro browser per accedere al portale.</font></h4>
								</div>
								<![endif]-->
								<div class="row" style="font-size: 18px; color: red" align="center" id="cookies">
								</div>
								<div style="margin: 10px" align="center">
		<!-- 							<h2>MyWeb</h2> -->
									<img src="img/myweb4.png" alt="Logo myWeb" title="Logo myWeb" height="130" width="250" />
								</div>
								<div class="well" align="center">
									<h2 id="banner">MyWeb-Console Login</h2>
										<form name="f" action="console/login.do" method="POST" accept-charset="utf-8"><!-- j_spring_security_check -->
											<table style="width: 45%;">
												<tr>
													<td colspan="2" id="err_login_cel">
<!-- 													<div class="alert alert-danger" ng-show="f.j_username.$error.required">Campo username obbligatorio</div> -->
<!-- 													<div class="alert alert-danger" ng-show="f.j_password.$error.required">Campo password obbligatorio</div> -->
<!-- 														<c:if test="${param.error == 'true'}"> -->
<!-- 	    													<div class="alert alert-danger">Errore Autenticazione: username o password non corretti</div> -->
<!-- 														</c:if>   -->
														<script>
															if(get('error') == 'true'){
																var err_div = document.createElement('div');
															 	err_div.className = 'alert alert-danger';
															 	err_div.id = 'err_log_text';
															 	err_div.innerHTML = 'Errore Autenticazione: username o password non corretti';
															 	$("#err_login_cel").append(err_div);
																//alert("Errore");
															}
														</script>							
													</td>
												</tr>
												<tr>
													<td width="30%"><label for="input_user">Username:</label></td>
													<td width="70%"><input id="input_user" class="form-control" type='text' name='j_username' /></td>
												</tr>
												<tr>
													<td><label for="input_pwd">Password:</label></td>
													<td><input id="input_pwd" class="form-control" type='password' name='j_password' /></td>
												</tr>
												<tr>
													<td colspan="2">&nbsp;</td>
												</tr>
												<tr>
													<td align="right"><input value="Login" name="submit" type="submit" class="btn btn-primary">&nbsp;</td>
													<td>
														<input value="Cancella" name="reset" type="reset" class="btn btn-default">&nbsp;
														<a id="btn_login_test" href="prelogin" class="btn btn-primary" role="button">Portale MyWeb</a>
													</td>
												</tr>
											</table>
										</form>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<hr>
					<footer>
	<!-- 				<p>&copy; SmartCampus 2013</p> -->
					</footer>
				</div>
			</div>
		</div>
		
	</body>
</html>