'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers');

cp.controller('PracticeCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$route', '$location', '$dialogs', 'sharedDataService', '$filter', 'invokeWSService', 'invokeWSServiceProxy', 'invokePdfServiceProxy', 'getMyMessages', '$base64',
                               function($scope, $http, $routeParams, $rootScope, $route, $location, $dialogs, sharedDataService, $filter, invokeWSService, invokeWSServiceProxy, invokePdfServiceProxy, getMyMessages, $base64, $timeout) { 
	this.$scope = $scope;
    $scope.params = $routeParams;
    $scope.showLog = true;
    
    var cod_ente = "24";
            
    // ------------------ Start datetimepicker section -----------------------
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        //$scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
         return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
         $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.initDate = new Date();
    $scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
              
    //---------------- End datetimepicker section------------
            
    $scope.info_panel_ass = function(){
    	return sharedDataService.getInfoPanelAss();
    }; 
            
    $scope.hideInfoAss = function(){
    	sharedDataService.setInfoPanelAss(false);
       	//$scope.info_panel_ass = false;
    };
            
    $scope.showInfoAss = function(){
    	sharedDataService.setInfoPanelAss(true);
       	//$scope.info_panel_ass = true;
    };
            
    $scope.info_panel_loc = function(){
    	return sharedDataService.getInfoPanelLoc();
    };
            
    $scope.hideInfoLoc = function(){
    	sharedDataService.setInfoPanelLoc(false);
       	//$scope.info_panel_loc = false;
    };
            
    $scope.showInfoLoc = function(){
    	sharedDataService.setInfoPanelLoc(true);
       	//$scope.info_panel_loc = true;
    };
            
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
            
    $scope.extracomunitariType = {};
    $scope.residenzaType = {};
    $scope.componenteTmpEdit = {};
            
    $scope.getFamilyAllowaces = function(){
       	var tmp = sharedDataService.isFamilyAllowances();
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
        { title:'Creazione', index: 1, content:"partials/practice/create_form.html" },
        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled:true },
        { title:'Nucleo - Richiedente', index: 3, content:"partials/practice/family_form_ric.html", disabled:true },
        { title:'Nucleo - Componenti', index: 4, content:"partials/practice/family_form_comp.html", disabled:true },
        { title:'Nucleo - Dettagli', index: 5, content:"partials/practice/family_form_det.html", disabled:true },
        { title:'Nucleo - Assegnazione', index: 6, content:"partials/practice/family_form_ass.html", disabled:true },
        { title:'Verifica Domanda', index: 7, content:"partials/practice/practice_state.html", disabled:true },
        { title:'Paga', index: 8, content:"partials/practice/practice_sale.html", disabled:true },
        { title:'Sottometti', index: 9, content:"partials/practice/practice_cons.html", disabled:true }
    ];
            
    // For test all the tabs are active
//  $scope.tabs = [ 
//     { title:'Creazione', index: 1, content:"partials/practice/create_form.html" },
//     { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html" },
//     { title:'Nucleo - Richiedente', index: 3, content:"partials/practice/family_form_ric.html" },
//     { title:'Nucleo - Componenti', index: 4, content:"partials/practice/family_form_comp.html" },
//     { title:'Nucleo - Dettagli', index: 5, content:"partials/practice/family_form_det.html" },
//     { title:'Nucleo - Assegnazione', index: 6, content:"partials/practice/family_form_ass.html" },
//     { title:'Verifica Domanda', index: 7, content:"partials/practice/practice_state.html" },
//     { title:'Paga', index: 8, content:"partials/practice/practice_sale.html" },
//     { title:'Sottometti', index: 9, content:"partials/practice/practice_cons.html" }
//  ];
            
     //$scope.tabIndex = 0;
     $scope.checkMail = function(){
        if((sharedDataService.getMail() == null) || (sharedDataService.getMail() == '')){
        	 return false;
        } else {
        	return true;
        }
     };
            
     $scope.tmp_user = {};
         
     // ----------------------- Block that manage the tab switching (in practice creation) ---------------------------
     $scope.setCreationTabs = function(){
      	$scope.getElenchi();
       	$scope.setFrameOpened(true);
     };
            
     $scope.setNextButtonLabel = function(value){
       	$scope.buttonNextLabel = value;
     };
            
     var fInit = true;
     $scope.initForm = function(){
    	 $scope.setNextButtonLabel(sharedDataService.getTextBtnNext());
       	
       	return fInit;
     };
            
     $scope.setDefaultTabs = function(){
       	$scope.setFrameOpened(false);
     };
            
     // Method nextTab to switch the input forms to the next tab and to call the correct functions
     $scope.nextTab = function(value, type, param1, param2, param3, param4){
//     var stringaTest = getMyMessages.promiseToHaveData("ass_practice_title");	 
//     $dialogs.notify("Attenzione", stringaTest);
     fInit = false;
       	if(!value){		// check form invalid
            switch(type){
            	case 1:	// CreaPratica
            		if(!$scope.checkStoricoStruct()){
            			//$dialogs.error("Nessuna struttura di recupero inserita! E' obbigatorio specificarne i dati per il componente che ne e' stato ospite.");
            			$dialogs.error(sharedDataService.getMsgErrCreationNoRec());
            			break;
            		}
            		$scope.setLoading(true);
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
            		$scope.continueNextTab();
            		break;
            	case 3:
            		//$scope.updateNucleoFamiliare(param1);
            		$scope.setCompEdited(false);
            		$scope.continueNextTab();
            		break;
            	case 4:
            		$scope.initFamilyTabs();
            		$scope.continueNextTab();
            		break;
            	case 5:
            		if($scope.checkComponentsData() == true){
            			$scope.checkMergingMail(param1);
            			$scope.continueNextTab();
            		} else {
            			$dialogs.error($scope.getCheckDateContinuosError());
            		}
            		break;
            	case 6:
            		$scope.stampaScheda($scope.practice.idObj);
            		$scope.continueNextTab();
            		break;
            	case 7:
            		$scope.continueNextTab();
            		break;	
            	case 8:
            		$scope.setLoading(true);
            		$scope.payPratica(1);
            		//$scope.continueNextTab();
            		break;
            	case 9:
            		$scope.protocolla();
            		$scope.deletePdf(param1);
            		break;
            	case 10:
            		$scope.rifiuta();
            		$scope.deletePdf(param1);
            		break;	
            	default:
            		break;
            	}		
            fInit = true;
        }
     };
            
     $scope.continueNextTab = function(){
    	 // After the end of all operations the tab is swithced
    	 if($scope.tabIndex !== ($scope.tabs.length -1)){
        	$scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
        	$scope.tabIndex++;								// increment tab index
        	$scope.tabs[$scope.tabIndex].active = true;		// active new tab
        	$scope.tabs[$scope.tabIndex].disabled = false;
        } else {
        	$scope.setNextButtonLabel(sharedDataService.getTextBtnEnd());
        }
     };
            
     $scope.prevTab = function(){
       	if($scope.tabIndex !== 0 ){
       		$scope.getPracticeData(sharedDataService.getIdDomanda(),3);
       		$scope.setNextButtonLabel(sharedDataService.getTextBtnNext());
       	    $scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
       	    $scope.tabIndex--;								// increment tab index
       	    $scope.tabs[$scope.tabIndex].active = true;		// active new tab	
       	}
     };
            
     $scope.setIndex = function($index){
       	$scope.tabIndex = $index;
     };    
     // --------------------- End of Block that manage the tab switching (in practice creation) ----------------------
     
     // ----------------------- Block that manage the tab switching (in practice editing) ---------------------------
     var tabEditIndex = 0;
            
     $scope.setEditTabs = function(practiceIdToEdit){
       	$scope.getElenchi();
       	$scope.setFrameOpened(true);
     };
            
     $scope.editTabs = [ 
          { title:'Dettaglio', index: 1, content:"partials/edit/details_form.html" },
          { title:'Nucleo - Richiedente', index: 2, content:"partials/edit/family_form_ric.html", disabled:true },
          { title:'Nucleo - Componenti', index: 3, content:"partials/edit/family_form_comp.html", disabled:true },
          { title:'Nucleo - Dettagli', index: 4, content:"partials/edit/family_form_det.html", disabled:true },
          { title:'Nucleo - Assegnazione', index: 5, content:"partials/edit/family_form_ass.html", disabled:true },
          { title:'Verifica Domanda', index: 6, content:"partials/edit/practice_state.html", disabled:true },
          { title:'Paga', index: 7, content:"partials/edit/practice_sale.html", disabled:true },
          { title:'Sottometti', index: 8, content:"partials/edit/practice_cons.html", disabled:true }
     ];
     
//     $scope.editTabs = [ 
//         { title:'Dettaglio', index: 1, content:"partials/edit/details_form.html" },
//         { title:'Nucleo - Richiedente', index: 2, content:"partials/edit/family_form_ric.html"},
//         { title:'Nucleo - Componenti', index: 3, content:"partials/edit/family_form_comp.html" },
//         { title:'Nucleo - Dettagli', index: 4, content:"partials/edit/family_form_det.html" },
//         { title:'Nucleo - Assegnazione', index: 5, content:"partials/edit/family_form_ass.html" },
//         { title:'Verifica Domanda', index: 6, content:"partials/edit/practice_state.html" },
//         { title:'Paga', index: 7, content:"partials/edit/practice_sale.html" },
//         { title:'Sottometti', index: 8, content:"partials/edit/practice_cons.html" }
//     ];
            
     // Method nextEditTab to switch the input forms to the next tab and to call the correct functions
     $scope.nextEditTab = function(value, type, param1, param2, param3, param4){
      	fInit = false;
       	if(!value){		// check form invalid
       		switch(type){
      			case 2:
       				if(!$scope.checkStoricoStruct()){
            			$dialogs.error(sharedDataService.getMsgErrEditNoRec());
            			break;
            		}
            		$scope.setLoading(true);
            		if(param2 == true){
            			$scope.updateAlloggioOccupato(param3, param1);
            		} else {
            			$scope.updateAmbitoTerritoriale();
            		}
            		$scope.getComponenteRichiedente();
            		$scope.continueNextEditTab();
            		$scope.setCFRichiedente(false);	// to disable the button "next"
            		break;
            	case 3:
            		//$scope.updateNucleoFamiliare(param1);
            		$scope.setCompEdited(false);
            		$scope.continueNextEditTab();
            		break;
           		case 4:
       				$scope.initFamilyTabs();
            		$scope.continueNextEditTab();
            		break;
            	case 5:
            		if($scope.checkComponentsData() == true){
            			$scope.checkMergingMail(param1);
            			$scope.continueNextEditTab();
            		} else {
            			$dialogs.error($scope.getCheckDateContinuosError());
            		}
            		break;	
            	case 6:
            		$scope.stampaScheda($scope.practice.idObj);
            		$scope.continueNextEditTab();
            		break;
            	case 7:
            		$scope.continueNextEditTab();
            		break;	
            	case 8:
            		$scope.setLoading(true);
            		$scope.payPratica(2);
            		break;
            	case 9:
            		$scope.protocolla();
            		$scope.deletePdf(param1);
            		break;
            	case 10:
            		$scope.rifiuta();
            		$scope.deletePdf(param1);
            		break;	
            	default:
            		break;
            }	
            fInit = true;
        }
    };
    
    $scope.continueNextEditTab = function(){
       	if(tabEditIndex !== ($scope.editTabs.length -1)){
        	$scope.editTabs[tabEditIndex].active = false;		// deactive actual tab
        	tabEditIndex = tabEditIndex+1;						// increment tab index
        	$scope.editTabs[tabEditIndex].active = true;		// active new tab
        	$scope.editTabs[tabEditIndex].disabled = false;	
    	} else {
    		$scope.setNextButtonLabel(sharedDataService.getTextBtnEnd());
    	}
    };
            
    $scope.prevEditTab = function(){
        if(tabEditIndex !== 0 ){
            $scope.getPracticeData(sharedDataService.getIdDomanda(),3);
            $scope.setNextButtonLabel(sharedDataService.getTextBtnNext());
            $scope.editTabs[tabEditIndex].active = false;	// deactive actual tab
            tabEditIndex--;								// increment tab index
            $scope.editTabs[tabEditIndex].active = true;		// active new tab	
        }
    };
            
    $scope.setEditIndex = function($index){
        //$scope.tabEditIndex = $index;
        tabEditIndex = $index;
    };
    // --------------------- End of Block that manage the tab switching (in practice editing) ----------------------
         
    // ------------------------- Block that manage the tab switching (in practice view) ---------------------------
    $scope.setNextButtonViewLabel = function(value){
      	$rootScope.buttonNextViewLabel = value;
    };

    $scope.setViewTabs = function(){
        $scope.setViewIndex(0);
        $scope.setNextButtonViewLabel(sharedDataService.getTextBtnClose());
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
            	$scope.setNextButtonViewLabel(sharedDataService.getTextBtnClose());
            }
            fInit = true;
        }
    };
            
    $scope.prevViewTab = function(){
       	if($scope.tabViewIndex !== 0 ){
       		$scope.setNextButtonViewLabel(sharedDataService.getTextBtnNext());
       	    $scope.viewTabs[$scope.tabViewIndex].active = false;	// deactive actual tab
       	    $scope.tabViewIndex--;								// increment tab index
       	    $scope.viewTabs[$scope.tabviewIndex].active = true;		// active new tab	
       	}
    };
            
    $scope.setViewIndex = function($index){
       	$scope.tabViewIndex = $index;
    };
    // ----------------------- End of Block that manage the tab switching (in practice view) -------------------------
    
    // -------------------------- Block that manage the tab switching (in components) ----------------------------  
    $scope.setComponentsEdited = function(value){
       	$scope.allComponentsEdited = value;
    };
            
    $scope.hideArrow = function(value){
      	$scope.isArrowHide = value;
    };
            
    $scope.setFInitFam = function(value){
       	$scope.fInitFam=value;
    };
            
    var fInitFam = true;
    	$scope.initFamForm = function(){
        //console.log("fInitFam value: " + fInitFam);
        return fInitFam;
    };
            
    $scope.initFamilyTabs = function(){
        fInitFam = false;
        $scope.setNextLabel(sharedDataService.getTextBtnNextComp());
        
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
            $scope.setNextLabel(sharedDataService.getTextBtnSaveComp());
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

    $scope.checkInvalidFields = function(comp_index){
        var check = true;
        var anni_res = $scope.family_tabs[comp_index].content.variazioniComponente.anniResidenza;
        if(anni_res != null && anni_res != ''){
            if($scope.storicoResidenza.length == 0){
            	check = false;
        	    $scope.showNoStoricoMessage = true;
        	} else {
        	    $scope.showNoStoricoMessage = false;
        	}
        }
        var richiedente = $scope.family_tabs[comp_index].content.richiedente;
        var phone = $scope.family_tabs[comp_index].content.variazioniComponente.telefono;
        var mail = $scope.tmp_user.mail;
        var municipality = $scope.family_tabs[comp_index].content.variazioniComponente.idComuneResidenza;
        var residence = $scope.family_tabs[comp_index].content.variazioniComponente.indirizzoResidenza;
        var civic = $scope.family_tabs[comp_index].content.variazioniComponente.numeroCivico;
        var nationality = $scope.family_tabs[comp_index].content.variazioniComponente.decsrCittadinanza;
        if(richiedente == true){
        	if((phone == null) || (phone == "") || (phone == "0461/")){
        	    check = false;
        	    $scope.showPhoneMessage = true;
        	} else {
        	    $scope.showPhoneMessage = false;
        	}
        	if((mail == null) || (mail == "")){
        	    check = false;
        	    $scope.showMailMessage = true;
        	} else {
        	    $scope.showMailMessage = false;
        	}
        	if(municipality == null || municipality == ''){
        	    check = false;
        	    $scope.showMunicipalityMessage = true;
        	} else {
        	    $scope.showMunicipalityMessage = false;
        	}
        	if(residence == null || residence == ''){
        	    check = false;
        	    $scope.showResidenceMessage = true;
        	} else {
        	    $scope.showResidenceMessage = false;
        	}
        	if(civic == null || civic == ''){
        	  	check = false;
        	    $scope.showCivicMessage = true;
        	} else {
        	    $scope.showCivicMessage = false;
        	}
        }
        if(nationality == null || nationality == ''){
        	check = false;
            $scope.showNationalityMessage = true;
        } else {
            $scope.showNationalityMessage = false;
        }
    	
        return check;
    };
            
    $scope.checkMergingMail = function(value){
       	if(value != null && value != ''){
           	if(value != sharedDataService.getMail()){
           		sharedDataService.setMail(value);
           	}
       	}
    };
            
    $scope.checkStoricoStruct = function(){
       	var check = true;
       	var components = $scope.residenzaType.numeroComponenti;
       	if((components != null) && (components != '') && (components > 0)){
       		if($scope.struttureRec.length == 0){
       			check = false;
       		}
       	}
       	return check;
    };
            
    $scope.checkScadenzaPermesso = function(value){
    	if(value == null || value == ""){
    		$scope.showUserId = false;
    	}
    	else 
    	{
	       	var tmp_date = $scope.correctDate(value);
	       	var date = $scope.castToDate(tmp_date);
	       	var now = new Date();
	       	if(date.getTime() > now.getTime()){
	       		$scope.showUserId = false;
	       	} else {
	       		$scope.showUserId = true;
	       	}
    	}
    };
            
    $scope.checkPhonePattern = function(value){
        var check = true;
        if(!($scope.phonePattern.test(value))){
        	$scope.showPhonePatternMessage = true;
        } else {
        	$scope.showPhonePatternMessage = false;
        }
        return check;
    };
            
    $scope.checkMailPattern = function(value){
      	var check = true;
       	if(!($scope.mailPattern.test(value))){
       		$scope.showMailPatternMessage = true;
      	} else {
       		$scope.showMailPatternMessage = false;
       	}
       	return check;
    };
            
    $scope.nextFamilyTab = function(value, componenteVar, disability, invalidAge){
       fInitFam = false;
       if($scope.checkInvalidFields($scope.tabFamilyIndex)){
    	   if(!value){		// check form invalid
          		if(invalidAge == 'noDis'){
          			disability = null;
           		}
           		if($scope.showLog) console.log("Invalid Age: " + invalidAge);
           		$scope.salvaComponente(componenteVar, disability);
       	    	// After the end of all operations the tab is swithced
       	    	if($scope.tabFamilyIndex !== ($scope.componenti.length -1) ){
       	    		if($scope.tabFamilyIndex == ($scope.componenti.length -2)) {
       	    			$scope.setNextLabel(sharedDataService.getTextBtnSave());
       	    			$scope.hideArrow(true);
       	    		}
       	    	   	$scope.family_tabs[$scope.tabFamilyIndex].active = false;	// deactive actual tab
       	    	   	$scope.tabFamilyIndex++;									// increment tab index
       	    	   	$scope.family_tabs[$scope.tabFamilyIndex].active = true;		// active new tab
       	    	   	$scope.family_tabs[$scope.tabFamilyIndex].disabled = false;	
       	    	} else {
       	    		$scope.setComponentsEdited(true);
       	    	}
       	    	fInitFam = true;
           	}
       	}
    };
            
    $scope.prevFamilyTab = function(){
       	if($scope.tabFamilyIndex !== 0 ){
       		$scope.setNextLabel(sharedDataService.getTextBtnNextComp());
       		$scope.hideArrow(false);
       	    $scope.family_tabs[$scope.tabFamilyIndex].active = false;	// deactive actual tab
       	    $scope.tabFamilyIndex--;									// increment tab index
       	    $scope.family_tabs[$scope.tabFamilyIndex].active = true;		// active new tab	
       	}
    };
    // ------------------------ End of Block that manage the tab switching (in components) --------------------------
            
    $scope.temp = {};
            
    $scope.reset = function(){
        $scope.practice = angular.copy($scope.temp);
    };
            
    $scope.jobs = sharedDataService.getJobs();
    $scope.permissions = sharedDataService.getPermissions();    
    $scope.rtypes = sharedDataService.getRtypes();
    $scope.rtypes_inidoneo = sharedDataService.getRtypesInidoneo();
    $scope.rtypes_all = sharedDataService.getRtypesAll();
    $scope.genders = sharedDataService.getGenders();
    $scope.municipalities = sharedDataService.getMunicipalities();        
    $scope.contracts = sharedDataService.getContracts();        
    $scope.disabilities_under18 = sharedDataService.getDisabilities_under18(); 
    $scope.disabilities_over65 = sharedDataService.getDisabilities_over65();        
    $scope.disabilities_all = sharedDataService.getDisabilities_all();
    $scope.citizenships = sharedDataService.getCitizenships();    
    $scope.yes_no = sharedDataService.getYesNo();
    $scope.affinities = sharedDataService.getAffinities();
    $scope.maritals = sharedDataService.getMaritals();
                
    $scope.onlyNumbers = /^\d+$/;
    $scope.decimalNumbers = /^([0-9]+)[\,]{0,1}[0-9]{0,2}$/;
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
            
    $scope.getSep = function(){
      	return $scope.sep;
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
       		var sep = $scope.getSep();
            if((sep == null) || ((sep.consensual == null) && (sep.judicial == null) && (sep.tmp == null)) ||  ($scope.checkAllSep(sep))){
            	$scope.setSeparation(true);
            	check = false;
            } else {
            	check = true;
            }
        }
        return check;
    };
    
    // method to check if all the sep type are null (in IE an object is managed in a different way respect the other browsers)
    $scope.checkAllSep = function(sep){
    	var consNull = false;
    	var judNull = false;
    	var tmpNull = false;
    	
    	if((sep.consensual != null) && (sep.consensual.data == null) && (sep.consensual.trib == "")){
    		consNull = true;
    	}
    	
    	if((sep.judicial != null) && (sep.judicial.data == null) && (sep.judicial.trib == "")){
    		judNull = true;
    	}
    	
    	if((sep.tmp != null) && (sep.tmp.data == null) && (sep.tmp.trib == "")){
    		tmpNull = true;
    	}
    	
    	if(consNull && judNull && tmpNull){
    		return true;
    	} else {
    		return false;
    	}
    };
            
    $scope.isAllFamilyState = function(){
       	var check = true;
       	for (var i = 0; i < $scope.componenti.length; i++){
       		if($scope.componenti[i].statoCivile == null ||  $scope.componenti[i].statoCivile == ''){
       			check = false;
       			break;
       		}
       	}
       	return check;
    };
            
    $scope.salvaSeparazione = function(){
       	//$scope.setSep(value);
       	if(($scope.sep == null) || (($scope.sep.consensual == null) && ($scope.sep.judicial == null) && ($scope.sep.tmp == null))){
       		$dialogs.error(sharedDataService.getMsgErrStatoCivile());
       	} else {
       		if($scope.showLog) console.log("Stato separazione : " + $scope.sep);
       		$scope.hideSeparation();
       	}
    };
            
    $scope.resetSep = function(){
       	$scope.setSep({});
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
       	if($scope.componenteMaxResidenza_Obj != {}){
       		if(($scope.storicoResidenza.length != 0) && (value.idObj != $scope.componenteMaxResidenza_Obj.idObj)){
       			$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrResidenzaAlreadyExist());
       		}
       	}
       	$scope.setSRFormVisible(true);
    };
            
    $scope.hideSRForm = function(){
       	$scope.setSRFormVisible(false);
    };
            
    $scope.setSRFormVisible = function(value){
      	$scope.isSRFormVisible = value;
    };
            
    $scope.addStoricoRes = function(value, person){
       	// Method that check if the inserted date are corrects
       	if($scope.checkDates(null, value.idComuneResidenza, value.dataDa, value.dataA, 1, null, person)){
       		$scope.setErrorsStoricoRes(false);
       		var dateDa = $scope.correctDate(value.dataDa);
       		var dateA = $scope.correctDate(value.dataA);
       		var fromDate = $scope.castToDate(dateDa);
       		var toDate = $scope.castToDate(dateA);
       		if($scope.showLog){
       			console.log("Data da " + fromDate);
       			console.log("Data a " + toDate);
       		}
       		value.id = $scope.storicoResidenza.length;
       		value.difference = toDate.getTime() - fromDate.getTime();
       		var newStorico = angular.copy(value);
       		$scope.storicoResidenza.push(newStorico);
       		value.dataDa = value.dataA; // Update the new date with the end of the last date
       		value.idComuneResidenza = "";
       		value.isAire = "";
       		value.dataA = "";
       	} else {
       		$scope.setErrorsStoricoRes(true);
       	}
    };
            
    $scope.checkDates = function(nome, comune, data1, data2, type, comp, person){
       	var check_ok = true;
       	if(type == 1){
        	if((comune == null || comune == '') && (data1 == null || data1 == '') && (data2 == null || data2 == '')){
        		$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrNoComuneDaA());
        		check_ok = false;
        	} else {
    	    	if(comune == null || comune == ''){
    	    		$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrComuneRequired());
    	    		check_ok = false;
    	    	} else  if(data1 == null || data1 == '' || data2 == null || data2 == ''){
    	    		$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrDataDaARequired());
    	    		check_ok = false;
    	    	} else {
    	    		var tmpDataDa = $scope.correctDate(data1);
    	    		var tmpDataA = $scope.correctDate(data2);
    	    		var dataDa = $scope.castToDate(tmpDataDa);
    	        	var dataA = $scope.castToDate(tmpDataA);
    	    		if(dataDa > dataA){
    	    			$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrDataDaMajorDataA());
    	    			check_ok = false;
    	    		}
    	    		if(dataDa.getTime() < person.persona.dataNascita){
    	    			$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrDataDaMinorDataNascita());
    	    			check_ok = false;
    	    		}
    	    		if(dataA.getTime() > $scope.practice.dataPresentazione){
    	    			$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrDataAMajorDataCreazione());
    	    			check_ok = false;
    	    		}
    	    	}
        	}
       	} else {
       		if((nome == null || nome == '') && (comune == null || comune == '') && (data1 == null || data1 == '') && (data2 == null || data2 == '')){
        		$scope.setErrorMessageStoricoStruct(sharedDataService.getMsgErrNoStructPlaceDaA(), comp);
        		check_ok = false;
        	} else {
        		if(nome == null || nome == ''){
    	    		$scope.setErrorMessageStoricoStruct(sharedDataService.getMsgErrStructRequired(), comp);
    	    		check_ok = false;
    	    	} else if(comune == null || comune == ''){
    	    		$scope.setErrorMessageStoricoStruct(sharedDataService.getMsgErrPlaceRequired(), comp);
    	    		check_ok = false;
    	    	} else  if(data1 == null || data1 == '' || data2 == null || data2 == ''){
    	    		$scope.setErrorMessageStoricoStruct(sharedDataService.getMsgErrDataDaARequired(), comp);
    	    		check_ok = false;
    	    	} else {
    	    		//var dataDa = new Date(data1);
    	        	//var dataA = new Date(data2);
    	        	var tmpDataDa = $scope.correctDate(data1);
    	    		var tmpDataA = $scope.correctDate(data2);
    	    		var dataDa = $scope.castToDate(tmpDataDa);
    	        	var dataA = $scope.castToDate(tmpDataA);
    	    		if(dataDa > dataA){
    	    			$scope.setErrorMessageStoricoStruct(sharedDataService.getMsgErrDataDaMajorDataA(), comp);
    	    			check_ok = false;
    	    		} else {
      		    		var now = new Date();
       		    		var two_years = 1000 * 60 * 60 * 24 * 360 * 2;
    	    			if(dataA.getTime() < (now.getTime() - two_years)){
    	    				$scope.setErrorMessageStoricoStruct(sharedDataService.getMsgErrRecPeriodBeforeLastsTwoYears(), comp);
    		    			check_ok = false;
    	    			}
    	    		}
    	    	}
        	}
       	}
        return check_ok;
    };
            
    $scope.deleteStoricoRes = function(value){
       	$scope.storicoResidenza.splice(value.id, 1);
    };
            
    $scope.calcolaStoricoRes = function(ft_component){
       	$scope.showNoStoricoMessage = false;			 // I use this variable in the editing of a component: when I add a storicoResidenza I have to set to False
       	var totMillis = 0;
       	var totMillisInYear = 1000 * 60 * 60 * 24 * 360; // I consider an year of 360 days (12 month of 30 days)
       	for(var i = 0; i < $scope.storicoResidenza.length; i++){
       		totMillis += $scope.storicoResidenza[i].difference;
       	}
       	var anniRes = totMillis/totMillisInYear;
       	$scope.setAnni(Math.floor(anniRes), ft_component, 1);
      	$scope.setSRFormVisible(false);
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
            
    $scope.checkComponentsData = function(){
       	var control = false;
       	if($scope.componenteMaxResidenza_Obj == {} || $scope.storicoResidenza.length == 0){
       		$scope.setCheckDateContinuosError(sharedDataService.getMsgErrResRequired());
       	} else {
        	for(var i = 0; i < $scope.componenti.length; i++){
        		if($scope.componenti[i].idObj == $scope.componenteMaxResidenza_Obj.idObj){
        			if($scope.componenti[i].variazioniComponente.anniResidenza >= 3){
        		    	// Here I have to check the continuity of the date from now to last tree years
        				var end_period = new Date($scope.practice.dataPresentazione);	
        	    		var totMillisInThreeYear = 1000 * 60 * 60 * 24 * 360 * 3; // I consider an year of 360 days
        		    	var startMillis = end_period.getTime() - totMillisInThreeYear;
        		    	var start_period = new Date(startMillis);
        		    			
        		    	if($scope.checkAnniContinui(start_period, end_period, $scope.storicoResidenza)){
        		    		control = true;
        		    	}	
        	    	} else {
        	    		$scope.setCheckDateContinuosError(sharedDataService.getMsgErrNoRequirementResidence());
        	    	}
        	    	break;
        	   	}	
        	}
        }
            	
        return control;
    };
            
    $scope.setCheckDateContinuosError = function(value){
       	$scope.errorMessageCheckDate = value;
    };
            
    $scope.getCheckDateContinuosError = function(){
       	return $scope.errorMessageCheckDate;
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
    $scope.strutturaRec2 = {};
    $scope.struttureRec = [];
    $scope.setStrutturaRec = function(value){
       	$scope.setStrutturaRec = value;
    };
            
    $scope.setErrorMessageStoricoStruct = function(value, comp){
       	if(comp == 1){
       		$scope.errorMessagesStoricoStruct = value;
       	} else {
       		$scope.errorMessagesStoricoStruct2 = value;
       	}
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
            
    $scope.setErroreStoricoStruct = function(value, comp){
       	if(comp == 1){
       		$scope.isErroreStoricoStruct = value;
       	} else {
       		$scope.isErroreStoricoStruct2 = value;
       	}
    };
            
    $scope.addStoricoStruct = function(value, comp){
       	// Method that check if the inserted date are corrects
       	if($scope.checkDates(value.structName, value.structPlace, value.dataDa, value.dataA, 2, comp, null)){
       		$scope.setErroreStoricoStruct(false, comp);
        		var dateDa = $scope.correctDate(value.dataDa);
        		var dateA = $scope.correctDate(value.dataA);
        		var fromDate = $scope.castToDate(dateDa);
        		var toDate = $scope.castToDate(dateA);
        		if($scope.showLog){
        			console.log("Data da " + fromDate);
        			console.log("Data a " + toDate);
        		}	
        		value.id = $scope.struttureRec.length;
        		value.distance = toDate.getTime() - fromDate.getTime();
        	    var newStrutturaRec = angular.copy(value);
        	    $scope.struttureRec.push(newStrutturaRec);
        	    value.dataDa = value.dataA; // Update the new date with the end of the last date
        	    value.structName = "";
        	    value.structPlace = "";
        	    value.dataA = "";
        } else {
        	$scope.setErroreStoricoStruct(true, comp);
        }
    };
            
    $scope.deleteStoricoStruct = function(value){
       	$scope.struttureRec.splice(value.id, 1);
    };
            
    $scope.controllaStoricoStruct = function(value, componenti){
       	if(value.length == 0){
       		// errore nessuna struttura inserita
       		$dialogs.error(sharedDataService.getMsgErrNoStructInserted());
       	} else {
       		// controllo sui 6 mesi spezzati negli ultimi 2 anni per i vari componenti
       		var now = new Date();
       		var two_years = 1000 * 60 * 60 * 24 * 360 * 2;
       		var from_date = new Date(now.getTime() - two_years);
            		
       		var check_message = $scope.checkMesiSpezzati(from_date, now, value, componenti);
       		if(check_message != ""){
       			$dialogs.error(check_message);
       		} else {
       			$scope.hideRecoveryStruct();
       		}	
       	}
    };
            
    $scope.checkICEF = function(practiceLoad){
       	var checkRes = false;
       	if(practiceLoad != null){
       		var icef = parseFloat(practiceLoad.nucleo.indicatoreEconomico.icefaccesso);
       		if(icef < 0.23){
       			checkRes = true;
       		}
       	}
       	return checkRes;
    };
            
    // --------------------------------------------------------------------------------------------------      
    $scope.checkAnniContinui = function(data_da, data_a, periodi){
    	var continuous_years = false;
        var new_end = data_a;
        for(var i = periodi.length-1; i >= 0; i--){
        	var tmp_end = $scope.correctDate(periodi[i].dataA);
        	var tmp_start = $scope.correctDate(periodi[i].dataDa);
        	var end = $scope.castToDate(tmp_end);
           	var start = $scope.castToDate(tmp_start);
           	var distance_end = new_end.getTime() - end.getTime();
           	var distance_start = data_da.getTime() - start.getTime();
           	var oneDay = 1000 * 60 * 60 * 24 * 2; // millisenconds of a day
            	
           	if(distance_end < oneDay){
           		if(distance_start > 0){
           			continuous_years = true;
           			break;
           		} else {
           			if(distance_start > (oneDay * -1)){
           				continuous_years = true;
               			break;
           			}
           		}
           	} else {
           		// there is an empty period: exit with false
           		$scope.setCheckDateContinuosError(sharedDataService.getMsgErrNoRequirementResidenceOutPeriods());
           		break;
           	}
           	new_end = start;	// I have to update the period end
        }
        if(continuous_years == false){
        	$scope.setCheckDateContinuosError(sharedDataService.getMsgErrNoRequirementResidenceOutPeriods());
        }
        return continuous_years;
    };
            
    $scope.checkMesiSpezzati = function(data_da, data_a, periodi, componenti){
      	var errorMessages = sharedDataService.getMsgErrNoEnouchMonthInStructs();
      	var totTimesC1 = 0;
       	var totTimesC2 = 0;
       	var nameComp = [];
       	if(componenti == 1){
        	for(var i = 0; i < periodi.length; i++){
        		var tmp_end = $scope.correctDate(periodi[i].dataA);
        		var tmp_start = $scope.correctDate(periodi[i].dataDa);
        		var end = $scope.castToDate(tmp_end);
            	var start = $scope.castToDate(tmp_start);
        	    if(start.getTime() > data_da.getTime()){
        	    	totTimesC1 = totTimesC1 + periodi[i].distance;
        	    } else {
        	    	if(end.getTime() > data_da.getTime()){
        	    		var tmp_diff = end.getTime() - data_da.getTime();
        	    		totTimesC1 = totTimesC1 + tmp_diff;
        	    	}
        	    }		
        	}
        } else {
        	// case of 2 components
        	for(var i = 0; i < periodi.length; i++){
            	if(i == 0){
            		nameComp[0] = periodi[i].componenteName;
            	} else {
            		if(periodi[i].componenteName != nameComp[0]){
            			nameComp[1] = periodi[i].componenteName;
            			break;
            		}
            	}
            }
            		
            for(var i = 0; i < periodi.length; i++){
            	var tmp_end = $scope.correctDate(periodi[i].dataA);
        		var tmp_start = $scope.correctDate(periodi[i].dataDa);
        		var end = $scope.castToDate(tmp_end);
        	   	var start = $scope.castToDate(tmp_start);
        	   	if(start.getTime() > data_da.getTime()){
        	   		if(periodi[i].componenteName == nameComp[0]){
        	   			totTimesC1 = totTimesC1 + periodi[i].distance;
        	   		} else {
        	   			totTimesC2 = totTimesC2 + periodi[i].distance;
        	   		}
        	   	} else {
        	   		if(end.getTime() > data_da.getTime()){
        	   			var tmp_diff = end.getTime() - data_da.getTime();
        	   			if(periodi[i].componenteName == nameComp[0]){
        	   				totTimesC1 = totTimesC1 + tmp_diff;
        	   			} else {
        	   				totTimesC2 = totTimesC2 + tmp_diff;
        	   			}
        	   		}
        	   	}		
        	}
        }
        var month = 1000 * 60 * 60 * 24 * 30;
        if(componenti == 1){
        	if(Math.floor(totTimesC1/month) >= 6 ){
        		errorMessages = "";
        	}
        } else {
        	if((Math.floor(totTimesC1/month) >= 6) && (Math.floor(totTimesC2/month) >= 6) ){
        		errorMessages = "";
        	} else {
        		if((Math.floor(totTimesC1/month) < 6) && (Math.floor(totTimesC2/month) < 6)){
        			errorMessages = errorMessages + sharedDataService.getMsgErrNoRequirementComponents1() + nameComp[0] + sharedDataService.getMsgErrNoRequirementComponents2() + nameComp[1] + sharedDataService.getMsgErrNoRequirementComponents3();
        		} else if((Math.floor(totTimesC1/month) < 6)){
        			errorMessages = errorMessages + sharedDataService.getMsgErrNoRequirementComponent1() + nameComp[0] + sharedDataService.getMsgErrNoRequirementComponent2();
        		}  else {
        			errorMessages = errorMessages + sharedDataService.getMsgErrNoRequirementComponent1() + nameComp[1] + sharedDataService.getMsgErrNoRequirementComponent2();
        		}
        	}
        }
        return errorMessages;
    };

    // --------------------------- End Section for Anni Residenza, Anzianità lavorativa e Disabilità -------------------------
            
    // Object and Method to check the correct relation between the rooms and the family components
    $scope.infoAlloggio = {};
    $scope.checkInidoneo = function(){
       	var suggestRooms = 0;
       	var correctRooms = false;
       	// Algoritm:
        // Componenti - Stanze da letto
        //    1 2 	  - 1
        //    3 4 5   - 2
        //    6 7 8   - 3
        //    9       - 4
        //    10      - 5
       	if($scope.infoAlloggio.ocupantiAlloggio == null || $scope.infoAlloggio.stanzeLetto == null){
       		correctRooms = true;
       	} else {
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
       	}
        $scope.isInidoneoForRoomsNum = !correctRooms;
        
        if(!correctRooms){	// I try to initialize the residenzaType.tipoResidenza to 'ALLOGGIO_INIDONEO'
        	$scope.residenzaType.tipoResidenza = $scope.rtypes_inidoneo[0].value;
        } else {
        	$scope.residenzaType.tipoResidenza = null;
        }
    };
            
    // Variabili usate in familyForm per visualizzare/nascondere i vari blocchi
    $scope.showMembers = false;
    $scope.applicantInserted = false;
    $scope.newMemberShow = false;
    $scope.newMemberInserted = false;
    $scope.showEditComponents = false;
          
    $scope.checkRequirement = function(){
       	if(($scope.residenzaType.residenzaTN != 'true') || ($scope.residenzaType.alloggioAdeguato == 'true')){
       		$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrNoRequirementPracticeCreation());
       		return false;
       	} else {
       		return true;
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
       		idEnte:cod_ente,
       		userIdentity: $scope.userCF
       	};
            	
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "RicercaPratiche", params, $scope.authHeaders, null);	
       	myDataPromise.then(function(result){
       		if(result.esito == 'OK'){
   	    		$scope.practicesEpu = result.domanda;
   	    		if($scope.showLog) console.log("Recupero domande utente " + $scope.practicesEpu);
       		} else {
   	    		$dialogs.error(sharedDataService.getMsgErrPracticeRecovery());
       		}
       		$scope.setPracticeLoaded(true);
       	});
    };
            
    $scope.correctDecimal = function(num){
       	var res = '';
       	if(num != null && num != ''){
       		res = num.replace(",",".");
       	}
       	return res;
    };
            
    $scope.correctDate = function(date){
       	if(date!= null){
       		var correct = "";
       		var day = date.getDate();
       		var month = date.getMonth() + 1;
       		var year = date.getFullYear();
       		correct = year + "-" + month + "-" + day;
       		return correct;
       	} else {
       		return date;
       	}
//       	if(date != null && date.indexOf("/") > -1){
//      		var res = date.split("/");
//       		var correct = "";
//           	correct=res[2] + "-" + res[1] + "-" + res[0];
//           	return correct;
//       	} else {
//       		return date;
//       	}
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
            
    $scope.createPractice = function(ec_type, res_type, dom_type, practice){
       	var tmp_scadenza = $scope.correctDate(ec_type.scadenzaPermessoSoggiorno);
       	var scad = null;
       	if(tmp_scadenza != null){
       		scad = $scope.castToDate(tmp_scadenza);
       		var now = new Date();
       		if(scad.getTime() < now.getTime()){
       			//$scope.setLoading(false);
       			//$dialogs.notify("Attenzione", "Non sei in possesso di un permesso di soggiorno valido. Non puoi proseguire con la creazione di una nuova domanda");
       			//return false;
       			var oneDay = 1000 * 60 * 60 * 24 * 1;
       			scad = new Date(now.getTime() + oneDay);
       		}
       	}
            	
       	if(sharedDataService.getMail() == null || sharedDataService.getMail() == ''){
       		sharedDataService.setMail($scope.tmp_user.mail);	// I set the mail for the user that do not have the info in the card
       	} else {
       		$scope.tmp_user.mail = sharedDataService.getMail();
       		//sharedDataService.setMail($scope.tmp_user.mail);
       	}
            	
       	if($scope.checkRequirement() == false){
       		$scope.setLoading(false);
       		return false;
       	}
       	var extraComType = {};
       	if(ec_type != null){
       		extraComType = {
        		permesso: ec_type.permesso,
        		lavoro : ec_type.lavoro,
        		ricevutaPermessoSoggiorno : ec_type.ricevutaPermessoSoggiorno,
        		scadenzaPermessoSoggiorno : (scad != null)?scad.getTime():scad
           	};
        }
            	
        res_type.cittadinanzaUE = $scope.isUeCitizen();
        var edizione = $scope.getCorrectEdizioneFinanziata($scope.getFamilyAllowaces(), sharedDataService.getUeCitizen()); //$scope.getCorrectEdizioneFinanziataTest($scope.getFamilyAllowaces(), sharedDataService.getUeCitizen());
        var pratica = {	
        	input : {
        		domandaType : {
        			extracomunitariType: extraComType, //extraComType,//ec_type,
        			idEdizioneFinanziata : edizione,
        			numeroDomandaICEF : dom_type.numeroDomandaIcef,
        			residenzaType : res_type
        		},
            	idEnte : cod_ente,
            	userIdentity : $scope.userCF
            },
            cpsData : {
            	email : sharedDataService.getMail(), //(sharedDataService.getMail() == null || sharedDataService.getMail() == '')? $scope.tmp_user.mail : sharedDataService.getMail(),
            	nome : sharedDataService.getName(),
            	cognome : sharedDataService.getSurname(),
            	codiceFiscale : sharedDataService.getUserIdentity(),
            	certBase64 : sharedDataService.getBase64()
            }
        };
            	
        var value = JSON.stringify(pratica);
        if($scope.showLog) console.log("Json value " + value);
            	
        var method = 'POST';
        //var myDataPromise = invokeWSService.getProxy(method, "CreaPratica", null, $scope.authHeaders, value);	
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "CreaPratica", null, $scope.authHeaders, value);	
            	
        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		// Here I call the getPracticeMethod
        		sharedDataService.setIdDomanda(result.domanda.idObj);
        		//idDomandaAll = result.domanda.idObj; //5563259; //returned.domanda.idObj;
               	$scope.getPracticeData(result.domanda.idObj,1);
               	// Retrieve the elenchi info
                $scope.getElenchi();
        	} else {
        		$scope.setLoading(false);
        		$dialogs.error(sharedDataService.getMsgErrPracticeCreationIcef());
        		return false;
        	}
        });	
            	
    };
            
    // Used to create a Practice without call the web-service
