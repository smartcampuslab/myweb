'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers', ['googlechart']);

cp.controller('ConsoleCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', '$dialogs', 'sharedDataService', '$filter', 'invokeWSService','invokeWSServiceProxy', 'invokePdfServiceProxy', '$timeout', 
    function($scope, $http, $route, $routeParams, $rootScope, localize, $dialogs, sharedDataService, $filter, invokeWSService, invokeWSServiceProxy, invokePdfServiceProxy, $timeout, $location) { // , $location 

	var cod_ente = "24";
	$scope.params = $routeParams;
	//Used for tests
	$scope.userCF="CLSBNR75L03L378N"; //"HMTRND69R11Z100M"
	
	// for language icons
    var itaLanguage = "active";
    var engLanguage = "";
    
    // for services selection
    var homeShowed = true;
    var activeLinkSearch = "";
    var activeLinkReport = "";
    
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
    	$scope.userChartType = "user";
    	$scope.practiceChartType = "all";
    	$scope.utilizationChartType = "all";
//    	if($scope.searchTabs.length == 0){
//    		angular.copy($scope.searchTabs1, $scope.searchTabs);
//    	}
    };
    
    $scope.showHome = function(){
    	homeShowed = true;
    };
    
    $scope.hideHome = function(){
    	homeShowed = false;
    };
    
    $scope.logout = function() {
        window.location.href = "myweb/logout";
    };
    
    $scope.goBack = function()  {
        window.history.back();
    };
    
    $scope.isActiveLinkSearch = function(){
    	return activeLinkSearch;
    };
    
    $scope.isActiveLinkReport = function(){
    	return activeLinkReport;
    };
    
    $scope.getOperatorName = function(){
    	return user_name + ' ' + user_surname;
    };
    
    $scope.setSearchIndex = function($index){
    	$scope.isInit = true;
       	$scope.tabIndex = $index;
       	// Here I call the 'clearSearch' to clean the search fields when I swith tab
       	$scope.clerSearch();
       	$scope.getPracticesWS(null);
    	searchMade = true;
    };
    
    //No more used
    $scope.setIndexMan = function(val){
    	$scope.tabIndex = val;
//    	if(val == 1){
//    		angular.copy($scope.searchTabs1, $scope.searchTabs);
//    	}
//    	if(val == 2){
//    		angular.copy($scope.searchTabs2, $scope.searchTabs);
//    	}
//    	if(val == 3){
//    		angular.copy($scope.searchTabs3, $scope.searchTabs);
//    	}
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
    	$scope.searchState = 'ACCETTATA';
    	searchMade = false;
    	$scope.practicesFind = [];
    	$scope.practicesWSM = [];
    };
    
    $scope.practiceStates = [{desc: 'Tutti', value:''},
                             {desc: 'Accettata', value:'ACCETTATA'},
                             {desc: 'Editabile', value:'EDITABILE'},
                             {desc: 'Pagata', value:'PAGATA'},
                             {desc: 'Consolidata', value:'CONSOLIDATA'},
                             {desc: 'Rifiutata', value:'RIFIUTATA'}];
    
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
	    	if(value == 'ric_2'){
	    		//search practice by ric code
	    		$scope.searchForRic($scope.search.riccode);
	    	}
//	    	if(value == 'comp_1'){
//	    		//search practice by comp
//	    		$scope.searchForComp($scope.search.compname);
//	    	}
//	    	if(value == 'comp_2'){
//	    		//search practice by comp
//	    		$scope.searchForComp($scope.search.compcode);
//	    	}
	    	// for test
	    	else {
	    	$scope.getPracticesWS(null);
	    	// end test
	    	}
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
    	$scope.getPracticesWS(code);
//    	var method = 'GET';
//    	var params = {
//    		cfRichiedente:code,
//    		idEnte:cod_ente
//    	};
//    	var practice = {};
//    	
//    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticaByRichiedente", params, $scope.authHeaders, null);	
//    	myDataPromise.then(function(result){
//    		if(result.esito == 'OK'){
//	    		practice = result.domanda;
//	    	} else {
//    			//$scope.setLoading(false);
//    		}
//    	});
//    	$scope.practicesFind = practice;
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
    $scope.getPracticesWS = function(ric_cf) {
    	$scope.setLoadingSearch(true);
    	var method = 'GET';
    	var params = {
			idEnte:cod_ente,
			userIdentity: (ric_cf == null)?$scope.userCF:ric_cf
		};
    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "RicercaPratiche", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.practicesWS = result.domanda;
    		//console.log("Pratiche recuperate da ws: " + $scope.practicesWS);
    		$scope.getPracticesMyWeb(ric_cf);
    		$scope.setLoadingSearch(false);
    	});
    };
    
    // Method that read the list of the practices from the local mongo DB
    $scope.getPracticesMyWeb = function(ric_cf) {
    	$scope.setLoadingSearch(true);
    	var method = 'GET';
    	var params = {
			userIdentity: (ric_cf == null)?$scope.userCF:ric_cf
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
    	$scope.practicesWSM = [];	// Clear the list before fill it
    	if(practiceListWs != null){
	    	for(var i = 0; i < practiceListWs.length; i++){
	    		for(var j = 0; j < practiceListMy.length; j++){
	    			if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
	    				practiceListWs[i].myStatus = practiceListMy[j].status;
	    				practiceListWs[i].userIdentity = practiceListMy[j].userIdentity;
	    				practiceListWs[i].showPdf = (practiceListMy[j].autocertificazione != null && practiceListMy[j].autocertificazione != "" && (practiceListMy[j].status != 'EDITABILE')) ? true : false;
	    				//if(practiceListMy[j].status != 'RIFIUTATA'){
	    					$scope.practicesWSM.push(practiceListWs[i]);
	    				//}
	    				break;
	    			}
	    		}
	    	}
    	}
    	$scope.practicesFind = [];	// Clear the list before fill it
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
    
    //No more used
//    $scope.restoreSearch = function(){
//    	$scope.setIndexMan(sharedDataService.getSearchTab());
//    	$scope.searchType = sharedDataService.getSearchOpt();
//    	$scope.setSearchValue(sharedDataService.getSearchTab(), sharedDataService.getSearchVal());
//    	angular.copy(sharedDataService.getSearchList(), $scope.practicesFind);
//    };
    
    //No more used
//    $scope.saveSearchData = function(tab, opt, value, list){
//    	sharedDataService.setSearchTab(tab);
//    	sharedDataService.setSearchOpt(opt);
//    	sharedDataService.setSearchVal(value);
//    	sharedDataService.setSearchList(list);
//    };
    
    //No more used
//    $scope.setSearchValue = function(type, value){
//    	if(type == 1){
//    		$scope.search = {
//    			code: value	
//    		};
//    	} else {
//    		$scope.search = {
//    			ricname: value,
//    			riccode: value
//    		};
//    	}
//    };
    
    $scope.findPractice = function(idPratica, userId, type){
    	$scope.continueNextTab();
    	$scope.stampaScheda(idPratica, userId, type);
    };
    
//    $scope.stampaScheda = function(idPratica){
//      	$scope.setLoading(true);
//            	
//       	var stampaScheda = {
//           	userIdentity: $scope.userCF,
//           	idDomanda: idPratica
//        };
//            	
//      	var value = JSON.stringify(stampaScheda);
//        	if($scope.showLog) console.log("Dati scheda domanda : " + value);
//            	
//           	var method = 'POST';
//           	var myDataPromise = invokeWSServiceProxy.getProxy(method, "StampaJSON", null, $scope.authHeaders, value);	
//
//           	myDataPromise.then(function(result){
//       		$scope.scheda = result.domanda.assegnazioneAlloggio;
//       		$scope.punteggi = result.domanda.dati_punteggi_domanda.punteggi;
//       		$scope.punteggiTotali = $scope.cleanTotal(result.domanda.dati_punteggi_domanda.punteggi.punteggio_totale.totale_PUNTEGGIO.dettaglio.calcolo); //$scope.cleanTotal() + ",00"
//        	$scope.setLoading(false);
//       	});
//    };
    
    $scope.resultTabs = [
         { title:'Risultato Ricerca', index: 1, content:"partials/console/search/result_tab.html" },
         { title:'Dettagli Domanda', index: 2, content:"partials/console/view.html", disabled:true },
         { title:'Dati Autocertificazione', index: 3, content:"partials/console/autocert.html", disabled:true }
    ];
    
    $scope.continueNextTab = function(){
   	 	// After the end of all operations the tab is swithced
       	$scope.resultTabs[$scope.tabResultIndex].active = false;	// deactive actual tab
       	$scope.tabResultIndex++;								// increment tab index
       	$scope.resultTabs[$scope.tabResultIndex].active = true;		// active new tab
       	$scope.resultTabs[$scope.tabResultIndex].disabled = false;
       	$scope.resultTabs[2].disabled = false;						// reactivate last tab (other data)
    };
           
    $scope.prevTab = function(){
    	$scope.resultTabs[$scope.tabResultIndex].active = false;	// deactive actual tab
      	$scope.tabResultIndex--;									// decrement tab index
      	$scope.resultTabs[$scope.tabResultIndex].active = true;		// active new tab	
    };

    $scope.firstTab = function(){
    	$scope.resultTabs[$scope.tabResultIndex].active = false;	// deactive actual tab
      	$scope.tabResultIndex = 0;									// set tab index to 1
      	$scope.resultTabs[$scope.tabResultIndex].active = true;		// active new tab	
    };

    
    $scope.setResultIndex = function($index){
    	$scope.tabResultIndex = $index;
    };
    
    // -----------------------------------------------------------------------------------------------
    
    // ------------------------------------ Practice Functions section -------------------------------
    
    $scope.progress = 0;
    var msgs = [
       	'Ricerca dati pratica...',
       	'Caricamento dati pratica...',
       	'Creazione file pdf...',
       	'Stampa file'
    ];
    var i_m = 0;
    
    $scope.stampaPDF = function(idPratica, userId){
    	i_m = 0;
    	$scope.progress = 25;
    	$dialogs.wait(msgs[i_m++],$scope.progress);
    	$scope.getElenchi(idPratica, userId, 1);
    	//$scope.openDoc("pdf/scheda_2991127119775409315.pdf");
    };
    
    // Used to set the componenti object value
    $scope.setComponenti = function(value){
       	$scope.componenti = value;
    };
    
    $scope.sep = {};
    $scope.strutturaRec = {};
    $scope.strutturaRec2 = {};
    $scope.struttureRec = [];
    $scope.storicoResidenza = [];
    $scope.componenteMaxResidenza = "";
    $scope.componenteMaxResidenza_Obj = {};
    $scope.componenteAIRE = "";
    $scope.residenzaAnni = 0;
    $scope.aireAnni = 0;
    $scope.compRecStructTot1 = 0;
    $scope.compRecStructTot2 = 0;
    $scope.textColorTotRes = "";
    
    $scope.setStrutturaRec = function(value){
       	$scope.strutturaRec = value;	// c'era un errore! Era -> $scope.setStrutturaRec = value;
    };
    
    // Method used to print the practice data on a json object
    $scope.stampaScheda = function(idPratica, userId, type){
      	$scope.setLoadingSearch(true);
            	
       	var stampaScheda = {
           	userIdentity: userId,
           	idDomanda: idPratica
        };
            	
      	var value = JSON.stringify(stampaScheda);
        	if($scope.showLog) console.log("Dati scheda domanda : " + value);
            	
           	var method = 'POST';
           	var myDataPromise = invokeWSServiceProxy.getProxy(method, "StampaJSON", null, $scope.authHeaders, value);	

           	myDataPromise.then(function(result){
           	if(result != null && result != ""){	// I have to check if it is correct
	       		$scope.scheda = result.domanda.assegnazioneAlloggio;
	       		$scope.punteggi = result.domanda.dati_punteggi_domanda.punteggi;
	       		$scope.punteggiTotali = $scope.cleanTotal(result.domanda.dati_punteggi_domanda.punteggi.punteggio_totale.totale_PUNTEGGIO.dettaglio.calcolo); //$scope.cleanTotal() + ",00"
	       		$scope.getElenchi(idPratica, userId, type);
	       		//$scope.setLoadingSearch(false);
        	} else {
        		$scope.setLoadingSearch(false);
        		$dialogs.error(sharedDataService.getMsgErrPracticeViewJson());
        	}
       	});
    };
    
    // Method to obtain the Practice data by the id of the request
    // Params: idDomanda -> object id of the practice; type -> call mode of the function (1 standard, 2 edit mode, 3 view mode, 4 cons mode)
    $scope.getPracticeData = function(idDomanda, userId, type) {
          
       	var method = 'GET';
       	var params = {
       		idDomanda:idDomanda,
       		idEnte:cod_ente,
       		userIdentity: userId
       	};
          	
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetDatiPratica", params, $scope.authHeaders, null);	
       	myDataPromise.then(function(result){
            if(result.esito == 'OK'){
        	    $scope.practice = result.domanda;
        	    		
        	    // split practice data into differents objects
        	    $scope.extracomunitariType = $scope.practice.extracomunitariType;
        	    $scope.residenzaType = $scope.practice.residenzaType;    
        	    $scope.nucleo = $scope.practice.nucleo;
        	    $scope.setComponenti($scope.nucleo.componente);
           		// View mode
        	    if(type == 1){
        	    	$scope.progress += 25;
        	    	$rootScope.$broadcast('dialogs.wait.progress',{msg: msgs[i_m++],'progress': $scope.progress});
        	    }
        	    $scope.getAutocertificationData(idDomanda, userId, type);
        	    $scope.indicatoreEco = $scope.nucleo.indicatoreEconomico;
        	} else {
            	$scope.setLoading(false);
            	$dialogs.error(result.error);
            }
        });        	
    };
    
    // Method used to load the autocertification data from the myweb local db
    // Params: idDomanda -> practice object id; type -> call mode of the function. If 0 only init the autocert params (edit mode), if 1 the method call the payPratica method, if 2 the method init the autocert params (view mode)
    $scope.getAutocertificationData = function(idDomanda, userId, type){
    	
    	$scope.storicoResidenza = [];
    	$scope.sep = {};
    	$scope.separationType = "";
    	$scope.struttureRec = [];
    	
    	var autocert_ok = {
    		history_struts : false,
    		history_res : false,
    		trib : false
    	};
    	
    	var method = 'GET';
       	var params = {
       		idDomanda:idDomanda,
       		userIdentity: userId
       	};
          	
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticaMyWeb", params, $scope.authHeaders, null);	
       	myDataPromise.then(function(result){
            if((result != null) && (result.autocertificazione != null)){
            	if(type == 0){
	        	    // Here i read and save the autocertification data and inithialize this three objects
	        	    // ---------------------- Rec struct section -------------------
	        	    var structs = result.autocertificazione.componenti;
	        	    if(structs.length > 0){
	        	    	autocert_ok.history_struts = true;
	        	    }
	        	    var struct = {};
	        	    var index = 0;
	        	    for(var i = 0; i < structs.length; i++){
	        	    	var tot = 0;
	        	    	for(var j = 0; j < structs[i].strutture.length; j++){
	        	    		var from = structs[i].strutture[j].dal;
	        	    		var to = structs[i].strutture[j].al;
	        	    		var nameStruct = structs[i].strutture[j].nome;
	        	    		var nameAndPlace = nameStruct.split(" (");
	        	    		var distance = $scope.getDifferenceBetweenDates(from, to);
		        	    	struct = {
		        	    		id : index,
		        	    		structName : nameAndPlace[0],
		        	    		structPlace : nameAndPlace[1].replace(")",""),
		        	    		dataDa : from,
		        	    		dataA: to,
		        	    		distance: distance,
		        	    		componenteName: structs[i].nominativo
		        	    	};
		        	    	tot += distance;
		        	    	$scope.struttureRec.push(struct);
		        	    	index++;
	        	    	}
	        	    	if(i == 0){
	        	    		$scope.setResInStructComp1(tot);
	        	    		$scope.strutturaRec.componenteName = structs[i].nominativo;
	        	    	} else {
	        	    		$scope.setResInStructComp2(tot);
	        	    		$scope.strutturaRec2.componenteName = structs[i].nominativo;
	        	    	}
	        	    }
	            	// -------------------------------------------------------------
	            	
	            	// ---------------------- Res years section --------------------
	            	$scope.componenteMaxResidenza = result.autocertificazione.componenteMaggiorResidenza;
	    			var componentData = $scope.getComponentsDataByName($scope.componenteMaxResidenza);
	    			if(componentData != null && componentData != {}){
	    				$scope.componenteMaxResidenza_Obj = angular.copy(componentData);
	    			}
	    			
	            	var periods = result.autocertificazione.periodiResidenza;
	            	if(periods.length > 0){
	        	    	autocert_ok.history_res = true;
	        	    }
	            	var period = {};
	            	for(var i = 0; i < periods.length; i++){
	            		if(periods[i].comune != null && periods[i].al != null){
	            			var da = "";
	            			var a = "";
	            			if(periods[i].dal == null || periods[i].dal == ""){
	            				// here I have to find the "componenteMaxResidenza" date of birth
	            				da = new Date(componentData.persona.dataNascita);
	            				da = $scope.correctDateIt(da);
	            			} else {
	            				da = periods[i].dal;
	            			}
	            			a = periods[i].al;
	            		
	            			period = {
	            				id: i,	
	            				idComuneResidenza: $scope.getIdByComuneDesc(periods[i].comune),
	            				dataDa: da,
	            				dataA: a,
	            				idAire: periods[i].aire,
	            				difference: $scope.getDifferenceBetweenDates(da, a)
	            			};
	            			$scope.storicoResidenza.push(period);
	            		}
	            	}
	            	$scope.calcolaStoricoRes(componentData);
	            	// -------------------------------------------------------------
	            	
				    // --------------------- Sep get section -----------------------
	            	var t_cons = result.autocertificazione.tribunaleConsensuale;
	            	var t_jud = result.autocertificazione.tribunaleGiudiziale;
	            	var t_tmp = result.autocertificazione.tribunaleTemporaneo;
				    if(t_cons != null && t_cons != ""){
				    	$scope.separationType = 'consensual';
				    	$scope.sep.consensual = {};
				    	var data = {
				    			data : result.autocertificazione.dataConsensuale,
				    			trib : result.autocertificazione.tribunaleConsensuale
				    	};
				    	$scope.sep.consensual = data;
				    } else if(t_jud != null && t_jud != ""){
				    	$scope.separationType = 'judicial';
				    	$scope.sep.judicial = {};
				    	var data = {
				    			data : result.autocertificazione.dataGiudiziale,
				    			trib : result.autocertificazione.tribunaleGiudiziale
				    	};
				    	$scope.sep.judicial = data;
				    } else if(t_tmp != null && t_tmp != ""){
				    	$scope.separationType = 'tmp';
				    	$scope.sep.tmp = {};
				    	var data = {
				    			data : result.autocertificazione.dataTemporaneo,
				    			trib : result.autocertificazione.tribunaleTemporaneo
				    	};
				    	$scope.sep.tmp = data;
				    	
				    } else {
				    	$scope.separationType = "nothing";
				    	$scope.sep = {};
				    }
				    if($scope.sep != null){
				    	autocert_ok.trib = true;
				    }
            	} else {
            		$scope.progress += 25;
            		$rootScope.$broadcast('dialogs.wait.progress',{msg: msgs[i_m++],'progress': $scope.progress});
            		var autocertificazione = result.autocertificazione;
            		$scope.getSchedaPDF(autocertificazione, userId);
            	}
				// ------------------------------------------------------------
            	$scope.noAutocertData = false;
				$scope.setLoadingSearch(false);
	        } else {
	        	if(type == 1){
	        		$scope.progress = 100;
	            	$rootScope.$broadcast('dialogs.wait.complete');
	            	$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrPracticeViewPdf());
	        	}
	        	$scope.noAutocertData = true;
			    $scope.setLoadingSearch(false);
	        }	
        });
    };
    
    // Method to full the "elenchi" used in the app
    $scope.getElenchi = function(idPratica, userId, type) {
            	
       	var tmp_ambiti = sharedDataService.getStaticAmbiti();
       	var tmp_comuni = sharedDataService.getStaticComuni();
       	//var tmp_edizioni = sharedDataService.getStaticEdizioni();
            	
       	var method = 'GET';
       	var params = {
    		idEnte:cod_ente,
    		userIdentity: userId
    	};
            	
       	if((tmp_ambiti == null && tmp_comuni == null) || (tmp_ambiti.length == 0 && tmp_comuni.length == 0)){
        	var myDataPromise = invokeWSServiceProxy.getProxy(method, "Elenchi", params, $scope.authHeaders, null);
        	myDataPromise.then(function(result){
        		sharedDataService.setStaticAmbiti(result.ambitiTerritoriali);
        		sharedDataService.setStaticComuni(result.comuni);
            	//listaEdizioniFinanziate = result.edizioniFinanziate;
        		sharedDataService.setStaticEdizioni(result.edizioniFinanziate);
            	// the first time I use the portal the lists are initialized
            	$scope.listaComuni = result.comuni;
        		$scope.listaComuniVallagarina = $scope.getOnlyComunity(result.comuni);
        		$scope.listaAmbiti = result.ambitiTerritoriali;
        		$scope.getPracticeData(idPratica, userId, type);
        	});
       	} else {
       		$scope.listaComuni = sharedDataService.getStaticComuni();
       		$scope.listaComuniVallagarina = $scope.getOnlyComunity(sharedDataService.getStaticComuni());
       		$scope.listaAmbiti = sharedDataService.getStaticAmbiti();
       		$scope.getPracticeData(idPratica, userId, type);
       	}
       	
    };
    
 // method to obtain the link to the pdf of the practice
    $scope.getSchedaPDF = function(autocert, userId){
            	
        var getPDF = {
        	domandaInfo : {
        		idDomanda: $scope.practice.idObj,	
               	userIdentity: userId,
               	version : $scope.practice.versione
        	},
        	autocertificazione : autocert
        };      	
            	
        var value = JSON.stringify(getPDF);
        if($scope.showLog) console.log("Dati richiesta PDF : " + value);
           	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPDF", null, $scope.authHeaders, value);	

        myDataPromise.then(function(result){
        	if(result.error != null){
        		var message = JSON.stringify(result.error);
        		if(message.indexOf("ALC-") != -1){ // to solve bug pdf conversion in infoTN JB
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrPracticeViewPdf());
        		} else {
        			message = message.replace("è", "e'");
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), message);
        		}
        		$scope.setLoadingSearch(false);
        	} else if(result.exception != null){
        		var message = JSON.stringify(result.exception);
        		if(message.indexOf("ALC-") != -1){ // to solve bug pdf conversion in infoTN JB
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrPracticeViewPdf());
        		} else {
        			message = message.replace("è", "e'");
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), message);
        		}
        		$scope.setLoadingSearch(false);
        	} else {
        		$scope.progress += 25;
        		$rootScope.$broadcast('dialogs.wait.progress',{msg: msgs[i_m++],'progress': $scope.progress});
            	$scope.createPdf(result);			
        	    $scope.setLoadingSearch(false);
            }
        });
    };
    
    $scope.openDoc = function(value){
    	window.open(value);
    };
    
    $scope.createPdf = function(data){
    	var method = 'POST';
        var myDataPromise = invokePdfServiceProxy.getProxy(method, "rest/pdf", null, $scope.authHeaders, data);	
            	
        myDataPromise.then(function(result){
        	$scope.progress = 100;
        	$rootScope.$broadcast('dialogs.wait.complete');
        	var filePdf = "pdf/" + result;
        	$scope.openDoc(filePdf);
        	
        	// Here I have to whait some times and then I remove the file
//        	for(var i= 0; i < 2000; i++){
//        		if(i%100 == 0){
//        			if($scope.showLog);
//        		}
//        	}
        	var timeout = $timeout(function() {$scope.deletePdf(filePdf);}, 5000);
	    });
    }; 
    
    $scope.deletePdf = function(name){
    	var res = name.split("/");
    	var last = res.length - 1;
    	if($scope.showLog) console.log("File to delete : " + res[last]);
    	var params = {
    		filename:res[last]
    	};
    	var method = 'DELETE';
        var myDataPromise = invokePdfServiceProxy.getProxy(method, "rest/pdf", params, $scope.authHeaders, null);
            	
        myDataPromise.then(function(result){
        	if(result){
        		if($scope.showLog) console.log("Cancellazione file " + name + " OK");
        	} else {
        		if($scope.showLog) console.log("Errore cancellazione file " + name + " OK");
        	}
        });
    };
    
    $scope.calcolaStoricoRes = function(ft_component){
       	$scope.showNoStoricoMessage = false;			 // I use this variable in the editing of a component: when I add a storicoResidenza I have to set to False
       	var totMillis = 0;
       	var totMillisInYear = sharedDataService.getOneYearMillis(); //1000 * 60 * 60 * 24 * 360; // I consider an year of 360 days (12 month of 30 days)
       	for(var i = 0; i < $scope.storicoResidenza.length; i++){
       		totMillis += $scope.storicoResidenza[i].difference;
       	}
       	var anniRes = totMillis/totMillisInYear;
       	$scope.setAnni(Math.floor(anniRes), ft_component, 1);
      	//$scope.setSRFormVisible(false);
    };
            
    $scope.setErrorMessageStoricoRes = function(value){
      	$scope.errorsMessageStoricoRes = value;
    };
            
    // Method setAnni: used with param type == 1 -> to update "anniResidenza";
    // 				   used with param type == 2 -> to update "anniLavoro";	
    //				   used with param type == 3 -> to update "anniAIRE";
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
    
    $scope.setResInStructComp1 = function(tot){
    	$scope.compRecStructTot1 = tot;
    };
    
    $scope.setResInStructComp2 = function(tot){
    	$scope.compRecStructTot2 = tot;
    };
    
    $scope.getOnlyComunity = function(list){
       	var correctList = [];
      	var vallagarinaList = sharedDataService.getVallagarinaMunicipality();
       	if(list != null && list.length > 0){
       		for(var i = 0; i < list.length; i++){
       			for(var y = 0; y < vallagarinaList.length; y++){
        			if(list[i].descrizione == vallagarinaList[y]){
        				correctList.push(list[i]);
        	    		break;
        	    	}
            	}
            }
        }
        return correctList;
    };
    
    // Method to get the "comune" description by the id
    $scope.getComuneById = function(id, type){
    	if(id != null){
      		var description = "";
       		if(type == 1 || type == 2){
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
       		}
       		if(type == 3){
       			if($scope.listaAmbiti != null){
       				var found;
        	    	found = $filter('idToDescComune')(id, $scope.listaAmbiti);
        	    	if(found != null){
        	    		description = found.descrizione;
        	    	}
        	   	}
            }
            //$scope.comuneById = description;
            return description;
        } else {
        	//$scope.comuneById = "";
        	return "";
        }
    };
    
    // Method to get the "idObj" of a "comune" by the description
    $scope.getIdByComuneDesc = function(desc){
    	var idObj = "";
    	if($scope.listaComuni != null && $scope.listaComuni.length > 0){
	    	var found = $filter('descComuneToId')(desc, $scope.listaComuni);
	    	if(found != null){
	    		idObj = found.idObj;
	    	}
    	}
    	return idObj;
    };
    
    // Method to correct the decimal value showed in json object
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
    
    // Method used to get the data from a component having the name - surname string
    $scope.getComponentsDataByName = function(name){
    	var nameSurname = name.split(", ");
    	var maxResSurname = nameSurname[0];
    	var maxResName = nameSurname[1];
    	var componentData = {};
    	
    	for(var i = 0; i < $scope.componenti.length; i++){
    		if(($scope.componenti[i].persona.cognome == maxResSurname) && ($scope.componenti[i].persona.nome == maxResName)){
    			componentData = angular.copy($scope.componenti[i]);
    		}
       	}
    	
    	return componentData;
    };
    
    // Method used to find the distance in milliseconds between two dates
    $scope.getDifferenceBetweenDates = function(dataDa, dataA){
    	var dateDa = $scope.correctDate(dataDa);
   		var dateA = $scope.correctDate(dataA);
   		var fromDate = $scope.castToDate(dateDa);
   		var toDate = $scope.castToDate(dateA);
   		if($scope.showLog){
   			console.log("Data da " + fromDate);
   			console.log("Data a " + toDate);
   		}
   		var difference = toDate.getTime() - fromDate.getTime();
   		return difference;
    };
    
    $scope.correctDate = function(date){
       	if(date!= null){
       		if(date instanceof Date){
       			var correct = "";
       			var day = date.getDate();
       			var month = date.getMonth() + 1;
       			var year = date.getFullYear();
       			correct = year + "-" + month + "-" + day;
       			return correct;
       		} else {
       			var res = date.split("/");
       			correct = res[2] + "-" + res[1] + "-" + res[0];
       			return correct;
       		}
       	} else {
       		return date;
       	}
    };
            
    $scope.correctDateIt = function(date){
    	if(date != null){
	    	if(date instanceof Date){
	    		// if date is a Date
	    		var correct = "";
	       		var day = date.getDate();
	       		var month = date.getMonth() + 1;
	       		var year = date.getFullYear();
	       		correct = day + "/" + month + "/" + year;
	       		return correct;
	    	} else {
	    		// if date is a String
		       	if(date.indexOf("/") > -1){
		       		return date;
		      	} else {
		        	if(date != null){
		        		var res = date.split("-");
		        		var correct = "";
		        	   	correct=res[2] + "/" + res[1] + "/" + res[0];
		        	   	return correct;
		        	} else {
		            	return date;
		            }
		        }
	    	}
    	} else {
    		return date;
    	}
    };
            
    $scope.castToDate = function(stringDate){
    	if(stringDate != null && stringDate!= "" ){
    		var res = stringDate.split("-");
    		var month = parseInt(res[1]) - 1; // the month start from 0 to 11;
    		return new Date(res[0], month, res[2]);
    	} else {
    		return null;
    	}
    };
    
    // ----------------------------------------------------------------------------------------------
    
    $scope.searchTabs = [ 
        { title:'Filtra per codice pratica', index: 1, active: true, content:"partials/console/search/practice_code_search.html" },
        { title:'Filtra per Richiedente', index: 2, active: false, content:"partials/console/search/richiedente_search.html" },
        { title:'Filtra per Componente Nucleo', index: 3, active: false, disabled: true, content:"partials/console/search/componente_search.html" }
    ];
    
    $scope.reportTabs = [ 
        { title:'Utilizzo Portale', index: 1, active: true, content:"partials/console/report/utilization_report.html" },
        { title:'Numero Domande', index: 2, active: false, content:"partials/console/report/practice_report.html" },
        { title:'Dettagli Utenti', index: 3, active: false, content:"partials/console/report/user_report.html" }
    ];
    
    $scope.continueNextReportTab = function(){
   	 	// After the end of all operations the tab is swithced
       	$scope.reportTabs[$scope.tabReportIndex].active = false;	// deactive actual tab
       	$scope.tabReportIndex++;								// increment tab index
       	$scope.reportTabs[$scope.tabReportIndex].active = true;		// active new tab
       	$scope.reportTabs[$scope.tabReportIndex].disabled = false;
    };
           
    $scope.prevReportTab = function(){
    	$scope.reportTabs[$scope.tabReportIndex].active = false;	// deactive actual tab
      	$scope.tabReportIndex--;									// increment tab index
      	$scope.reportTabs[$scope.tabReportIndex].active = true;		// active new tab	
    };
    
    $scope.setReportIndex = function($index){
       	$scope.tabReportIndex = $index;
    };
    
    $scope.autocertificazione = {
    		periodiResidenza:[{
    			comune:"ALA",dal:"",al:"13/2/2002"
    		},{
    			aire:true,comune:"AVIO",dal:"13/2/2002",al:"27/12/2002"
    		},{
    			aire:"",comune:"AVIO",dal:"27/12/2002",al:"22/8/2014"
    		}],
    		componenteMaggiorResidenza:"CLESIO, BERNARDO",
    		totaleAnni:39,
    		dataConsensuale:null,
    		tribunaleConsensuale:null,
    		dataGiudiziale:"21/8/2014",
    		tribunaleGiudiziale:"Trento",
    		dataTemporaneo:null,
    		tribunaleTemporaneo:null,
    		componenti:[{
    			nominativo:"Mario Rossi",
    			strutture:[{
    				nome:"San Patrignano (Rimini)",
    				dal:"15/5/2012",
    				al:"3/2/2014"
    			},{
    				nome:"Carcere (Trento)",
    				dal:"3/2/2014",
    				al:"11/6/2014"
    			}]
    		}]		
    };
    
    //  --------------------------------------------Section for charts--------------------------------------
    
    //------------ Test Data --------------
    $scope.userData = [
        {
        	"month": "Luglio",
     		"ue": 19,
     		"extraUe": 12,
     		"tot": 31
     	},
     	{
        	"month": "Agosto",
     		"ue": 10,
     		"extraUe": 5,
     		"tot": 15
     	},
     	{
        	"month": "Settembre",
     		"ue": 33,
     		"extraUe": 24,
     		"tot": 57
     	},
     	{
        	"month": "Ottobre",
     		"ue": 0,
     		"extraUe": 0,
     		"tot": 0
     	},
     	{
        	"month": "Novembre",
     		"ue": 0,
     		"extraUe": 0,
     		"tot": 0
     	},
     	{
        	"month": "Dicembre",
     		"ue": 0,
     		"extraUe": 0,
     		"tot": 0
     	}
    ];
    
    $scope.chartUser = {
        	"type": "AreaChart",
        	"displayed": true,
        	"data": {
        	    "cols": [],
        		"rows": []
        	},
        	"options": {
        	    "title": "Accessi Utente al Sistema",
        	    "isStacked": "true",
        	    "width": 400,
    		    "height": 300,
        	    "fill": 15,
        	    "displayExactValues": true,
        	    "legend": {
        	    	"textStyle": {"color": 'black', "fontSize" : 10}
        	    },
        	    "vAxis": {
        	      "title": "Numero Accessi",
        	      "gridlines": {
        	        "count": 10
        	      }
        	    },
        	    "hAxis": {
        	      "title": "Mesi"
        	    },
        	    "allowHtml": true
        	},
        	"formatters": {
        	    "color": [
        	      {
        	        "columnNum": 4,
        	        "formats": [
        	          {
        	            "from": 0,
        	            "to": 3,
        	            "color": "white",
        	            "bgcolor": "red"
        	          },
        	          {
        	            "from": 3,
        	            "to": 5,
        	            "color": "white",
        	            "fromBgColor": "red",
        	            "toBgColor": "blue"
        	          },
        	          {
        	            "from": 6,
        	            "to": null,
        	            "color": "black",
        	            "bgcolor": "#33ff33"
        	          }
        	        ]
        	      }
        	    ],
        	    "arrow": [
        	      {
        	        "columnNum": 1,
        	        "base": 19
        	      }
        	    ],
        	    "date": [
        	      {
        	        "columnNum": 5,
        	        "formatType": "long"
        	      }
        	    ],
        	    "number": [
        	      {
        	        "columnNum": 4,
        	        "prefix": "utenti"
        	      }
        	    ]
        	}
        };    
    
    $scope.initUserDiagram = function(){
    	$scope.chartUser.data.cols = [];
    	var x_title = {
        	id: "month",
        	label: "Mesi",
        	type: "string",
        	p: {}
        };
    	var x_data1 = {
    		id: "ueUser-id",
           	label: "UE",
           	type: "number",
           	p: {}
        };
    	var x_data2 = {
    		id: "extraUeUser-id",
           	label: "Extra UE",
           	type: "number",
           	p: {}
        };
    	$scope.chartUser.data.cols.push(x_title);
    	$scope.chartUser.data.cols.push(x_data1);
    	$scope.chartUser.data.cols.push(x_data2);
    	
    	$scope.chartUser.data.rows = [];
    	for(var i = 0; i < $scope.userData.length; i++){
    		var data = {
    			"c": [
    		   		 {
    		   		    "v": $scope.userData[i].month
    		   		 },
    		   		 {
    		    	    "v": $scope.userData[i].ue,
    		    	    "f": $scope.userData[i].ue + " utenti UE",
    	       		 },
    	    	     {
		    	        "v": $scope.userData[i].extraUe,
    		    	    "f": $scope.userData[i].extraUe + " utenti Extra UE"
    		    	 }
    		    ]	
    		};
    		$scope.chartUser.data.rows.push(data);
    	}
    	$scope.chartUser.options.title = "Accessi Utente al Sistema";
    	$scope.chartUser.options.vAxis.title = "Numero Accessi";
    	$scope.chartUser.options.hAxis.title = "Mesi";
    };
    
    $scope.userAgeData= [
        {
           	"age": "< 20",
        	"tot": 31
        },
        {
           	"age": "20-30",
           	"tot": 45
        },
        {
           	"age": "30-50",
        	"tot": 25
        },
        {
           	"age": "> 50",
        	"tot": 19
        }
    ];
    
    $scope.initUserAgeDiagram = function(){
    	$scope.chartUser.data.cols = [];
    	var x_title = {
        	id: "month",
        	label: "Eta'",
        	type: "string",
        	p: {}
        };
    	var x_data1 = {
    		id: "under20-id",
           	label: "Eta' utenti",
           	type: "number",
           	p: {}
        };
    	$scope.chartUser.data.cols.push(x_title);
    	$scope.chartUser.data.cols.push(x_data1);
    	
    	$scope.chartUser.data.rows = [];
    	for(var i = 0; i < $scope.userAgeData.length; i++){
    		var data = {
    			"c": [
    		   		 {
    		   		    "v": $scope.userAgeData[i].age
    		   		 },
    		   		 {
    		    	    "v": $scope.userAgeData[i].tot,
    		    	    "f": $scope.userAgeData[i].tot + " utenti."
    	       		 }
    		    ]	
    		};
    		$scope.chartUser.data.rows.push(data);
    	}
    	$scope.chartUser.options.title = "Eta' Utenti acceduti al Sistema";
    	$scope.chartUser.options.vAxis.title = "Numero Utenti";
    	$scope.chartUser.options.hAxis.title = "Fascia Eta'";
    };    
    
    $scope.userCityData= [
        {
           	"city": "Ala",
           	"tot": 2
        },
        {
           	"city": "Avio",
          	"tot": 4
        },
        {
           	"city": "Besenello",
          	"tot": 1
        },
        {
           	"city": "Brentonico",
          	"tot": 7
        },
        {
           	"city": "Calliano",
          	"tot": 4
        },
        {
           	"city": "Isera",
          	"tot": 0
        },
        {
           	"city": "Mori",
          	"tot": 0
        },
        {
           	"city": "Nogaredo",
          	"tot": 8
        },
        {
           	"city": "Nomi",
          	"tot": 0
        },
        {
           	"city": "Pomarolo",
          	"tot": 0
        },
        {
           	"city": "Ronzo-Chienis",
          	"tot": 1
        },
        {
           	"city": "Rovereto",
          	"tot": 45
        },
        {
           	"city": "Terragnolo",
          	"tot": 4
        },
        {
           	"city": "Trambileno",
          	"tot": 0
        },
        {
           	"city": "Vallarsa",
          	"tot": 3
        },
        {
           	"city": "Villa Lagarina",
          	"tot": 2
        },
        {
           	"city": "Volano",
          	"tot": 1
        }    
    ];
    
    $scope.initUserCityDiagram = function(){
    	$scope.chartUser.data.cols = [];
    	var x_title = {
        	id: "month",
        	label: "Utenti per Comune",
        	type: "string",
        	p: {}
        };
    	var x_data1 = {
    		id: "under20-id",
           	label: "Utenti per Comune",
           	type: "number",
           	p: {}
        };
    	$scope.chartUser.data.cols.push(x_title);
    	$scope.chartUser.data.cols.push(x_data1);
    	
    	$scope.chartUser.data.rows = [];
    	for(var i = 0; i < $scope.userCityData.length; i++){
    		var data = {
    			"c": [
    		   		 {
    		   		    "v": $scope.userCityData[i].city
    		   		 },
    		   		 {
    		    	    "v": $scope.userCityData[i].tot,
    		    	    "f": $scope.userCityData[i].tot + " utenti."
    	       		 }
    		    ]	
    		};
    		$scope.chartUser.data.rows.push(data);
    	}
    	$scope.chartUser.options.title = "Comune Provenienza Utenti acceduti al Sistema";
    	$scope.chartUser.options.vAxis.title = "Numero Utenti";
    	$scope.chartUser.options.hAxis.title = "Comune di Provenienza";
    };
    
    //-------------------------------------
    
    $scope.chartUtilization = {
    	"type": "ColumnChart",
//    	"cssStyle": "height:400px; width:500px;",
    	"data": {
    	    "cols": [],
    	    "rows": []
    	},
    	"options": {
    	    "title": "Domande per mese",
    	    "height": 350,
    	    "width":550,
    	    "isStacked": "true",
    	    "fill": 40,
    	    "displayExactValues": true,
    	    "legend": {
//    	    	"position": 'top',
//    	    	"alignment": 'start',
    	    	"textStyle": {"color": 'black', "fontSize" : 10} //,
//    	    	"maxLines": 2
    	    },
    	    "vAxis": {
    	      "title": "",
    	      "gridlines": {
    	        "count": 10
    	      }
    	    },
    	    "hAxis": {
    	      "title": ""
    	    }
    	},
    	"formatters": {},
    	"displayed": true
    };
    
    $scope.utilizationData = [
        {
        	"month" : "Luglio",
        	"locUe" : 3,
        	"affUe" : 5,
        	"locExtraUe" : 0,
        	"affExtraUe" : 2
        },{
        	"month" : "Agosto",
        	"locUe" : 1,
        	"affUe" : 1,
        	"locExtraUe" : 2,
        	"affExtraUe" : 1
        },{
        	"month" : "Settembre",
        	"locUe" : 15,
        	"affUe" : 11,
        	"locExtraUe" : 8,
        	"affExtraUe" : 13
        },{
        	"month" : "Ottobre",
        	"locUe" : 0,
        	"affUe" : 0,
        	"locExtraUe" : 0,
        	"affExtraUe" : 0
        },{
        	"month" : "Novembre",
        	"locUe" : 0,
        	"affUe" : 0,
        	"locExtraUe" : 0,
        	"affExtraUe" : 0
        },{
        	"month" : "Dicembre",
        	"locUe" : 0,
        	"affUe" : 0,
        	"locExtraUe" : 0,
        	"affExtraUe" : 0
        }
    ];
    
    $scope.initUtilizationDiagram = function(){
    	$scope.chartUtilization.data.cols = [];
    	var x_title = {
        	id: "month",
        	label: "Mesi",
        	type: "string",
        	p: {}
        };
    	var x_data1 = {
    		id: "locUe-id",
           	label: "Locazione UE",
           	type: "number",
           	p: {}
        };
    	var x_data2 = {
    		id: "affUe-id",
           	label: "Integr. Canone UE",
           	type: "number",
           	p: {}
        };
    	var x_data3 = {
    		id: "locExtraUe-id",
           	label: "Locazione Extra UE",
           	type: "number",
           	p: {}
        };
    	var x_data4 = {
        	id: "affExtraUe-id",
            label: "Integ. Canone Extra UE",
            type: "number",
            p: {}
        };
    	
    	$scope.chartUtilization.data.cols.push(x_title);
    	$scope.chartUtilization.data.cols.push(x_data1);
    	$scope.chartUtilization.data.cols.push(x_data2);
    	$scope.chartUtilization.data.cols.push(x_data3);
    	$scope.chartUtilization.data.cols.push(x_data4);
    	
    	$scope.chartUtilization.data.rows = [];
    	for(var i = 0; i < $scope.utilizationData.length; i++){
    		var data = {
    			"c": [
    		   		 {
    		   		    "v": $scope.utilizationData[i].month
    		   		 },
    		   		 {
    		    	    "v": $scope.utilizationData[i].locUe,
    		    	    "f": $scope.utilizationData[i].locUe + " Pratiche",
    	       		 },
    	    	     {
		    	        "v": $scope.utilizationData[i].affUe,
    		    	    "f": $scope.utilizationData[i].affUe + " Pratiche"
    		    	 },
    		    	 {
    		    	    "v": $scope.utilizationData[i].locExtraUe,
    		    	    "f": $scope.utilizationData[i].locExtraUe + " Pratiche",
    	       		 },
    	    	     {
		    	        "v": $scope.utilizationData[i].affExtraUe,
    		    	    "f": $scope.utilizationData[i].affExtraUe + " Pratiche"
    		    	 }
    		    ]	
    		};
    		
    		$scope.chartUtilization.data.rows.push(data);
    	}
    	$scope.chartUtilization.options.title = "Domande per mese";
    	$scope.chartUtilization.options.vAxis.title = "Numero Domande";
    	$scope.chartUtilization.options.hAxis.title = "Mesi";
    	
    };
    
    $scope.utilizationTimeData = [
        {
           	"time" : "0:00 - 6:00",
           	"locUe" : 2,
           	"affUe" : 1,
           	"locExtraUe" : 1,
           	"affExtraUe" : 2
        },{
           	"time" : "6:00 - 12:00",
           	"locUe" : 0,
         	"affUe" : 1,
           	"locExtraUe" : 2,
           	"affExtraUe" : 1
        },{
          	"time" : "12:00 - 18:00",
           	"locUe" : 3,
            "affUe" : 6,
            "locExtraUe" : 8,
            "affExtraUe" : 5
        },{
            "time" : "18:00 - 0:00",
            "locUe" : 11,
            "affUe" : 7,
            "locExtraUe" : 8,
            "affExtraUe" : 10
        }
    ];
    
    
    $scope.initUtilizationTimeDiagram = function(){
    	$scope.chartUtilization.data.cols = [];
    	var x_title = {
        	id: "time",
        	label: "Fasce Orarie",
        	type: "string",
        	p: {}
        };
    	var x_data1 = {
    		id: "locUe-id",
           	label: "Locazione UE",
           	type: "number",
           	p: {}
        };
    	var x_data2 = {
    		id: "affUe-id",
           	label: "Integr. Canone UE",
           	type: "number",
           	p: {}
        };
    	var x_data3 = {
    		id: "locExtraUe-id",
           	label: "Locazione Extra UE",
           	type: "number",
           	p: {}
        };
    	var x_data4 = {
        	id: "affExtraUe-id",
            label: "Integr. Canone Extra UE",
            type: "number",
            p: {}
        };
    	
    	$scope.chartUtilization.data.cols.push(x_title);
    	$scope.chartUtilization.data.cols.push(x_data1);
    	$scope.chartUtilization.data.cols.push(x_data2);
    	$scope.chartUtilization.data.cols.push(x_data3);
    	$scope.chartUtilization.data.cols.push(x_data4);
    	
    	$scope.chartUtilization.data.rows = [];
    	for(var i = 0; i < $scope.utilizationTimeData.length; i++){
    		var data = {
    			"c": [
    		   		 {
    		   		    "v": $scope.utilizationTimeData[i].time
    		   		 },
    		   		 {
    		    	    "v": $scope.utilizationTimeData[i].locUe,
    		    	    "f": $scope.utilizationTimeData[i].locUe + " Pratiche",
    	       		 },
    	    	     {
		    	        "v": $scope.utilizationTimeData[i].affUe,
    		    	    "f": $scope.utilizationTimeData[i].affUe + " Pratiche"
    		    	 },
    		    	 {
    		    	    "v": $scope.utilizationTimeData[i].locExtraUe,
    		    	    "f": $scope.utilizationTimeData[i].locExtraUe + " Pratiche",
    	       		 },
    	    	     {
		    	        "v": $scope.utilizationTimeData[i].affExtraUe,
    		    	    "f": $scope.utilizationTimeData[i].affExtraUe + " Pratiche"
    		    	 }
    		    ]	
    		};
    		
    		$scope.chartUtilization.data.rows.push(data);
    	}
    	$scope.chartUtilization.options.title = "Domande per fascia oraria";
    	$scope.chartUtilization.options.vAxis.title = "Numero Domande";
    	$scope.chartUtilization.options.hAxis.title = "Fascia Oraria";
    };
    
    $scope.chartPractice = $scope.chart = {
    		  "type": "PieChart",
    		  "data": [],
    		  "options": {
    		    "displayExactValues": true,
    		    "width": 380,
    		    "height": 330,
    		    "is3D": true,
    		    "legend": {
        	    	"textStyle": {"color": 'black', "fontSize" : 10}
        	    },
    		    "chartArea": {
    		      "left": 5,
    		      "top": 5,
    		      "bottom": 0,
    		      "width": "70%",
    		      "height": "80%"
    		    }
    		  },
    		  "formatters": {
    		    "number": [
    		      {
    		        "columnNum": 1,
    		        "pattern": "#0 domande"
    		      }
    		    ]
    		  },
    		  "displayed": true
    	};
    
    $scope.practiceData = [
        {
//           	"state": "Domande Effettuate",
//        	"tot": "cost"
//        },{
           	"state": "Consolidate",
        	"ue": 183,
        	"extraUe": 159,
        	"tot": 342
        },
        {
          	"state": "Rifiutate",
          	"ue": 12,
            "extraUe": 40,
            "tot": 52
        },
        {
           	"state": "Editabili",
        	"ue": 55,
        	"extraUe": 70,
        	"tot": 125
        }
    ];
    
    $scope.initPracticeDiagram = function(){
    	$scope.chartPractice.data = [["Domande Effettuate", "cost"]];
    	
    	for(var i = 0; i < $scope.practiceData.length; i++){
    		var data = [ $scope.practiceData[i].state,
    		             $scope.practiceData[i].tot];
    		$scope.chartPractice.data.push(data);
    	}
    	$scope.chartPractice.options.title = "Suddivisione domande per stato";
    };
    
    $scope.practiceConsData = [
        {
        	"type": "Integr. Canone Cittadini UE",
        	"tot": 101
        },{
        	"type": "Locazione Cittadini UE",
        	"tot": 82
        },{
        	"type": "Integr. Canone Cittadini Extra UE",
        	"tot": 78
        },{
        	"type": "Locazione Cittadini Extra UE",
        	"tot": 81
        }                        
    ];
    
    $scope.initPracticeConsDiagram = function(){
    	$scope.chartPractice.data = [["Domande Consolidate", "cost"]];
    	
    	for(var i = 0; i < $scope.practiceConsData.length; i++){
    		var data = [ $scope.practiceConsData[i].type,
    		             $scope.practiceConsData[i].tot];
    		$scope.chartPractice.data.push(data);
    	}
    	$scope.chartPractice.options.title = "Composizione pratiche consolidate";
    };
    
    $scope.practiceRefData = [
        {
           	"type": "Integr. Canone Cittadini UE",
           	"tot": 7
        },{
           	"type": "Locazione Cittadini UE",
           	"tot": 5
        },{
           	"type": "Integr. Canone Cittadini Extra UE",
           	"tot": 13
        },{
           	"type": "Locazione Cittadini Extra UE",
           	"tot": 27
        }                        
    ];
                           
    $scope.initPracticeRefDiagram = function(){
       	$scope.chartPractice.data = [["Domande Rifiutate", "cost"]];
                          	
       	for(var i = 0; i < $scope.practiceRefData.length; i++){
       		var data = [ $scope.practiceRefData[i].type,
       		             $scope.practiceRefData[i].tot];
       		$scope.chartPractice.data.push(data);
       	}
       	$scope.chartPractice.options.title = "Composizione pratiche rifiutate";
    };
    
    $scope.practiceEditData = [
         {
          	"type": "Integrazione Canone Cittadini UE",
           	"tot": 24
         },{
           	"type": "Locazione Cittadini UE",
           	"tot": 31
         },{
          	"type": "Integrazione Canone Cittadini Extra UE",
           	"tot": 33
         },{
           	"type": "Locazione Cittadini Extra UE",
           	"tot": 37
         }                        
    ];
                                                 
    $scope.initPracticeEditDiagram = function(){
       	$scope.chartPractice.data = [["Domande Editabili", "cost"]];
                                        	
       	for(var i = 0; i < $scope.practiceEditData.length; i++){
     		var data = [ $scope.practiceEditData[i].type,
       		             $scope.practiceEditData[i].tot];
       		$scope.chartPractice.data.push(data);
       	}
       	$scope.chartPractice.options.title = "Composizione pratiche editabili";
    };    
    
    //  ----------------------------------------------------------------------------------------------------
    
    
}]);