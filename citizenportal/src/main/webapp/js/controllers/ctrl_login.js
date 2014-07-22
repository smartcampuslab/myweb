'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers');

cp.controller('LoginCtrl',['$scope', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService',
                   function($scope, $route, $routeParams, $rootScope, localize, sharedDataService) {
	
	// for language icons
    var itaLanguage = "active";
    var engLanguage = "";
	
	// for localization
    $scope.setEnglishLanguage = function(){
    	itaLanguage = "";
    	engLanguage = "active";
    	localize.setLanguage('en-US');
    	sharedDataService.setUsedLanguage('eng');
    };
    
    $scope.setItalianLanguage = function(){
    	itaLanguage = "active";
    	engLanguage = "";
    	localize.setLanguage('it-IT');
    	sharedDataService.setUsedLanguage('ita');
    };
    
    $scope.isActiveItaLang = function(){
        return itaLanguage;
    };
                  			
    $scope.isActiveEngLang = function(){
    	return engLanguage;
    };
    
    $scope.getOldLogin = function(){
    	window.document.location = "./login";
    };
	
    $scope.getLogin = function(){
    	window.document.location = "./adc_login";
    };
    
    $scope.getConsoleLogin = function(){
    	window.document.location = "./console_login";
    };
    
    $scope.isLoginShowed = true;
    
    $scope.hideLogin = function(){
    	$scope.isLoginShowed = false;
    };
    
    $scope.checkLogin = function(){
    	if (Function('/*@cc_on return document.documentMode===10@*/')()) {
    		//alert('IE 10');
    	    $scope.isIe10 = true;
    	} else {
    		$scope.isIe10 = false;
    	}
    };
    
}]);