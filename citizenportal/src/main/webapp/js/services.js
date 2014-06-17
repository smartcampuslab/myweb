'use strict';

/* Services */
var cpServices = angular.module('cpServices', ['ngResource']);
cp.service('sharedDataService', function(){
	// This section is shared between all the controllers
	this.usedLanguage = 'ita';
	//this.openPracticeFrame = false;
	this.name = '';
	this.surname = '';
	this.ueCitizen = false;
	this.familyAllowances = false;
	this.loading = false;
	this.userIdentity = 'DBSMRA58D05E500V';  //'ZZASMR76A45Z330X';	//"DBSMRA58D05E500V"
	this.mail = '';
	
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
		this.userIdentity = value;
	};
	
	this.getUserIdentity = function(){
		return this.userIdentity;
	};
	
	this.setMail = function(value){
		this.mail = value;
	};	
	
	this.getMail = function(){
		return this.mail;
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
	
	//this.isOpenPracticeFrame = function(){
	//	return this.openPracticeFrame;
	//};
	
	//this.setOpenPracticeFrame = function(value){
	//	this.openPracticeFrame = value;
	//};
	
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

