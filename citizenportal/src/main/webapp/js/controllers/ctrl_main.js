'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers');

cp.controller('MainCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService','invokeWSService','invokeWSServiceProxy','invokePdfServiceProxy','getMyMessages',
    function($scope, $http, $route, $routeParams, $rootScope, localize, sharedDataService, invokeWSService, invokeWSServiceProxy, invokePdfServiceProxy, getMyMessages, $filter) { // , $location 

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

    $scope.$route = $route;
    //$scope.$location = $location;
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
    var itaLanguage = "active";
    var engLanguage = "";
    
	// for localization
    $scope.setEnglishLanguage = function(){
    	itaLanguage = "";
    	engLanguage = "active";
    	localize.setLanguage('en-US');
    	sharedDataService.setUsedLanguage('eng');
    	var myDataMsg = getMyMessages.promiseToHaveData('eng');
    	myDataMsg.then(function(result){
    		sharedDataService.inithializeAllMessages(result);
    	});
    };
    
    $scope.setItalianLanguage = function(){
    	itaLanguage = "active";
    	engLanguage = "";
    	localize.setLanguage('it-IT');
    	sharedDataService.setUsedLanguage('ita');
    	var myDataMsg = getMyMessages.promiseToHaveData('ita');
    	myDataMsg.then(function(result){
    	    sharedDataService.inithializeAllMessages(result);
    	});
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
    	// Clear some session variables
    	sharedDataService.setName(null);
        sharedDataService.setSurname(null);
        sharedDataService.setBase64(null);
        $scope.user_token = null;
        token = null;
        userId = null;
        user_name = null;
        user_surname = null;
        
    	window.location.href = "myweb/logout";
    };
                  		    
    $scope.home = function() {
    	$scope.setFrameOpened(false);
    	// I refresh all the actived Link
    	activeLinkEdil="";
    	activeLinkAss="";
		activeLinkEdilExtra = "";
		activeLinkAssExtra="";
        //window.document.location = "./";
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
    //$scope.retrieveUserData = function() {
    	//$scope.getUser();				// retrieve user data
    	//$scope.getUserUeNationality();	// retrieve the user ue/extraue Nationality
    //};
    
//    $scope.user;
//    $scope.getUser = function() {
//    	console.log("user id " + $scope.citizenId );
//    	$http({
//        	method : 'GET',
//        	url : 'rest/citizen/user/' + $scope.citizenId,
//        	params : {},
//            headers : $scope.authHeaders
//        }).success(function(data) {
//        	$scope.user = data;
//        }).error(function(data) {
//        });
//    };
    
    // For user shared data
    sharedDataService.setName(user_name);
    sharedDataService.setSurname(user_surname);
    sharedDataService.setBase64(base64);
    //sharedDataService.setBase64('MIIE6TCCA9GgAwIBAgIDBzMlMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJJVDEYMBYGA1UECgwPUG9zdGVjb20gUy5wLkEuMSIwIAYDVQQLDBlTZXJ2aXppIGRpIENlcnRpZmljYXppb25lMTQwMgYDVQQDDCtQcm92aW5jaWEgQXV0b25vbWEgZGkgVHJlbnRvIC0gQ0EgQ2l0dGFkaW5pMB4XDTExMTEyMzAwMjQ0MloXDTE3MTEyMjAwNTk1OVowgY4xCzAJBgNVBAYTAklUMQ8wDQYDVQQKDAZUUy1DTlMxJTAjBgNVBAsMHFByb3ZpbmNpYSBBdXRvbm9tYSBkaSBUcmVudG8xRzBFBgNVBAMMPkJSVE1UVDg1TDAxTDM3OFMvNjA0MjExMDE5NzU3MTAwNy53aTRldjVNeCtFeWJtWnJkTllhMVA3ZUtkY1U9MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsF81BDJjAQat9Lfo/1weA0eePTsEbwTe/0QqlArfOTG3hfLEiSd+mDNsBUJo+cRXZMp677y9a1kYlB+IDY3LGH36Bs1QxM14KA6WB67KX4ZaXENew6Qm7NnkMRboKQiIOUmw1l4OiTETfqKWyFqfAtnyLHd8ZZ6qfjgSsJoSHoQIDAQABo4IB3TCCAdkwge0GA1UdIASB5TCB4jCBrAYFK0wQAgEwgaIwgZ8GCCsGAQUFBwICMIGSDIGPSWRlbnRpZmllcyBYLjUwOSBhdXRoZW50aWNhdGlvbiBjZXJ0aWZpY2F0ZXMgaXNzdWVkIGZvciB0aGUgaXRhbGlhbiBOYXRpb25hbCBTZXJ2aWNlIENhcmQgKENOUykgcHJvamVjdCBpbiBhY2NvcmRpbmcgdG8gdGhlIGl0YWxpYW4gcmVndWxhdGlvbiAwMQYGK0wLAQMBMCcwJQYIKwYBBQUHAgEWGWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQwOgYIKwYBBQUHAQEELjAsMCoGCCsGAQUFBzABhh5odHRwOi8vcG9zdGVjZXJ0LnBvc3RlLml0L29jc3AwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFO5h8R6jQnz/4EeFe3FeW6ksaogHMEYGA1UdHwQ/MD0wO6A5oDeGNWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvY25zL3Byb3ZpbmNpYXRyZW50by9jcmwuY3JsMB0GA1UdDgQWBBRF3Z13QZAmn85HIYPyIg3QE8WM2DANBgkqhkiG9w0BAQUFAAOCAQEAErn/asyA6AhJAwOBmxu90umMNF9ti9SX5X+3+pcqLbvKOgCNfjhGJZ02ruuTMO9uIi0DIDvR/9z8Usyf1aDktYvyrMeDZER+TyjviA3ntYpFWWIh1DiRnAxuGYf6Pt6HNehodf1lhR7TP+iejH24kS2LkqUyiP4J/45sTK6JNMXPVT3dk/BAGE1cFCO9FI3QyckstPp64SEba2+LTunEEA4CKPbTQe7iG4FKpuU6rqxLQlSXiPVWZkFK57bAUpVL/CLc7unlFzIccjG/MMvjWcym9L3LaU//46AV2hR8pUfZevh440wAP/WYtomffkITrMNYuD1nWxL7rUTUMkvykw==');
    //sharedDataService.setMail(user_mail);
    sharedDataService.setUtente(nome, cognome, sesso, dataNascita, provinciaNascita, luogoNascita, codiceFiscale, cellulare, email, indirizzoRes, capRes, cittaRes, provinciaRes );
    
    $scope.getUserName = function(){
  	  return sharedDataService.getName();
    };
    
    $scope.getUserSurname = function(){
  	  return sharedDataService.getSurname();
    };
    
    $scope.getMail = function(){
      return sharedDataService.getMail();
    };
    
    $scope.setMail = function(value){
    	sharedDataService.setMail(value);
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
    	//window.location.reload(true);	// To force the page refresh - this goes in a loop
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
    	$scope.practicesOldEF = [];
    	var now = new Date();
    	var nowMillis = now.getTime();
    	if(practiceListWs != null){
	    	for(var i = 0; i < practiceListWs.length; i++){
	    		var millisCloseDate = practiceListWs[i].edizioneFinanziata.edizione.dataChiusura;
	    		millisCloseDate = Number(millisCloseDate);
       			if(millisCloseDate > nowMillis){
		    		for(var j = 0; j < practiceListMy.length; j++){
		    			if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
		    				practiceListWs[i].myStatus = practiceListMy[j].status;
		    				if(practiceListMy[j].status == 'ACCETTATA'){
		    					$scope.practicesWSM.push(practiceListWs[i]);
		    				}
		    				break;
		    			}
		    		}
       			} else {
       				// Here I save the data in the list for old financial edition
       				$scope.practicesOldEF.push(practiceListWs[i]);
       			}
	    	}
    	}
    	// I consider only the practices that has been accepted
    	//$scope.practicesWSM = practiceListWs;
    };
    
    // ------------------------- Block that manage the tab switching (in practice home list) ---------------------------
    $scope.setNextButtonHListLabel = function(value){
      	$rootScope.buttonNextHListLabel = value;
    };

    $scope.setHListTabs = function(){
        $scope.setHListIndex(0);
        $scope.setNextButtonHListLabel(sharedDataService.getTextBtnClose());
        //$scope.setFrameOpened(true);
    };
            
    $scope.hListTabs = [ 
        { title:'Pratiche Recenti', index: 1, content:"partials/list/recent.html" },
        { title:'Scorse Edizioni', index: 2, content:"partials/list/old_ef.html" },
        { title:'', index: 3, content:"partials/list/practice_state.html", disabled:true}
    ];
            
    // Method nextTab to switch the input forms to the next tab and to call the correct functions
    $scope.nextHListTab = function(value, type, param1, param2, param3, param4){
      	fInit = false;
       	if(!value){		// check form invalid
       		switch(type){
       			case 1: $scope.setFrameOpened(false);
       				$scope.fromHList = 2;
       				break;
       			case 2: $scope.setFrameOpened(false);
       				$scope.stampaScheda(value, 0);
       				$scope.fromHList = 2;
   					break;	
       			default:
       				break;
          		}
          		// After the end of all operations the tab is swithced
           		$scope.hListTabs[$scope.tabHListIndex].active = false;	// deactive actual tab
            	$scope.tabHListIndex = 3;								// increment tab index
            	$scope.hListTabs[$scope.tabHListIndex].active = true;	// active new tab
            	$scope.hListTabs[$scope.tabHListIndex].disabled = false;
            fInit = true;
        }
    };
            
    $scope.prevHListTab = function(type){
    	$scope.hListTabs[$scope.tabHListIndex].active = false;	// deactive actual tab
    	$scope.hListTabs[$scope.tabHListIndex].disabled = true;
    	$scope.tabHListIndex = 1;
    	$scope.hListTabs[$scope.tabHListIndex].active = true;	// active new tab
    };
            
    $scope.setHListIndex = function($index){
       	$scope.tabHListIndex = $index;
    };
    
    // ----------------------- End of Block that manage the tab switching (in practice home list) ----------------------
    
                  			
    // for next and prev in practice list
    $scope.currentPage = 0;
    $scope.currentPageOldEF = 0;
	
	$scope.numberOfPages = function(){
		if($scope.practicesWS == null){
			return 0;
		}
		return Math.ceil($scope.practicesWSM.length/$scope.maxPractices);
	};
	
	$scope.numberOfPagesOld = function(){
		if($scope.practicesOldEF == null){
			return 0;
		}
		return Math.ceil($scope.practicesOldEF.length/$scope.maxPractices);
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
      
    $scope.utenteCS = sharedDataService.getUtente();
                  			
}]);