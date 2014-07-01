'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers', []);

cp.controller('LoginCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService','invokeWSService','invokeWSServiceProxy',
                          function($scope, $http, $route, $routeParams, $rootScope, localize, sharedDataService, invokeWSService, invokeWSServiceProxy, $location, $filter) {
	
	// for language icons
    var itaLanguage = "";
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
    
}]);

cp.controller('MainCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService','invokeWSService','invokeWSServiceProxy',
    function($scope, $http, $route, $routeParams, $rootScope, localize, sharedDataService, invokeWSService, invokeWSServiceProxy, $location, $filter) { // , $location 

    //$rootScope.frameOpened = false;
    
    $scope.setFrameOpened = function(value){
    	$rootScope.frameOpened = value;
    };
    
    $scope.setViewTabs = function(){
    	//$scope.setViewIndex(0);
    	$scope.hideHome();
    	$scope.setNextButtonViewLabel("Chiudi");
    	$scope.setFrameOpened(true);
    };
    
    $scope.setNextButtonViewLabel = function(value){
    	$rootScope.buttonNextViewLabel = value;
    };
    
    //$scope.isPracticeFrameOpened = function(){
    //	return sharedDataService.isOpenPracticeFrame();
    //};

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    //this.params = $routeParams;
    
    $scope.userCF = sharedDataService.getUserIdentity(); 
    
    $scope.app ;
                  			
    $scope.citizenId = userId;
    $scope.user_token = token;
                  			
    // new elements for view
    $scope.currentView;
    $scope.editMode;
    $scope.currentViewDetails;
                  			
    // max practices displayed in home list
    $scope.maxPractices = 10;
    $scope.practicesWSM = [];

    // for language icons
    var itaLanguage = "";
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
    
    // for services selection
    var homeShowed = true;
    var activeLinkEdil = "";
    var activeLinkAss = "";
    var activeLinkEdilExtra = "";
    var activeLinkAssExtra = "";
        
    $scope.hideHome = function(){
    	homeShowed = false;   		
    };
    
    $scope.showHome = function(){
    	homeShowed = true;
    };
                  			
    $scope.showPractices = function(type,isEu){
        homeShowed = false;
        sharedDataService.setUeCitizen(isEu);
        if(type == 1){
        	if(sharedDataService.getUeCitizen()){
        		activeLinkEdil="active";
            	activeLinkAss="";
            	activeLinkEdilExtra = "";
                activeLinkAssExtra = "";
        	} else {
        		activeLinkEdil="";
            	activeLinkAss="";
        		activeLinkEdilExtra = "active";
        		activeLinkAssExtra="";
        	}
            sharedDataService.setFamilyAllowances(false);
        } else {
        	if(sharedDataService.getUeCitizen()){
        		activeLinkEdil="";
            	activeLinkAss="active";
        		activeLinkEdilExtra="";
                activeLinkAssExtra="";
                
        	} else {
        		activeLinkEdil="";
            	activeLinkAss="";
        		activeLinkEdilExtra = "";
        		activeLinkAssExtra="active";
        	}
            
            sharedDataService.setFamilyAllowances(true);
        }
        $scope.setFrameOpened(false);
    };
                  			
    $scope.consolidedPractices = function(item){
        if(item.statoDomanda == 'IDONEA'){
            return true;
        } else {
            return false;
        }
    };
                  			
    $scope.isActiveLinkEdil = function(){
        return activeLinkEdil;
    };
                  			
    $scope.isActiveLinkAss = function(){
    	return activeLinkAss;
    };
    
    $scope.isActiveLinkEdilExtra = function(){
    	return activeLinkEdilExtra;
    };
    
    $scope.isActiveLinkAssExtra = function(){
    	return activeLinkAssExtra;
    };
                  			
    $scope.isHomeShowed = function(){
    	return homeShowed;
    };
                  			
    $scope.logout = function() {
        window.document.location = "./logout";
    };
                  		    
    $scope.home = function() {
    	$scope.setFrameOpened(false);
        window.document.location = "./";
        $scope.showHome();
    };
                  		    
    $scope.getToken = function() {
        return 'Bearer ' + $scope.user_token;
    };
                  		    
    $scope.authHeaders = {
         'Authorization': $scope.getToken(),
         'Accept': 'application/json;charset=UTF-8'
    };
                  		    
    // ------------------- User section ------------------
    $scope.retrieveUserData = function() {
    	$scope.getUser();				// retrieve user data
    	//$scope.getUserUeNationality();	// retrieve the user ue/extraue Nationality
    };
    
    $scope.user;
    $scope.getUser = function() {
    	console.log("user id " + $scope.citizenId );
    	$http({
        	method : 'GET',
        	url : 'rest/citizen/user/' + $scope.citizenId,
        	params : {},
            headers : $scope.authHeaders
        }).success(function(data) {
        	$scope.user = data;
        }).error(function(data) {
        	// alert("Error");
        });
    };
                  			
//    $scope.services = [];
//    $scope.getServices = function() {
//    	console.log("user id " + $scope.citizenId );
//    	$http({
//    		method : 'GET',
//    		url : 'rest/citizen/user/' + $scope.citizenId + '/services',
//    		params : {},
//    		headers : $scope.authHeaders
//    	}).success(function(data) {
//    		$scope.services = data;
//       	}).error(function(data) {
//        	// alert("Error");
//       	});
//    };
    
    // For user shared data
    sharedDataService.setName(user_name);
    sharedDataService.setSurname(user_surname);
    sharedDataService.setBase64(base64);
    //sharedDataService.setBase64('MIIE6TCCA9GgAwIBAgIDBzMlMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJJVDEYMBYGA1UECgwPUG9zdGVjb20gUy5wLkEuMSIwIAYDVQQLDBlTZXJ2aXppIGRpIENlcnRpZmljYXppb25lMTQwMgYDVQQDDCtQcm92aW5jaWEgQXV0b25vbWEgZGkgVHJlbnRvIC0gQ0EgQ2l0dGFkaW5pMB4XDTExMTEyMzAwMjQ0MloXDTE3MTEyMjAwNTk1OVowgY4xCzAJBgNVBAYTAklUMQ8wDQYDVQQKDAZUUy1DTlMxJTAjBgNVBAsMHFByb3ZpbmNpYSBBdXRvbm9tYSBkaSBUcmVudG8xRzBFBgNVBAMMPkJSVE1UVDg1TDAxTDM3OFMvNjA0MjExMDE5NzU3MTAwNy53aTRldjVNeCtFeWJtWnJkTllhMVA3ZUtkY1U9MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsF81BDJjAQat9Lfo/1weA0eePTsEbwTe/0QqlArfOTG3hfLEiSd+mDNsBUJo+cRXZMp677y9a1kYlB+IDY3LGH36Bs1QxM14KA6WB67KX4ZaXENew6Qm7NnkMRboKQiIOUmw1l4OiTETfqKWyFqfAtnyLHd8ZZ6qfjgSsJoSHoQIDAQABo4IB3TCCAdkwge0GA1UdIASB5TCB4jCBrAYFK0wQAgEwgaIwgZ8GCCsGAQUFBwICMIGSDIGPSWRlbnRpZmllcyBYLjUwOSBhdXRoZW50aWNhdGlvbiBjZXJ0aWZpY2F0ZXMgaXNzdWVkIGZvciB0aGUgaXRhbGlhbiBOYXRpb25hbCBTZXJ2aWNlIENhcmQgKENOUykgcHJvamVjdCBpbiBhY2NvcmRpbmcgdG8gdGhlIGl0YWxpYW4gcmVndWxhdGlvbiAwMQYGK0wLAQMBMCcwJQYIKwYBBQUHAgEWGWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQwOgYIKwYBBQUHAQEELjAsMCoGCCsGAQUFBzABhh5odHRwOi8vcG9zdGVjZXJ0LnBvc3RlLml0L29jc3AwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFO5h8R6jQnz/4EeFe3FeW6ksaogHMEYGA1UdHwQ/MD0wO6A5oDeGNWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvY25zL3Byb3ZpbmNpYXRyZW50by9jcmwuY3JsMB0GA1UdDgQWBBRF3Z13QZAmn85HIYPyIg3QE8WM2DANBgkqhkiG9w0BAQUFAAOCAQEAErn/asyA6AhJAwOBmxu90umMNF9ti9SX5X+3+pcqLbvKOgCNfjhGJZ02ruuTMO9uIi0DIDvR/9z8Usyf1aDktYvyrMeDZER+TyjviA3ntYpFWWIh1DiRnAxuGYf6Pt6HNehodf1lhR7TP+iejH24kS2LkqUyiP4J/45sTK6JNMXPVT3dk/BAGE1cFCO9FI3QyckstPp64SEba2+LTunEEA4CKPbTQe7iG4FKpuU6rqxLQlSXiPVWZkFK57bAUpVL/CLc7unlFzIccjG/MMvjWcym9L3LaU//46AV2hR8pUfZevh440wAP/WYtomffkITrMNYuD1nWxL7rUTUMkvykw==');
    //sharedDataService.setMail(user_mail);
    sharedDataService.setUtente(nome, cognome, sesso, dataNascita, provinciaNascita, luogoNascita, codiceFiscale, cellulare, email, indirizzoRes, capRes, cittaRes, provinciaRes );
    
    // NB qui andrebbe fatta una funzione che verifica se esiste o meno la mail e in caso ne chiede l'inserimento
    
    
    $scope.getUserName = function(){
  	  return sharedDataService.getName();
    };
    
    $scope.getUserSurname = function(){
  	  return sharedDataService.getSurname();
    };
    
    $scope.getMail = function(){
      return sharedDataService.getMail();
    };
    
//    $scope.isUeCitizen = function(){
//    	return sharedDataService.getUeCitizen();
//    };
    
    $scope.translateUserGender = function(value){
    	if(sharedDataService.getUsedLanguage() == 'eng'){
    		if(value == 'maschio'){
    			return 'male';
    		} else {
    			return 'female';
    		}
    	} else {
    		return value;
    	}
    };
    
    // ----------------- Practice sections ----------------
    
    $scope.setLoadingPractice = function(value){
    	$scope.isLoadingPractice = value;
    };
    
 // Method that read the list of the practices from the ws of infoTn
    $scope.getPracticesWS = function() {
    	$scope.setLoadingPractice(true);
    	var method = 'GET';
    	var params = {
			idEnte:"24",
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "RicercaPratiche", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesWS = result.domanda;
    		//console.log("Pratiche recuperate da ws: " + $scope.practicesWS);
    		$scope.getPracticesMyWeb();
    		$scope.setLoadingPractice(false);
    	});
    };
    
    // Method that read the list of the practices from the local mongo DB
    $scope.getPracticesMyWeb = function() {
    	$scope.setLoadingPractice(true);
    	var method = 'GET';
    	var params = {
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticheMyWeb", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesMy = result;
    		//console.log("Pratiche recuperate da myweb: " + $scope.practicesMy);
    		$scope.mergePracticesData($scope.practicesWS, $scope.practicesMy);
    		$scope.setLoadingPractice(false);
    	});
    };
    
    // Method that add the correct status value to every practice in list
    // It merge the value from two lists: practices from ws and practices from local mongo
    $scope.mergePracticesData = function(practiceListWs, practiceListMy){
    	for(var i = 0; i < practiceListWs.length; i++){
    		for(var j = 0; j < practiceListMy.length; j++){
    			if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
    				practiceListWs[i].myStatus = practiceListMy[j].status;
    				if(practiceListMy[j].status == 'ACCETTATA'){
    					$scope.practicesWSM.push(practiceListWs[i]);
    				}
    				break;
    			}
    		}
    	}
    	// I consider only the practices that has been accepted
    	//$scope.practicesWSM = practiceListWs;
    };
    
                  			
    // for next and prev in practice list
    $scope.currentPage = 0;
//    $scope.numberOfPages = function(){
//    	var consolidedPractices = [];
//    	for(var i=0; i < $scope.practices.length; i++){
//    		if($scope.practices[i].state < 4){
//    			consolidedPractices.push($scope.practices[i]);
//    		}
//    	}
//		return Math.ceil(consolidedPractices.length/$scope.maxPractices);
//	};
	
	$scope.numberOfPages = function(){
		if($scope.practicesWS == null){
			return 0;
		}
//		var consolidedPractices = [];
//    	for(var i=0; i < $scope.practicesWSM.length; i++){
//    		if($scope.practicesWSM[i].myStatus == 'ACCETTATA'){
//    			consolidedPractices.push($scope.practicesWSM[i]);
//    		}
//    	}
		return Math.ceil($scope.practicesWSM.length/$scope.maxPractices);
	};
                  			
    var newPractice = false;
                  			
    $scope.newPracticeShow = function(){
    	newPractice = true;
    };
                  			
    $scope.newPracticeHide = function(){
    	newPractice = false;
    };
                  			
   	$scope.isNewPractice = function(){
   		return newPractice;
    };
                  			
