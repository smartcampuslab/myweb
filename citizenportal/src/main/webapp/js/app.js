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
//	  	.when('/index_it', {
//			templateUrl: 'index.jsp',
//			controller: 'MainCtrl',
//			controllerAs: 'main'
//		})
//		.when('/index_en', {
//			templateUrl: 'index_en.jsp',
//			controller: 'MainCtrl',
//			controllerAs: 'main'
//		})
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
    	.when('/Practice/new/add/:type', {
    		templateUrl: 'partials/new_practice.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/PracticeList/edil/:type', {
    		templateUrl: 'partials/practice_edil_list.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/PracticeList/ass/:type', {
    		templateUrl: 'partials/practice_ass_list.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/Practice/edit/:id', {
    		templateUrl: 'partials/edit_practice.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/Practice/submit/:id', {
    		templateUrl: 'partials/submit_practice.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/Practice/class/view/ass', {
    		templateUrl: 'partials/classification/final_class_ass.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/Practice/class/view/edil', {
    		templateUrl: 'partials/classification/final_class_edil.html',
    		controller: 'PracticeCtrl',
    		controllerAs: 'practice_ctrl'
    	})
    	.when('/console/', {
    		templateUrl: 'partials/console/home.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
    	.when('/console/home', {
    		templateUrl: 'partials/console/home.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
//    	.when('/console/next_state/:id', {
//    		templateUrl: 'partials/console/home.html',
//    		controller: 'ConsoleCtrl',
//    		controllerAs: 'console_ctrl'
//    	})
    	.when('/Console/search', {
    		templateUrl: 'partials/console/search.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
//    	.when('/Console/classification', {
//    		templateUrl: 'partials/console/classification.html',
//    		controller: 'ConsoleCtrl',
//    		controllerAs: 'console_ctrl'
//    	})
    	.when('/Console/classification/provv/:id', {
    		templateUrl: 'partials/console/classification/provv_classification.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
    	.when('/Console/classification/final/:id', {
    		templateUrl: 'partials/console/classification/final_classification.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
    	.when('/Console/classification/uploadfile/:cat/:type/:id', {
    		templateUrl: 'partials/console/upload/upload_file.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
    	.when('/Console/classification/benefits', {
    		templateUrl: 'partials/console/classification/benefits_classification.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
    	.when('/Console/classification/notifics', {
    		templateUrl: 'partials/console/classification/notifics_classification.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
    	.when('/Console/report', {
    		templateUrl: 'partials/console/report.html',
    		controller: 'ConsoleCtrl',
    		controllerAs: 'console_ctrl'
    	})
//    	.when('/Console/view/:id', {
//    		templateUrl: 'partials/console/view.html',
//    		controller: 'ConsoleCtrl',
//    		controllerAs: 'console_ctrl'
//    	})
    	.otherwise({
    		redirectTo:'/'
    	});
  			
  	$locationProvider.html5Mode(true);
}]);
cp.config(['$compileProvider',
    function( $compileProvider )
    {  
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|file):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);