'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers', ['googlechart']);

cp.controller('ConsoleCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService','invokeWSService','invokeWSServiceProxy', 
    function($scope, $http, $route, $routeParams, $rootScope, localize, sharedDataService, invokeWSService, invokeWSServiceProxy, $location, $filter) { // , $location 

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
       	$scope.getPracticesWS();
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
    	searchMade = false;
    	$scope.practicesFind = [];
    	$scope.practicesWSM = [];
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
    	$scope.practicesWSM = [];	// Clear the list before fill it
    	if(practiceListWs != null){
	    	for(var i = 0; i < practiceListWs.length; i++){
	    		for(var j = 0; j < practiceListMy.length; j++){
	    			if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
	    				practiceListWs[i].myStatus = practiceListMy[j].status;
	    				practiceListWs[i].userIdentity = practiceListMy[j].userIdentity;
	    				if(practiceListMy[j].status != 'RIFIUTATA'){
	    					$scope.practicesWSM.push(practiceListWs[i]);
	    				}
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
    
    $scope.findPractice = function(idPratica){
    	$scope.continueNextTab();
    	$scope.stampaScheda(idPratica);
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
    
    // ----------------------------------------------------------------------------------------------
    
    $scope.searchTabs = [ 
        { title:'Filtra per codice pratica', index: 1, active: true, content:"partials/console/search/practice_code_search.html" },
        { title:'Filtra per Richiedente', index: 2, active: false, content:"partials/console/search/richiedente_search.html" },
        { title:'Filtra per Componente Nucleo', index: 3, active: false, content:"partials/console/search/componente_search.html" }
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