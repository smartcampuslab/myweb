'use strict';

/* Controllers */

var cpControllers = angular.module('cpControllers', []);

cp.controller('MainCtrl',['$scope', '$http', '$route', '$routeParams', '$rootScope', 'localize', 'sharedDataService',
    function($scope, $http, $route, $routeParams, $rootScope, localize, sharedDataService, $location, $filter) { // , $location 

    $rootScope.frameOpened = false;
    
    //$scope.isPracticeFrameOpened = function(){
    //	return sharedDataService.isOpenPracticeFrame();
    //};

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    //this.params = $routeParams;
    
    // The tab directive will use this data
//    $scope.tabs = [ 
//        { title:'Creazione', index: 1, content:"partials/practice/create_form.html"},
//        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled: true},
//        { title:'Nuclei Familiari', index: 3, content:"partials/practice/family_form.html", disabled: true}
//    ];
//    $scope.tabIndex = 0;
//    $scope.buttonNextLabel = "Salva e continua";
    //$scope.initForm = true;
    //$scope.tabs.index = 0;
    //$scope.tabs.active = function() {
    //return $scope.tabs[$scope.tabs.index];
    //};

    $scope.app ;
                  			
    $scope.citizenId = userId;
    $scope.user_token = token;
                  			
    // new elements for view
    $scope.currentView;
    $scope.editMode;
    $scope.currentViewDetails;
                  			
    // max practices displayed in home list
    $scope.maxPractices = 5;

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
                  			
            			
    $scope.showHome = function(){
    	homeShowed = true;
    };
                  			
    $scope.showPractices = function(type){
        homeShowed = false;
        if(type == 1){
            activeLinkEdil="active";
            activeLinkAss="";
            sharedDataService.setFamilyAllowances(false);
        } else {
            activeLinkEdil="";
            activeLinkAss="active";
            sharedDataService.setFamilyAllowances(true);
        }
    };
                  			
    $scope.consolidedPractices = function(item){
        if(item.state < 4){
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
                  			
    $scope.isHomeShowed = function(){
    	//console.log("Is home showed " + homeShowed);
    	return homeShowed;
    };
                  			
    $scope.logout = function() {
        window.document.location = "./logout";
    };
                  		    
    $scope.home = function() {
        window.document.location = "./";
        $scope.showHome();
        //sharedDataService.setOpenPracticeFrame(false);
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
    	$scope.getUserUeNationality();	// retrieve the user ue/extraue Nationality
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
                  			
    $scope.services = [];
    $scope.getServices = function() {
    	console.log("user id " + $scope.citizenId );
    	$http({
    		method : 'GET',
    		url : 'rest/citizen/user/' + $scope.citizenId + '/services',
    		params : {},
    		headers : $scope.authHeaders
    	}).success(function(data) {
    		$scope.services = data;
       	}).error(function(data) {
        	// alert("Error");
       	});
    };
    
    $scope.getUserUeNationality = function() {
    	console.log("invoked user ue nationality" );
    	$http({
    		method : 'GET',
    		url : 'rest/citizen/user/' + $scope.citizenId + '/uenationality',
    		params : {},
    		headers : $scope.authHeaders
    	}).success(function(data){
    		console.log("user ue nationality = " + data);
    		sharedDataService.setUeCitizen(data);	
    	}).error(function(data){
    		// alert("Error");
    	});
    };
    
    // For user shared data
    //document.getElementById("user_name").innerHTML=user_name;
    //document.getElementById("user_surname").innerHTML=user_surname;
    sharedDataService.setName(user_name);
    sharedDataService.setSurname(user_surname);
    
    $scope.getUserName = function(){
  	  return sharedDataService.getName();
    };
    
    $scope.getUserSurname = function(){
  	  return sharedDataService.getSurname();
    };
    
    $scope.isUeCitizen = function(){
    	return sharedDataService.getUeCitizen();
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
    
    // ----------------- Practice sections ----------------
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
                  			
    $scope.practice;
    $scope.getPractice = function(id) {
    	console.log("req id " + id + " ,citizenId " + $scope.citizenId );
    		$http({
    		method : 'GET',
    		url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
     		params : {},
     		headers : $scope.authHeaders
     	}).success(function(data) {
        	$scope.practice = data;
        }).error(function(data) {
            // alert("Error");
        });
    };
                  			
    // for next and prev in practice list
    $scope.currentPage = 0;
    $scope.numberOfPages = function(){
    	var consolidedPractices = [];
    	for(var i=0; i < $scope.practices.length; i++){
    		if($scope.practices[i].state < 4){
    			consolidedPractices.push($scope.practices[i]);
    		}
    	}
		return Math.ceil(consolidedPractices.length/$scope.maxPractices);
	};
                  			
    var newPractice = false;
                  			
    $scope.newPracticeShow = function(){
    	//sharedDataService.setOpenPracticeFrame(true);
    	newPractice = true;
    };
                  			
    $scope.newPracticeHide = function(){
    	//sharedDataService.setOpenPracticeFrame(false);
    	newPractice = false;
    };
                  			
   	$scope.isNewPractice = function(){
   		//return sharedDataService.isOpenPracticeFrame();
   		return newPractice;
    };
                  			
    $scope.getPracticesByType = function(type) {
        $http({
            method : 'GET',
            url : 'rest/citizen/' + $scope.citizenId + '/practice/type/' + type,
            params : {},
            headers : $scope.authHeaders
        }).success(function(data) {
        	$scope.practices = data;
        }).error(function(data) {
        	// alert("Error");
        });
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
                  			
     $scope.savePractice = function(){
         console.log("Practice saved!!" );
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
                  			
}]);

cp.controller('PracticeCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$route', '$location', '$dialogs', 'sharedDataService', '$filter',
                       function($scope, $http, $routeParams, $rootScope, $route, $location, $dialogs, sharedDataService, $filter, $timeout) { 
	this.$scope = $scope;
    $scope.params = $routeParams;
    
    $scope.isUeCitizen = function(){
    	return sharedDataService.getUeCitizen();
    };
    
    //var baseUrlWS = 'https://vas-dev.smartcampuslab.it';
    var baseUrlWS = '';
    
    $scope.getNameSurname = function(name, surname){
    	return name + ' ' + surname;
    };
    
    var idDomandaAll;
    //$scope.practice = {};
    $scope.extracomunitariType = {};
    $scope.residenzaType = {};
    //$scope.nucleo = {};
    $scope.componenteTmpEdit = {};
    //$scope.componenti = [];
    //$scope.componente = {};
    //$scope.richiedente = {};
    
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
    $scope.tabs = [ 
        { title:'Creazione', index: 1, content:"partials/practice/create_form.html"},
        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled: true},
        { title:'Nuclei Familiari', index: 3, content:"partials/practice/family_form.html", disabled: true},
    	{ title:'Verifica Domanda', index: 4, content:"partials/practice/practice_state.html", disabled: true},
    	{ title:'Paga', index: 5, content:"partials/practice/practice_sale.html", disabled: true },
    	{ title:'Sottometti', index: 6, content:"partials/practice/practice_cons.html", disabled: true }
    ];
    // For test all the tabs are active
//    $scope.tabs = [ 
//        { title:'Creazione', index: 1, content:"partials/practice/create_form.html" },
//        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html" },
//        { title:'Nuclei Familiari', index: 3, content:"partials/practice/family_form.html" },
//        { title:'Verifica Domanda', index: 4, content:"partials/practice/practice_state.html" },
//        { title:'Paga', index: 5, content:"partials/practice/practice_sale.html" },
//        { title:'Sottometti', index: 6, content:"partials/practice/practice_cons.html" }
//    ];
    
    //$scope.tabIndex = 0;
    $scope.buttonNextLabel = "Salva e continua";
    
    var fInit = true;
    $scope.initForm = function(){
    	return fInit;
    };
    
    $scope.nextTab = function(value, type, param1, param2, param3, param4){
    	fInit = false;
    	if(!value){		// check form invalid
    		switch(type){
    			case 1:	// CreaPratica
    				$scope.createPractice(param1, param2, param3, param4);
    				break;
    			case 2:
    				$scope.updateResidenza(param3);
    				if(param2 == true){
    					$scope.updateAlloggioOccupato(param1);
    				}
    				$scope.getComponenteRichiedente();
    				break;
    			case 3:
    				//console.log("---------------Caso 3 nextTab---------------");
    				//$scope.updateNucleoFamiliare(param1);
    				break;	
    			default:
    				break;
    		}
    		// After the end of all operations the tab is swithced
    		//console.log("Tabs.length " + $scope.tabs.length);
    		if($scope.tabIndex !== ($scope.tabs.length -1) ){
    	    	$scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
    	    	$scope.tabIndex++;								// increment tab index
    	    	$scope.tabs[$scope.tabIndex].active = true;		// active new tab
    	    	$scope.tabs[$scope.tabIndex].disabled = false;	
    	    	//console.log("Tabs active [" + $scope.tabIndex + "] " + $scope.tabs[$scope.tabIndex].active);
    		} else {
    			$scope.buttonLabel = "Termina";
    		}
    		//console.log("Tab index " + $scope.tabIndex);
    		fInit = true;
    	}
    };
    
    $scope.prevTab = function(){
    	if($scope.tabIndex !== 0 ){
    	    $scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
    	    $scope.tabIndex--;								// increment tab index
    	    $scope.tabs[$scope.tabIndex].active = true;		// active new tab	
    	}
    };
    
    $scope.setIndex = function($index){
    	$scope.tabIndex = $index;
    };
    
    $scope.temp = {};
    
    $scope.reset = function(){
    	$scope.practice = angular.copy($scope.temp);
    };
    
    //$scope.tabs.active = function() {
    //return $scope.tabs[$scope.tabs.index];
    //};
    
    $scope.jobs = [ 
           {value:'COLLOCAMENTO', title:'Collocamento'},
           {value:'LAVORO', title:'Lavoro'}
    ];
    
    $scope.permissions = [
           {value:'SOGGIORNO', title:'Soggiorno'},
           {value:'CE', title:'Ce'}
    ];
    
    $scope.rtypes = [ 
           {value:'ALLOGGIO_INIDONEO', title:'Inidoneo'},
           {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'Impropriamente Adibito'},
           {value:'ALLOGGIO_PRIVO_SERVIZI', title:'Privo di Servizi'},
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
          {value: 'CANONE_LIBERO', title:'Canone libero'},
          {value: 'CANONE_CONCORDATO', title:'Canone concordato'},
          {value: 'NESSUNO', title:'Nessuno'}
    ];
    
    $scope.disabilities = [
          {value: 'CategoriaInvalidita1', name: 'Motoria'},
          {value: 'CategoriaInvalidita2', name: 'Fisica'},
          {value: 'CategoriaInvalidita3', name: 'Mentale'},
          {value: 'CategoriaInvalidita4', name: 'Sensoriale'},
    ];
    
    $scope.citizenships = [
          {code: 1, name: 'Italiana'},
          {code: 2, name: 'Europea'},
          {code: 3, name: 'Extra UE'},
    ];
    
    $scope.affinities = [
          {value: 'ALTRO_CONVIVENTE', name: 'Altro convivente'},
          {value: 'PARENTELA_34_GRADO', name: 'Parentela 3/4 grado'},
          {value: 'PARENTELA_2_GRADO', name: 'Parentela 2 grado'},
          {value: 'PARENTELA_1_GRADO', name: 'Parentela 1 grado'},
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
    
    $scope.onlyNumbers = /^\d+$/;
    $scope.datePattern=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/i;
    
    // Variabili usate in familyForm per visualizzare/nascondere i vari blocchi
    $scope.showMembers = false;
    $scope.applicantInserted = false;
    $scope.newMemberShow = false;
    $scope.newMemberInserted = false;
    $scope.showEditComponents = false;
    
    // ---------------------------------- Metodi richiamo WS INFOTN ----------------------------------------
    $scope.createPractice = function(ec_type, res_type, dom_type, practice){
    	//var dataScadenzaSoggiorno = Date.parse(ec_type.scadenzaPermessoSoggiorno);
    	
    	var pratica = {
    		domandaType : {
    				extracomunitariType: ec_type,
    				idEdizioneFinanziata : 5526558,
    				numeroDomandaICEF : dom_type.numeroDomandaIcef,
    				residenzaType : res_type
    			},
    		idEnte : "24",
    		userIdentity : "DBSMRA58D05E500V"
    	};
    	
    	var value = JSON.stringify(pratica);
    	console.log("Json value " + value);
    	console.log("Pratica Obj " + pratica);
    	$http({
            method : 'POST',
            url : baseUrlWS + '/service.epu/CreaPratica',
            params : {},
            headers : $scope.authHeaders,
            data: value
        }).success(function(data) {
        	var returned = data;
        	// Here I call the getPracticeMethod
        	idDomandaAll = 5563259;//returned.domanda.idObj;
        	$scope.getPracticeData(idDomandaAll);
        	// Retrieve the elenchi info
            $scope.getElenchi();
            $dialogs.notify("Successo","Creazione Pratica " + returned.domanda.identificativo + " avvenuta con successo.");
        	
        }).error(function() {
        	$dialogs.error("Creazione Pratica non riuscita.");
        });
    };
    
    // Used to create a Practice without call the web-service
    $scope.createPracticeTest = function(ec_type, res_type, dom_type, practice){	
    	var pratica = {
    		domandaType : {
    				extracomunitariType: ec_type,
    				idEdizioneFinanziata : 5526558,
    				numeroDomandaICEF : dom_type.numeroDomandaIcef,
    				residenzaType : res_type
    			},
    		idEnte : "24",
    		userIdentity : "DBSMRA58D05E500V"
    	};
    	
    	var value = JSON.stringify(pratica);
    	console.log("Json value " + value);
    	console.log("Pratica Obj " + pratica);
    	
        // Here I call the getPracticeMethod // old 5562993
    	idDomandaAll = 5562993;	// Multi componente 5563259
        $scope.getPracticeData(idDomandaAll); 
        // Retrieve the elenchi info
        $scope.getElenchi();
        $dialogs.notify("Successo","Creazione Pratica 5562993 avvenuta con successo.");
    };
    
    // Method to obtain the Practice data from the id of the request
    $scope.getPracticeData = function(idDomanda) {
    	//console.log("req id " + id + " ,citizenId " + $scope.citizenId );
    	$http({
    		method : 'GET',
    		url : baseUrlWS + '/service.epu/GetDatiPratica',
    		params : {
    			idDomanda:idDomanda,
    			idEnte:"24",
    			userIdentity: "DBSMRA58D05E500V"
    		},
    		headers : $scope.authHeaders
    	}).success(function(data) {
    		//var returnedObj = JSON.stringify(data);
    		//console.log("Data from GetDatiPratica: " + returnedObj);
    		$scope.practice = data.domanda;
    		
    		// split practice data into differents objects
    		$scope.extracomunitariType = $scope.practice.extracomunitariType;
    		$scope.residenzaType = $scope.practice.residenzaType;
    		$scope.nucleo = $scope.practice.nucleo;
    		$scope.componenti = $scope.nucleo.componente;
    		$scope.indicatoreEco = $scope.nucleo.indicatoreEconomico;
    	}).error(function(data) {
    		// alert("Error");
    	});
    };
    
    // Method to full the "elenchi" used in the app
    $scope.getElenchi = function() {
    	$http({
    		method : 'GET',
    		url : baseUrlWS + '/service.epu/Elenchi',
    		params : {
    			idEnte:"24",
    			userIdentity: "DBSMRA58D05E500V"
    		},
    		headers : $scope.authHeaders
    	}).success(function(data) {
    		//var returnedObj = JSON.stringify(data);
    		// Split data into differents objects
    		$scope.listaComuni = data.comuni;
    		$scope.listaAmbiti = data.ambitiTerritoriali;
    	}).error(function(data) {
    	});
    };
    
    // Used to update the alloggioOccupato data
    $scope.updateAlloggioOccupato = function(alloggioOccupato){
    	var alloggio = {
        		domandaType : {
        				alloggioOccupatoType : alloggioOccupato,
        				idDomanda : $scope.practice.idObj,
        				versione: $scope.practice.versione
        			},
        		idEnte : "24",
        		userIdentity : "DBSMRA58D05E500V"
        	};
    	
    	var value = JSON.stringify(alloggio);
    	console.log("Alloggio Occupato : " + value);
    	$http({
            method : 'POST',
            url : baseUrlWS + '/service.epu/AggiornaPratica',
            params : {},
            headers : $scope.authHeaders,
            data: value
        }).success(function(data) {
        	$dialogs.notify("Successo","Modifica Alloggio Occupato avvenuta con successo.");
        	var returned = data;
        }).error(function() {
        	$dialogs.error("Modifica Dati Alloggio non riuscita.");
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
        		userIdentity : "DBSMRA58D05E500V"
        	};
    	
    	var value = JSON.stringify(residenzaCor);
    	console.log("Residenza : " + value);
    	$http({
            method : 'POST',
            url : baseUrlWS + '/service.epu/AggiornaPratica',
            params : {},
            headers : $scope.authHeaders,
            data: value
        }).success(function(data) {
        	var returned = data;
            $dialogs.notify("Successo","Modifica Residenza avvenuta con successo.");
        	
        }).error(function() {
        	$dialogs.error("Modifica Residenza non riuscita.");
        });
    };
    
    // Method to update the "componenteNucleoFamiliare" data
    $scope.updateComponenteVariazioni = function(componenteVariazioni){
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
	    			parentelaStatoCivileModificareType : {
	    				componenteModificareType : [{
	    					idNucleoFamiliare: $scope.nucleo.idObj,
	    					idObj: componenteVariazioni.idObj,
	    					richiedente: componenteVariazioni.richiedente,
	    					parentela: componenteVariazioni.parentela,
	    					statoCivile: componenteVariazioni.statoCivile
	    				}],
	    			},
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
	    		userIdentity : "DBSMRA58D05E500V"
	    	};
		
		var value = JSON.stringify(nucleo);
		console.log("Nucleo Familiare : " + value);
		$http({
	        method : 'POST',
	        url : baseUrlWS + '/service.epu/AggiornaPratica',
	        params : {},
	        headers : $scope.authHeaders,
	        data: value
	    }).success(function(data) {
	        $dialogs.notify("Successo","Modifica dati Componente avvenuta con successo.");
	        var returned = data;
	        
	    }).error(function() {
	    	$dialogs.error("Modifica Dati Componente non riuscita.");
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
	    		userIdentity : "DBSMRA58D05E500V"
	    	};
    	
    	var value = JSON.stringify(nucleoCor);
    	console.log("Nucleo Extra Info : " + value);
    	$http({
            method : 'POST',
            url : baseUrlWS + '/service.epu/AggiornaPratica',
            params : {},
            headers : $scope.authHeaders,
            data: value
        }).success(function(data) {
        	$dialogs.notify("Successo","Modifica Nucleo avvenuta con successo.");
        	var returned = data;
        	
        }).error(function() {
        	$dialogs.error("Modifica Nucleo non riuscita.");
        });
    };
    
    // Method to retrieve the practice "richiedente"
    $scope.getComponenteRichiedente = function(){
    	//var richiedente = null;
    	var componentiLength = $scope.componenti.length;
    	var trovato = false;
    	for(var i = 0; i < componentiLength && !trovato; i++){
    		//console.log("Componente : " + JSON.stringify($scope.componenti[i]));
    		if($scope.componenti[i].richiedente == true){
    			$scope.richiedente = $scope.componenti[i];
    			//console.log("Richiedente trovato : " + JSON.stringify($scope.richiedente));
    			$scope.getComuneById($scope.richiedente.persona.idComuneNascita);
    		}
    	}
    	//return $scope.richiedente;
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
    			console.log("Componente caricato : " + JSON.stringify($scope.componenteTmpEdit));
    		}
    	}
    };
    
    // Method to save the component variations
    $scope.salvaComponente = function(componenteVariazioni){
    	$scope.showEditComponents = false;
    	// richiamo a modifica nucleo famigliare componenti
    	console.log("Dati componente modificato: " + JSON.stringify(componenteVariazioni));
    	$scope.updateComponenteVariazioni(componenteVariazioni);
    };
    
    // Method to get the "comune" description by the id
    $scope.getComuneById = function(id){
    		if(id != null){
    		var description = "";
    		if($scope.listaComuni != null){
    			var found = $filter('idToMunicipality')($scope.listaComuni, id);
    			console.log(found);
        		//$scope.selected = JSON.stringify(found);
    			if(found != null){
    				description = found.descrizione;
    			}
    		}
    		$scope.comuneById = description;
    	} else {
    		$scope.comuneById = "";
    	}
    };
    
    //---------------Eco_index Section----------------
    $scope.edit_ecoIndex = false;
    $scope.ecoInfoDetails = false;
    
    $scope.showEcoInfo = function(){
    	$scope.ecoInfoDetails = true;
    };
    
    $scope.hideEcoInfo = function(){
    	$scope.ecoInfoDetails = false;
    };
    
    $scope.editEcoIndex = function(){
    	$scope.edit_ecoIndex = true;
    };
    
    $scope.saveEcoIndex = function(data){
    	$scope.edit_ecoIndex = false;
    };    
    //---------------End Eco_index Section------------
    
    //---------------Practice Family Info-------------
    $scope.edit_infoAssegnaz = false;
    
    $scope.edit_info = function(){
    	$scope.edit_infoAssegnaz = true;
    };
    
    $scope.save_info = function(nucleo){
    	$scope.updateNFVarie(nucleo);
    	$scope.edit_infoAssegnaz = false;
    };
    //------------ End Practice Family Info-------------
    
    
    // ------------------------------------------------------------------------------------------------------------------

    //---------------Sezione Stampa dati Domanda-----------
    $scope.stampaScheda = function(){
    	var stampaScheda = {
    		idEnte: "24",
    		userIdentity: "DBSMRA58D05E500V",
    		idDomanda: 5563259, //$scope.practice.idObj,
    		tipoStampa: "SCHEDA_DOMANDA"
    	};
    	
    	var value = JSON.stringify(stampaScheda);
    	console.log("Dati scheda domanda : " + value);
    	$http({
            method : 'POST',
            url : '/service.epu/StampaJSON',
            params : {},
            headers : $scope.authHeaders,
            data: value
        }).success(function(data) {
        	$scope.scheda = data;
        	
        }).error(function() {
        	$dialogs.error("Errore Caricamento dati Domanda.");
        });
    };
    
    
    //-----------------------------------------------------
    
    
    
    
    
    // This method will connect to a ws. Actually it work locally
    $scope.getMunicipalityById = function(cod){
    	var found = $filter('getById')($scope.municipalities, cod);
    	console.log(found);
        //$scope.selected = JSON.stringify(found);
        return found.name;
    };
    
    $scope.update = function(data) {
    	//console.log("req id " + id + " ,citizenId " + $scope.citizenId );
    	$scope.initForm = false;
    	$scope.practice = data;
    	//$scope.savePractice(data);
    };
    
    
    $scope.applicant = {};	// object for applicant
    $scope.member = {};		// object for menber
    //$scope.elem_member = {};// element member in list
    $scope.members = [];	// list for family
    
    $scope.insertApplicant = function(data){
    	$scope.applicant = data;
    	//$scope.members.push($scope.applicant);
    	$scope.applicantInserted = true;
    };
    
    $scope.saveApplicant = function(data){
    	$scope.applicant = data;
    	$scope.showMembers = true;
    	$scope.members.push($scope.applicant);
    };
    
    $scope.editApplicant = function(){
    	$scope.applicantInserted = false;
    };
    
    $scope.addMember = function(){
    	$scope.newMemberShow = true;
    };
    
    $scope.insertMember = function(data){
    	$scope.member = data;
    	//$scope.members.push($scope.member);
    	$scope.newMemberShow = false;
    	$scope.newMemberInserted = true;
    };
    
    $scope.saveMember = function(data){
    	$scope.member = data;
    	$scope.showMembers = true;
    	$scope.members.push($scope.member);
    	$scope.member = {};		// clear the member
    	$scope.newMemberInserted = false;
    };
    
    $scope.editMember = function(data){
    	$scope.newMemberInserted = false;
    };
    
    //$rootScope.frameOpened = $location.path().endsWith('/Practice/new/add');
    $rootScope.frameOpened = $location.path().match("^/Practice/new/add");
    
    
    $scope.isPracticeFrameOpened = function(){
    	return sharedDataService.isOpenPracticeFrame();
    };
                  	
    $scope.showPractice = function(){
    	sharedData.setShowHome(true);
    };
                  	
    $scope.newPracticeJsp = function(){
        window.location.href = 'html/new_practice.jsp';
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
    $scope.numberOfPages = function(){
        return Math.ceil($scope.practices.length/$scope.maxPractices);
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
                  	
    $scope.getPractice = function(id) {
    	//console.log("req id " + id + " ,citizenId " + $scope.citizenId );
    	$http({
    		method : 'GET',
    		url : 'rest/citizen/' + $scope.citizenId + '/practice/' + id,
    		params : {},
    		headers : $scope.authHeaders
    	}).success(function(data) {
    		$scope.practice = data;
    	}).error(function(data) {
    		// alert("Error");
    	});
    };
                  	
    $scope.getPracticesByType = function(type) {
    	$http({
    		method : 'GET',
    		url : 'rest/citizen/' + $scope.citizenId + '/practice/type/' + type,
    		params : {},
    		headers : $scope.authHeaders,
    	}).success(function(data) {
    		$scope.practices = data;
    	}).error(function(data) {
    		// alert("Error");
    	});
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