//    $scope.createPracticeTest = function(ec_type, res_type, dom_type, practice){
//           	
//    	$scope.setLoading(true);
//      	var pratica = {
//      		domandaType : {
//      			extracomunitariType: ec_type,
//            	idEdizioneFinanziata : 5526558,
//            	numeroDomandaICEF : dom_type.numeroDomandaIcef,
//            	residenzaType : res_type
//            },
//            idEnte : cod_ente,
//            userIdentity : $scope.userCF
//        };
//            	
//        // Here I call the getPracticeMethod // old 5562993
//        sharedDataService.setIdDomanda(5563259);
//        //idDomandaAll = 5563259;	// Multi componente 5563259
//        $scope.getPracticeData(5563259,1); 
//        // Retrieve the elenchi info
//        $scope.getElenchi();
//    };
        	
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
            	
       	if(type == 2){
       		sharedDataService.setIdDomanda(idDomanda);
       	}
            		
       	var method = 'GET';
       	var params = {
       		idDomanda:idDomanda,
       		idEnte:cod_ente,
       		userIdentity: $scope.userCF
       	};
          	
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetDatiPratica", params, $scope.authHeaders, null);	
       	myDataPromise.then(function(result){
            if(result.esito == 'OK'){
        	    $scope.practice = result.domanda;
        	    if(type == 2){
        	    	$scope.tmpAmbitoTerritoriale = $scope.practice.ambitoTerritoriale1;
        	    	if($scope.tmpAmbitoTerritoriale != null && $scope.tmpAmbitoTerritoriale != ''){
        	    		$scope.myAmbito={
        	    			idObj: $scope.tmpAmbitoTerritoriale.idObj,
        	    			descrizione: $scope.getComuneById($scope.tmpAmbitoTerritoriale.idObj, 3)
        	    		};
        	    		$scope.practice.ambitoTerritoriale1 = $scope.myAmbito.idObj;
        	    	}
        	    	$scope.tmp_user.mail = sharedDataService.getMail();
        	    }
        	    		
        	    // split practice data into differents objects
        	    $scope.extracomunitariType = $scope.practice.extracomunitariType;
        	    $scope.residenzaType = $scope.practice.residenzaType;
        	    $scope.checkRecoveryStruct();	// to check the presence of components from recovery structs
        	    $scope.nucleo = $scope.practice.nucleo;
        	    $scope.setComponenti($scope.nucleo.componente);
        	    $scope.indicatoreEco = $scope.nucleo.indicatoreEconomico;
        	    		
        	    $scope.setLoading(false);
        	    if(type == 1){
        	    	if($scope.checkICEF($scope.practice) == true){
        	    		$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccPracticeCreation1() + result.domanda.identificativo + sharedDataService.getMsgSuccPracticeCreation2());
        	    		$scope.continueNextTab();
        	    	} else {
        	    		$dialogs.error(sharedDataService.getMsgErrPracticeCreationIcefHigh());
        	    	}
        	    } //else {
        	    //	$dialogs.notify("Successo","Caricamento Dati Pratica " + result.domanda.identificativo + " avvenuta con successo.");
        	    //}
        	} else {
            	$scope.setLoading(false);
            }
        });        	
    };
            
    $scope.setComponenti = function(value){
       	$scope.componenti = value;
    };
            
    // Method to full the "elenchi" used in the app
    $scope.getElenchi = function() {
            	
       	var tmp_ambiti = sharedDataService.getStaticAmbiti();
       	var tmp_comuni = sharedDataService.getStaticComuni();
       	//var tmp_edizioni = sharedDataService.getStaticEdizioni();
            	
       	var method = 'GET';
       	var params = {
    		idEnte:cod_ente,
    		userIdentity: $scope.userCF
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
        		$scope.listaComuniVallaganina = $scope.getOnlyComunity(result.comuni);
        		$scope.listaAmbiti = result.ambitiTerritoriali;
        		//$scope.listaEdizioni = result.edizioniFinanziate;
        	});
       	} else {
       		$scope.listaComuni = sharedDataService.getStaticComuni();
       		$scope.listaComuniVallaganina = $scope.getOnlyComunity(sharedDataService.getStaticComuni());
       		$scope.listaAmbiti = sharedDataService.getStaticAmbiti();
       		//$scope.listaEdizioni = sharedDataService.getStaticEdizioni();
       	}
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
    
    // Method used to retrieve the 'edizioniFinanziate' cod used in practice creation. This value is
    // dinamically retrieve from the ws getElenchi so it is always updated.
    $scope.getCorrectEdizioneFinanziata = function(isAss, isUE){
       	var found = false;
       	var edFin = "";
       	var lEdizioni = sharedDataService.getStaticEdizioni();
            	
       	if(isAss == true && isUE == true){
       		for(var i = 0; (i < lEdizioni.length) && (!found); i++){
       			if(lEdizioni[i].descrizione == "Contributo integrativo su libero mercato, comunitari"){
       				if(lEdizioni[i].idObj != "5526556"){
       					found = true;
       					edFin = lEdizioni[i].idObj;
       				}
       			}
       		}
       	}
       	if(isAss == true && isUE == false){
       		for(var i = 0; (i < lEdizioni.length) && (!found); i++){
       			if(lEdizioni[i].descrizione == "Contributo integrativo su libero mercato, extracomunitari"){
       				if(lEdizioni[i].idObj != "5526557"){
       					found = true;
       					edFin = lEdizioni[i].idObj;
       				}
       			}
       		}
       	}
       	if(isAss == false && isUE == true){
       		for(var i = 0; (i < lEdizioni.length) && (!found); i++){
       			if(lEdizioni[i].descrizione == "Locazione di alloggio pubblico, comunitari"){
       				found = true;
       				edFin = lEdizioni[i].idObj;
       			}
       		}
       	}
       	if(isAss == false && isUE == false){
       		for(var i = 0; (i < lEdizioni.length) && (!found); i++){
       			if(lEdizioni[i].descrizione == "Locazione di alloggio pubblico, extracomunitari"){
       				found = true;
       				edFin = lEdizioni[i].idObj;
       			}
       		}
       	}         	
     	return edFin;
    };
            
    $scope.getCorrectEdizioneFinanziataTest = function(isAss, isUE){
      	var edFin = "";
      	// Per VAS-DEV
//      var alloggioUE = '5526551';
//      var alloggioExtraUE = '5526553';
//      var contributoUE = '5526550';
//      var contributoExtraUE = '5526552';
       	// Per Prod
       	var alloggioUE = '5651335';
       	var alloggioExtraUE = '5651336';
       	var contributoUE = '"5651331';
       	var contributoExtraUE = '5651332';
            	
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
            	
    var allog = null;
    if(alloggioOccupato != null){
    	var importo = $scope.correctDecimal(alloggioOccupato.importoCanone);
    	allog = {
      		comuneAlloggio : alloggioOccupato.comuneAlloggio,
       		indirizzoAlloggio : alloggioOccupato.indirizzoAlloggio,
       		superficieAlloggio : alloggioOccupato.superficieAlloggio,
       		numeroStanze : alloggioOccupato.numeroStanze,
       	    tipoContratto :	alloggioOccupato.tipoContratto,
       	    dataContratto : $scope.correctDate(alloggioOccupato.dataContratto),
       	    importoCanone : importo
       	    };
    	}
    	var alloggio = {
           	domandaType : {
           		residenzaType : residenza,
           		alloggioOccupatoType : allog,	//alloggioOccupato,
           		idDomanda : $scope.practice.idObj,
           		versione: $scope.practice.versione
          	},
           	idEnte : cod_ente,
           	userIdentity : $scope.userCF
        };
            	
         var value = JSON.stringify(alloggio);
         if($scope.showLog) console.log("Alloggio Occupato : " + value);
         var method = 'POST';
         var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
            	
         myDataPromise.then(function(result){
            if(result.esito == 'OK'){
            	$scope.setLoading(false);
            	$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAlloggio());
            } else {
            	$scope.setLoading(false);
            	$dialogs.error(sharedDataService.getMsgErrEditAlloggio());
            }
        });
    };
            
    // Method to update the "residenzaType" of an element - no more used. This data are set in creation form
    $scope.updateResidenza = function(residenza){
       	var residenzaCor = {
           	domandaType : {
           		residenzaType : residenza,
           		idDomanda : $scope.practice.idObj,
           		versione: $scope.practice.versione
           	},
           	idEnte : cod_ente,
           	userIdentity : $scope.userCF
        };
       	var value = JSON.stringify(residenzaCor);
         	
       	var method = 'POST';
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
            	
      	myDataPromise.then(function(result){
      		if(result.esito == 'OK'){
        		$scope.setLoading(false);
        		$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditResidenza());
        	} else {
        		$scope.setLoading(false);
        		$dialogs.error(sharedDataService.getMsgErrEditResidenza());
        	}
        });
    };
           
    // Method to update the "ambitoTerritoriale" of an element 
    $scope.updateAmbitoTerritoriale = function(){
       	if($scope.practice == null || $scope.practice.ambitoTerritoriale1 == null || $scope.practice.ambitoTerritoriale1 == ""){
       		$dialogs.notify(sharedDataService.getMsgTextAttention(),sharedDataService.getMsgTextNoAmbitoSelected());
       		$scope.setLoading(false);
       	} else if($scope.practice.ambitoTerritoriale1.descrizione != 'dalla combobox'){
        	var ambitoTerritoriale = {
        		domandaType : {
        			ambitoTerritoriale1 : $scope.practice.ambitoTerritoriale1,
        			idDomanda : $scope.practice.idObj,
            		versione: $scope.practice.versione
        		},
        		idEnte : cod_ente,
            	userIdentity : $scope.userCF
        	};
        	var value = JSON.stringify(ambitoTerritoriale);
        	if($scope.showLog) console.log("Ambito territoriale da modificare " + JSON.stringify(value));
        	    	
        	var method = 'POST';
        	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
      	    	
        	myDataPromise.then(function(result){
        		if(result.esito == 'OK'){
        			if($scope.showLog) console.log("Ambito territoriale modificato " + JSON.stringify(result.domanda.ambitoTerritoriale1));
        			$scope.setLoading(false);
        			$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAmbito());
        		} else {
        			$scope.setLoading(false);
        			$dialogs.error(sharedDataService.getMsgErrEditAmbito());
        		}
        	});
       	} else {
       		$scope.setLoading(false);
       		$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAmbito());
       	}
    };
            
    // Method to update the "parentelaStatoCivile" data of every family member 
    $scope.salvaModificheSC = function(){
       	if(!$scope.isAllFamilyState()){
       		$scope.showSCFamError = true;
       		$scope.setLoadingPSC(false);
       	} else {
       		$scope.showSCFamError = false;	
        	// check correctness of family state
        	if($scope.checkFamilyState()){
        		$scope.setCompEdited(true);
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
    	    	    idEnte : cod_ente,
    	    	    userIdentity : $scope.userCF
    	    	};
       		    
    	    	var value = JSON.stringify(nucleo);
    	    	if($scope.showLog) console.log("Modifica Parentela e SC : " + value);
        				
    			var method = 'POST';
    	    	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
        		    	
    	    	myDataPromise.then(function(result){
    	    		if(result.esito == 'OK'){
    	    			$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditParentelaSc());
    	    		} else {
    	    			$dialogs.error(sharedDataService.getMsgErrEditParentelaSc());
    	    		}
    	    		$scope.setLoadingPSC(false);    		    		
        		});
        	}
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
           		if(disability.catDis == 'CATEGORIA_INVALIDA_1'){
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
            //note: componenteVariazioni.variazioniComponente.note,
            decsrCittadinanza: componenteVariazioni.variazioniComponente.decsrCittadinanza,
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
        	idEnte : cod_ente,
        	userIdentity : $scope.userCF
        };
        		
    	var value = JSON.stringify(nucleo);
    	if($scope.showLog) console.log("Nucleo Familiare : " + value);
    		
    	var method = 'POST';
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
       	
       	myDataPromise.then(function(result){
       		if(result.esito == 'OK'){
       			$scope.setLoading(false);
       			$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditComponentData());
       		} else {
       			$scope.setLoading(false);
       			$dialogs.error(sharedDataService.getMsgErrEditComponentData());
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
          	idEnte : cod_ente,
          	userIdentity : $scope.userCF
        };
            	
        var value = JSON.stringify(nucleoCor);
        if($scope.showLog) console.log("Nucleo Extra Info : " + value);
           	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
           	
        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditInfoAss());
        	} else {
        		$dialogs.error(sharedDataService.getMsgErrEditInfoAss());
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
           	idEnte : cod_ente,
          	userIdentity : $scope.userCF
        };
            	
        var value = JSON.stringify(nucleoCor);
        if($scope.showLog) console.log("Nucleo Mono Genitore : " + value);
            	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
            	
        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditNucleoFam());
        	} else {
        		$dialogs.error(sharedDataService.getMsgErrEditNucleoFam());
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
          	idEnte : cod_ente,
          	userIdentity : $scope.userCF
        };
            	
        var value = JSON.stringify(nucleo);
        if($scope.showLog) console.log("Richiedente : " + value);
        		
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
            	
        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		$dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccChangeRic());
        		$scope.setComponenti(result.domanda.nucleo.componente);
        		$scope.getComponenteRichiedente();
        		//$scope.setComponenteRichiedente(result.domanda.nucleo.componente[0]);
        		//console.log("Componente richiedente risposta : " + JSON.stringify(result.domanda.nucleo.componente[0]));
        	} else {
        		$dialogs.error(sharedDataService.getMsgErrChangeRic());
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
            
//    $scope.cleanParentela = function(value){
//       	if(value == null){
//       		return null;
//       	}
//       	var parentela = value + "";
//       	parentela = parentela.replace("&#9;","");
//       	return parentela;
//    };
            
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
            
    // method to obtain the link to the pdf of the practice
    $scope.getSchedaPDF = function(type){
       	var periodoRes = [];
       	if($scope.storicoResidenza != null){
       		///periodoRes.push({});	// first empty value for resolve the "dalla nascita" problem
        	for(var i = 0; i < $scope.storicoResidenza.length; i++){
        		if(i == 0){
        			// case "dalla nascita"
        		    var dataNascita = new Date($scope.componenteMaxResidenza_Obj.persona.dataNascita);
        		    var tmp_Da = $scope.correctDate($scope.storicoResidenza[0].dataDa);
        		    var firstDataDa = $scope.castToDate(tmp_Da);
        		    var diff = firstDataDa.getTime()-dataNascita.getTime();
        		    var oneDay = 1000 * 60 * 60 * 24;
        		    var firstStorico = {};
        		    if(diff <= oneDay){
        		    	firstStorico = {
        		    		aire : $scope.storicoResidenza[i].isAire, 
        		    		comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        		    		dal : "",
        		    		al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        		    	};
        		    } else {
        		    	periodoRes.push({});	// first empty value
        		    	firstStorico = {
        		    		aire : $scope.storicoResidenza[i].isAire, 
        		    		comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        		    		dal : $scope.correctDateIt($scope.storicoResidenza[i].dataDa),
        		    	    al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        		        };
        		    }
        		    periodoRes.push(firstStorico);
        		} else {
        			var res = {
        				aire : $scope.storicoResidenza[i].isAire, 
        				comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        				dal : $scope.correctDateIt($scope.storicoResidenza[i].dataDa),
        				al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        			};
        			periodoRes.push(res);
        		}
        	};
        }
        //}
    	
       	var componenti_strutt = [];
       	var comp1 = {};
       	var comp2 = {};
       	var nameComp = [];
       	var strutture1 = [];
       	var strutture2 = [];
       	if($scope.struttureRec != null){
       		for(var i = 0; i < $scope.struttureRec.length; i++){
       			if(i == 0){
       				nameComp[0] = $scope.struttureRec[i].componenteName;
       			} else {
       				if($scope.struttureRec[i].componenteName != nameComp[0]){
       					nameComp[1] = $scope.struttureRec[i].componenteName;
       					break;
       				}
       			}
       		}
            		
       		for(var i = 0; i < $scope.struttureRec.length; i++){
       			var nomeStrutt = $scope.struttureRec[i].structName + " (" + $scope.struttureRec[i].structPlace + ")";
       			var strut = {
       				nome : nomeStrutt,
       				dal : $scope.correctDateIt($scope.struttureRec[i].dataDa),
       				al : $scope.correctDateIt($scope.struttureRec[i].dataA)
       			};
       			if($scope.struttureRec[i].componenteName == nameComp[0]){
       				strutture1.push(strut);
       			} else {
       				strutture2.push(strut);
      			}
       		}
            		
       		comp1 = {
       			nominativo : nameComp[0],
       			strutture : strutture1
       		};
       		componenti_strutt.push(comp1);
       		if(strutture2.length > 0){
       			comp2 = {
       				nominativo : nameComp[1],
                	strutture : strutture2
                };
            	componenti_strutt.push(comp2);
            }
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
            	//iscrittoAIRE : $scope.componenteAire,
            	//aireanni : $scope.aireAnni,
                //airemesi : 4,
                //airecomuni : comuniAIRE,
                dataConsensuale : (sepCons != null) ? $scope.correctDateIt(sepCons.data) : null,
                tribunaleConsensuale : (sepCons != null) ? sepCons.trib : null,
                dataGiudiziale : (sepJui != null) ? $scope.correctDateIt(sepJui.data) : null,
                tribunaleGiudiziale : (sepJui != null) ? sepJui.trib : null,
                dataTemporaneo : (sepTmp != null) ? $scope.correctDateIt(sepTmp.data) : null,
                tribunaleTemporaneo : (sepTmp != null) ? sepTmp.trib : null,
                componenti : (componenti_strutt.length > 0) ? componenti_strutt : null
            }
        };      	
            	
        var value = JSON.stringify(getPDF);
        if($scope.showLog) console.log("Dati richiesta PDF : " + value);
           	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPDF", null, $scope.authHeaders, value);	

        myDataPromise.then(function(result){
        	if(result.error != null){
        		var message = JSON.stringify(result.error);
        		message = message.replace("è", "e'");
        		//$dialogs.notify("Attenzione", message);
        		$dialogs.notify(sharedDataService.getMsgTextAttention(), message);
        		$scope.setPdfCorrect(false);
        		$scope.setLoading(false);
        	} else {		
        		//$scope.pdfResponse = result.result;
            	//$scope.linkPdf = 'data:application/pdf;base64,' + encodeURIComponent($base64.encode(result));//result.result.link;
            	$scope.createPdf(result);
            			
            	//$scope.linkPdf = 'data:application/octet-stream; Content-Disposition: attachment;base64,' + encodeURIComponent($base64.encode(result));//result.result.link;
            	//$scope.namePdf = result.result.attachment.name;
            	if($scope.showLog) console.log("Respons Pdf " + JSON.stringify(result));
            	//console.log("Url Pdf " + JSON.stringify($scope.linkPdf));
            			
            	$scope.setPdfCorrect(true);
            	if(type == 1){
            		$scope.continueNextTab();
            	} else {
            		$scope.continueNextEditTab();
            	}
        	    $scope.setLoading(false);
            }
        });
    };
            
    $scope.setPdfCorrect = function(value){
       	$scope.isPdfCorrectly = value;
    };
    
    $scope.openDoc = function(value){
    	window.open("/" + value, '_blank');
    };
    
    $scope.createPdf = function(data){
    	var method = 'POST';
        var myDataPromise = invokePdfServiceProxy.getProxy(method, "rest/pdf", null, $scope.authHeaders, data);	
            	
        myDataPromise.then(function(result){
        	$scope.filePdf = "pdf/" + result;
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
    
    // Method used to pay
    $scope.pagamento = {};
    $scope.payPratica = function(type){
       	var paga = {
       		idDomanda: $scope.practice.idObj,	
       		identificativo: $scope.pagamento.cf,
       		oraEmissione: $scope.pagamento.ora,
       		giornoEmissione: $scope.correctDateIt($scope.pagamento.giorno)
       	};
            	
       	var value = JSON.stringify(paga);
       	if($scope.showLog) console.log("Dati pagamento : " + value);
            	
       	var method = 'POST';
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "Pagamento", null, $scope.authHeaders, value);	

       	myDataPromise.then(function(result){
       		if($scope.showLog) console.log("Respons pagamento " + JSON.stringify(result));
       		$scope.getSchedaPDF(type);	// I call here the function for PDF becouse I need to wait the response of pay before proceed
       	});
    };
            
    $scope.protocolla = function(){
        $scope.setLoading(true);
            	
        var method = 'GET';
        var params = {
        	idDomanda:$scope.practice.idObj,
        	idEnte:cod_ente,
        	userIdentity: $scope.userCF
        };
            	
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetDatiPratica", params, $scope.authHeaders, null);	

        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		//var lastPractice = result.domanda;
          		$scope.practice = result.domanda;
           		$scope.accetta($scope.practice);
        	} else {
        		//$dialogs.notify("Errore","Errore nella conferma della pratica.");
        		$dialogs.notify(sharedDataService.getMsgTextErr(),sharedDataService.getMsgErrPracticeConfirmation());
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
                	       	
       	var value = JSON.stringify(domandaData);
       	if($scope.showLog) console.log("Dati protocollazione : " + value);
                    	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "Accetta", null, $scope.authHeaders, value);	
                    
        myDataPromise.then(function(result){
            if(result.result == null && result.segnalazioni != null){
                var messaggio = '';
                for(var i = 0; i < result.segnalazioni.length; i++){
            	    messaggio = messaggio.concat("<br>" + (i + 1) + " - " + JSON.stringify(result.segnalazioni[i].descrizione) + " ;<br>"); 
                }
                if($scope.showLog) console.log("Errore in protocolla " + messaggio);
                //$dialogs.notify("Insuccesso","Domanda non confermata. Lista errori: " + messaggio);
                $dialogs.notify(sharedDataService.getMsgTextFailure(),sharedDataService.getMsgErrPracticeConfirmationErrorList() + messaggio);
            } else if((result.exception != null) && (result.exception != '')){
            	if($scope.showLog) console.log("Errore in protocolla " + result.exception);
                //$dialogs.notify("Insuccesso","Domanda non confermata. Eccezione: " + result.exception);
                $dialogs.notify(sharedDataService.getMsgTextFailure(),sharedDataService.getMsgErrPracticeConfirmationExceptionDesc() + result.exception);
            } else {
            	if($scope.showLog) console.log("Respons Protocolla " + JSON.stringify(result));
                //$dialogs.notify("Successo","Domanda creata e confermata dall'utente.");
                $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccPracticeConfirmation());
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
               	
        var value = JSON.stringify(domandaData);
        if($scope.showLog) console.log("Dati rifiuta : " + value);
                	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "Rifiuta", null, $scope.authHeaders, value);	

        myDataPromise.then(function(result){
        	if($scope.showLog) console.log("Respons Rifiuta " + JSON.stringify(result));
            //$dialogs.notify("Rifiutata","Domanda rifiutata dall'utente.");
            $dialogs.notify(sharedDataService.getMsgTextRefused(),sharedDataService.getMsgSuccPracticeRefused());
            $scope.setLoading(false);
        });

    };
            
    //------------------------------------------------------------------------
              
            
    // This method will connect to a ws. Actually it work locally
    $scope.getMunicipalityById = function(cod){
         var found = $filter('getById')($scope.municipalities, cod);
         if($scope.showLog) console.log(found);
         return found.name;
    };
            
            
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
            
    $scope.getPracticesByTypeWS = function(type) {
    	$scope.setLoadingPractice(true);
        var method = 'GET';
        var params = {
        	idEnte:cod_ente,
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
       	if(practiceListWs != null){
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
       	if(lista != null){
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
       	}
       	return pAss;
    };
            
    $scope.getPracticeEdil = function(lista, ue){
       	var pEdil = [];
       	if(lista != null){
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
            
    //---------------Practice State Section----------------
    $scope.practiceState_editMode = false;
    $scope.insertedEcoIndex = false;
            
    $scope.editPracticeState = function(){
       	$scope.practiceState_editMode = true;
    };
          
}]);