'use strict';

/* Services */
var cpServices = angular.module('cpServices', ['ngResource']);
cp.service('sharedDataService', function() {
	this.userName = 'test';
	this.userSurname = 'test2';
	this.showHome = true;
	this.currentLanguage = 'ita';
	
		this.getName = function(){
			return userName;
		};
		
		this.setName = function(name){
			this.userName = name;
		};
		
		this.getSurName = function(){
			return userSurname;
		};
		
		this.setSurName = function(surname){
			this.userSurname = surname;
		};
		
		this.getShowHome = function(){
			return showHome;
		};
		
		this.setShowHome = function(value){
			this.showHome = value;
		};
		
		this.getCurrentLanguage = function(){
			return currentLanguage;
		};
		
		this.setCurrentLanguage = function(value){
			currentLanguage = value;
		};
});
//cpServices.value('currentLocale',{
//	HOME: 'Home',
//	LOGOUT: 'Esci'
//});