//    $scope.getPracticesByType = function(type) {
//        $http({
//            method : 'GET',
//            url : 'rest/citizen/' + $scope.citizenId + '/practice/type/' + type,
//            params : {},
//            headers : $scope.authHeaders
//        }).success(function(data) {
//        	$scope.practices = data;
//        }).error(function(data) {
//        	// alert("Error");
//        });
//     };   
  
     
//     $scope.practices = [];     
     
//   $scope.getPractices = function() {
// 	$http({
// 		method : 'GET',
// 		url : 'rest/citizen/' + $scope.citizenId + '/practice/all',
// 		params : {},
// 		headers : $scope.authHeaders
// 	}).success(function(data) {
//         $scope.practices = data;
//     }).error(function(data) {
//         // alert("Error");
//     }); 	
// };     
     
//   $scope.practice;
//   $scope.getPractice = function(id) {
//   	console.log("req id " + id + " ,citizenId " + $scope.citizenId );
//   		$http({
//   		method : 'GET',
//   		url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
//    		params : {},
//    		headers : $scope.authHeaders
//    	}).success(function(data) {
//       	$scope.practice = data;
//       }).error(function(data) {
//           // alert("Error");
//       });
//   };     
                  			
     // adding practices functions
//     $scope.checkId = function(id){
//    	 if(id < 5){
//             return "Id already exists";
//         }
//     };
                  			
//     $scope.showStates = function(practice){
//         var selected = [];
//         if(practice){
//            selected = $filter('filter')($scope.states, {value: practice.state});
//         }
//         return selected.length ? selected[0].text : 'Not set';
//     };
                  			
//     $scope.savePractice = function(){
//         console.log("Practice saved!!" );
//     };
//                  			
//     $scope.editPractice = function(id, code, name, type, openingdate, state){
//    	 //console.log("I am in editPractice: id = " + id + ", code = "  + code + ", name = "  + name + ", openingdate = "  + openingdate + ", state = " + state);
//    	 $http({
//    		 method : 'PUT',
//    		 url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
//    		 params : {
//    			 "code" : code,
//    			 "name" : name,
//    			 "type" : type,
//    			 "openingdate" : openingdate,
//    			 "state" : state
//    		 },
//    		 headers : $scope.authHeaders
//         	}).success(function(data) {
//         	}).error(function(data) {
//         });
//      };
      
      $scope.utenteCS = sharedDataService.getUtente();
                  			
}]);

