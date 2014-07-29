'use strict';

/* Services */
var cpServices = angular.module('cpServices', ['ngResource']);
cp.service('sharedDataService', function(){
	// This section is shared between all the controllers
	
	// Shared field description
	this.usedLanguage = 'ita';
	this.name = '';
	this.surname = '';
	this.ueCitizen = false;
	this.familyAllowances = false;
	this.loading = false;
	this.userIdentity = 'HMTRND69R11Z100M';	//'ZGHDSS68P03Z330S';  //'ZZASMR76A45Z330X';	//"DBSMRA58D05E500V"
	this.base64 = '';
	
	this.infoPanelAss = true;
	this.infoPanelLoc = true;
	
	this.searchTab = '';
	this.searchOpt = '';
	this.searchVal = '';
	this.searchList = [];
	
	this.utente = {};
	
	this.idDomanda = '';
	
    this.static_ambiti = [];
    this.static_comuni = [];
    this.static_edizioni = [];
	
    this.jobs = [ 
         {value:'COLLOCAMENTO', title:'Iscrizione al Collocamento'},
         {value:'LAVORO', title:'Costanza di Lavoro'}
    ];
            
    this.permissions = [
         {value:'SOGGIORNO', title:'Permesso di Soggiorno'},
         {value:'CE', title:'Permesso Ce o Carta di Soggiorno'}
    ];
            
    this.rtypes = [ 
         {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'Impropriamente Adibito da almeno 2 anni (soffitti, cantine, sottoscale, auto)'},
         {value:'ALLOGGIO_PRIVO_SERVIZI', title:'Privo di Servizi Igienici o con Servizi Igienici Esterni'},
         {value:'NORMALE', title:'Normale'}
    ];
            
    this.rtypes_inidoneo = [ 
         {value:'ALLOGGIO_INIDONEO', title:'Inidoneo per numero di stanze da letto'}
    ];
            
    this.rtypes_all = [ 
         {value:'ALLOGGIO_INIDONEO', title:'Inidoneo per numero di stanze da letto'},          
         {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'Impropriamente Adibito da almeno 2 anni (soffitti, cantine, sottoscale, auto)'},
         {value:'ALLOGGIO_PRIVO_SERVIZI', title:'Privo di Servizi Igienici o con Servizi Igienici Esterni'},
         {value:'NORMALE', title:'Normale'}
    ];
            
    this.genders = [
         'Femminile',
         'Maschile'
    ];
            
    this.municipalities = [
         {code: 1, name: 'Ala'},
         {code: 2, name: 'Avio'},
         {code: 3, name: 'Besenello'},
         {code: 4, name: 'Calliano'},
         {code: 5, name: 'Isera'},
         {code: 6, name: 'Mori'},
         {code: 7, name: 'Nogaredo'},
         {code: 8, name: 'Nomi'},
         {code: 9, name: 'Pomarolo'},
         {code: 10, name: 'Rovereto'},
         {code: 11, name: 'Villa Lagarina'},
         {code: 12, name: 'Volano'},
    ];
            
    this.contracts = [
         {value: 'CANONE_LIBERO', title:'Canone libero (4 anni + 4 anni)'},
         {value: 'CANONE_CONCORDATO', title:'Canone concordato (3 anni + 2 anni)'}
    ];
            
    this.disabilities_under18 = [
         {value: "CATEGORIA_INVALIDA_1", name: '01'},
         {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
         {value: "CATEGORIA_INVALIDA_3", name: '07'}
    ];
            
    this.disabilities_over65 = [
         {value: "CATEGORIA_INVALIDA_1", name: '01'},
         {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
         {value: "CATEGORIA_INVALIDA_4", name: '08'}
    ];
            
    this.disabilities_all = [
         {value: "CATEGORIA_INVALIDA_1", name: '01'},
         {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
         {value: "CATEGORIA_INVALIDA_3", name: '07'},
         {value: "CATEGORIA_INVALIDA_4", name: '08'}
    ];
            
    this.citizenships = [
         {code: 1, name: 'Italiana'},
         {code: 2, name: 'Europea'},
         {code: 3, name: 'Extra UE'},
    ];
            
    this.yes_no = [
         {code:'true' , title: 'Si'},
         {code:'false' , title: 'No'}
    ];    
            
    this.affinities = [
         {value: 'ALTRO_CONVIVENTE', name: 'Altro convivente'},
         {value: 'PARENTE_34_GRADO', name: 'Parentela 3/4 grado'},
         {value: 'PARENTE_2_GRADO', name: 'Parentela 2 grado'},
         {value: 'PARENTE_1_GRADO', name: 'Parentela 1 grado'},
         {value: 'FIGLIO', name: 'Figlio'},
         {value: 'CONVIVENTE_MORE_UXORIO', name: 'Convivente More Uxorio'},
         {value: 'CONIUGE_NON_SEPARATO', name: 'Coniuge non separato'}          
    ];
            
    this.maritals = [
         {value: 'GIA_CONIUGATO_A', name: 'Gia coniugato/a'},
         {value: 'CONIUGATO_A', name: 'Coniugato/a'},
         {value: 'VEDOVO_A', name: 'Vedovo/a'},
         {value: 'NUBILE_CELIBE', name: 'Nubile/Celibe'}
    ];
    
    this.vallagarinaMunicipality = [
         'ALA',
         'AVIO',
         'BESENELLO',
         'BRENTONICO',
         'CALLIANO',
         'ISERA',
         'MORI',
         'NOGAREDO',
         'NOMI',
         'POMAROLO',
         'RONZO-CHIENIS',
         'ROVERETO',
         'TERRAGNOLO',
         'TRAMBILENO',
         'VALLARSA',
         'VILLA LAGARINA',
         'VOLANO'
    ];
	
	
	// Get and Set methods
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
	
	this.getVallagarinaMunicipality = function(){
		return this.vallagarinaMunicipality;
	};
	
	this.getStaticAmbiti = function(){
		return this.static_ambiti;
	};
	
	this.getStaticComuni = function(){
		return this.static_comuni;
	};
	
	this.getStaticEdizioni = function(){
		return this.static_edizioni;
	};
	
	this.setStaticAmbiti = function(value){
		this.static_ambiti = value;
	};
	
	this.setStaticComuni = function(value){
		this.static_comuni = value;
	};
	
	this.setStaticEdizioni = function(value){
		this.static_edizioni = value;
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
		this.utente.nome = nome;
		this.utente.cognome = cognome;
		this.utente.sesso = sesso;
		this.utente.dataNascita = dataNascita;
		this.utente.provinciaNascita = provinciaNascita;
		this.utente.luogoNascita = luogoNascita;
		this.utente.codiceFiscale = codiceFiscale;
		this.utente.cellulare = cellulare;
		if(email != null && email != ""){
			this.utente.email = email;
		}
		this.utente.indirizzoRes = indirizzoRes;
		this.utente.capRes = capRes; 
		this.utente.cittaRes = cittaRes; 
		this.utente.provinciaRes = provinciaRes;
	};
	
	this.getUtente = function(){
		return this.utente;
	};
	
	this.setIdDomanda = function(value){
		this.idDomanda = value;
	};
	
	this.getIdDomanda = function(){
		return this.idDomanda;
	};
	
	// Lists getters
	this.getJobs = function(){
		return this.jobs;
	};
	
	this.getPermissions = function(){
		return this.permissions;
	};
	
	this.getRtypes = function(){
		return this.rtypes;
	};
	
	this.getRtypesInidoneo = function(){
		return this.rtypes_inidoneo;
	};
	
	this.getRtypesAll = function(){
		return this.rtypes_all;
	};
	
	this.getGenders = function(){
		return this.genders;
	};
	
	this.getMunicipalities = function(){
		return this.municipalities;
	};
	
	this.getContracts = function(){
		return this.contracts;
	};
	
	this.getDisabilities_under18 = function(){
		return this.disabilities_under18;
	};
	
	this.getDisabilities_all = function(){
		return this.disabilities_all;
	};
	
	this.getDisabilities_over65 = function(){
		return this.disabilities_over65;
	};
	
	this.getCitizenships = function(){
		return this.citizenships;
	};
	
	this.getYesNo = function(){
		return this.yes_no;
	};
	
	this.getAffinities = function(){
		return this.affinities;
	};
	
	this.getMaritals = function(){
		return this.maritals;
	};
	
	this.getInfoPanelAss = function(){
		return this.infoPanelAss;
	};
	
	this.getInfoPanelLoc = function(){
		return this.infoPanelLoc;
	};
	
	this.setInfoPanelAss = function(value){
		this.infoPanelAss = value;
	};
	
	this.setInfoPanelLoc = function(value){
		this.infoPanelLoc = value;
	};
	
	this.getSearchTab = function(){
		return this.searchTab;
	};
	
	this.setSearchTab = function(value){
		this.searchTab = value;
	};
	
	this.getSearchOpt = function(){
		return this.searchOpt;
	};
	
	this.setSearchOpt = function(value){
		this.searchOpt  = value;
	};
	
	this.getSearchVal = function(){
		return this.searchVal;
	};
	
	this.setSearchVal = function(value){
		this.searchVal  = value;
	};
	
	this.getSearchList = function(){
		return this.searchList;
	};
	
	this.setSearchList = function(value){
		this.searchList  = value;
	};
	
});

// Proxy Methods section
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
			};
			urlWS = urlWS.substring(0, urlWS.length - 1); // ghe bato via l'ultima &
		}
		//console.log("Proxy Service: url completo " + urlWS);
		
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
cp.factory('invokePdfServiceProxy', function($http, $q) {
	var getProxy = function(method, funcName, params, headers, data){
		var deferred = $q.defer();
		
		$http({
			method : method,
			url : funcName,
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
