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
    
    $scope.userCF = sharedDataService.getUserIdentity(); 
    
    //$scope.isLoading = sharedDataService.isLoading();
    
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
    sharedDataService.setMail(user_mail);
    
    $scope.getUserName = function(){
  	  return sharedDataService.getName();
    };
    
    $scope.getUserSurname = function(){
  	  return sharedDataService.getSurname();
    };
    
    $scope.getMail = function(){
      return sharedDataService.getMail();
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

cp.controller('PracticeCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$route', '$location', '$dialogs', 'sharedDataService', '$filter', 'invokeWSService',
                       function($scope, $http, $routeParams, $rootScope, $route, $location, $dialogs, sharedDataService, $filter, invokeWSService, $timeout) { 
	this.$scope = $scope;
    $scope.params = $routeParams;
    
    $scope.isUeCitizen = function(){
    	return sharedDataService.getUeCitizen();
    };
 
    $scope.userCF = sharedDataService.getUserIdentity();
    
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
//    $scope.tabs = [ 
//      { title:'Creazione', index: 1, content:"partials/practice/create_form.html"},
//      { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled: true},
//      { title:'Nucleo - Richiedente', index: 3, content:"partials/practice/family_form_ric.html", disabled: true },
//      { title:'Nucleo - Componenti', index: 4, content:"partials/practice/family_form_comp.html", disabled: true },
//      { title:'Nucleo - Dettagli', index: 5, content:"partials/practice/family_form_det.html", disabled: true },
//      { title:'Nucleo - Assegnazione', index: 6, content:"partials/practice/family_form_ass.html", disabled: true },
//		{ title:'Nucleo - Indicatori', index: 7, content:"partials/practice/family_form_eco.html" , disabled: true },
//    	{ title:'Verifica Domanda', index: 7, content:"partials/practice/practice_state.html", disabled: true},
//    	{ title:'Paga', index: 8, content:"partials/practice/practice_sale.html", disabled: true },
//    	{ title:'Sottometti', index: 9, content:"partials/practice/practice_cons.html", disabled: true }
//    ];
    
    // For test all the tabs are active
    $scope.tabs = [ 
        { title:'Creazione', index: 1, content:"partials/practice/create_form.html" },
        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html" },
        { title:'Nucleo - Richiedente', index: 3, content:"partials/practice/family_form_ric.html" },
        { title:'Nucleo - Componenti', index: 4, content:"partials/practice/family_form_comp.html" },
        { title:'Nucleo - Dettagli', index: 5, content:"partials/practice/family_form_det.html" },
        { title:'Nucleo - Assegnazione', index: 6, content:"partials/practice/family_form_ass.html" },
        //{ title:'Nucleo - Indicatori', index: 7, content:"partials/practice/family_form_eco.html" },
        { title:'Verifica Domanda', index: 7, content:"partials/practice/practice_state.html" },
        { title:'Paga', index: 8, content:"partials/practice/practice_sale.html" },
        { title:'Sottometti', index: 9, content:"partials/practice/practice_cons.html" }
    ];
    
    //$scope.tabIndex = 0;
    
    $scope.setNextButtonLabel = function(value){
    	$scope.buttonNextLabel = value;
    };
    
    var fInit = true;
    $scope.initForm = function(){
    	$scope.setNextButtonLabel("Salva e continua");
    	return fInit;
    };
    
    // Method nextTab to switch the input forms to the next tab and to call the correct functions
    $scope.nextTab = function(value, type, param1, param2, param3, param4){
    	fInit = false;
    	if(!value){		// check form invalid
    		switch(type){
    			case 1:	// CreaPratica
    				$scope.setLoading(true);
    				$scope.createPracticeTest(param1, param2, param3, param4);
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
    				break;
    			case 3:
    				//console.log("---------------Caso 3 nextTab---------------");
    				//$scope.updateNucleoFamiliare(param1);
    				break;
    			case 4:
    				$scope.initFamilyTabs();
    				break;
    			case 6:
    				$scope.stampaScheda();
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
    	    	//console.log("Tabs active [" + $scope.tabIndex + "] " + $scope.tabs[$scope.tabIndex].active);
    		} else {
    			$scope.setNextButtonLabel("Termina");
    		}
    		fInit = true;
    	}
    };
    
    $scope.prevTab = function(){
    	if($scope.tabIndex !== 0 ){
    		$scope.setNextButtonLabel("Salva e continua");
    	    $scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
    	    $scope.tabIndex--;								// increment tab index
    	    $scope.tabs[$scope.tabIndex].active = true;		// active new tab	
    	}
    };
    
    $scope.setIndex = function($index){
    	$scope.tabIndex = $index;
    };
    
    // -------------------For manage components tabs-----------------
    
    $scope.setComponentsEdited = function(value){
    	$scope.allComponentsEdited = value;
    };
    
    $scope.hideArrow = function(value){
    	$scope.isArrowHide = value;
    };
    
    $scope.initFamilyTabs = function(){
    	$scope.setNextLabel("Prossimo Componente");
    	$scope.family_tabs = [];
    	for(var i = 0; i < $scope.componenti.length; i++){
    		$scope.family_tabs.push({
    			title : $scope.componenti[i].persona.nome + " " + $scope.componenti[i].persona.cognome,
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
    	
    	$scope.setComponentsEdited(false);
    };
    
    $scope.setNextLabel = function(value){
    	$scope.buttonNextLabelFamily = value;
    };
    //$scope.buttonNextLabelFamily = "Prossimo Componente";
    
    $scope.setIndexFamily = function($index){
    	$scope.tabFamilyIndex = $index;
    };

    $scope.nextFamilyTab = function(value, componenteVar, disability){
    	fInit = false;
    	if(!value){		// check form invalid
    		//console.log("Componente comune residenza : " + componenteVar.variazioniComponente.idComuneResidenza);
    		$scope.salvaComponente(componenteVar, disability);
	    	// After the end of all operations the tab is swithced
	    	if($scope.tabFamilyIndex !== ($scope.componenti.length -1) ){
	    		if($scope.tabFamilyIndex == ($scope.componenti.length -2)) {
	    			$scope.setNextLabel("Termina e Salva");
	    			$scope.hideArrow(true);
	    		}
	    	   	$scope.family_tabs[$scope.tabFamilyIndex].active = false;	// deactive actual tab
	    	   	$scope.tabFamilyIndex++;									// increment tab index
	    	   	$scope.family_tabs[$scope.tabFamilyIndex].active = true;		// active new tab
	    	   	$scope.family_tabs[$scope.tabFamilyIndex].disabled = false;	
	    	   	//console.log("Tabs active [" + $scope.tabFamilyIndex + "] " + $scope.family_tabs[$scope.tabFamilyIndex].active + " di " + $scope.family_tabs.length);
	    	} else {
	    		$scope.setComponentsEdited(true);
	    	}
    	}
    	fInit = true;
    	//console.log("Tab index " + $scope.tabIndex);
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
          {value: 'CANONE_CONCORDATO', title:'Canone concordato (3 anni + 2 anni)'},
          {value: 'NESSUNO', title:'Nessuno'}
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
          {code:'SI' , title: 'Si'},
          {code:'NO' , title: 'No'}
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
    $scope.datePattern=/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/i;
    $scope.datePattern2=/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i;
    $scope.datePattern3=/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/i;
    $scope.timePattern=/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    
//    $scope.exportPortfolio = function(portfolio) {
//        $scope.setLoading(true);
//
//        if ( !! portfolio.id) {
//            $http({
//                method: 'GET',
//                url: 'rest/generatecv/' + portfolio.id + '/pdf/true',
//                headers: {
//                    'Authorization': $scope.getToken(),
//                    'Content-Type': 'text/plain;charset=x-user-defined'
//                }
//            }).
//            success(function(data, status, headers, config) {
//                $scope.setLoading(false);
//                var encoded = encodeURIComponent(data);
//                $scope.pdfbase64 = 'data:application/pdf;base64,' + encoded;
//                // window.open($scope.pdfbase64);
//                // var elem = $('#download_cv_pdf_do')[0];
//                // elem.click();
//
//                var blob = $scope.b64toBlob(data, 'application/json');
//                saveAs(blob, portfolio.content.name + '.pdf')
//            }).
//            error(function(data, status, headers, config) {
//                $scope.setLoading(false);
//            });
//        }
//    }; 
    
    // ----------------------------- Section for Anni Residenza, Anzianità lavorativa e Disabilità ----------------------------
    $scope.storicoResidenza = [];
    $scope.sr = {};
    
    $scope.showSRForm = function(){
    	$scope.setSRFormVisible(true);
    };
    
    $scope.hideSRForm = function(){
    	$scope.setSRFormVisible(false);
    };
    
    $scope.setSRFormVisible = function(value){
    	$scope.isSRFormVisible = value;
    };
    
    $scope.addStoricoRes = function(value){
    	var fromDate = new Date(value.dataDa);
    	var toDate = new Date(value.dataA);
    	value.id = $scope.storicoResidenza.length;
    	value.difference = toDate.getTime() - fromDate.getTime();
    	//console.log("Tot millisecond between start and end date : " + value.difference);
    	var newStorico = angular.copy(value);
    	$scope.storicoResidenza.push(newStorico);
    	value = {};	// try to clear the element
    };
    
    $scope.deleteStoricoRes = function(value){
    	$scope.storicoResidenza.splice(value.id, 1);
    };
    
    $scope.calcolaStoricoRes = function(ft_component){
    	var totMillis = 0;
    	var totMillisInYear = 1000 * 60 * 60 * 24 * 365; // I consider an year of 365 days
    	for(var i = 0; i < $scope.storicoResidenza.length; i++){
    		if($scope.storicoResidenza[i].idComuneResidenza == ft_component.variazioniComponente.idComuneResidenza){
    			totMillis += $scope.storicoResidenza[i].difference;
    		}
    	}
    	var anniRes = totMillis/totMillisInYear;
    	$scope.setAnni(Math.round(anniRes), ft_component, 1);
    	$scope.setSRFormVisible(false);
    };
    
    // Method setAnni: used with param type == 1 -> to update "anniResidenza";
    // 				   used with param type == 2 -> to update "anniLavoro";	
    $scope.setAnni = function(value, ft_component, type){
    	// find the righ componente in $scope.componenti
    	for(var i = 0; i < $scope.componenti.length; i++){
    		if($scope.componenti[i].idObj == ft_component.idObj){
    			if(type == 1){
    				$scope.componenti[i].variazioniComponente.anniResidenza = value;
    			} else {
    				$scope.componenti[i].variazioniComponente.anniLavoro = value;
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
    	}
    	$scope.setAnni(value.anniLavoro, ft_component, 2);
    	$scope.setALFormVisible(false);
    };

    $scope.showDisForm = function(componente){
    	if(componente.catDis == null && componente.gradoDis == null){
    		$scope.invalid_age = 'noDis';
    	}
    	$scope.setDisFormVisible(true);
    };
    
    $scope.hideDisForm = function(){
    	$scope.setDisFormVisible(false);
    };
    
    $scope.setDisFormVisible = function(value){
    	$scope.isDisFormVisible = value;
    };
    
    $scope.extraDis = {};
    $scope.dis = {};
    
    $scope.calcolaCategoriaGradoDisabilita = function(){
    	$scope.hideDisForm();
    };
    
    $scope.resetDisabilita = function(component){
    	$scope.invalid_age = 'noDis';
    };
    
    
    
    
    // --------------------------- End Section for Anni Residenza, Anzianità lavorativa e Disabilità -------------------------
    
    //$scope.disability = {};
    //$scope.clearDisabilityCat = function(){
    //	$scope.disability.categoriaDisabilita = null;
    //};
    
    // Object and Method to check the correct relation between the rooms and the family components
    $scope.infoAlloggio = {};
    $scope.checkInidoneo = function(){
    	var suggestRooms = 0;
    	var correctRooms = false;
    	//console.log("Occupanti alloggio e stanze da letto " + $scope.infoAlloggio.ocupantiAlloggio + " - " + $scope.infoAlloggio.stanzeLetto);
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
    	//console.log("Verifica controllo inidoneo : " + $scope.isInidoneoForRoomsNum);
    };
    
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
    		userIdentity : $scope.userCF
    	};
    	
    	var value = JSON.stringify(pratica);
    	console.log("Json value " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSService.getProxy(method, "CreaPratica", null, $scope.authHeaders, value);	

    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			// Here I call the getPracticeMethod
    			idDomandaAll = result.domanda.idObj; //5563259; //returned.domanda.idObj;
            	$scope.getPracticeData(idDomandaAll);
            	// Retrieve the elenchi info
                $scope.getElenchi();
    		} else {
    			$scope.setLoading(false);
    			$dialogs.error("Creazione Pratica non riuscita.");
    		}
    	});	
    		
//    	$http({
//            method : 'POST',
//            url : baseUrlWS + '/service.epu/CreaPratica',
//            params : {},
//            headers : $scope.authHeaders,
//            data: value
//        }).success(function(data) {
//        	var returned = data;
//        	// Here I call the getPracticeMethod
//        	idDomandaAll = returned.domanda.idObj; //5563259; //returned.domanda.idObj;
//        	$scope.getPracticeData(idDomandaAll);
//        	// Retrieve the elenchi info
//            $scope.getElenchi();
//        	
//        }).error(function() {
//        	$dialogs.error("Creazione Pratica non riuscita.");
//        });
    	
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
        $scope.getPracticeData(idDomandaAll); 
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
    $scope.getPracticeData = function(idDomanda) {
    		
    	var method = 'GET';
    	var params = {
    		idDomanda:idDomanda,
    		idEnte:"24",
    		userIdentity: $scope.userCF
    	};
    	
    	var myDataPromise = invokeWSService.getProxy(method, "GetDatiPratica", params, $scope.authHeaders, null);	

    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
	    		$scope.practice = result.domanda;
	    		
	    		// split practice data into differents objects
	    		$scope.extracomunitariType = $scope.practice.extracomunitariType;
	    		$scope.residenzaType = $scope.practice.residenzaType;
	    		$scope.nucleo = $scope.practice.nucleo;
	    		$scope.setComponenti($scope.nucleo.componente);
	    		//console.log("Dati componenti : " + JSON.stringify($scope.componenti));
	    		$scope.indicatoreEco = $scope.nucleo.indicatoreEconomico;
	    		
	    		$scope.setLoading(false);
	    		$dialogs.notify("Successo","Creazione Pratica " + result.domanda.identificativo + " avvenuta con successo.");
    		} else {
    			$scope.setLoading(false);
	    		$dialogs.error("Errore Creazione nuova Pratica");
    		}
    	});
    	
    };
    
    $scope.setComponenti = function(value){
    	$scope.componenti = value;
    };
    
    // Method to full the "elenchi" used in the app
    $scope.getElenchi = function() {
    	
    	var method = 'GET';
    	var params = {
			idEnte:"24",
			userIdentity: $scope.userCF
		};
    	var myDataPromise = invokeWSService.getProxy(method, "Elenchi", params, $scope.authHeaders, null);
    	myDataPromise.then(function(result){
    		$scope.listaComuni = result.comuni;
        	$scope.listaAmbiti = result.ambitiTerritoriali;
        	//console.log("Elenchi caricati. Comuni : " + JSON.stringify($scope.listaComuni));
        	//console.log("Elenchi caricati. Ambiti : " + JSON.stringify($scope.listaAmbiti));
    	});
    };
    
    // Used to update the alloggioOccupato data
    $scope.updateAlloggioOccupato = function(residenza,alloggioOccupato){
    	var alloggio = {
        	domandaType : {
        		residenzaType : residenza,
        		alloggioOccupatoType : alloggioOccupato,
        		idDomanda : $scope.practice.idObj,
        		versione: $scope.practice.versione
        	},
        	idEnte : "24",
        	userIdentity : $scope.userCF
        };
    	
    	var value = JSON.stringify(alloggio);
    	console.log("Alloggio Occupato : " + value);
    	var method = 'POST';
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
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
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
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
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
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
    };
    
    // Method to update the "parentelaStatoCivile" data of every family member 
    $scope.salvaModificheSC = function(){
    	$scope.setLoadingPSC(true);
    	var onlyParentelaESC = [];
    	for (var i = 0; i < $scope.componenti.length; i++){
    		var p_sc = {
    			idNucleoFamiliare: 	$scope.componenti[i].idNucleoFamiliare,
    			idObj: $scope.componenti[i].idObj,
				richiedente: $scope.componenti[i].richiedente,
				parentela: $scope.componenti[i].parentela,
				statoCivile: $scope.componenti[i].statoCivile
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
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$dialogs.notify("Successo","Modifica Dati di parentela e stato civile dei Componenti avvenuta con successo.");
    		} else {
    			$dialogs.error("Modifica Dati di parentela e stato civile dei Componenti non riuscita.");
    		}
    		$scope.setLoadingPSC(false);
    		
    	});
    
    };
    
    // Method to update the "componenteNucleoFamiliare" data
    $scope.updateComponenteVariazioni = function(componenteVariazioni, disability){
    	
    	// for extra disability: blind and/or mute
//    	if($scope.extraDis.cieco || $scope.extraDis.sordoMuto){
//    		componenteVariazioni.variazioniComponente.gradoInvalidita = 100;
//    		//$scope.extraDis = angular.copy({});
//    	}
//    	
//    	// to correct disability type and level
//    	if(componenteVariazioni.variazioniComponente.categoriaInvalidita != null){
//	    	if(componenteVariazioni.variazioniComponente.categoriaInvalidita == 1){
//	    		componenteVariazioni.variazioniComponente.gradoInvalidita = 0;	
//	    	} else {
//	    		componenteVariazioni.variazioniComponente.gradoInvalidita = 100;
//	    	}
//    	} else {
//    		componenteVariazioni.variazioniComponente.categoriaInvalidita = null;
//    	}
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
    		componenteVariazioni.variazioniComponente.categoriaInvalidita = null;
    		componenteVariazioni.variazioniComponente.gradoInvalidita = disability.gradoDis;
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
//	    		parentelaStatoCivileModificareType : {
//	    			componenteModificareType : [{
//	    				idNucleoFamiliare: $scope.nucleo.idObj,
//	    				idObj: componenteVariazioni.idObj,
//	    				richiedente: componenteVariazioni.richiedente,
//	    				parentela: componenteVariazioni.parentela,
//	    				statoCivile: componenteVariazioni.statoCivile
//	    			}],
//	    		},
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
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
    	myDataPromise.then(function(result){
    		if(result.esito == 'OK'){
    			$scope.setLoading(false);
    			$dialogs.notify("Successo","Modifica dati Componente avvenuta con successo.");
    		} else {
    			$scope.setLoading(false);
    			$dialogs.error("Modifica Dati Componente non riuscita.");
    		}
    		//$scope.disability.categoriaInvalidita = null; // Clear the content of the object
    		//$scope.disability.gradoInvalidita = null;
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
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
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
    	//var richiedente = null;
    	var componentiLength = $scope.componenti.length;
    	var trovato = false;
    	for(var i = 0; i < componentiLength && !trovato; i++){
    		//console.log("Componente : " + JSON.stringify($scope.componenti[i]));
    		if($scope.componenti[i].richiedente == true){
    			$scope.setComponenteRichiedente($scope.componenti[i]);
    			//console.log("Richiedente trovato : " + JSON.stringify($scope.richiedente));
    			//$scope.getComuneById($scope.richiedente.persona.idComuneNascita);
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
    			//console.log("Componente caricato : " + JSON.stringify($scope.componenteTmpEdit));
    		}
    	}
    };
    
    // Method to save the component variations
    $scope.salvaComponente = function(componenteVariazioni, disability){
    	$scope.setLoading(true);
    	$scope.showEditComponents = false;
    	// richiamo a modifica nucleo famigliare componenti
    	//console.log("Dati componente modificato: " + JSON.stringify(componenteVariazioni));
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
        		//$scope.selected = JSON.stringify(found);
    			if(found != null){
    				description = found.descrizione;
    				//console.log("Comune trovato: " + description);
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
    
    $scope.changeRichiedente = function(){
    	$scope.OldRichiedente = angular.copy($scope.richiedente.idObj);
    	//$scope.IdRichiedente = $scope.richiedente.idObj;
    	$scope.setChangeRichiedente(true);
    };
    
    $scope.saveRichiedente = function(){
    	$scope.setLoadingRic(true);
    	//console.log("Id nuovo richiedente : " + $scope.IdRichiedente);
    	$scope.switchRichiedente();
    	$scope.getComponenteRichiedente();
    	$scope.setChangeRichiedente(false);
    };
    
    // Function to swith user "richiedente" between the family members
    $scope.switchRichiedente = function(){
    	
    	var new_richiedente = $scope.richiedente.idObj;
    	console.log("Richiedente attuale : " + new_richiedente + ", richiedente vecchio : " + $scope.OldRichiedente);
    	
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
    	var myDataPromise = invokeWSService.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
    	
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
    
    //------------------------------------------------
    
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

    //---------------Sezione Stampa dati Domanda-----------
    $scope.stampaScheda = function(){
    	var stampaScheda = {
    		idEnte: "24",
    		userIdentity: $scope.userCF,
    		idDomanda: $scope.practice.idObj,
    		tipoStampa: "SCHEDA_DOMANDA"
    	};
    	
    	var value = JSON.stringify(stampaScheda);
    	//console.log("Dati scheda domanda : " + value);
    	
    	var method = 'POST';
    	var myDataPromise = invokeWSService.getProxy(method, "StampaJSON", null, $scope.authHeaders, value);	

    	myDataPromise.then(function(result){
    		$scope.scheda = result;	
    		console.log("Scheda stampata " + JSON.stringify(result));
	    	$scope.setLoading(false);
    	});
    	
//    	$http({
//            method : 'POST',
//            url : '/service.epu/StampaJSON',
//            params : {},
//            headers : $scope.authHeaders,
//            data: value
//        }).success(function(data) {
//        	$scope.scheda = data;
//        	
//        }).error(function() {
//        	$dialogs.error("Errore Caricamento dati Domanda.");
//        });
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