cp.controller('PracticeCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$route', '$location', '$dialogs', 'sharedDataService', '$filter', 'invokeWSService', 'invokeWSServiceProxy','$base64',
                       function($scope, $http, $routeParams, $rootScope, $route, $location, $dialogs, sharedDataService, $filter, invokeWSService, invokeWSServiceProxy, $base64, $timeout) { 
	this.$scope = $scope;
    $scope.params = $routeParams;
    
    //$rootScope.frameOpened = $location.path().endsWith('/Practice/new/add');
    //$rootScope.frameOpened = $location.path().match("^/Practice/new/add");
    
    $scope.setFrameOpened = function(value){
    	$rootScope.frameOpened = value;
    };
    
    $scope.isUeCitizen = function(){
    	return sharedDataService.getUeCitizen();
    };
 
    $scope.userCF = sharedDataService.getUserIdentity();
    
    $scope.getNameSurname = function(name, surname){
    	return name + ' ' + surname;
    };
    
    var idDomandaAll = '';
    $scope.extracomunitariType = {};
    $scope.residenzaType = {};
    $scope.componenteTmpEdit = {};
    
    $scope.getFamilyAllowaces = function(){
    	var tmp = sharedDataService.isFamilyAllowances();
    	//console.log("Get Family Allowances: " + tmp);
    	return tmp;
    };
    
    $scope.translateUserGender = function(value){
    	if(sharedDataService.getUsedLanguage() == 'eng'){
    		if(value == 'maschio'){
    			return 'male';
    		} else {
    			return 'female';
    		}
    	} else {
    		return value;
    	}
    };
    
    // The tab directive will use this data
//    $scope.tabs = [ 
//        { title:'Creazione', index: 1, content:"partials/practice/create_form.html" },
//        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled:true },
//        { title:'Nucleo - Richiedente', index: 3, content:"partials/practice/family_form_ric.html", disabled:true },
//        { title:'Nucleo - Componenti', index: 4, content:"partials/practice/family_form_comp.html", disabled:true },
//        { title:'Nucleo - Dettagli', index: 5, content:"partials/practice/family_form_det.html", disabled:true },
//        { title:'Nucleo - Assegnazione', index: 6, content:"partials/practice/family_form_ass.html", disabled:true },
//        { title:'Verifica Domanda', index: 7, content:"partials/practice/practice_state.html", disabled:true },
//        { title:'Paga', index: 8, content:"partials/practice/practice_sale.html", disabled:true },
//        { title:'Sottometti', index: 9, content:"partials/practice/practice_cons.html", disabled:true }
//    ];
    
    // For test all the tabs are active
    $scope.tabs = [ 
        { title:'Creazione', index: 1, content:"partials/practice/create_form.html" },
        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html" },
        { title:'Nucleo - Richiedente', index: 3, content:"partials/practice/family_form_ric.html" },
        { title:'Nucleo - Componenti', index: 4, content:"partials/practice/family_form_comp.html" },
        { title:'Nucleo - Dettagli', index: 5, content:"partials/practice/family_form_det.html" },
        { title:'Nucleo - Assegnazione', index: 6, content:"partials/practice/family_form_ass.html" },
        { title:'Verifica Domanda', index: 7, content:"partials/practice/practice_state.html" },
        { title:'Paga', index: 8, content:"partials/practice/practice_sale.html" },
        { title:'Sottometti', index: 9, content:"partials/practice/practice_cons.html" }
    ];
    
    //$scope.tabIndex = 0;
    
    $scope.setCreationTabs = function(){
    	$scope.getElenchi();
    	$scope.setFrameOpened(true);
    };
    
    $scope.setNextButtonLabel = function(value){
    	$scope.buttonNextLabel = value;
    };
    
    var fInit = true;
    $scope.initForm = function(){
    	$scope.setNextButtonLabel("Avanti");
    	return fInit;
    };
    
    $scope.setDefaultTabs = function(){
    	$scope.setFrameOpened(false);
    };
    
//    $scope.controlDate = function(date){
//    	if(date.)
//    };
    
    // Method nextTab to switch the input forms to the next tab and to call the correct functions
    $scope.nextTab = function(value, type, param1, param2, param3, param4){
    	//var creationRes = true;
    	fInit = false;
    	if(!value){		// check form invalid
    		switch(type){
    			case 1:	// CreaPratica
    				$scope.setLoading(true);
    				//$scope.checkDateFormat(param1.scadenzaPermessoSoggiorno);
    				$scope.createPractice(param1, param2, param3, param4); //Test
    				break;
    			case 2:
    				$scope.setLoading(true);
    				if(param2 == true){
    					$scope.updateAlloggioOccupato(param3, param1);
    				} else {
    					$scope.updateAmbitoTerritoriale();
    					//$scope.updateResidenza(param3);
    				}
    				$scope.getComponenteRichiedente();
    				$scope.setCFRichiedente(false);	// to disable the button "next"
    				break;
    			case 3:
    				//$scope.updateNucleoFamiliare(param1);
    				$scope.setCompEdited(false);
    				break;
    			case 4:
    				$scope.initFamilyTabs();
    				break;
    			case 6:
    				$scope.stampaScheda($scope.practice.idObj);
    				break;
    			case 8:
    				$scope.setLoading(true);
    				$scope.payPratica();
    				//$scope.getSchedaPDF();
    				break;
    			case 9:
    				$scope.protocolla();
    				break;
    			case 10:
    				$scope.rifiuta();
    				break;	
    			default:
    				break;
    		}
    		// After the end of all operations the tab is swithced
    		if($scope.tabIndex !== ($scope.tabs.length -1) ){
    				$scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
    				$scope.tabIndex++;								// increment tab index
    				$scope.tabs[$scope.tabIndex].active = true;		// active new tab
    				$scope.tabs[$scope.tabIndex].disabled = false;
    		} else {
    			$scope.setNextButtonLabel("Termina");
    		}
    		fInit = true;
    	}
    };
    
    $scope.prevTab = function(){
    	if($scope.tabIndex !== 0 ){
    		$scope.getPracticeData(idDomandaAll,1);
    		$scope.setNextButtonLabel("Avanti");
    	    $scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
    	    $scope.tabIndex--;								// increment tab index
    	    $scope.tabs[$scope.tabIndex].active = true;		// active new tab	
    	}
    };
    
    $scope.setIndex = function($index){
    	$scope.tabIndex = $index;
    };
    
    // -------------------------For edit tabs -----------------------

    var tabEditIndex = 0;
    
    $scope.setEditTabs = function(practiceIdToEdit){
    	//console.log("Pratica da editare: " + practiceIdToEdit);
    	//$scope.getPracticeData(practiceIdToEdit, 2);
    	//$scope.setEditIndex(0);
    	$scope.getElenchi();
    	$scope.setFrameOpened(true);
    };
    
    $scope.editTabs = [ 
        { title:'Dettaglio', index: 1, content:"partials/edit/details_form.html" },
        { title:'Nucleo - Richiedente', index: 2, content:"partials/edit/family_form_ric.html" },
        { title:'Nucleo - Componenti', index: 3, content:"partials/edit/family_form_comp.html" },
        { title:'Nucleo - Dettagli', index: 4, content:"partials/edit/family_form_det.html" },
        { title:'Nucleo - Assegnazione', index: 5, content:"partials/edit/family_form_ass.html" },
        { title:'Verifica Domanda', index: 6, content:"partials/edit/practice_state.html" },
        { title:'Paga', index: 7, content:"partials/edit/practice_sale.html" },
        { title:'Sottometti', index: 8, content:"partials/edit/practice_cons.html" }
    ];
    
    // Method nextTab to switch the input forms to the next tab and to call the correct functions
    $scope.nextEditTab = function(value, type, param1, param2, param3, param4){
    	fInit = false;
    	if(!value){		// check form invalid
    		switch(type){
    			case 2:
    				$scope.setLoading(true);
    				if(param2 == true){
    					$scope.updateAlloggioOccupato(param3, param1);
    				} else {
    					$scope.updateAmbitoTerritoriale();
    					//$scope.updateResidenza(param3);
    				}
    				$scope.getComponenteRichiedente();
    				$scope.setCFRichiedente(false);	// to disable the button "next"
    				break;
    			case 3:
    				//$scope.updateNucleoFamiliare(param1);
    				$scope.setCompEdited(false);
    				break;
    			case 4:
    				$scope.initFamilyTabs();
    				break;
    			case 6:
    				$scope.stampaScheda($scope.practice.idObj);
    				break;
    			case 8:
    				$scope.setLoading(true);
    				$scope.payPratica();
    				//$scope.getSchedaPDF();
    				break;
    			case 9:
    				$scope.protocolla();
    				break;
    			case 10:
    				$scope.rifiuta();
    				break;	
    			default:
    				break;
    		}
    		// After the end of all operations the tab is swithced
    		if(tabEditIndex !== ($scope.editTabs.length -1) ){
    	    	$scope.editTabs[tabEditIndex].active = false;		// deactive actual tab
    	    	tabEditIndex = tabEditIndex+1;						// increment tab index
    	    	$scope.editTabs[tabEditIndex].active = true;		// active new tab
    	    	$scope.editTabs[tabEditIndex].disabled = false;	
    		} else {
    			$scope.setNextButtonLabel("Termina");
    		}
    		fInit = true;
    	}
    };
    
    $scope.prevEditTab = function(){
    	if(tabEditIndex !== 0 ){
    		$scope.getPracticeData(idDomandaAll,1);
    		$scope.setNextButtonLabel("Avanti");
    	    $scope.editTabs[tabEditIndex].active = false;	// deactive actual tab
    	    tabEditIndex--;								// increment tab index
    	    $scope.editTabs[tabEditIndex].active = true;		// active new tab	
    	}
    };
    
    $scope.setEditIndex = function($index){
    	//$scope.tabEditIndex = $index;
    	tabEditIndex = $index;
    };
    
    // ----------------------- For view tabs -----------------------
    $scope.setNextButtonViewLabel = function(value){
    	$rootScope.buttonNextViewLabel = value;
    };

    $scope.setViewTabs = function(){
    	$scope.setViewIndex(0);
    	$scope.setNextButtonViewLabel("Chiudi");
    	$scope.setFrameOpened(true);
    };
    
    $scope.viewTabs = [ 
        { title:'Dettagli Domanda', index: 1, content:"partials/view/practice_state.html" }
    ];
    
    // Method nextTab to switch the input forms to the next tab and to call the correct functions
    $scope.nextViewTab = function(value, type, param1, param2, param3, param4){
    	fInit = false;
    	if(!value){		// check form invalid
    		switch(type){
    			case 1: $scope.setFrameOpened(false);
    				break;
    			default:
    				break;
    		}
    		// After the end of all operations the tab is swithced
    		if($scope.tabViewIndex !== ($scope.viewTabs.length -1) ){
    	    	$scope.viewTabs[$scope.tabViewIndex].active = false;	// deactive actual tab
    	    	$scope.tabViewIndex++;								// increment tab index
    	    	$scope.viewTabs[$scope.tabViewIndex].active = true;		// active new tab
    	    	$scope.viewTabs[$scope.tabViewIndex].disabled = false;	
    		} else {
    			$scope.setNextButtonViewLabel("Chiudi");
    		}
    		fInit = true;
    	}
    };
    
    $scope.prevViewTab = function(){
    	if($scope.tabViewIndex !== 0 ){
    		$scope.setNextButtonViewLabel("Avanti");
    	    $scope.viewTabs[$scope.tabViewIndex].active = false;	// deactive actual tab
    	    $scope.tabViewIndex--;								// increment tab index
    	    $scope.viewTabs[$scope.tabviewIndex].active = true;		// active new tab	
    	}
    };
    
    $scope.setViewIndex = function($index){
    	$scope.tabViewIndex = $index;
    };
    
    // -------------------For manage components tabs-----------------
    
    $scope.setComponentsEdited = function(value){
    	$scope.allComponentsEdited = value;
    };
    
    $scope.hideArrow = function(value){
    	$scope.isArrowHide = value;
    };
    
    $scope.setFInitFam = function(value){
    	$scope.fInitFam=value;
    };
    
    $scope.initFamilyTabs = function(){
    	$scope.setFInitFam(false);
    	$scope.setNextLabel("Prossimo Componente");
    	$scope.family_tabs = [];
    	for(var i = 0; i < $scope.componenti.length; i++){
    		$scope.family_tabs.push({
    			title : (i + 1) + " - " + $scope.componenti[i].persona.nome + " " + $scope.componenti[i].persona.cognome,
    			index : i + 1,
    			disabled : (i == 0 ? false : true),
    			content : $scope.componenti[i],
    			disability : {
    				catDis : $scope.componenti[i].variazioniComponente.categoriaInvalidita,
    				gradoDis : $scope.componenti[i].variazioniComponente.gradoInvalidita,
    				cieco : false,
    				sordoMuto : false
    			}
    		});	
    	}
    	if($scope.family_tabs.length == 1){
    		$scope.setNextLabel("Salva Componente");
			$scope.hideArrow(true);
    	}
    	$scope.setComponentsEdited(false);
    };
    
    $scope.setNextLabel = function(value){
    	$scope.buttonNextLabelFamily = value;
    };
    
    $scope.setIndexFamily = function($index){
    	$scope.tabFamilyIndex = $index;
    };

    $scope.nextFamilyTab = function(value, componenteVar, disability, invalidAge){
    	$scope.setFInitFam(false);
    	if(!value){		// check form invalid
    		if(invalidAge == 'noDis'){
    			disability = null;
    		}
    		console.log("Invalid Age: " + invalidAge);
    		$scope.salvaComponente(componenteVar, disability);
	    	// After the end of all operations the tab is swithced
	    	if($scope.tabFamilyIndex !== ($scope.componenti.length -1) ){
	    		if($scope.tabFamilyIndex == ($scope.componenti.length -2)) {
	    			$scope.setNextLabel("Salva");
	    			$scope.hideArrow(true);
	    		}
	    	   	$scope.family_tabs[$scope.tabFamilyIndex].active = false;	// deactive actual tab
	    	   	$scope.tabFamilyIndex++;									// increment tab index
	    	   	$scope.family_tabs[$scope.tabFamilyIndex].active = true;		// active new tab
	    	   	$scope.family_tabs[$scope.tabFamilyIndex].disabled = false;	
	    	} else {
	    		$scope.setComponentsEdited(true);
	    	}
	    	$scope.setFInitFam(true);
    	}
    };
    
    $scope.prevFamilyTab = function(){
    	if($scope.tabFamilyIndex !== 0 ){
    		$scope.setNextLabel("Prossimo Componente");
    		$scope.hideArrow(false);
    	    $scope.family_tabs[$scope.tabFamilyIndex].active = false;	// deactive actual tab
    	    $scope.tabFamilyIndex--;									// increment tab index
    	    $scope.family_tabs[$scope.tabFamilyIndex].active = true;		// active new tab	
    	}
    };
    // --------------------------------------------------------------
    
    $scope.temp = {};
    
    $scope.reset = function(){
    	$scope.practice = angular.copy($scope.temp);
    };
    
    $scope.jobs = [ 
           {value:'COLLOCAMENTO', title:'Iscrizione al Collocamento'},
           {value:'LAVORO', title:'Costanza di Lavoro'}
    ];
    
    $scope.permissions = [
           {value:'SOGGIORNO', title:'Permesso di Soggiorno'},
           {value:'CE', title:'Permesso Ce o Carta di Soggiorno'}
    ];
    
    $scope.rtypes = [ 
           {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'Impropriamente Adibito da almeno 2 anni (soffitti, cantine, sottoscale, auto)'},
           {value:'ALLOGGIO_PRIVO_SERVIZI', title:'Privo di Servizi Igienici o con Servizi Igienici Esterni'},
           {value:'NORMALE', title:'Normale'}
    ];
    
    $scope.rtypes_inidoneo = [ 
           {value:'ALLOGGIO_INIDONEO', title:'Inidoneo per numero di stanze da letto'}
    ];
    
    $scope.rtypes_all = [ 
           {value:'ALLOGGIO_INIDONEO', title:'Inidoneo per numero di stanze da letto'},          
           {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'Impropriamente Adibito da almeno 2 anni (soffitti, cantine, sottoscale, auto)'},
           {value:'ALLOGGIO_PRIVO_SERVIZI', title:'Privo di Servizi Igienici o con Servizi Igienici Esterni'},
           {value:'NORMALE', title:'Normale'}
    ];
    
    $scope.genders = [
          'Femminile',
          'Maschile'
    ];
    
    $scope.municipalities = [
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
    
    $scope.contracts = [
          {value: 'CANONE_LIBERO', title:'Canone libero (4 anni + 4 anni)'},
          {value: 'CANONE_CONCORDATO', title:'Canone concordato (3 anni + 2 anni)'}
    ];
    
    $scope.disabilities_under18 = [
          {value: "CATEGORIA_INVALIDA_1", name: '01'},
          {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
          {value: "CATEGORIA_INVALIDA_3", name: '07'}
    ];
    
    $scope.disabilities_over65 = [
          {value: "CATEGORIA_INVALIDA_1", name: '01'},
          {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
          {value: "CATEGORIA_INVALIDA_4", name: '08'}
    ];
    
    $scope.disabilities_all = [
          {value: "CATEGORIA_INVALIDA_1", name: '01'},
          {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
          {value: "CATEGORIA_INVALIDA_3", name: '07'},
          {value: "CATEGORIA_INVALIDA_4", name: '08'}
    ];
    
    $scope.citizenships = [
          {code: 1, name: 'Italiana'},
          {code: 2, name: 'Europea'},
          {code: 3, name: 'Extra UE'},
    ];
    
    $scope.yes_no = [
          {code:'true' , title: 'Si'},
          {code:'false' , title: 'No'}
    ];    
    
    $scope.affinities = [
          {value: 'ALTRO_CONVIVENTE', name: 'Altro convivente'},
          {value: 'PARENTE_34_GRADO', name: 'Parentela 3/4 grado'},
          {value: 'PARENTE_2_GRADO', name: 'Parentela 2 grado'},
          {value: 'PARENTE_1_GRADO', name: 'Parentela 1 grado'},
          {value: 'FIGLIO', name: 'Figlio'},
          {value: 'CONVIVENTE_MORE_UXORIO', name: 'Convivente More Uxorio'},
          {value: 'CONIUGE_NON_SEPARATO', name: 'Coniuge non separato'}          
    ];
    
    $scope.maritals = [
          {value: 'GIA_CONIUGATO_A', name: 'Gia coniugato/a'},
          {value: 'CONIUGATO_A', name: 'Coniugato/a'},
          {value: 'VEDOVO_A', name: 'Vedovo/a'},
          {value: 'NUBILE_CELIBE', name: 'Nubile/Celibe'}
    ];
    //{value: 'SENT_SEP', name: 'Coniugato/a con sentenza di separazione'}
    
    $scope.onlyNumbers = /^\d+$/;
    $scope.datePatternIt=/^\d{1,2}\/\d{1,2}\/\d{4}$/;
    $scope.datePattern=/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/i;
    $scope.datePattern2=/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i;
    $scope.datePattern3=/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/i;
    $scope.timePattern=/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    $scope.phonePattern=/^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
    $scope.mailPattern=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // ----------------------------- Section for Separation, Anni Residenza, Anzianità lavorativa e Disabilità ----------------------------
    $scope.sep = {};
    $scope.setSep = function(value){
    	$scope.sep = value;
    };
    
    $scope.setSeparation = function(value){
    	$scope.isSeparationVisible = value;
    };
    
    $scope.hideSeparation = function(){
    	$scope.setSeparation(false);
    };
    
    $scope.checkSeparationSent = function(value){
    	if(value == 'SENT_SEP'){
    		$scope.setSeparation(true);
    	}
    };
    
    // method that check the correctness of a family state with two spouses ecc... If it
    // found only a consort it return an error
    $scope.checkFamilyState = function(){
    	var check = true;
    	var sc_count = 0;
    	for (var i = 0; i < $scope.componenti.length; i++){
    		if($scope.componenti[i].statoCivile == 'CONIUGATO_A'){
    			sc_count++;
    		}
    	}
    	if(sc_count == 1){
    		if(($scope.sep == null) || (($scope.sep.consensual == null) && ($scope.sep.judicial == null) && ($scope.sep.tmp == null))){
    			$scope.setSeparation(true);
    			check = false;
    		} else {
    			check = true;
    		}
    	}
    	return check;
    };
    
    $scope.salvaSeparazione = function(){
    	if(($scope.sep == null) || (($scope.sep.consensual == null) && ($scope.sep.judicial == null) && ($scope.sep.tmp == null))){
    		$dialogs.error("Stato civile dichiarato non idoneo. Richiedi un altro ICEF per poter effettuare una domanda idonea.");
    	} else {
    		console.log("Stato separazione : " + $scope.sep);
    		$scope.hideSeparation();
    	}
    };
    
    $scope.resetSep = function(){
    	//$scope.setSep(null);
    	$scope.sep = {};
    };
    
    $scope.storicoResidenza = [];
    $scope.componenteMaxResidenza = "";
    $scope.componenteMaxResidenza_Obj = {};
    $scope.componenteAIRE = "";
    $scope.residenzaAnni = 0;
    $scope.aireAnni = 0;

    $scope.sr = {};
    
    $scope.setErrorsStoricoRes = function(value){
    	$scope.isErrorStoricoRes = value;
    };
    
    $scope.showSRForm = function(value){
    	//$scope.sr.dataDa = new Date(value);
    	$scope.setSRFormVisible(true);
    };
    
    $scope.hideSRForm = function(){
    	$scope.setSRFormVisible(false);
    };
    
    $scope.setSRFormVisible = function(value){
    	$scope.isSRFormVisible = value;
    };
    
    $scope.addStoricoRes = function(value){
    	// Method that check if the inserted date are corrects
    	if($scope.checkDates(value.idComuneResidenza, value.dataDa, value.dataA)){
    		$scope.setErrorsStoricoRes(false);
    		var dateDa = $scope.correctDate(value.dataDa);
    		var dateA = $scope.correctDate(value.dataA);
    		var fromDate = new Date(dateDa);
    		var toDate = new Date(dateA);
    		console.log("Data da " + fromDate);
    		console.log("Data a " + toDate);
    		value.id = $scope.storicoResidenza.length;
    		value.difference = toDate.getTime() - fromDate.getTime();
    		var newStorico = angular.copy(value);
    		$scope.storicoResidenza.push(newStorico);
    		value.dataDa = value.dataA; // Update the new date with the end of the last date
    		value.idComuneResidenza = "";
    		value.dataA = "";
    	} else {
    		$scope.setErrorsStoricoRes(true);
    	}
    };
    
    $scope.checkDates = function(comune, data1, data2){
    	var check_ok = true;
    	if(comune == null && data1 == null && data2 == null){
    		$scope.setErrorMessageStoricoRes("Nessun valore inserito nei campi 'Comune', 'Data Dal' e 'Data Al'. I campi sono obbligatori");
    		check_ok = false;
    	} else {
	    	if(comune == null){
	    		$scope.setErrorMessageStoricoRes("Campo Comune obbligatorio");
	    		check_ok = false;
	    	} else  if(data1 == null || data2 == null){
	    		$scope.setErrorMessageStoricoRes("Campi Data Da/A obbligatori");
	    		check_ok = false;
	    	} else {
	    		var dataDa = new Date(data1);
	        	var dataA = new Date(data2);
	    		if(dataDa > dataA){
	    			$scope.setErrorMessageStoricoRes("Data di inizio maggiore di data di fine");
	    			check_ok = false;
	    		}
	    	}
    	}
    	return check_ok;
    };
    
    $scope.deleteStoricoRes = function(value){
    	$scope.storicoResidenza.splice(value.id, 1);
    };
    
    $scope.calcolaStoricoRes = function(ft_component){
    	var totMillis = 0;
    	var totMillisInYear = 1000 * 60 * 60 * 24 * 365; // I consider an year of 365 days
    	for(var i = 0; i < $scope.storicoResidenza.length; i++){
    		totMillis += $scope.storicoResidenza[i].difference;
    	}
    	var anniRes = totMillis/totMillisInYear;
    	$scope.setAnni(Math.round(anniRes), ft_component, 1);
    	$scope.setSRFormVisible(false);
    };
    
    $scope.setErrorMessageStoricoRes = function(value){
    	$scope.errorsStoricoRes = value;
    };
    
    // ------------------------ For AIRE ----------------------
    
    $scope.storicoAire = [];
    $scope.aire = {};
    
    $scope.setErrorsAire = function(value){
    	$scope.isErrorAire = value;
    };
    
    $scope.showAIREForm = function(value){
    	//$scope.aire.dataDa = new Date(value);
    	$scope.setAIREFormVisible(true);
    };
    
    $scope.hideAIREForm = function(){
    	$scope.setAIREFormVisible(false);
    };
    
    $scope.setAIREFormVisible = function(value){
    	$scope.isAIREFormVisible = value;
    };
    
    $scope.addStoricoAire = function(value){
    	// Method that check if the inserted date are corrects
    	if($scope.checkDates(value.idComuneResidenza, value.dataDa, value.dataA)){
    		$scope.setErrorsAire(false);
    		var dateDa = $scope.correctDate(value.dataDa);
    		var dateA = $scope.correctDate(value.dataA);
    		var fromDate = new Date(dateDa);
    		var toDate = new Date(dateA);
    		console.log("Data da " + fromDate);
    		console.log("Data a " + toDate);
    		value.id = $scope.storicoResidenza.length;
    		value.difference = toDate.getTime() - fromDate.getTime();
    		var newStorico = angular.copy(value);
    		$scope.storicoAire.push(newStorico);
    		value.dataDa = value.dataA; // Update the new date with the end of the last date
    		value.idComuneResidenza = "";
    		value.dataA = "";
    	} else {
    		$scope.setErrorsAire(true);
    	}
    };
    
    $scope.deleteStoricoAire = function(value){
    	$scope.storicoAire.splice(value.id, 1);
    };
    
    $scope.calcolaStoricoAire = function(ft_component){
    	var totMillis = 0;
    	var totMillisInYear = 1000 * 60 * 60 * 24 * 365; // I consider an year of 365 days
    	for(var i = 0; i < $scope.storicoAire.length; i++){
    		totMillis += $scope.storicoAire[i].difference;
    	}
    	var anniAire = totMillis/totMillisInYear;
    	$scope.setAnni(Math.round(anniAire), ft_component, 3);
    	$scope.setAIREFormVisible(false);
    };
    
    // --------------------------------------------------------------------------------------
    
    // Method setAnni: used with param type == 1 -> to update "anniResidenza";
    // 				   used with param type == 2 -> to update "anniLavoro";	
    $scope.setAnni = function(value, ft_component, type){
    	// find the righ componente in $scope.componenti
    	for(var i = 0; i < $scope.componenti.length; i++){
    		if($scope.componenti[i].idObj == ft_component.idObj){
    			if(type == 1){
    				$scope.componenti[i].variazioniComponente.anniResidenza = value;
    				$scope.componenteMaxResidenza = $scope.componenti[i].persona.cognome  + ", " + $scope.componenti[i].persona.nome;
    				$scope.componenteMaxResidenza_Obj = angular.copy($scope.componenti[i]);
    				$scope.residenzaAnni = value;
    			} else if(type == 2){
    				$scope.componenti[i].variazioniComponente.anniLavoro = value;
    			} else {
    				$scope.componenti[i].variazioniComponente.anniAire = value;
    				$scope.componenteAIRE = $scope.componenti[i].persona.cognome  + ", " + $scope.componenti[i].persona.nome;
    				$scope.aireAnni = value;
    			}
    		}
    	}
    };
    
    $scope.showALForm = function(){
    	$scope.setALFormVisible(true);
    };
    
    $scope.hideALForm = function(){
    	$scope.setALFormVisible(false);
    };
    
    $scope.setALFormVisible = function(value){
    	$scope.isALFormVisible = value;
    };
    
    $scope.calcolaAnzianitaLav = function(value, ft_component){
    	if(value.mesiLavoro > 6){
    		value.anniLavoro +=1;
    	} else if((value.mesiLavoro == 6) && (value.giorniLavoro > 0)){
    		value.anniLavoro +=1;
    	}
    	$scope.setAnni(value.anniLavoro, ft_component, 2);
    	$scope.setALFormVisible(false);
    };
    
    $scope.checkMonths = function(months){
    	if(months == 6){
    		$scope.setDaysVisible(true);
    	} else {
    		$scope.setDaysVisible(false);
    	}
    };
    
    $scope.setDaysVisible = function(value){
    	$scope.isDaysVisible = value;
    };

    $scope.showDisForm = function(componente){
    	if(componente.disability.catDis == null && componente.disability.gradoDis == null){
    		$scope.invalid_age = 'noDis';
    	}
    	var today = new Date();
    	var dNascita = new Date(componente.content.persona.dataNascita);
    	console.log("Data nascita " + dNascita);
    	console.log("Data odierna " + today);
    	
    	var totMillisInYear = 1000 * 60 * 60 * 24 * 365; // I consider an year of 365 days
    	var difference = today.getTime() - dNascita.getTime();
    	$scope.anniComp = Math.round(difference/totMillisInYear);
    	
    	$scope.setDisFormVisible(true);
    };
    
    $scope.hideDisForm = function(){
    	$scope.setDisFormVisible(false);
    };
    
    $scope.setDisFormVisible = function(value){
    	$scope.isDisFormVisible = value;
    };
    
    $scope.calcolaCategoriaGradoDisabilita = function(){
    	$scope.hideDisForm();
    };
    
    $scope.resetDisabilita = function(component){
    	$scope.invalid_age = 'noDis';
    };

    // --------------------------- End Section for Anni Residenza, Anzianità lavorativa e Disabilità -------------------------
    
    // Object and Method to check the correct relation between the rooms and the family components
    $scope.infoAlloggio = {};
    $scope.checkInidoneo = function(){
    	var suggestRooms = 0;
    	var correctRooms = false;
    	// Algoritm:
    	// Componenti - Stanze da letto
    	//    1 - 1
		//    2 - 1
		//    3 - 2
		//    4 - 2
		//    5 - 2
		//    6 - 3
		//    7 - 3
		//    8 - 3
		//    9 - 4
		//   10 - 5
    	if($scope.infoAlloggio.ocupantiAlloggio < 3){
    		suggestRooms = 1;
    		if($scope.infoAlloggio.stanzeLetto >= suggestRooms){
    			correctRooms = true; 
    		} else {
    			correctRooms = false;
    		}
    	} else if($scope.infoAlloggio.ocupantiAlloggio >= 3 && $scope.infoAlloggio.ocupantiAlloggio < 6){
    		suggestRooms = 2;
    		if($scope.infoAlloggio.stanzeLetto >= suggestRooms){
    			correctRooms = true; 
    		} else {
    			correctRooms = false;
    		}
    	} else if($scope.infoAlloggio.ocupantiAlloggio >= 6 && $scope.infoAlloggio.ocupantiAlloggio < 9){
    		suggestRooms = 3;
    		if($scope.infoAlloggio.stanzeLetto >= suggestRooms){
    			correctRooms = true; 
    		} else {
    			correctRooms = false;
    		}
    	} else if($scope.infoAlloggio.ocupantiAlloggio == 9){
    		suggestRooms = 4;
    		if($scope.infoAlloggio.stanzeLetto >= suggestRooms){
    			correctRooms = true; 
    		} else {
    			correctRooms = false;
    		}
    	} else if($scope.infoAlloggio.ocupantiAlloggio == 10){
    		suggestRooms = 5;
    		if($scope.infoAlloggio.stanzeLetto >= suggestRooms){
    			correctRooms = true; 
    		} else {
    			correctRooms = false;
    		}
    	}
    	$scope.isInidoneoForRoomsNum = !correctRooms;
    };
    
    // Variabili usate in familyForm per visualizzare/nascondere i vari blocchi
    $scope.showMembers = false;
    $scope.applicantInserted = false;
    $scope.newMemberShow = false;
    $scope.newMemberInserted = false;
    $scope.showEditComponents = false;
    
    $scope.checkRequirement = function(){
    	if(($scope.residenzaType.residenzaTN != 'true') || ($scope.residenzaType.alloggioAdeguato == 'true')){
    		$dialogs.notify("Attenzione", "Non sei in possesso dei requisiti minimi per poter effettuare una domanda idonea. Vedi documento ...");
    	}
    };
    
    // ---------------------------------- Metodi richiamo WS INFOTN ----------------------------------------
    $scope.setPracticeLoaded = function(value){
    	$scope.practiceLoaded = value;
    };
    
    $scope.getPracticesEpu = function() {
    	$scope.setPracticeLoaded(false);
    	var method = 'GET';
    	var params = {
    		idEnte:"24",
    		userIdentity: $scope.userCF
    	};
    	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "RicercaPratiche", params, $scope.authHeaders, null);	

    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		$scope.practicesEpu = result.domanda;
	    		console.log("Recupero domande utente " + $scope.practicesEpu);
	    		//$dialogs.notify("Successo","Creazione Pratica " + result.domanda.identificativo + " avvenuta con successo.");
    		} else {
	    		$dialogs.error("Errore Recupero pratiche utente loggato.");
    		}
    		$scope.setPracticeLoaded(true);
    	});
    };
    
    $scope.correctDate = function(date){
    	if(date != null && date.indexOf("/") > -1){
    		var res = date.split("/");
    		var correct = "";
        	//var data = new Date(res[2], res[1], res[0]);
        	//var yy = data.getFullYear();
        	//var mm = data.getMonth();
        	//var dd = data.getDate();
        	
        	//correct = yy + "-" + mm + "-" + dd;
        	correct=res[2] + "-" + res[1] + "-" + res[0];
        	return correct;
    	} else {
    		return date;
    	}
    };
    
    $scope.correctDateIt = function(date){
    	if(date != null && date.indexOf("/") > -1){
    		return date;
    	} else {
    		var res = date.split("-");
    		var correct = "";
        	//var data = new Date(res[2], res[1], res[0]);
        	//var yy = data.getFullYear();
        	//var mm = data.getMonth();
        	//var dd = data.getDate();
        	
        	//correct = yy + "-" + mm + "-" + dd;
        	correct=res[2] + "/" + res[1] + "/" + res[0];
        	return correct;
    	}
    };
    
    // ------------------------------------  Recovery Structure Data ------------------------------------
    
    $scope.checkRecoveryStruct = function(){
    	if($scope.residenzaType.numeroComponenti > 0 && $scope.residenzaType.numeroComponenti < 3){
    		$scope.setRecoveryStruct(true);
    	} else {
    		$scope.hideRecoveryStruct();
    	}
    };
    
    $scope.strutturaRec = {};
    $scope.struttureRec = [];
    $scope.setStrutturaRec = function(value){
    	$scope.setStrutturaRec = value;
    };
    
    $scope.setRecoveryStruct = function(value){
    	$scope.isRecoveryStructVisible = value;
    };
    
    $scope.hideRecoveryStruct = function(){
    	$scope.setRecoveryStruct(false);
    };
    
    $scope.resetStrutturaRec = function(){
    	//$scope.setSep(null);
    	$scope.strutturaRec = {};
    };
    
    $scope.setErroreStroricoStruct = function(value){
    	$scope.isErroreStoricoStruct = value;
    };
    
    $scope.addStoricoStruct = function(value){
    	// Method that check if the inserted date are corrects
    	if($scope.checkDates(value.nomeStrut, value.luogoStrut, value.dataDa, value.dataA)){
	    		if($scope.struttureRec.length < $scope.residenzaType.numeroComponenti){
	    		$scope.setErrorsStoricoStruct(false);
	    		var dateDa = $scope.correctDate(value.dataDa);
	    		var dateA = $scope.correctDate(value.dataA);
	    		var fromDate = new Date(dateDa);
	    		var toDate = new Date(dateA);
	    		var now = new Date();
	    		console.log("Data da " + fromDate);
	    		console.log("Data a " + toDate);
	    		value.id = $scope.storicoResidenza.length;
	    		// devo fare la differenza dalla data di fine a quella di presentazione domanda ($scope.practice.dataPresentazione) - now
	    		value.distance = now.getTime() - toDate.getTime();
	    		var newStrutturaRec = angular.copy(value);
	    		$scope.struttureRec.push(newStrutturaRec);
	    		value.dataDa = value.dataA; // Update the new date with the end of the last date
	    		value.nomeStrut = "";
	    		value.luogoStrut = "";
	    		value.dataA = "";
    		} else {
    			$scope.setErrorsStoricoStruct(true);
    		}
    	} else {
    		$scope.setErrorsStoricoStruct(true);
    	}
    };
    
    
    // --------------------------------------------------------------------------------------------------
    
    $scope.createPractice = function(ec_type, res_type, dom_type, practice){
    	var extraComType = {
    			permesso: ec_type.permesso,
    			lavoro : ec_type.lavoro,
    			ricevutaPermessoSoggiorno : ec_type.ricevutaPermessoSoggiorno,
    			scadenzaPermessoSoggiorno : $scope.correctDate(ec_type.scadenzaPermessoSoggiorno)
    	};
    	
    	res_type.cittadinanzaUE = $scope.isUeCitizen();
    	var edizione = $scope.getCorrectEdizioneFinanziataTest($scope.getFamilyAllowaces(), sharedDataService.getUeCitizen());
    	var pratica = {	
    			input:{
    				domandaType : {
    					extracomunitariType: extraComType,//ec_type,
    					idEdizioneFinanziata : edizione,
    					numeroDomandaICEF : dom_type.numeroDomandaIcef,
    					residenzaType : res_type
    				},
    				idEnte : "24",
    				userIdentity : $scope.userCF
    			},
    			cpsData : {
    				email : (sharedDataService.getMail() == null || sharedDataService.getMail() == '')? 'prova@mail.com' : sharedDataService.getMail(),
    				nome : sharedDataService.getName(),
    				cognome : sharedDataService.getSurname(),
    				codiceFiscale : sharedDataService.getUserIdentity(),
    				certBase64 : sharedDataService.getBase64()
    			}
    	};
    	
    	var value = JSON.stringify(pratica);
    	console.log("Json value " + value);
    	
    	var method = 'POST';
    	//var myDataPromise = invokeWSService.getProxy(method, "CreaPratica", null, $scope.authHeaders, value);	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "CreaPratica", null, $scope.authHeaders, value);	
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			// Here I call the getPracticeMethod
    			idDomandaAll = result.domanda.idObj; //5563259; //returned.domanda.idObj;
            	$scope.getPracticeData(idDomandaAll,1);
            	// Retrieve the elenchi info
                $scope.getElenchi();
                //return true;
    		} else {
    			$scope.setLoading(false);
    			$dialogs.error("Creazione Pratica non riuscita.");
    			//return false;
    		}
    	});	
    	
    };
    
    // Used to create a Practice without call the web-service
    $scope.createPracticeTest = function(ec_type, res_type, dom_type, practice){
    	
    	//sharedDataService.setLoading(true);
    	$scope.setLoading(true);
    	var pratica = {
    		domandaType : {
    				extracomunitariType: ec_type,
    				idEdizioneFinanziata : 5526558,
    				numeroDomandaICEF : dom_type.numeroDomandaIcef,
    				residenzaType : res_type
    			},
    		idEnte : "24",
    		userIdentity : $scope.userCF
    	};
    	
        // Here I call the getPracticeMethod // old 5562993
    	idDomandaAll = 5563259;	// Multi componente 5563259
        $scope.getPracticeData(idDomandaAll,1); 
        // Retrieve the elenchi info
        $scope.getElenchi();
        //$dialogs.notify("Successo","Creazione Pratica 5563259 avvenuta con successo.");
    };
	
	$scope.setLoading = function(loading) {
		$scope.isLoading = loading;
	};
	
	$scope.setLoadingRic = function(loading) {
		$scope.isLoadingRic = loading;
	};
	
	$scope.setLoadingPSC = function(loading) {
		$scope.isLoadingPSC = loading;
	};
	
	$scope.setLoadingAss = function(loading) {
		$scope.isLoadingAss = loading;
	};
    
    // Method to obtain the Practice data from the id of the request
    $scope.getPracticeData = function(idDomanda, type) {
    		
    	var method = 'GET';
    	var params = {
    		idDomanda:idDomanda,
    		idEnte:"24",
    		userIdentity: $scope.userCF
    	};
    	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetDatiPratica", params, $scope.authHeaders, null);	

    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		$scope.practice = result.domanda;
	    		if(type == 2){
	    			$scope.ambitoTerritoriale = $scope.practice.ambitoTerritoriale1;
	    		}
	    		
	    		// split practice data into differents objects
	    		$scope.extracomunitariType = $scope.practice.extracomunitariType;
	    		$scope.residenzaType = $scope.practice.residenzaType;
	    		$scope.nucleo = $scope.practice.nucleo;
	    		$scope.setComponenti($scope.nucleo.componente);
	    		$scope.indicatoreEco = $scope.nucleo.indicatoreEconomico;
	    		
	    		$scope.setLoading(false);
	    		if(type == 1){
	    			$dialogs.notify("Successo","Creazione Pratica " + result.domanda.identificativo + " avvenuta con successo.");
	    		} else {
	    			$dialogs.notify("Successo","Caricamento Dati Pratica " + result.domanda.identificativo + " avvenuta con successo.");
	    		}
	    	} else {
    			$scope.setLoading(false);
	    		$dialogs.error("Errore Creazione nuova Pratica");
    		}
    	});
    	
    };
    
    $scope.setComponenti = function(value){
    	$scope.componenti = value;
    };
    
    var listaEdizioniFinanziate = [];
    
    // Method to full the "elenchi" used in the app
    $scope.getElenchi = function() {
    	
    	var method = 'GET';
    	var params = {
			idEnte:"24",
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "Elenchi", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.listaComuni = result.comuni;
        	$scope.listaAmbiti = result.ambitiTerritoriali;
        	listaEdizioniFinanziate = result.edizioniFinanziate;
    	});
    };
    
    
    $scope.getCorrectEdizioneFinanziata = function(isAss, isUE){
    	var found = false;
    	var edFin = "";
    	
    	if(isAss == true && isUE == true){
    		for(var i = 0; (i < listaEdizioniFinanziate.length) && (!found); i++){
    			if(listaEdizioniFinanziate[i].descrizione == "Contributo integrativo su libero mercato, comunitari"){
    				found = true;
    				edFin = listaEdizioniFinanziate[i].idObj;
    			}
    		}
    	}
    	if(isAss == true && isUE == false){
    		for(var i = 0; (i < listaEdizioniFinanziate.length) && (!found); i++){
    			if(listaEdizioniFinanziate[i].descrizione == "Contributo integrativo su libero mercato, extracomunitari"){
    				found = true;
    				edFin = listaEdizioniFinanziate[i].idObj;
    			}
    		}
    	}
    	if(isAss == false && isUE == true){
    		for(var i = 0; (i < listaEdizioniFinanziate.length) && (!found); i++){
    			if(listaEdizioniFinanziate[i].descrizione == "Locazione di alloggio pubblico, comunitari"){
    				found = true;
    				edFin = listaEdizioniFinanziate[i].idObj;
    			}
    		}
    	}
    	if(isAss == false && isUE == false){
    		for(var i = 0; (i < listaEdizioniFinanziate.length) && (!found); i++){
    			if(listaEdizioniFinanziate[i].descrizione == "Locazione di alloggio pubblico, extracomunitari"){
    				found = true;
    				edFin = listaEdizioniFinanziate[i].idObj;
    			}
    		}
    	}
    	
    	return edFin;
    };
    
    $scope.getCorrectEdizioneFinanziataTest = function(isAss, isUE){
    	var edFin = "";
    	var alloggioUE = '5526551';
    	var alloggioExtraUE = '5526553';
    	var contributoUE = '5526550';
    	var contributoExtraUE = '5526552';
    	
    	if(isAss == true && isUE == true){
    		edFin = contributoUE;
    	}
    	if(isAss == true && isUE == false){
    		edFin = contributoExtraUE;
    	}
    	if(isAss == false && isUE == true){
    		edFin = alloggioUE;
    	}
    	if(isAss == false && isUE == false){
    		edFin = alloggioExtraUE;
    	}
    	
    	return edFin;
    };
    
    // Used to update the alloggioOccupato data
    $scope.updateAlloggioOccupato = function(residenza,alloggioOccupato){
    	var allog = {
    		comuneAlloggio : alloggioOccupato.comuneAlloggio,
    		indirizzoAlloggio : alloggioOccupato.indirizzoAlloggio,
    		superficieAlloggio : alloggioOccupato.superficieAlloggio,
    		numeroStanze : alloggioOccupato.numeroStanze,
    		tipoContratto :	alloggioOccupato.tipoContratto,
    		dataContratto : $scope.correctDate(alloggioOccupato.dataContratto),
    		importoCanone : alloggioOccupato.importoCanone
    	};
    	var alloggio = {
        	domandaType : {
        		residenzaType : residenza,
        		alloggioOccupatoType : allog,	//alloggioOccupato,
        		idDomanda : $scope.practice.idObj,
        		versione: $scope.practice.versione
        	},
        	idEnte : "24",
        	userIdentity : $scope.userCF
        };
    	
    	var value = JSON.stringify(alloggio);
    	console.log("Alloggio Occupato : " + value);
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$scope.setLoading(false);
    			$dialogs.notify("Successo","Modifica Alloggio Occupato avvenuta con successo.");
    		} else {
    			$scope.setLoading(false);
    			$dialogs.error("Errore Modifica Pratica - Alloggio Occupato");
    		}
    	});
    };
    
    // Method to update the "residenzaType" of an element 
    $scope.updateResidenza = function(residenza){
    	var residenzaCor = {
        	domandaType : {
        		residenzaType : residenza,
        		idDomanda : $scope.practice.idObj,
        		versione: $scope.practice.versione
        	},
        	idEnte : "24",
        	userIdentity : $scope.userCF
        };
    	var value = JSON.stringify(residenzaCor);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$scope.setLoading(false);
    			$dialogs.notify("Successo","Modifica Residenza avvenuta con successo.");
    		} else {
    			$scope.setLoading(false);
    			$dialogs.error("Errore Modifica Pratica - Residenza");
    		}
    	});
    };
   
    // Method to update the "ambitoTerritoriale" of an element 
    $scope.updateAmbitoTerritoriale = function(){
    	if($scope.practice.ambitoTerritoriale1 == null || $scope.practice.ambitoTerritoriale1 == ""){
    		$dialogs.notify("Attenzione","Non hai effettuato nessuna scelta riguardo al comune o alla circoscrizione.");
    	} else {
	    	var ambitoTerritoriale = {
	    		domandaType : {
	    			ambitoTerritoriale1 : $scope.practice.ambitoTerritoriale1,
	    			idDomanda : $scope.practice.idObj,
	        		versione: $scope.practice.versione
	    		},
	    		idEnte : "24",
	        	userIdentity : $scope.userCF
	    	};
	    	var value = JSON.stringify(ambitoTerritoriale);
	    	
	    	var method = 'POST';
	    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
	    	
	    	myDataPromise.then(function(result){
	    		if(result.esito == 'OK'){
	    			console.log("Ambito territoriale modificato " + JSON.stringify(result.domanda.ambitoTerritoriale1));
	    			$scope.setLoading(false);
	    			$dialogs.notify("Successo","Settaggio Ambito territoriale avvenuto con successo.");
	    		} else {
	    			$scope.setLoading(false);
	    			$dialogs.error("Errore settaggio Ambito");
	    		}
	    	});
    	}
    };
    
    // Method to update the "parentelaStatoCivile" data of every family member 
    $scope.salvaModificheSC = function(){
    	$scope.setCompEdited(true);
    	// check correctness of family state
    	if($scope.checkFamilyState()){
	    	$scope.setLoadingPSC(true);
	    	var onlyParentelaESC = [];
	    	for (var i = 0; i < $scope.componenti.length; i++){
	    		var p_sc = {
	    			idNucleoFamiliare: 	$scope.componenti[i].idNucleoFamiliare,
	    			idObj: $scope.componenti[i].idObj,
					richiedente: $scope.componenti[i].richiedente,
					parentela: $scope.componenti[i].parentela,
					statoCivile: $scope.componenti[i].statoCivile
					//statoCivile: ($scope.componenti[i].statoCivile == 'SENT_SEP') ? 'GIA_CONIUGATO_A' : $scope.componenti[i].statoCivile
	    		};
	    		onlyParentelaESC.push(p_sc);
	    	}
	    	var nucleo = {
	    	    domandaType : {
	    	    	parentelaStatoCivileModificareType : {
	    	    		componenteModificareType : onlyParentelaESC,
	    	    		idDomanda: $scope.practice.idObj,
		    			idObj: $scope.nucleo.idObj
	    	    	},
	    	    	idDomanda : $scope.practice.idObj,
	    	    	versione: $scope.practice.versione
	    	    },
	    	    idEnte : "24",
	    	    userIdentity : $scope.userCF
	    	};
	    
	    	var value = JSON.stringify(nucleo);
			console.log("Modifica Parentela e SC : " + value);
			
			var method = 'POST';
	    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
	    	
	    	myDataPromise.then(function(result){
	    		if(result.esito == 'OK'){
	    			$dialogs.notify("Successo","Modifica Dati di parentela e stato civile dei Componenti avvenuta con successo.");
	    		} else {
	    			$dialogs.error("Modifica Dati di parentela e stato civile dei Componenti non riuscita.");
	    		}
	    		$scope.setLoadingPSC(false);
	    		
	    	});
    	}
    };
    
    // Method to update the "componenteNucleoFamiliare" data
    $scope.updateComponenteVariazioni = function(componenteVariazioni, disability){
    	
    	// for extra disability: blind and/or mute    	
    	if(disability != null){
	    	if(disability.cieco || disability.sordoMuto){
	    		componenteVariazioni.variazioniComponente.gradoInvalidita = 100;
	    	}
	    	
	    	if(disability.catDis != null){
	    		if(disability.catDis == 1){
	    			componenteVariazioni.variazioniComponente.gradoInvalidita = 0;
	    		} else {
	    			componenteVariazioni.variazioniComponente.gradoInvalidita = 100;
	    		}
	    	} else {
	    		if(!disability.cieco && !disability.sordoMuto){
	    			componenteVariazioni.variazioniComponente.categoriaInvalidita = null;
	    			componenteVariazioni.variazioniComponente.gradoInvalidita = disability.gradoDis;
	    		}
	    	}
    	} else {
    		componenteVariazioni.variazioniComponente.categoriaInvalidita = null;
    		componenteVariazioni.variazioniComponente.gradoInvalidita = null;
    	}
    	
    	// model for "variazioniComponente"
    	var variazioniComponenteCorr = {
    		anniLavoro: componenteVariazioni.variazioniComponente.anniLavoro,
            anniResidenza: componenteVariazioni.variazioniComponente.anniResidenza,
            anniResidenzaComune: componenteVariazioni.variazioniComponente.anniResidenzaComune,
            categoriaInvalidita: componenteVariazioni.variazioniComponente.categoriaInvalidita,
            donnaLavoratrice: componenteVariazioni.variazioniComponente.donnaLavoratrice,
            flagResidenza: componenteVariazioni.variazioniComponente.flagResidenza,
            frazione: componenteVariazioni.variazioniComponente.frazione,
            fuoriAlloggio: componenteVariazioni.variazioniComponente.fuoriAlloggio,
            gradoInvalidita: componenteVariazioni.variazioniComponente.gradoInvalidita,
            idComponente: componenteVariazioni.variazioniComponente.idComponente,
            idComuneResidenza: componenteVariazioni.variazioniComponente.idComuneResidenza,
            idObj: componenteVariazioni.variazioniComponente.idObj, // idObj (variazioniComponente)
            indirizzoResidenza: componenteVariazioni.variazioniComponente.indirizzoResidenza,
            note: componenteVariazioni.variazioniComponente.note,
            numeroCivico: componenteVariazioni.variazioniComponente.numeroCivico,
            ospite: componenteVariazioni.variazioniComponente.ospite,
            pensionato: componenteVariazioni.variazioniComponente.pensionato,
            provinciaResidenza: componenteVariazioni.variazioniComponente.provinciaResidenza,
            telefono: componenteVariazioni.variazioniComponente.telefono
    	};
    	
    	// model for nucleo
		var nucleo = {
	    	domandaType : {
	    		nucleoFamiliareComponentiModificareType : {
	    			componenteModificareType : [{
	    				idNucleoFamiliare: $scope.nucleo.idObj,
	    				idObj: componenteVariazioni.idObj,
	    				variazioniComponenteModificare: variazioniComponenteCorr
	    			}],
	    			idDomanda: $scope.practice.idObj,
	    			idObj: $scope.nucleo.idObj
	    		},
	    		idDomanda : $scope.practice.idObj,
	    		versione: $scope.practice.versione
	    	},
	    	idEnte : "24",
	    	userIdentity : $scope.userCF
	    };
		
		var value = JSON.stringify(nucleo);
		console.log("Nucleo Familiare : " + value);
		
		var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$scope.setLoading(false);
    			$dialogs.notify("Successo","Modifica dati Componente avvenuta con successo.");
    		} else {
    			$scope.setLoading(false);
    			$dialogs.error("Modifica Dati Componente non riuscita.");
    		}
    	});
    };
    
    // Method to update the extra info of "nucleo familiare"
    $scope.updateNFVarie = function(nucleoFam){
    	var nucleoCor = {
    		domandaType : {
    			nucleoFamiliareModificareType : {
	    			alloggioSbarrierato: nucleoFam.alloggioSbarrierato,
	    			componentiExtraIcef: nucleoFam.componentiExtraIcef,
	    			numeroStanze: nucleoFam.numeroStanze,
	    			idDomanda: $scope.practice.idObj,
	    			idObj: $scope.nucleo.idObj
	    		},
	    		idDomanda : $scope.practice.idObj,
	    		versione: $scope.practice.versione
	    	},
	    	idEnte : "24",
	    	userIdentity : $scope.userCF
	    };
    	
    	var value = JSON.stringify(nucleoCor);
    	console.log("Nucleo Extra Info : " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$dialogs.notify("Successo","Modifica Nucleo avvenuta con successo.");
    		} else {
    			$dialogs.error("Modifica Nucleo non riuscita.");
    		}
    		$scope.setLoadingAss(false);
    	});
    	
    };
    
    $scope.setComponenteRichiedente = function(value){
    	$scope.richiedente = value;
    };
    
    // Method to retrieve the practice "richiedente"
    $scope.getComponenteRichiedente = function(){
    	var componentiLength = $scope.componenti.length;
    	var trovato = false;
    	for(var i = 0; i < componentiLength && !trovato; i++){
    		if($scope.componenti[i].richiedente == true){
    			$scope.setComponenteRichiedente($scope.componenti[i]);
    		}
    	}
    };
    
    $scope.edit_parentelaSCiv = false;
    
    $scope.editParentelaSCiv = function(){
    	$scope.edit_parentelaSCiv = true;
    };
    
    $scope.saveParentelaSCiv = function(){
    	$scope.edit_parentelaSCiv = false;
    };
    
    // Method to edit the component variations
    $scope.editComponente = function(componente){
    	$scope.showEditComponents = true;
    	var componentiLength = $scope.componenti.length;
    	var trovato = false;
    	for(var i = 0; i < componentiLength && !trovato; i++){
    		if($scope.componenti[i].idObj == componente.idObj){
    			$scope.componenteTmpEdit = componente; // Load the component
    		}
    	}
    };
    
    // Method to save the component variations
    $scope.salvaComponente = function(componenteVariazioni, disability){
    	$scope.setLoading(true);
    	$scope.showEditComponents = false;
    	// richiamo a modifica nucleo famigliare componenti
    	$scope.updateComponenteVariazioni(componenteVariazioni, disability);
    };
    
    // Method to get the "comune" description by the id
    $scope.getComuneById = function(id, type){
    		if(id != null){
    		var description = "";
    		if($scope.listaComuni != null){
    			var found;
    			if(type == 1){
    				found = $filter('idToMunicipality')($scope.listaComuni, id);
    			} else {
    				found = $filter('idToDescComune')(id, $scope.listaComuni);
    			}
    			if(found != null){
    				description = found.descrizione;
    			}
    		}
    		//$scope.comuneById = description;
    		return description;
    	} else {
    		//$scope.comuneById = "";
    		return "";
    	}
    };
    
    //---------- Cambia Richiedente Section -----------
    $scope.setChangeRichiedente = function(value){
    	 $scope.cambiaRichiedente = value;
    };
    
    $scope.setCFRichiedente = function(value){
    	$scope.checkCFRich = value;
    };
    
    $scope.setLoadingRic = function(value){
    	$scope.isLoadingRic = value;
    };
    
    $scope.confermaRichiedente = function(){
    	// Here i call the service to update the value of "monoGenitore"
    	$scope.setLoadingRic(true);
    	$scope.updateMonoGen();	// We have to wait that InfoTN activate the field update
    	//if($scope.richiedente.persona.codiceFiscale == sharedDataService.getUserIdentity()){
    	//	$scope.setCFRichiedente(true);
    	//} else {
    	//	$scope.setCFRichiedente(false);
    	//}
    	$scope.setCFRichiedente(true);
    };
    
    // Method to update the monoGenitore field of "nucleo familiare"
    $scope.updateMonoGen = function(){
    	var nucleoCor = {
    		domandaType : {
    			nucleoFamiliareModificareType : {
	    			monoGenitore: $scope.nucleo.monoGenitore,
	    			idDomanda: $scope.practice.idObj,
	    			idObj: $scope.nucleo.idObj
	    		},
	    		idDomanda : $scope.practice.idObj,
	    		versione: $scope.practice.versione
	    	},
	    	idEnte : "24",
	    	userIdentity : $scope.userCF
	    };
    	
    	var value = JSON.stringify(nucleoCor);
    	console.log("Nucleo Mono Genitore : " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$dialogs.notify("Successo","Modifica Nucleo avvenuta con successo.");
    		} else {
    			$dialogs.error("Modifica Nucleo non riuscita.");
    		}
    		$scope.setLoadingRic(false);
    	});
    		
    	//$scope.setLoadingRic(false);	
    	
    };
    
    $scope.changeRichiedente = function(){
    	$scope.OldRichiedente = angular.copy($scope.richiedente.idObj);
    	//$scope.IdRichiedente = $scope.richiedente.idObj;
    	$scope.setChangeRichiedente(true);
    };
    
    $scope.hideChangeRichiedente = function(){
    	$scope.setChangeRichiedente(false);
    };
    
    $scope.saveRichiedente = function(){
    	$scope.setLoadingRic(true);
    	$scope.switchRichiedente();
    	$scope.getComponenteRichiedente();
    	$scope.setChangeRichiedente(false);
    };
    
    // Function to swith user "richiedente" between the family members
    $scope.switchRichiedente = function(){
    	
    	var new_richiedente = $scope.richiedente.idObj;
    	
    	var nucleo = {
    	    	domandaType : {
    	    		parentelaStatoCivileModificareType : {
    	    			componenteModificareType : [{
    	    				idNucleoFamiliare: $scope.nucleo.idObj,
    	    				idObj: $scope.OldRichiedente,
    	    				richiedente: false,
    	    				parentela: $scope.affinities[0].value
    	    			},{
    	    				idNucleoFamiliare: $scope.nucleo.idObj,
    	    				idObj: new_richiedente,
    	    				richiedente: true,
    	    				parentela: null
    	    			}],
    	    			idDomanda: $scope.practice.idObj,
    	    			idObj: $scope.nucleo.idObj
    	    		},
    	    		idDomanda : $scope.practice.idObj,
    	    		versione: $scope.practice.versione
    	    	},
    	    	idEnte : "24",
    	    	userIdentity : $scope.userCF
    	    };
    	
    	var value = JSON.stringify(nucleo);
		console.log("Richiedente : " + value);
		
		var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$dialogs.notify("Successo","Cambio richiedente avvenuto con successo.");
    			$scope.setComponenti(result.domanda.nucleo.componente);
    			$scope.getComponenteRichiedente();
    			//$scope.setComponenteRichiedente(result.domanda.nucleo.componente[0]);
    			//console.log("Componente richiedente risposta : " + JSON.stringify(result.domanda.nucleo.componente[0]));
    		} else {
    			$dialogs.error("Cambio richiedente non riuscito.");
    		}
    		$scope.setLoadingRic(false);
    	});
    	
    };
    
    $scope.setCompEdited = function(value){
    	$scope.compEdited = value;
    };
    
    //------------------------------------------------
    
    //---------------Eco_index Section----------------
    $scope.edit_ecoIndex = false;
    $scope.setEcoInfoDetails = function(value){
    	$scope.ecoInfoDetails = value;
    };
    
    $scope.showEcoInfo = function(){
    	$scope.setEcoInfoDetails(true);
    };
    
    $scope.hideEcoInfo = function(){
    	$scope.setEcoInfoDetails(false);
    };
    
    $scope.editEcoIndex = function(){
    	$scope.edit_ecoIndex = true;
    };
    
    $scope.saveEcoIndex = function(data){
    	$scope.edit_ecoIndex = false;
    };    
    //---------------End Eco_index Section------------
    
    //---------------Practice Family Info-------------
    $scope.setEditInfoAss = function(value){
    	$scope.edit_infoAssegnaz = value;
    };
    
    $scope.edit_info = function(){
    	$scope.setEditInfoAss(true);
    };
    
    $scope.close_edit_info = function(){
    	$scope.setEditInfoAss(false);
    };
    
    $scope.save_info = function(nucleo){
    	$scope.setLoadingAss(true);
    	$scope.updateNFVarie(nucleo);
    	$scope.edit_infoAssegnaz = false;
    };
    //------------ End Practice Family Info-------------
    
    $scope.updateProtocolla = function(){
    	$scope.showProtocolla(true);
    };
    
    $scope.showProtocolla = function(value){
    	$scope.isProtocollaShow = value;
    };
    
    
    // ------------------------------------------------------------------------------------------------------------------

    //---------------Sezione Stampa dati Domanda e link PDF e Paga -----------
    $scope.stampaScheda = function(idPratica){
    	$scope.setLoading(true);
    	
    	var stampaScheda = {
        	userIdentity: $scope.userCF,
        	idDomanda: idPratica
        };
    	
    	var value = JSON.stringify(stampaScheda);
    	//console.log("Dati scheda domanda : " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "StampaJSON", null, $scope.authHeaders, value);	

    	myDataPromise.then(function(result){
    		$scope.scheda = result.domanda.assegnazioneAlloggio;
    		$scope.punteggi = result.domanda.dati_punteggi_domanda.punteggi;
    		$scope.punteggiTotali = $scope.cleanTotal(result.domanda.dati_punteggi_domanda.punteggi.punteggio_totale.totale_PUNTEGGIO.dettaglio.calcolo) + ",00"; 
    		//console.log("Punteggi " + JSON.stringify($scope.punteggi));
	    	$scope.setLoading(false);
    	});
    };
    
    $scope.cleanParentela = function(value){
    	if(value == null){
    		return null;
    	}
    	var parentela = value + "";
    	parentela = parentela.replace("&#9;","");
    	return parentela;
    };
    
    $scope.cleanTotal = function(value){
    	//console.log("Value Before Clean : " + value);
    	var str = value;
    	str = str.substring(0,str.length-3); //to remove the ",00"
    	str = str.replace(".", "");
    	var num = Number(str);
    	var correct = Math.ceil(num/100);
    	//console.log("Value After Clean : " + correct);
    	return correct;
    };
    
    // method to obtain the link to the pdf of the practice
    $scope.getSchedaPDF = function(){

    	var periodoRes = [];
    	if($scope.storicoResidenza != null){
//    		var dataNascitaMaxRes = new Date($scope.componenteMaxResidenza_Obj.persona.dataNascita);
//    		var firstDataDa = new Date($scope.storicoResidenza[0].dataDa);
//    		if(dataNascitaMaxRes == firstDataDa){
//    			var firstStorico = {
//    					comune : $scope.getComuneById($scope.storicoResidenza[0].idComuneResidenza,2),
//	    				dal : "",
//	    				al : $scope.storicoResidenza[0].dataA
//    			};
//    			periodoRes.push(firstStorico);
//    			for(var i = 1; i < $scope.storicoResidenza.length; i++){
//		    		var res = {
//		    				comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
//		    				dal : $scope.storicoResidenza[i].dataDa,
//		    				al : $scope.storicoResidenza[i].dataA
//		    		};
//		    		periodoRes.push(res);
//		    	};
//    		} else {
    		periodoRes.push({});	// first empty value for resolve the "dalla nascita" problem
		    	for(var i = 0; i < $scope.storicoResidenza.length; i++){
		    		var res = {
		    				comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
		    				dal : $scope.storicoResidenza[i].dataDa,
		    				al : $scope.storicoResidenza[i].dataA
		    		};
		    		periodoRes.push(res);
		    	};
    		}
    	//}
    	
    	var comuniAIRE = "";
    	if($scope.storicoAire != null){
	    	for(var i = 0; i < $scope.storicoAire.length; i++){
	    		comuniAIRE+=$scope.getComuneById($scope.storicoAire[i].idComuneResidenza,2);
	    		if(i != $scope.storicoAire.length -1){
	    			comuniAIRE+=",";
	    		}
	    	};
    	}
    	
    	var sepCons = {};
    	var sepJui = {};
    	var sepTmp = {};
    	if($scope.sep != null){
    		sepCons = $scope.sep.consensual;
    		sepJui = $scope.sep.judicial;
    		sepTmp = $scope.sep.tmp;
    	}
    	
    	var getPDF = {
    		domandaInfo : {
    			idDomanda: $scope.practice.idObj,	
    	       	userIdentity: $scope.userCF,
    	       	version : $scope.practice.versione
    		},
      		autocertificazione : {
      			periodiResidenza : periodoRes,  			
      			componenteMaggiorResidenza : $scope.componenteMaxResidenza,
      			totaleAnni : $scope.residenzaAnni,
      			//totaleMesi : 2,
      			iscrittoAIRE : $scope.componenteAire,
      			aireanni : $scope.aireAnni,
    		    //airemesi : 4,
    		    airecomuni : comuniAIRE,
    		    dataConsensuale : (sepCons != null) ? sepCons.data : null,
    		    tribunaleConsensuale : (sepCons != null) ? sepCons.trib : null,
    		    dataGiudiziale : (sepJui != null) ? sepJui.data : null,
    		    tribunaleGiudiziale : (sepJui != null) ? sepJui.trib : null,
    		    dataTemporaneo : (sepTmp != null) ? sepTmp.data : null,
    		    tribunaleTemporaneo : (sepTmp != null) ? sepTmp.trib : null
      		}
    	};      	
    	
    	var value = JSON.stringify(getPDF);
    	console.log("Dati richiesta PDF : " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPDF", null, $scope.authHeaders, value);	

    	myDataPromise.then(function(result){
    		if(result.error != null){
    			$dialogs.notify("Attenzione", JSON.stringify(result.error));
    			$scope.setLoading(false);
    		} else {
    				
    			//$scope.pdfResponse = result.result;
    			$scope.linkPdf = 'data:application/pdf;base64,' + encodeURIComponent($base64.encode(result));//result.result.link;
    			//$scope.namePdf = result.result.attachment.name;
    			//console.log("Respons Pdf " + JSON.stringify(result));
    			//console.log("Url Pdf " + JSON.stringify($scope.linkPdf));
	    		$scope.setLoading(false);
    		}
    	});
    };
    
    // Method used to pay
    $scope.pagamento = {};
    $scope.payPratica = function(){
    	var paga = {
    		idDomanda: $scope.practice.idObj,	
    		identificativo: $scope.pagamento.cf,
    		oraEmissione: $scope.pagamento.ora,
    		giornoEmissione: $scope.correctDateIt($scope.pagamento.giorno)
    	};
    	
    	var value = JSON.stringify(paga);
    	console.log("Dati pagamento : " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "Pagamento", null, $scope.authHeaders, value);	

    	myDataPromise.then(function(result){
    		console.log("Respons pagamento " + JSON.stringify(result));
    		$scope.getSchedaPDF();	// I call here the function for PDF becouse I need to wait the response of pay before proceed
	    	//$scope.setLoading(false);
    	});
    };
    
    $scope.protocolla = function(){
    	$scope.setLoading(true);
    	
    	var method = 'GET';
    	var params = {
    		idDomanda:$scope.practice.idObj,
    		idEnte:"24",
    		userIdentity: $scope.userCF
    	};
    	
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetDatiPratica", params, $scope.authHeaders, null);	

    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		$scope.practice = result.domanda;
	    		$scope.accetta(result.domanda);
    		} else {
    			$dialogs.notify("Errore","Errore nella conferma della pratica.");
        	   	$scope.setLoading(false);
    		}
    		
    		
    	});

    };
    
    $scope.accetta = function(value){
    		var domandaData = {
            	idDomanda: value.idObj,	
            	userIdentity: $scope.userCF,
            	version : value.versione
        	};
        	       	
            //var value = JSON.stringify($scope.pdfResponse);
        	var value = JSON.stringify(domandaData);
            console.log("Dati protocollazione : " + value);
            	
            var method = 'POST';
            var myDataPromise = invokeWSServiceProxy.getProxy(method, "Accetta", null, $scope.authHeaders, value);	

            //{"segnalazioni":null,"result":"Rifiutata","exception":null,"error":null}
            
            myDataPromise.then(function(result){
            	if(result == null || (result.result != null && result.result!="Accettata")){
            		console.log("Errore in protocolla " + JSON.stringify(result.exception));
            		$dialogs.notify("Insuccesso","Domanda non confermata: " + JSON.stringify(result.exception));
            	} else {
            		console.log("Respons Protocolla " + JSON.stringify(result));
            		$dialogs.notify("Successo","Domanda creata e confermata dall'utente.");
            	}
        	   	$scope.setLoading(false);
            });
    };
    
    $scope.rifiuta = function(){
    	$scope.setLoading(true);
    	
    	var domandaData = {
            	idDomanda: $scope.practice.idObj,	
                userIdentity: $scope.userCF,
                version : $scope.practice.versione
        };
       	
        //var value = JSON.stringify($scope.pdfResponse);
    	var value = JSON.stringify(domandaData);
        console.log("Dati rifiuta : " + value);
        	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "Rifiuta", null, $scope.authHeaders, value);	

        myDataPromise.then(function(result){
        	console.log("Respons Rifiuta " + JSON.stringify(result));
        	$dialogs.notify("Rifiutata","Domanda rifiutata dall'utente.");
    	   	$scope.setLoading(false);
        });

    };
    
    //------------------------------------------------------------------------
      
    
    // This method will connect to a ws. Actually it work locally
    $scope.getMunicipalityById = function(cod){
    	var found = $filter('getById')($scope.municipalities, cod);
    	console.log(found);
        //$scope.selected = JSON.stringify(found);
        return found.name;
    };
    
