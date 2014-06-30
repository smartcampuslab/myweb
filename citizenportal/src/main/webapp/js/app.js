'use strict';

/* App Module */

var cp = angular.module('cp', [ 
	'localization',
	'ngRoute',
	'ngSanitize',
	
	'cpServices',
	'cpControllers',
	'cpFilters',
	'cpDirectives',
	
	'ngCookies',
	'xeditable',
	'dialogs',
	'ui.bootstrap',
	'base64'
]);

cp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
  	$routeProvider
  		.when('/', {
    		templateUrl: 'partials/home.html',
    		controller: 'MainCtrl',
    		controllerAs: 'main'
    	})
    	.when('/Practice/view/:id', {
    		templateUrl: 'partials/view_practice.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/Practice/new/add', {
    		templateUrl: 'partials/new_practice.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/PracticeList/edil', {
    		templateUrl: 'partials/practice_edil_list.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/PracticeList/ass', {
    		templateUrl: 'partials/practice_ass_list.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/Practice/edit/:id', {
    		templateUrl: 'partials/edit_practice.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
//    	.when('/Practice/:id/edit', {
//    		templateUrl: 'partials/edit_practice.html',
//    		controller: 'PracticeCtrl',
//    		controllerAs: 'practice_ctrl'
//    	})
    	.otherwise({
    		redirectTo:'/'
    	});
  			
  	$locationProvider.html5Mode(true);
}]);
cp.config([
              '$compileProvider',
              function( $compileProvider )
              {   
                  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
                  // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
              }
          ]);