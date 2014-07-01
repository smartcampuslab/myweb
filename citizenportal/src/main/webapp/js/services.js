'use strict';

/* Services */
var cpServices = angular.module('cpServices', ['ngResource']);
cp.service('sharedDataService', function(){
	// This section is shared between all the controllers
	this.usedLanguage = 'ita';
	this.name = '';
	this.surname = '';
	this.ueCitizen = false;
	this.familyAllowances = false;
	this.loading = false;
	this.userIdentity = 'HMTRND69R11Z100M';	//'ZGHDSS68P03Z330S';  //'ZZASMR76A45Z330X';	//"DBSMRA58D05E500V"
	this.base64 = '';
	
	this.utente = {};
	
	this.getUsedLanguage = function(){
		return this.usedLanguage;
	};
	
	this.setUsedLanguage = function(value){
		this.usedLanguage = value;
	};
	
	this.getName = function(){
		return this.name;
	};
	
	this.setName = function(value){
		this.name = value;
	};
	
	this.getSurname = function(){
		return this.surname;
	};
	
	this.setSurname = function(value){
		this.surname = value;
	};
	
	this.getUeCitizen = function(){
		return this.ueCitizen;
	};
	
	this.setUeCitizen = function(value){
		this.ueCitizen = value;
	};
	
	this.isFamilyAllowances = function(){
		return this.familyAllowances;
	};
	
	this.setFamilyAllowances = function(value){
		this.familyAllowances = value;
	};
	
	this.isLoading = function(){
		return this.loading;
	};
	
	this.setLoading = function(value){
		this.loading = value;
	};
	
	this.setUserIdentity = function(value){
		//this.userIdentity = value;
		this.utente.codiceFiscale;
	};
	
//	this.getUserIdentity = function(){
//		return this.utente.codiceFiscale;
//	};
	
	// ----------------- ONLY FOR TESTS-------------
	this.getUserIdentity = function(){
		if(this.utente.codiceFiscale == null || this.utente.codiceFiscale == ""){
			return this.userIdentity;
		}
		else {
			return this.utente.codiceFiscale;
		}
	};
	//---------------------------------------------
	
	this.setMail = function(value){
		this.utente.email = value;
	};	
	
	this.getMail = function(){
		//return this.mail;
		return this.utente.email;
	};
	
	// ----------------- ONLY FOR TESTS-------------
	this.setBase64 = function(value){
		if(value == null || value == ""){
			this.base64 = 'MIIE6TCCA9GgAwIBAgIDBzMlMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJJVDEYMBYGA1UECgwPUG9zdGVjb20gUy5wLkEuMSIwIAYDVQQLDBlTZXJ2aXppIGRpIENlcnRpZmljYXppb25lMTQwMgYDVQQDDCtQcm92aW5jaWEgQXV0b25vbWEgZGkgVHJlbnRvIC0gQ0EgQ2l0dGFkaW5pMB4XDTExMTEyMzAwMjQ0MloXDTE3MTEyMjAwNTk1OVowgY4xCzAJBgNVBAYTAklUMQ8wDQYDVQQKDAZUUy1DTlMxJTAjBgNVBAsMHFByb3ZpbmNpYSBBdXRvbm9tYSBkaSBUcmVudG8xRzBFBgNVBAMMPkJSVE1UVDg1TDAxTDM3OFMvNjA0MjExMDE5NzU3MTAwNy53aTRldjVNeCtFeWJtWnJkTllhMVA3ZUtkY1U9MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsF81BDJjAQat9Lfo/1weA0eePTsEbwTe/0QqlArfOTG3hfLEiSd+mDNsBUJo+cRXZMp677y9a1kYlB+IDY3LGH36Bs1QxM14KA6WB67KX4ZaXENew6Qm7NnkMRboKQiIOUmw1l4OiTETfqKWyFqfAtnyLHd8ZZ6qfjgSsJoSHoQIDAQABo4IB3TCCAdkwge0GA1UdIASB5TCB4jCBrAYFK0wQAgEwgaIwgZ8GCCsGAQUFBwICMIGSDIGPSWRlbnRpZmllcyBYLjUwOSBhdXRoZW50aWNhdGlvbiBjZXJ0aWZpY2F0ZXMgaXNzdWVkIGZvciB0aGUgaXRhbGlhbiBOYXRpb25hbCBTZXJ2aWNlIENhcmQgKENOUykgcHJvamVjdCBpbiBhY2NvcmRpbmcgdG8gdGhlIGl0YWxpYW4gcmVndWxhdGlvbiAwMQYGK0wLAQMBMCcwJQYIKwYBBQUHAgEWGWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQwOgYIKwYBBQUHAQEELjAsMCoGCCsGAQUFBzABhh5odHRwOi8vcG9zdGVjZXJ0LnBvc3RlLml0L29jc3AwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFO5h8R6jQnz/4EeFe3FeW6ksaogHMEYGA1UdHwQ/MD0wO6A5oDeGNWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvY25zL3Byb3ZpbmNpYXRyZW50by9jcmwuY3JsMB0GA1UdDgQWBBRF3Z13QZAmn85HIYPyIg3QE8WM2DANBgkqhkiG9w0BAQUFAAOCAQEAErn/asyA6AhJAwOBmxu90umMNF9ti9SX5X+3+pcqLbvKOgCNfjhGJZ02ruuTMO9uIi0DIDvR/9z8Usyf1aDktYvyrMeDZER+TyjviA3ntYpFWWIh1DiRnAxuGYf6Pt6HNehodf1lhR7TP+iejH24kS2LkqUyiP4J/45sTK6JNMXPVT3dk/BAGE1cFCO9FI3QyckstPp64SEba2+LTunEEA4CKPbTQe7iG4FKpuU6rqxLQlSXiPVWZkFK57bAUpVL/CLc7unlFzIccjG/MMvjWcym9L3LaU//46AV2hR8pUfZevh440wAP/WYtomffkITrMNYuD1nWxL7rUTUMkvykw==';
		} else {
			this.base64 = value;
		}
	};
	//----------------------------------------------
	
//	this.setBase64 = function(value){
//		this.base64 = value;
//	};
	
	
	this.getBase64 = function(){
		return this.base64;
	};
	
	this.setUtente = function(nome, cognome, sesso, dataNascita, provinciaNascita, luogoNascita, codiceFiscale, cellulare, email, indirizzoRes, capRes, cittaRes, provinciaRes){
		this.utente = {
				nome : nome,
				cognome : cognome,
				sesso : sesso,
				dataNascita : dataNascita,
				provinciaNascita : provinciaNascita,
				luogoNascita : luogoNascita,
				codiceFiscale: codiceFiscale,
				cellulare : cellulare,
				email : email,
				indirizzoRes : indirizzoRes,
				capRes : capRes, 
				cittaRes : cittaRes, 
				provinciaRes : provinciaRes
		};
	};
	
	this.getUtente = function(){
		return this.utente;
	};
	
});
cp.factory('invokeWSService', function($http, $q) {
	
	var url = '/service.epu/';
	var getProxy = function(method, funcName, params, headers, data){
		var deferred = $q.defer();
		$http({
			method : method,
			url : url + funcName,
			params : params,
			headers : headers,
			data : data
		}).success(function(data) {
			//console.log("Returned data ok: " + JSON.stringify(data));
			deferred.resolve(data);
		}).error(function(data) {
			console.log("Returned data FAIL: " + JSON.stringify(data));
			deferred.resolve(data);
		});
		return deferred.promise;
	};
	return {getProxy : getProxy};
	
	
});
cp.factory('invokeWSServiceProxy', function($http, $q) {
	var getProxy = function(method, funcName, params, headers, data){
		var deferred = $q.defer();
		
		//var url = 'http://localhost:8080/service.epu/';
		//var urlWS = url + funcName;
		var urlWS = funcName;
		if(params != null){
			urlWS += '?';
			for(var propertyName in params) {
				urlWS += propertyName + '=' + params[propertyName];
				urlWS += '&';
				//console.log("propertyName : " + propertyName);
				//console.log("propertyValue : " + params[propertyName]);
			};
			urlWS = urlWS.substring(0, urlWS.length - 1); // ghe bato via l'ultima &
		}
		console.log("Proxy Service: url completo " + urlWS);
		
		if(method == 'GET'){
			$http({
				method : method,
				url : 'rest/allGet',
				params : {
					"urlWS" : urlWS
				},
				headers : headers
			}).success(function(data) {
				//console.log("Returned data ok: " + JSON.stringify(data));
				deferred.resolve(data);
			}).error(function(data) {
				console.log("Returned data FAIL: " + JSON.stringify(data));
				deferred.resolve(data);
			});
		} else {
			$http({
				method : method,
				url : 'rest/allPost',
				params : {
					"urlWS" : urlWS,
				},
				headers : headers,
				data : data
			}).success(function(data) {
				//console.log("Returned data ok: " + JSON.stringify(data));
				deferred.resolve(data);
			}).error(function(data) {
				console.log("Returned data FAIL: " + JSON.stringify(data));
				deferred.resolve(data);
			});
		}
		return deferred.promise;
	};
	return {getProxy : getProxy};
	
});