//    $scope.update = function(data) {
//    	//console.log("req id " + id + " ,citizenId " + $scope.citizenId );
//    	$scope.initForm = false;
//    	$scope.practice = data;
//    	//$scope.savePractice(data);
//    };
    
    
//    $scope.applicant = {};	// object for applicant
//    $scope.member = {};		// object for menber
//    //$scope.elem_member = {};// element member in list
//    $scope.members = [];	// list for family
//    
//    $scope.insertApplicant = function(data){
//    	$scope.applicant = data;
//    	//$scope.members.push($scope.applicant);
//    	$scope.applicantInserted = true;
//    };
//    
//    $scope.saveApplicant = function(data){
//    	$scope.applicant = data;
//    	$scope.showMembers = true;
//    	$scope.members.push($scope.applicant);
//    };
//    
//    $scope.editApplicant = function(){
//    	$scope.applicantInserted = false;
//    };
//    
//    $scope.addMember = function(){
//    	$scope.newMemberShow = true;
//    };
//    
//    $scope.insertMember = function(data){
//    	$scope.member = data;
//    	//$scope.members.push($scope.member);
//    	$scope.newMemberShow = false;
//    	$scope.newMemberInserted = true;
//    };
//    
//    $scope.saveMember = function(data){
//    	$scope.member = data;
//    	$scope.showMembers = true;
//    	$scope.members.push($scope.member);
//    	$scope.member = {};		// clear the member
//    	$scope.newMemberInserted = false;
//    };
//    
//    $scope.editMember = function(data){
//    	$scope.newMemberInserted = false;
//    };
    
    
    $scope.isPracticeFrameOpened = function(){
    	return sharedDataService.isOpenPracticeFrame();
    };
                  	
    $scope.showPractice = function(){
    	sharedData.setShowHome(true);
    };
    
    // For user shared data
    $scope.getUserName = function(){
  	  return sharedDataService.getName();
    };
    
    $scope.getUserSurname = function(){
  	  return sharedDataService.getSurname();
    };
                  
    // Used for modal dialog
    $scope.modalShown = false;
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
    };
                  	
    // for next and prev in practice list
    $scope.currentPage = 0;
    $scope.numberOfPages = function(type){
    	if(type == 1){
    		if($scope.practicesEdilWS != null){
    			return Math.ceil($scope.practicesEdilWS.length/$scope.maxPractices);
    		} else {
    			return 0;
    		}
    	} else {
    		if($scope.practicesAssWS != null){
    			return Math.ceil($scope.practicesAssWS.length/$scope.maxPractices);
    		} else {
    			return 0;
    		}
    	}
    };
                      
    $scope.practices = [];
    $scope.getPractices = function() {
        $http({
        	method : 'GET',
        	url : 'rest/citizen/' + $scope.citizenId + '/practice/all',
            params : {},
            headers : $scope.authHeaders
        }).success(function(data) {
        	$scope.practices = data;
        }).error(function(data) {
        	// alert("Error");
        });
    };
                  	
