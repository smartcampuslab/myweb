'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers');

cp.controller('ConsoleCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService','invokeWSService','invokeWSServiceProxy',
    function($scope, $http, $route, $routeParams, $rootScope, localize, sharedDataService, invokeWSService, invokeWSServiceProxy, $location, $filter) { // , $location 

	var cod_ente = "24";
	$scope.params = $routeParams;
	//Used for tests
	$scope.userCF="HMTRND69R11Z100M";
	
	// for language icons
    var itaLanguage = "active";
    var engLanguage = "";
    
    // for services selection
    var homeShowed = true;
    var activeLinkSearch = "";
    
    // max practices displayed in home list
    $scope.maxPractices = 10;
    $scope.practicesWSM = [];
    $scope.currentPage = 0;
    
    $scope.numberOfPages = function(){
		if($scope.practicesWS == null){
			return 0;
		}
		return Math.ceil($scope.practicesWSM.length/$scope.maxPractices);
	};
    
    $scope.codePattern = /^(\d{0,2}\-{0,1}\d{0,1}\-{0,1}\d{0,7})$/;
    $scope.textPattern = /^[a-zA-Z\s]+$/;
    $scope.taxcodePattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;
    
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
    
    $scope.isHomeShowed = function(){
    	return homeShowed;
    };
    
    $scope.home = function() {
    	$scope.setFrameOpened(false);
    	// I refresh all the actived Link
        $scope.showHome();
    };
    
    $scope.setFrameOpened = function(value){
    	$rootScope.frameOpened = value;
    };
    
    $scope.showHome = function(){
    	homeShowed = true;
    };
    
    $scope.hideHome = function(){
    	homeShowed = false;
    };
    
    $scope.logout = function() {
        window.location.href = "logout";
    };
    
    $scope.goBack = function()  {
        window.history.back();
    };
    
    $scope.isActiveLinkSearch = function(){
    	return activeLinkSearch;
    };
    
    $scope.getOperatorName = function(){
    	return user_name + ' ' + user_surname;
    };
    
    $scope.setSearchIndex = function($index){
       	$scope.tabIndex = $index;
    };
    
    $scope.getToken = function() {
        return 'Bearer ' + $scope.user_token;
    };
                  		    
    $scope.authHeaders = {
         'Authorization': $scope.getToken(),
         'Accept': 'application/json;charset=UTF-8'
    };
    
    $scope.loadingSerach = false;
    
    $scope.isLoadingSearch = function(){
    	return $scope.loadingSerach;
    };
    
    $scope.setLoadingSearch = function(value){
    	$scope.loadingSerach = value;
    };
    
    $scope.setLoading = function(loading) {
    	$scope.isLoading = loading;
    };
    
    var fInit = true;
    $scope.initForm = function(){
      	return fInit;
    };
    
    var searchMade = false;
    $scope.isSearchConcluded = function(){
    	return searchMade;
    };
    
    $scope.search = {};
    $scope.practicesFind = [];
    $scope.clerSearch = function(){
    	$scope.search = {};
    	searchMade = false;
    };
    
    $scope.startSearch = function(value,form){
    	fInit = false;
    	if(!form){
//	    	if(value == 'code'){
//	    		//search practice by code
//	    		$scope.searchForCode($scope.search.code);
//	    	}
//	    	if(value == 'ric_1'){
//	    		//search practice by ric name
//	    		$scope.searchForRic($scope.search.ricname);
//	    	}
//	    	if(value == 'ric_2'){
//	    		//search practice by ric code
//	    		$scope.searchForRic($scope.search.riccode);
//	    	}
//	    	if(value == 'comp_1'){
//	    		//search practice by comp
//	    		$scope.searchForComp($scope.search.compname);
//	    	}
//	    	if(value == 'comp_2'){
//	    		//search practice by comp
//	    		$scope.searchForComp($scope.search.compcode);
//	    	}
	    	// for test
	    	$scope.getPracticesWS();
	    	// end test
	    	
	    	fInit = true;
	    	searchMade = true;
    	}
    };
    
    $scope.searchForCode = function(code){
    	var method = 'GET';
    	var params = {
    		codiceDomanda:code,
    		idEnte:cod_ente
    	};
    	var practice = {};
    	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticaByCod", params, $scope.authHeaders, null);	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		practice = result.domanda;
	    	} else {
    			//$scope.setLoading(false);
    		}
    	});
    	$scope.practicesFind.push(practice);
    };
    
    $scope.searchForRic = function(code){
    	var method = 'GET';
    	var params = {
    		cfRichiedente:code,
    		idEnte:cod_ente
    	};
    	var practice = {};
    	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticaByRichiedente", params, $scope.authHeaders, null);	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		practice = result.domanda;
	    	} else {
    			//$scope.setLoading(false);
    		}
    	});
    	$scope.practicesFind = practice;
    };
    
    $scope.searchForComp = function(code){
    	var method = 'GET';
    	var params = {
    		cfComponente:code,
    		idEnte:cod_ente
    	};
    	var practice = {};
    	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticaByComponente", params, $scope.authHeaders, null);	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		practice = result.domanda;
	    	} else {
    			//$scope.setLoading(false);
    		}
    	});
    	$scope.practicesFind = practice;
    };
    
    // ----------------------------------- Used in tests -------------------------------------
    // Method that read the list of the practices from the ws of infoTn
    $scope.getPracticesWS = function() {
    	$scope.setLoadingSearch(true);
    	var method = 'GET';
    	var params = {
			idEnte:cod_ente,
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "RicercaPratiche", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesWS = result.domanda;
    		//console.log("Pratiche recuperate da ws: " + $scope.practicesWS);
    		$scope.getPracticesMyWeb();
    		$scope.setLoadingSearch(false);
    	});
    };
    
    // Method that read the list of the practices from the local mongo DB
    $scope.getPracticesMyWeb = function() {
    	$scope.setLoadingSearch(true);
    	var method = 'GET';
    	var params = {
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticheMyWeb", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesMy = result;
    		//console.log("Pratiche recuperate da myweb: " + $scope.practicesMy);
    		$scope.mergePracticesData($scope.practicesWS, $scope.practicesMy);
    		$scope.setLoadingSearch(false);
    	});
    };
    
    // Method that add the correct status value to every practice in list
    // It merge the value from two lists: practices from ws and practices from local mongo
    $scope.mergePracticesData = function(practiceListWs, practiceListMy){
    	if(practiceListWs != null){
	    	for(var i = 0; i < practiceListWs.length; i++){
	    		for(var j = 0; j < practiceListMy.length; j++){
	    			if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
	    				practiceListWs[i].myStatus = practiceListMy[j].status;
	    				if(practiceListMy[j].status != 'RIFIUTATA'){
	    					$scope.practicesWSM.push(practiceListWs[i]);
	    				}
	    				break;
	    			}
	    		}
	    	}
    	}
    	angular.copy($scope.practicesWSM, $scope.practicesFind);
    	//$scope.practiceFind = $scope.practicesWSM;
    	if($scope.practicesFind != null && $scope.practicesFind.length > 0){
    		$scope.isPracticeFind = true;
    	} else {
    		$scope.isPracticeFind = false;
    	}
    	
    	// I consider only the practices that has been accepted
    	//$scope.practicesWSM = practiceListWs;
    };
    
    $scope.cleanTotal = function(value){
        var str = value;
        str = str.substring(0,str.length-3); //to remove the ",00"
        str = str.replace(".", "");
        var num = parseFloat(str);
        var correct = num/100;
        correct = correct.toFixed(2);
        str = correct.toString();
        str = str.replace(".", ",");
        return str;
    }; 
    
    $scope.restoreSearch = function(){
    	$scope.setSearchIndex(sharedDataService.getSearchTab());
    	$scope.searchType = sharedDataService.getSearchOpt();
    	$scope.setSearchValue(sharedDataService.getSearchTab(), sharedDataService.getSearchVal());
    	angular.copy(sharedDataService.getSearchList(), $scope.practicesFind);
    };
    
    $scope.saveSearchData = function(tab, opt, value, list){
    	sharedDataService.setSearchTab(tab);
    	sharedDataService.setSearchOpt(opt);
    	sharedDataService.setSearchVal(value);
    	sharedDataService.setSearchList(list);
    };
    
    $scope.setSearchValue = function(type, value){
    	if(type == 1){
    		$scope.search = {
    			code: value	
    		};
    	} else {
    		$scope.search = {
    			ricname: value,
    			riccode: value
    		};
    	}
    };
    
    $scope.stampaScheda = function(idPratica){
      	$scope.setLoading(true);
            	
       	var stampaScheda = {
           	userIdentity: $scope.userCF,
           	idDomanda: idPratica
        };
            	
      	var value = JSON.stringify(stampaScheda);
        	if($scope.showLog) console.log("Dati scheda domanda : " + value);
            	
           	var method = 'POST';
           	var myDataPromise = invokeWSServiceProxy.getProxy(method, "StampaJSON", null, $scope.authHeaders, value);	

           	myDataPromise.then(function(result){
       		$scope.scheda = result.domanda.assegnazioneAlloggio;
       		$scope.punteggi = result.domanda.dati_punteggi_domanda.punteggi;
       		$scope.punteggiTotali = $scope.cleanTotal(result.domanda.dati_punteggi_domanda.punteggi.punteggio_totale.totale_PUNTEGGIO.dettaglio.calcolo); //$scope.cleanTotal() + ",00"
        	$scope.setLoading(false);
       	});
    };
    
    // ----------------------------------------------------------------------------------------------
    
    
    
    // The tab directive will use this data
    $scope.searchTabs = [ 
        { title:'Ricerca per codice pratica', index: 1, content:"partials/console/search/practice_code_search.html" },
        { title:'Ricerca per Richiedente', index: 2, content:"partials/console/search/richiedente_search.html" },
        { title:'Ricerca per Componente Nucleo', index: 3, content:"partials/console/search/componente_search.html" }
    ];
	
}]);