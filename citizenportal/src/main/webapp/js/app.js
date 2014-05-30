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
	'ui.bootstrap'
]);

cp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
  	$routeProvider
  		.when('/', {
    		templateUrl: 'partials/home.html',
    		controller: 'MainCtrl',
    		controllerAs: 'main'
    	})
    	.when('/Practice/:id', {
    		templateUrl: 'partials/practice.html',
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
    	.when('/Practice/:id/edit', {
    		templateUrl: 'partials/edit/edit_practice.html',
    		controller: 'MainCtrl',
    		controllerAs: 'main'
    	})
    	.otherwise({
    		redirectTo:'/'
    	});
  			
  	$locationProvider.html5Mode(true);
}]);  	
//}]).factory('webService', function($q, $timeout, $http){
//	return {
//		creaPratica: function(ec_type, res_type, dom_type, practice){	
//		    	var pratica = {
//		    		domandaType : {
//		    				extracomunitariType: ec_type,
//		    				idEdizioneFinanziata : 5526558,
//		    				numeroDomandaICEF : dom_type.numeroDomandaIcef,
//		    				residenzaType : res_type
//		    			},
//		    		idEnte : "24",
//		    		userIdentity : "DBSMRA58D05E500V"
//		    	};
//		    	
//		    	var value = JSON.stringify(pratica);
//		    	console.log("Json value " + value);
//		    	console.log("Pratica Obj " + pratica);
//		    	
//		        // Here I call the getPracticeMethod
//		        $scope.getPracticeData(5562993);
//		        // Retrieve the elenchi info
//		        $scope.getElenchi();
//		        $dialogs.notify("Successo","Creazione Pratica 5562993 avvenuta con successo.");
//		}
//	};
//	
//});