//    $scope.getPractice = function(id) {
//    	//console.log("req id " + id + " ,citizenId " + $scope.citizenId );
//    	$http({
//    		method : 'GET',
//    		url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
//    		params : {},
//    		headers : $scope.authHeaders
//    	}).success(function(data) {
//    		$scope.practice = data;
//    	}).error(function(data) {
//    		// alert("Error");
//    	});
//    };
                  	
//    $scope.getPracticesByType = function(type) {
//    	$http({
//    		method : 'GET',
//    		url : 'rest/citizen/' + $scope.citizenId + '/practice/type/' + type,
//    		params : {},
//    		headers : $scope.authHeaders,
//    	}).success(function(data) {
//    		$scope.practices = data;
//    	}).error(function(data) {
//    		// alert("Error");
//    	});
//    };
    
    $scope.getPracticesByTypeWS = function(type) {
    	$scope.setLoadingPractice(true);
    	var method = 'GET';
    	var params = {
			idEnte:"24",
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "RicercaPratiche", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesWS = result.domanda;
    		$scope.getPracticesMyWebByType(type);
    	});
    };
    
 // Method that read the list of the practices from the local mongo DB
    $scope.getPracticesMyWebByType = function(type) {
    	$scope.setLoadingPractice(true);
    	var method = 'GET';
    	var params = {
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticheMyWeb", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesMy = result;
    		//console.log("Pratiche recuperate da myweb: " + $scope.practicesMy);
    		$scope.mergePracticesData($scope.practicesWS, $scope.practicesMy, type);
    		$scope.setLoadingPractice(false);
    	});
    };
    
    // Method that add the correct status value to every practice in list
    // It merge the value from two lists: practices from ws and practices from local mongo
    $scope.mergePracticesData = function(practiceListWs, practiceListMy, type){
    	var practicesWSM = [];
    	for(var i = 0; i < practiceListWs.length; i++){
    		for(var j = 0; j < practiceListMy.length; j++){
    			if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
    				practiceListWs[i].myStatus = practiceListMy[j].status;
    				if((practiceListMy[j].status == 'EDITABILE') || (practiceListMy[j].status == 'PAGATA') ||  (practiceListMy[j].status == 'ACCETTATA')  ||  (practiceListMy[j].status == 'RIFIUTATA')){
    					practicesWSM.push(practiceListWs[i]);
    				}
    				break;
    			}
    		}
    	}
    	
    	if(type == 1){
			$scope.practicesEdilWS = $scope.getPracticeEdil(practicesWSM, sharedDataService.getUeCitizen());
		} else {
			$scope.practicesAssWS = $scope.getPracticeAss(practicesWSM, sharedDataService.getUeCitizen());
		}
		$scope.setLoadingPractice(false);
    	// I consider only the practices that has been accepted
    	//$scope.practicesWSM = practiceListWs;
    };
    
    $scope.getPracticeAss = function(lista, ue){
    	var pAss = [];
    	for(var i = 0; i < lista.length; i++){
    		if(ue){
    			if((lista[i].edizioneFinanziata.edizione.strumento.tipoStrumento == 'CONTRIBUTO_ALL_PRIVATO') && (lista[i].edizioneFinanziata.categoria == 'COMUNITARI')){
    				pAss.push(lista[i]);
    			}
    		} else {
    			if((lista[i].edizioneFinanziata.edizione.strumento.tipoStrumento == 'CONTRIBUTO_ALL_PRIVATO') && (lista[i].edizioneFinanziata.categoria == 'EXTRACOMUNITARI')){
    				pAss.push(lista[i]);
    			}
    		}
    	}
    	return pAss;
    };
    
    $scope.getPracticeEdil = function(lista, ue){
    	var pEdil = [];
    	for(var i = 0; i < lista.length; i++){
    		if(ue){
    			if((lista[i].edizioneFinanziata.edizione.strumento.tipoStrumento == 'LOCAZIONE_ALL_PUBBLICO') && (lista[i].edizioneFinanziata.categoria == 'COMUNITARI')){
    				pEdil.push(lista[i]);
    			}
    		} else {
    			if((lista[i].edizioneFinanziata.edizione.strumento.tipoStrumento == 'LOCAZIONE_ALL_PUBBLICO') && (lista[i].edizioneFinanziata.categoria == 'EXTRACOMUNITARI')){
    				pEdil.push(lista[i]);
    			}
    		}
    	}
    	return pEdil;
    };
                  	
    // adding practices functions
    $scope.checkId = function(id){
    	if(id < 5){
    		return "Id already exists";
    	}
    };
                  	
    $scope.showStates = function(practice){
    	var selected = [];
    	if(practice){
        	selected = $filter('filter')($scope.states, {value: practice.state});
        }
        return selected.length ? selected[0].text : 'Not set';
    };

                  	
    $scope.editPractice = function(id, code, name, type, openingdate, state){
        //console.log("I am in editPractice: id = " + id + ", code = "  + code + ", name = "  + name + ", openingdate = "  + openingdate + ", state = " + state);
        $http({
            method : 'PUT',
            url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
            params : {
            	"code" : code,
            	"name" : name,
            	"type" : type,
                "openingdate" : openingdate,
                "state" : state
            },
            headers : $scope.authHeaders
        }).success(function(data) {
        }).error(function(data) {
        });
    };
                  	
    $scope.deletePractice = function(id, language){
    	var dlg = null;
    	console.log("I am in deletePractice: id = " + id);
    	if(sharedDataService.getUsedLanguage() == 'ita'){	
    		dlg = $dialogs.confirm("Conferma cancellazione","Vuoi cancellare la pratica selezionata?", "Si", "No");
    	} else {
    		dlg = $dialogs.confirm("Please Confirm","Do you confirm the practice deleting?", "Yes", "No");
    	}
    	dlg.result.then(function(btn){
        	$http({
            	method : 'DELETE',
            	url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
            	params : {
            	},
            	headers : $scope.authHeaders
        	}).success(function(data) {
            	$route.reload();
            	console.log("Practice id : " + id + " deleted");
            	//if(language == 'active'){
            	if(sharedDataService.getUsedLanguage() == 'ita'){
            		$dialogs.notify("Rimossa","Cancellazione pratica avvenuta con successo.");
            	} else {
            		$dialogs.notify("Removed","Practice deletion occured.");
            	}
            	//alert("Pratica Id:" + id + " cancellata.");
        	}).error(function(data) {
        		//alert("Errore nella rimozione della pratica Id:" + id);
        		console.log("Error in Practice id : " + id + " deleting");
        		//if(language == 'active'){
        		if(sharedDataService.getUsedLanguage() == 'ita'){
        			$dialogs.error("Errore nella rimozione della pratica.");
            	} else {
            		$dialogs.error("Error in practice deletion.");
            	}
            });
        },function(btn){
      	  // no case
        });
    };
    
    //---------------Practice State Section----------------
    $scope.practiceState_editMode = false;
    $scope.insertedEcoIndex = false;
    
    $scope.editPracticeState = function(){
    	$scope.practiceState_editMode = true;
    };
    //---------------EndPractice Section------------
    
    //-------------- Part for dialogs ----------------
    
    $scope.launchDialog = function(which, id, language){
      var dlg = null;
      switch(which){
          
        // Error Dialog
        case 'error':
          dlg = $dialogs.error('This is my error message');
          break;
          
        // Wait / Progress Dialog
        case 'wait':
          dlg = $dialogs.wait(msgs[i++],progress);
          fakeProgress();
          break;
          
        // Notify Dialog
        case 'notify':
          dlg = $dialogs.notify('Something Happened!','Something happened that I need to tell you.');
          break;
          
        // Confirm Dialog
        case 'confirm':
        	if(language == 'active'){
        		dlg = $dialogs.confirm("Conferma cancellazione","Vuoi cancellare la pratica selezionata?");
        	} else {
        		dlg = $dialogs.confirm("Please Confirm","Do you confirm the practice deleting?");
        	}
          dlg.result.then(function(btn){
        	  // yes case
            $scope.deletePractice(id);
          },function(btn){
        	  // no case
          });
          break;
         
        // Create Your Own Dialog
        case 'create':
          dlg = $dialogs.create('/dialogs/whatsyourname.html','whatsYourNameCtrl',{},{key: false,back: 'static'});
          dlg.result.then(function(name){
          },function(){
          });
          
          break;
      }; // end switch
    }; // end launch
    
    // for faking the progress bar in the wait dialog
    var progress = 25;
    var msgs = [
      'Hey! I\'m waiting here...',
      'About half way done...',
      'Almost there?',
      'Woo Hoo! I made it!'
    ];
    var i = 0;
    
    var fakeProgress = function(){
      $timeout(function(){
        if(progress < 100){
          progress += 25;
          $rootScope.$broadcast('dialogs.wait.progress',{msg: msgs[i++],'progress': progress});
          fakeProgress();
        }else{
          $rootScope.$broadcast('dialogs.wait.complete');
        }
      },1000);
    }; // end fakeProgress 
    
    
}]);