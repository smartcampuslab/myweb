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
	
	//this.isOpenPracticeFrame = function(){
	//	return this.openPracticeFrame;
	//};
	
	//this.setOpenPracticeFrame = function(value){
	//	this.openPracticeFrame = value;
	//};
	
});
//cp.service('sharedDataService', function() {
//	this.userName = 'test';
//	this.userSurname = 'test2';
//	this.showHome = true;
//	
//		this.getName = function(){
//			return userName;
//		};
//		
//		this.setName = function(name){
//			this.userName = name;
//		};
//		
//		this.getSurName = function(){
//			return userSurname;
//		};
//		
//		this.setSurName = function(surname){
//			this.userSurname = surname;
//		};
//		
//		this.getShowHome = function(){
//			return showHome;
//		};
//		
//		this.setShowHome = function(value){
//			this.showHome = value;
//		};
//});

