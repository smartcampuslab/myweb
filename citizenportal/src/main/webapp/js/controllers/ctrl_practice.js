'use strict';

/* Controllers */
var cpControllers = angular.module('cpControllers');

cp.controller('PracticeCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$route', '$location', '$dialogs', 'sharedDataService', '$filter', 'invokeWSService', 'invokeWSServiceProxy', 'invokePdfServiceProxy', 'getMyMessages', '$base64',
                               function($scope, $http, $routeParams, $rootScope, $route, $location, $dialogs, sharedDataService, $filter, invokeWSService, invokeWSServiceProxy, invokePdfServiceProxy, getMyMessages, $base64, $timeout) { 
	this.$scope = $scope;
    $scope.params = $routeParams;
    $scope.showLog = true;
    $scope.showDialogsSucc = false;

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
    $scope.formats = ['shortDate', 'dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
    $scope.format = $scope.formats[0];
    
    $scope.getPlaceHolder = function(){
	    var local_placeholder = '';
    	if(sharedDataService.getUsedLanguage() == 'ita'){
	    	local_placeholder = "gg/MM/aaaa";
	    } else if(sharedDataService.getUsedLanguage() == 'eng'){
	    	local_placeholder = "dd/MM/yyyy";
	    }
    	return local_placeholder;
    };
              
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
       		if(value == 'maschio' || value == 'MASCHILE'){
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
     // Method used to check if already exists old practice created
     $scope.checkIfLastPractices = function(type){
    	var existsLastPractice = null;
    	var list = [];
    	if(type == 1){
    		list = sharedDataService.getPracticesEdil();
    	} else {
    		list = sharedDataService.getPracticesAss();
    	}
	    if (list.length > 0){
	    	for(var i = list.length -1; (i >= 0) && (existsLastPractice == null); i--){
	    		if (list[i].myStatus =='ACCETTATA'){
	    			existsLastPractice = angular.copy(list[i]);
	    		}
	    	}
		}
    	return existsLastPractice;
     };
     
     // Method used to retrieve the data from last practices if it exists //MB10092014
     $scope.initLastPractice = function(type){
    	var lastPractice = $scope.checkIfLastPractices(type);
       	if(lastPractice != null){
        	// Here I add the load_last_practice functions:
 	       	var loadLast = $dialogs.confirm(sharedDataService.getMsgTextAttention(), "Vuoi caricare i dati dell' ultima domanda effettuata?");
 	       	loadLast.result.then(function(btn){
 					// yes case
 	       			$scope.setLoading(true);
 	       			$scope.getPracticeData(lastPractice.idObj, 2);
 				},function(btn){
 					// no case	
 	        });
       	}
     };

     $scope.setCreationTabs = function(){
       	 $scope.getElenchi();
       	 $scope.isTest();
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
     fInit = false;
       	if(!value){		// check form invalid
            switch(type){
            	case 1:	// CreaPratica
            		sharedDataService.setAllFamilyUpdate(false);
            		$scope.setStartFamEdit(false);
            		if(!$scope.checkStoricoStruct(1)){
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
            		//$scope.setCFRichiedente(false);	// to disable the button "next"
            		$scope.continueNextTab();
            		break;
            	case 3:
            		//$scope.updateNucleoFamiliare(param1);
            		$scope.confermaRichiedente();
            		$scope.setCompEdited(false);
            		$scope.continueNextTab();
            		break;
            	case 4:
            		$scope.salvaModificheSC(0);
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
            		$scope.save_info(param1, 1);
            		//$scope.stampaScheda($scope.practice.idObj, 0);
            		//$scope.continueNextTab();
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
            		$scope.setWaitForProtocolla(true);
            		$scope.protocolla();
            		$scope.deletePdf(param1);
            		break;
            	case 10:
            		$scope.setWaitForProtocolla(true);
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
       	    $scope.tabIndex--;								// decrement tab index
       	    $scope.tabs[$scope.tabIndex].active = true;		// active new tab	
       	}
     };
            
     $scope.setIndex = function($index){
       	$scope.tabIndex = $index;
     };    
     // --------------------- End of Block that manage the tab switching (in practice creation) ----------------------
     
     // ----------------------- Block that manage the tab switching (in practice editing) ---------------------------
     var tabEditIndex = 0;
            
     $scope.setEditTabs = function(){
       	 $scope.getElenchi();
       	 $scope.isTest();
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
            
     // Method nextEditTab to switch the input forms to the next tab and to call the correct functions
     $scope.nextEditTab = function(value, type, param1, param2, param3, param4){
      	fInit = false;
       	if(!value){		// check form invalid
       		switch(type){
      			case 2:
      				if($scope.editTabs[4].disabled == true){ // Usefull check that verify if the family tab is completed or not
      					sharedDataService.setAllFamilyUpdate(false);
      					$scope.setStartFamEdit(false);
      				}
      				if(!$scope.checkStoricoStruct(2)){
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
            		//$scope.setCFRichiedente(false);	// to disable the button "next"
            		break;
            	case 3:
            		//$scope.updateNucleoFamiliare(param1);
            		$scope.confermaRichiedente();
            		$scope.setCompEdited(false);
            		$scope.continueNextEditTab();
            		break;
           		case 4:
           			if(param1 == 'pay_mode'){
           				$scope.setLoading(true);
           				$scope.salvaModificheSC(2);
           			} else {
           				$scope.salvaModificheSC(1);
           			}
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
            		$scope.save_info(param1, 2);
            		//$scope.stampaScheda($scope.practice.idObj, 0);
            		//$scope.continueNextEditTab();
            		break;
            	case 7:
            		$scope.continueNextEditTab();
            		break;	
            	case 8:
            		$scope.setLoading(true);
            		$scope.payPratica(2);
            		break;
            	case 9:
            		$scope.setWaitForProtocolla(true);
            		$scope.protocolla();
            		$scope.deletePdf(param1);
            		break;
            	case 10:
            		$scope.setWaitForProtocolla(true);
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
    
    // Method that initialize the input forms from the practice "edit state" 
    $scope.startFromSpecIndex = function(index, change_ric){
    	if(index < 6 ){
    		$scope.setEditIndex(0);
    		if(change_ric == true){
    			var form_number = $scope.editTabs.length;
    			if(index <= 2){
			    	for(var i = 0; i < form_number; i++){
			    		if(i <= index){
			    			$scope.editTabs[i].disabled = false;
			    		}
			    	}
		    	} else {
		    		var ric_index = 2;
		    		for(var i = 0; i < form_number; i++){
			    		if(i <= ric_index){
			    			$scope.editTabs[i].disabled = false;
			    		}
			    	}
		    	}
    		} else {
	    		var form_number = $scope.editTabs.length;
		    	for(var i = 0; i < form_number; i++){
		    		if(i <= index){
		    			$scope.editTabs[i].disabled = false;
		    		}
		    	}
    		}
    	} else {	// case 'pagato' - 'consolidato'
    		$scope.setEditIndex(index);	
    		var form_number = $scope.editTabs.length;
    		for(var i = 0; i < form_number; i++){
	    		if(i <= index){
	    			$scope.editTabs[i].disabled = true;
	    		}
	    		if(i == index){
	    			$scope.editTabs[i].active = true;
	    		} else {
	    			$scope.editTabs[i].active = false;
	    		}
	    	}
    	}
    	
    	// Here I have to call specific init form function
    	switch(index){
			case 0:	//Dettagli
	    		break;
	    	case 1: //Nucleo - Richiedente
	    		$scope.getComponenteRichiedente();
	    		break;
	   		case 2: //Nucleo - Componenti
	   			$scope.getComponenteRichiedente();
	    		break;
	    	case 3: //Nucleo - Dettagli
	    		$scope.setCompEdited(true);
	    		$scope.getComponenteRichiedente();
	    		$scope.initFamilyTabs(false, false);
	    		break;	
	    	case 4: //Nucleo - Assegnazione
	    		$scope.setCompEdited(true);
	    		$scope.getComponenteRichiedente();
	    		$scope.setStartFamEdit(true);
	    		$scope.initFamilyTabs(true, false); //$scope.initFamilyTabs(true);
	    		//$scope.setComponentsEdited(true);
	    		break;
	    	case 5: //Verifica - Domanda
	    		$scope.setCompEdited(true);
	    		$scope.getComponenteRichiedente();
	    		$scope.setStartFamEdit(true);
	    		$scope.initFamilyTabs(true, false); //$scope.initFamilyTabs(true);
	    		$scope.stampaScheda($scope.practice.idObj, 0);
	    		//$scope.setComponentsEdited(true);
	    		break;	
	    	case 6: //Paga
	    		break;
	    	case 7: //Sottometti
	    		break;	
	    	default:
	    		break;
	    }
    	$scope.setLoading(false);
    };
    
    // Method used to load the practice in "paid" state
    $scope.setPayTabs = function(pId){
    	
    	$scope.initEditTabsForPay(7);
		
        $scope.setLoading(true);
        $scope.setFrameOpened(true);
        $scope.getPracticeData(pId, 4);	//I call the getPracticeData (to find the practice data) -> payPratica (only to redirect the call to getPdf) -> getSchedaPdf (to create the pdf of the practice)
    };
    
    $scope.initEditTabsForPay = function(index){
    	
    	$scope.nextEditTabPay = false;
    	
    	if(index == 7){
    		$scope.setEditIndex(index);
        	var form_number = $scope.editTabs.length;
    		for(var i = 0; i < form_number; i++){
        		if(i <= index){
        			$scope.editTabs[i].disabled = true;
        		}
        		if(i == index){
        			$scope.editTabs[i].active = true;
        		} else {
        			$scope.editTabs[i].active = false;
        		}
        	}
    	} else {
    		$scope.setEditIndex(index);
    		var form_number = $scope.editTabs.length;
    		for(var i = 0; i < form_number; i++){
        		if(i <= index){
        			$scope.editTabs[i].disabled = true;
        		}
        		if(i == index){
        			$scope.editTabs[i].active = true;
        		} else {
        			$scope.editTabs[i].active = false;
        			$scope.editTabs[i].disabled = true;
        		}
        	}
    		$scope.nextEditTabPay = true;
    	}
    };
    
    $scope.continueNextEditTabForPay = function(pId){
    	$scope.initEditTabsForPay(7);
    	$scope.getPracticeData(pId, 4);
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
    
    // Method that initialize the family components tabs with the correct data. The param "no_loc" is used when the forms
    // are not disabled and are all selectable
    $scope.initFamilyTabs = function(no_loc, all_edited){
        fInitFam = false;
        $scope.setNextLabel(sharedDataService.getTextBtnNextComp());
        
        $scope.family_tabs = [];
        for(var i = 0; i < $scope.componenti.length; i++){
        	$scope.family_tabs.push({
            	title : (i + 1) + " - " + $scope.componenti[i].persona.nome + " " + $scope.componenti[i].persona.cognome,
            	index : i + 1,
            	disabled : (i == 0 || no_loc) ? false : true,
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
        	//sharedDataService.setAllFamilyUpdate(true);	// Used to tell the system that all components are edited/updated
        }
        $scope.setComponentsEdited(all_edited);
    };
    
    // MB11092014
    // Method used to force the allignment between the visual object (family_tabs.content) and the back-end object (scope.componenti)
    $scope.alignFamilyContent = function(){
    	if($scope.family_tabs!=null){
    		for(var i = 0; i < $scope.family_tabs.length; i++){
    			$scope.family_tabs[i].content = angular.copy($scope.componenti[i]);
    		}
    	}
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
    
    // Method used to check if the mail inserted in the practice data is the same that is saved in the data user.
    // If the mails are differents the practice mail is updated and saved in the db and the user mail is overwritten (only for this session)
    $scope.checkMergingMail = function(value){
       	if(value != null && value != ''){
           	if(value != sharedDataService.getMail()){
           		sharedDataService.setMail(value);
           		$scope.updatePracticeMail(value);	// here I update the mail in the local db
           	}
       	}
    };
    
    // Method used to update the user mail in the local db practice data
    $scope.updatePracticeMail = function(mail){
    	
    	var params = {
	        idDomanda: sharedDataService.getIdDomanda(),
	        email: mail
	    };
    	
    	var body = {
    		email: mail	
    	};
    	
	    if($scope.showLog) console.log("Dati mail domanda : " + JSON.stringify(params));
	    var value = JSON.stringify(body);  
	    
	    var method = 'POST';
	    var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaEmail", params, $scope.authHeaders, value);	
	
	    myDataPromise.then(function(result){
		    if(result != null && (result.exception == null && result.error == null)){
		      	if($scope.showLog) console.log("Aggiornamento mail ok : " + JSON.stringify(result));
		    } else {
		      	$dialogs.error(result.exception + " " + result.error);
		    }  
	    });  
    };
    
    // Method that check if exist autocert data for "strutture recupero" when ther are component from this structs
    $scope.checkStoricoStruct = function(type){
       	var check = true;
       	var components = $scope.residenzaType.numeroComponenti;
       	if((components != null) && (components != '') && (components > 0)){
       		if($scope.struttureRec.length == 0){
       			check = false;
       		}
       	}
       	if((check == true) && (type == 2)){
       		if((components == null) || (components == '') || (components == 0)){
       			$scope.struttureRec = [];
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
    
    // Method used to check if the phone number is well-formed
    $scope.checkPhonePattern = function(value){
        var check = true;
        if(!($scope.phonePattern.test(value))){
        	$scope.showPhonePatternMessage = true;
        } else {
        	$scope.showPhonePatternMessage = false;
        }
        return check;
    };
    
    // Method used to check if the mail is well-formed
    $scope.checkMailPattern = function(value){
      	var check = true;
       	if(!($scope.mailPattern.test(value))){
       		$scope.showMailPatternMessage = true;
      	} else {
       		$scope.showMailPatternMessage = false;
       	}
       	return check;
    };
    
    // Method used to check the user data correctness, save the data and switch to the next family component tab
    $scope.nextFamilyTab = function(value, componenteVar, disability, invalidAge){
       fInitFam = false;
       if($scope.checkInvalidFields($scope.tabFamilyIndex)){
    	   //if(!value){		// check form invalid
          		if(invalidAge == 'noDis'){
          			disability = null;
           		}
           		if($scope.showLog) console.log("Invalid Age: " + invalidAge);
           		if(sharedDataService.getAllFamilyUpdate() == true){ 	//MB11092014
           			// here I have to check all family component residence years to find if exist the correct value (>=3)
           			if($scope.checkComponentsData() == true){
           				$scope.salvaComponente(componenteVar, disability, true);
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
    	       	    		sharedDataService.setAllFamilyUpdate(true);	// Used to tell the system that all components are edited/updated
    	       	    	}
           			} else {
            			$dialogs.error($scope.getCheckDateContinuosError());
            		}
           		} else {
           			var isLast = ($scope.tabFamilyIndex == ($scope.componenti.length - 1)) ? true : false;
	           		$scope.salvaComponente(componenteVar, disability, isLast);
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
	       	    		sharedDataService.setAllFamilyUpdate(true);	// Used to tell the system that all components are edited/updated
	       	    	}
           		}
       	    	fInitFam = true;
           	//}
       	}
    };
    
    // Method used to come-back to the prev family components data
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
    $scope.yes_no_val = sharedDataService.getYesNoVal();
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
    
    $scope.getSeparation = function(){
    	return $scope.isSeparationVisible;
    };
            
    $scope.hideSeparation = function(){
       	$scope.setSeparation(false);
    };
            
    $scope.checkSeparationSent = function(value){
       	if(value == 'SENT_SEP'){
       		$scope.setSeparation(true);
       	}
    };
            
    // Method that check the correctness of a family state with two spouses ecc... If it
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
            	if($scope.getSeparation() == true){
            		$dialogs.error(sharedDataService.getMsgErrCheckParentelaSc());
            	} else {
            		$scope.setSeparation(true);
            	}
            	check = false;
            } else {
            	check = true;
            }
        }
        return check;
    };
    
    // Method to check if all the sep type are null (in IE an object is managed in a different way respect the other browsers)
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
       	if($scope.componenti != null){
	       	for (var i = 0; i < $scope.componenti.length; i++){
	       		if($scope.componenti[i].statoCivile == null ||  $scope.componenti[i].statoCivile == ''){
	       			check = false;
	       			break;
	       		}
	       	}
       	} else {
       		check = false;
       	}
       	return check;
    };
    
    // Method used to check if the sentence data are correct and to store save the sentence type in "separationType" var
    $scope.salvaSeparazione = function(){
       	//$scope.setSep(value);
       	if(($scope.sep == null) || (($scope.sep.consensual == null) && ($scope.sep.judicial == null) && ($scope.sep.tmp == null))){
       		$dialogs.error(sharedDataService.getMsgErrStatoCivile());
       	} else {
       		if($scope.showLog) console.log("Stato separazione : " + JSON.stringify($scope.sep));
       		if($scope.sep.consensual != null && $scope.sep.consensual.trib != ''){
       			$scope.separationType = 'consensual';
       		} else if($scope.sep.judicial != null && $scope.sep.judicial.trib != ''){
       			$scope.separationType = 'judicial';
       		} else if($scope.sep.tmp != null && $scope.sep.tmp.trib != ''){
       			$scope.separationType = 'tmp';
       		}
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
    $scope.compRecStructTot1 = 0;
    $scope.compRecStructTot2 = 0;
    $scope.textColorTotRes = "";

    $scope.sr = {};
    
    $scope.setTextColorTotRes = function(value){
    	$scope.textColorTotRes = value;
    };
    
    $scope.setErrorsStoricoRes = function(value){
       	$scope.isErrorStoricoRes = value;
    };
            
    $scope.showSRForm = function(value){
       	if($scope.componenteMaxResidenza_Obj != {}){
       		if(($scope.storicoResidenza.length != 0) && (value.idObj != $scope.componenteMaxResidenza_Obj.idObj)){
       			var delStorico = $dialogs.confirm(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrResidenzaAlreadyExist());
       			delStorico.result.then(function(btn){
       				// yes case
       				$scope.storicoResidenza = [];
       				$scope.componenteMaxResidenza_Obj.idObj = value.idObj;
       				$scope.resetComponentResData();
       				//value.variazioniComponente.anniResidenza
       				$scope.setSRFormVisible(true);
       			},function(btn){
       				// no case
       				$scope.setSRFormVisible(false);
                });
       			
       		} else {
       			$scope.setSRFormVisible(true);
       		}
       	} else {
       		$scope.setSRFormVisible(true);
       	}
       	
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
       		$scope.calcolaStoricoRes(person);
       		$scope.checkGreenText();	
       	} else {
       		$scope.setErrorsStoricoRes(true);
       	}
    };
    
    // Used to check the sum of the tn residence years and change the total value colors with green if it's ok or orange if it's not ok
    $scope.checkGreenText = function(){
    	// Here I have to check the continuity of the date from now to last tree years
		var end_period = new Date($scope.practice.dataPresentazione);	
		var totMillisInThreeYear = sharedDataService.getThreeYearsMillis();	//1000 * 60 * 60 * 24 * 360 * 3; // I consider an year of 360 days
    	var startMillis = end_period.getTime() - totMillisInThreeYear;
    	var start_period = new Date(startMillis);
   		var periodOk = $scope.checkAnniContinui(start_period, end_period, $scope.storicoResidenza,2);
   		if(periodOk){
   			$scope.setTextColorTotRes("text-success");
   		} else {
   			$scope.setTextColorTotRes("text-danger");
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
    	    		var startDateMillis = dataDa.getTime() + sharedDataService.getSixHoursMillis();
    	    		if(startDateMillis < person.persona.dataNascita){
    	    			$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrDataDaMinorDataNascita());
    	    			check_ok = false;
    	    		}
    	    		if(dataA.getTime() > $scope.practice.dataPresentazione){
    	    			var dateToString = new Date($scope.practice.dataPresentazione);
    	    			$scope.setErrorMessageStoricoRes(sharedDataService.getMsgErrDataAMajorDataCreazione() + "(" + $scope.correctDateIt(dateToString) + ")");
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
       		    		var two_years = sharedDataService.getTwoYearsMillis();	//1000 * 60 * 60 * 24 * 360 * 2;
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
    
    // Method used to check if a specific date is in the future
    $scope.checkFutureDate = function(date, type){
    	var check_err;
    	if(date instanceof Date){
    		var now = new Date();
       		var six_hours = sharedDataService.getSixHoursMillis();
    		if(date.getTime() > (now.getTime() + six_hours)){
    			check_err = true;
    		} else {
    			check_err = false;
    		}
    	} else {
    		check_err = false;
    	}
    	switch(type){
    	case 1:
    		$scope.showFutureDateErr = check_err;
    		break;
    	case 2:
    		$scope.showFutureDateErrTrib1 = check_err;
    		break;
    	case 3:
    		$scope.showFutureDateErrTrib2 = check_err;
    		break;
    	case 4:
    		$scope.showFutureDateErrTrib3 = check_err;
    		break;
    	case 5:
    		$scope.showFutureDateErrPay = check_err;
    		break;	
    	}
    	
    };
            
    $scope.deleteStoricoRes = function(value, person){
       	$scope.storicoResidenza.splice(value.id, 1);
       	$scope.calcolaStoricoRes(person);
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
       				if(ft_component.variazioniComponente.anniResidenza != $scope.componenti[i].variazioniComponente.anniResidenza){
       					$scope.alignFamilyContent();
       				}
       			} else if(type == 2){
       				$scope.componenti[i].variazioniComponente.anniLavoro = value;
       				if(ft_component.variazioniComponente.anniLavoro != $scope.componenti[i].variazioniComponente.anniLavoro){
       					$scope.alignFamilyContent();
       				}
      			} else {
       				$scope.componenti[i].variazioniComponente.anniAire = value;
       				$scope.componenteAIRE = $scope.componenti[i].persona.cognome  + ", " + $scope.componenti[i].persona.nome;
       				$scope.aireAnni = value;
       			}
       		}
       	}
    };
    
    $scope.comp = {};
            
    $scope.showALForm = function(anni_lav){
    	if(anni_lav != null){
    		$scope.comp.anniLavoro = anni_lav;
    	}
      	$scope.setALFormVisible(true);
    };
            
    $scope.hideALForm = function(){
       	$scope.setALFormVisible(false);
    };
            
    $scope.setALFormVisible = function(value){
       	$scope.isALFormVisible = value;
    };
            
    $scope.calcolaAnzianitaLav = function(value, ft_component){
       	if(value == null){
       		$scope.setALFormVisible(false);
       	} else {
	    	if(value.mesiLavoro > 6){
	       		value.anniLavoro +=1;
	       	} else if((value.mesiLavoro == 6) && (value.giorniLavoro > 0)){
	      		value.anniLavoro +=1;
	       	}
	      	$scope.setAnni(value.anniLavoro, ft_component, 2);
	       	$scope.setALFormVisible(false);
       	}
    };
            
    $scope.checkMonths = function(months){
       	if(months != null && months == 6){
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
           	
      	var totMillisInYear = sharedDataService.getOneYear365Millis();	//1000 * 60 * 60 * 24 * 365; // I consider an year of 365 days
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
        	    		var totMillisInThreeYear = sharedDataService.getThreeYearsMillis();	//1000 * 60 * 60 * 24 * 360 * 3; // I consider an year of 360 days
        		    	var startMillis = end_period.getTime() - totMillisInThreeYear;
        		    	var start_period = new Date(startMillis);
        		    			
        		    	if($scope.checkAnniContinui(start_period, end_period, $scope.storicoResidenza, 1)){
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
    
    // Method used to reset the 'anniResidenza' and 'anniLavoro' value if the 'componenteMaxResidenza' is changed in the form fam_details
    $scope.resetComponentResData = function(){
    	for(var i = 0; i < $scope.componenti.length; i++){
    		if($scope.componenti[i].idObj != $scope.componenteMaxResidenza_Obj.idObj){
    			if($scope.componenti[i].variazioniComponente.anniResidenza != null && $scope.componenti[i].variazioniComponente.anniResidenza > 0){
    				$scope.componenti[i].variazioniComponente.anniResidenza = 0;
    				$scope.componenti[i].variazioniComponente.anniLavoro = 0;
    				var dis = "no-consider";
    				var isLast = (i == ($scope.componenti.length - 1)) ? true : false;
    				$scope.updateComponenteVariazioni($scope.componenti[i], dis, isLast);
    			}
    		}
    	}
    };
            
    $scope.setCheckDateContinuosError = function(value){
       	$scope.errorMessageCheckDate = value;
    };
            
    $scope.getCheckDateContinuosError = function(){
       	return $scope.errorMessageCheckDate;
    };
            
    // ------------------------------------  Recovery Structure Data ------------------------------------
    
    // Method used to verify if a practice has components from recovery structs and to show the specific input form
    // Param type: if 0 the function is called from creation form, if 1 the function is called from details form
    $scope.checkRecoveryStruct = function(type){
       	if($scope.residenzaType.numeroComponenti > 0 && $scope.residenzaType.numeroComponenti < 3){
       		if(type == 0){
       			$scope.setRecoveryStruct(true);
       		} else {
       			if(($scope.struttureRec != null) && ($scope.struttureRec.length != 0)){
       				$scope.setRecoveryStruct(false);
       			} else {
       				$scope.setRecoveryStruct(true);
       			}
       		}
       	} else {
       		$scope.hideRecoveryStruct();
       	}
    };
            
    $scope.strutturaRec = {};
    $scope.strutturaRec2 = {};
    $scope.struttureRec = [];
    $scope.separationType = '';
    
    $scope.setStrutturaRec = function(value){
       	$scope.strutturaRec = value;	// c'era un errore! Era -> $scope.setStrutturaRec = value;
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
    
    // Method invoked when a historic struct data is added in creation or edit form
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
        		
        		var now = new Date();
           		var two_years = sharedDataService.getTwoYearsMillis();	//1000 * 60 * 60 * 24 * 360 * 2;
           		var from_date = new Date(now.getTime() - two_years);
        		if(fromDate.getTime() < from_date){
        			value.distance = toDate.getTime() - from_date;
        		} else {
        			value.distance = toDate.getTime() - fromDate.getTime();
        		}
        		if(comp == 1){
        			var parthial1 = $scope.compRecStructTot1;
    				parthial1 += value.distance;
    				$scope.setResInStructComp1(parthial1);
        		} else {
        			if(value.componenteName == $scope.strutturaRec.componenteName){
        				var parthial1 = $scope.compRecStructTot1;
        				parthial1 += value.distance;
        				$scope.setResInStructComp1(parthial1);
        			} else {
        				var parthial2 = $scope.compRecStructTot2;
        				parthial2 += value.distance;
        				$scope.setResInStructComp2(parthial2);
        			}
        		}
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
    
    $scope.setResInStructComp1 = function(tot){
    	$scope.compRecStructTot1 = tot;
    };
    
    $scope.setResInStructComp2 = function(tot){
    	$scope.compRecStructTot2 = tot;
    };
              
    $scope.deleteStoricoStruct = function(value){
    	$scope.struttureRec.splice(value.id, 1);
    	if($scope.residenzaType.numeroComponenti == 1){
    		var parthial1 = $scope.compRecStructTot1;
    		parthial1 -= value.distance;
    		$scope.setResInStructComp1(parthial1);
    	} else {
    		if(value.componenteName == $scope.strutturaRec.componenteName){
				var parthial1 = $scope.compRecStructTot1;
				parthial1 -= value.distance;
				$scope.setResInStructComp1(parthial1);
			} else {
				var parthial2 = $scope.compRecStructTot2;
				parthial2 -= value.distance;
				$scope.setResInStructComp2(parthial2);
			}
    	}
    };
            
    $scope.controllaStoricoStruct = function(value, componenti){
       	if(value.length == 0){
       		$dialogs.error(sharedDataService.getMsgErrNoStructInserted());
       	} else {
       		// controllo sui 6 mesi spezzati negli ultimi 2 anni per i vari componenti
       		var now = new Date();
       		var two_years = sharedDataService.getTwoYearsMillis();	//1000 * 60 * 60 * 24 * 360 * 2;
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
    $scope.checkAnniContinui = function(data_da, data_a, periodi, type){
    	var continuous_years = false;
        var new_end = data_a;
        for(var i = periodi.length-1; i >= 0; i--){
        	var tmp_end = $scope.correctDate(periodi[i].dataA);
        	var tmp_start = $scope.correctDate(periodi[i].dataDa);
        	var end = $scope.castToDate(tmp_end);
           	var start = $scope.castToDate(tmp_start);
           	var distance_end = new_end.getTime() - end.getTime();
           	var distance_start = data_da.getTime() - start.getTime();
           	var oneDay = sharedDataService.getOneDayMillis(); 	//1000 * 60 * 60 * 24 * 2; // millisenconds of a day
            	
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
           		if(type == 1){
           			$scope.setCheckDateContinuosError(sharedDataService.getMsgErrNoRequirementResidenceOutPeriods());
           		}
           		break;
           	}
           	new_end = start;	// I have to update the period end
        }
        if(continuous_years == false){
        	if(type == 1){
        		$scope.setCheckDateContinuosError(sharedDataService.getMsgErrNoRequirementResidenceOutPeriods());
        	}
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
        var month = sharedDataService.getOneMonthMillis();	//1000 * 60 * 60 * 24 * 30;
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
    
    // Method used to correct decimal value from portal format (with ',') to epu format (with '.') and vice versa
    $scope.correctDecimal = function(num, type){
       	var res = '';
       	if(num != null && num != ''){
       		if(type == 1){
       			res = num.replace(",",".");
       		} else {
       			num = num.toString();
       			res = num.replace(".",",");
       		}
       	}
       	return res;
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
	       		correct = $scope.addZero(day) + "/" + $scope.addZero(month) + "/" + year;
	       		return correct;
	    	} else {
	    		// if date is a String
		       	if(date.indexOf("/") > -1){
		       		return date;
		      	} else {
		        	if(date != null){
		        		var res = date.split("-");
		        		var correct = "";
		        	   	correct=$scope.addZero(res[2]) + "/" + $scope.addZero(res[1]) + "/" + res[0];
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
    
    $scope.addZero = function(value){
    	var string_val = '';
    	if(value < 10){
    		string_val = '0' + value.toString();
    	} else {
    		string_val = value.toString();
    	}
    	return string_val;
    };
            
    // Method used to create a new practice and to inithialize all the principal variables
    $scope.createPractice = function(ec_type, res_type, dom_type, practice){
       	var tmp_scadenza = $scope.correctDate(ec_type.scadenzaPermessoSoggiorno);
       	var scad = null;
       	if(tmp_scadenza != null){
       		scad = $scope.castToDate(tmp_scadenza);
       		var now = new Date();
       		if(scad.getTime() < now.getTime()){
       			var oneDay = sharedDataService.getOneDayMillis(); //1000 * 60 * 60 * 24 * 1;
       			scad = new Date(now.getTime() + oneDay);
       		}
       	}
            	
       	if(sharedDataService.getMail() == null || sharedDataService.getMail() == ''){
       		sharedDataService.setMail($scope.tmp_user.mail);	// I set the mail for the user that do not have the info in the card
       	} else {
       		$scope.tmp_user.mail = sharedDataService.getMail();
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
        		// Added CF check: if CF card is different that CF Ric I show an error and I block the practice editing
        		var componenti = result.domanda.nucleo.componente;
        		var checkRic = $scope.checkRichiedente(componenti);
        		if(checkRic == 1){	// MB17092014: added check for CF in creation
	        		// Here I call the getPracticeMethod
	        		sharedDataService.setIdDomanda(result.domanda.idObj);
	               	$scope.getPracticeData(result.domanda.idObj,1);
	               	// Retrieve the elenchi info
	                $scope.getElenchi();
	                // Here I have to call the setAutocertificazione method to update the storicoStructRec data
	                if((res_type.numeroComponenti != null) && (res_type.numeroComponenti > 0)){
	                	$scope.setAutocertificazione(result.domanda.idObj, result.domanda.versione);
	                } else {
	                	$scope.struttureRec = []; // Clear the data in struttureRec
	                }
        		} else if(checkRic == 2){
        			// Here I call the getPracticeMethod
	        		sharedDataService.setIdDomanda(result.domanda.idObj);
	        		// Here I have to call the "change richiedente" method to change the ric CF
		        	$scope.switchRichiedente($scope.old_ric, $scope.new_ric, res_type, result.domanda, 1);
        		} else {
        			// Here I have to call the method that delete/hide the created practice
        			$scope.deletePractice($scope.userCF, result.domanda.idObj, result.domanda.versione);
        			$scope.setLoading(false);
            		$dialogs.error(sharedDataService.getMsgErrPracticeCreationIcef()); // Icef not correct becouse it belongs to another family
            		return false;
        		}
        		
        	} else {
        		$scope.setLoading(false);
        		$dialogs.error(sharedDataService.getMsgErrPracticeCreationIcef());
        		return false;
        	}
        });	
            	
    };
    
    // Method used to delete a practice (when a user found an icef of another user)
    $scope.deletePractice = function(userId, practiceId, version){
    	var deleteBody = {
    		userIdentity : userId,
    		idDomanda : practiceId,
    		version : version
    	};
    	
    	var value = JSON.stringify(deleteBody);
        if($scope.showLog) console.log("Json value " + value);
            	
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "EliminaPratica", null, $scope.authHeaders, value);	
            	
        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		if($scope.showLog) console.log("Practice deleting success!");
        	} else {
        		if($scope.showLog) console.log("Practice deleting error!");
        	}
        });
    };
    
    $scope.new_ric = '';
    $scope.old_ric = '';
    
    // Method to check if a specific family has the correct richiedente
    $scope.checkRichiedente = function(componenti){
    	var check_ric = 0;
    	
        if(!sharedDataService.getIsTest()){	// Here is prod
           	if(componenti != null){
	        	for(var i = 0; i < componenti.length; i++){
	        		if(componenti[i].richiedente){
	        			$scope.old_ric = componenti[i].idObj;
	        		}
	        		if(componenti[i].persona.codiceFiscale == sharedDataService.getUserIdentity()){		//componenti[i].richiedente == true && 
	           			if(!componenti[i].richiedente){
	           				// switch richiedente
	           				$scope.new_ric = componenti[i].idObj;
	           				check_ric = 2;
	           			} else {
	           				check_ric = 1;
	           			}
	           		}
	           	}
           	}
        } else {		// Here is test
        	check_ric = 1;
        }
        return check_ric;
    };
    
    // Method that check if I am in test or prod
    $scope.isTest = function(){
    	// I call the ws to check if i am in test or prod
    	var method = 'GET';
        var myDataPromise = invokePdfServiceProxy.getProxy(method, "rest/checkcf", null, $scope.authHeaders, null);
            	
        myDataPromise.then(function(result){
        	var isTestBool = (result == "true") ? true : false;
        	sharedDataService.setIsTest(isTestBool);
        });
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
       	
    // Method to obtain the Practice data by the id of the request
    // Params: idDomanda -> object id of the practice; type -> call mode of the function (1 standard, 2 edit mode, 3 view mode, 4 cons mode)
    $scope.getPracticeData = function(idDomanda, type) {
    	
    	if(type == 2 || type == 4){
    		$scope.setLoading(true);
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
        	    	$scope.getElenchi();
        	    	$scope.initAlloggioFromEpu($scope.practice.alloggioOccupato);
        	    }
        	    		
        	    // split practice data into differents objects
        	    $scope.extracomunitariType = $scope.practice.extracomunitariType;
        	    $scope.residenzaType = $scope.practice.residenzaType;    
        	    $scope.nucleo = $scope.practice.nucleo;
        	    //$scope.nucleo.monoGenitore = $scope.practice.nucleo.monoGenitore == true ? 'true' : 'false';
        	    //$scope.nucleo.alloggioSbarrierato = $scope.practice.nucleo.alloggioSbarrierato == true ? 'true' : 'false';
        	    $scope.setComponenti($scope.nucleo.componente);
        	    if(type == 2){
        	    	// Here I have to call the check Richiedente
        	    	var checkRic = $scope.checkRichiedente($scope.nucleo.componente);
            		if(checkRic == 1){	// MB21102014: added check for CF in edit
    	        		// Here I call the getPracticeMethod
            			$scope.getAutocertificationData(idDomanda, 0);
            		} else if(checkRic == 2){
    	        		// Here I have to call the "change richiedente" method to change the ric CF
    		        	$scope.switchRichiedente($scope.old_ric, $scope.new_ric, null, result.domanda, 2);
            		} else {
            			$scope.getAutocertificationData(idDomanda, 0);
            		}
           		} else if(type == 3){
           			// View mode
           			$scope.getElenchi();
           			$scope.getAutocertificationData(idDomanda, 2);
           		}
        	    $scope.indicatoreEco = $scope.nucleo.indicatoreEconomico;
        	    
        	    if(type == 1){
        	    	$scope.setLoading(false);
        	    	if($scope.checkICEF($scope.practice) == true){
        	    		if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccPracticeCreation1() + result.domanda.identificativo + sharedDataService.getMsgSuccPracticeCreation2());
        	    		$scope.continueNextTab();
        	    	} else {
        	    		$dialogs.error(sharedDataService.getMsgErrPracticeCreationIcefHigh());
        	    	}
        	    } else if(type == 4){
        	    	
        			$scope.tmpAmbitoTerritoriale = $scope.practice.ambitoTerritoriale1;
        	    	if($scope.tmpAmbitoTerritoriale != null && $scope.tmpAmbitoTerritoriale != ''){
        	    		$scope.myAmbito={
        	    			idObj: $scope.tmpAmbitoTerritoriale.idObj,
        	    			descrizione: $scope.getComuneById($scope.tmpAmbitoTerritoriale.idObj, 3)
        	    		};
        	    		$scope.practice.ambitoTerritoriale1 = $scope.myAmbito.idObj;
        	    	}
        	    	$scope.initAlloggioFromEpu($scope.practice.alloggioOccupato);
        	    	$scope.getElenchi();
        	    		
        	    	// Here I have to call the check Richiedente
        	    	var checkRic = $scope.checkRichiedente($scope.nucleo.componente);
        	    	if(checkRic == 1){	// MB23102014: added check for CF in pay
            	    	$scope.getAutocertificationData(idDomanda, 1);
            		} else if(checkRic == 2){
    	        		// Here I have to call the "change richiedente" method to change the ric CF
    		        	$scope.switchRichiedente($scope.old_ric, $scope.new_ric, null, result.domanda, 3);
            		} else {
            			// Here it will come only if i am in test (case of cf user not in cf of family)
            			$scope.getAutocertificationData(idDomanda, 1);
            		}
        	    	
        	    }
        	} else {
            	$scope.setLoading(false);
            	$dialogs.error(result.error);
            }
        });        	
    };
            
    $scope.setComponenti = function(value){
       	$scope.componenti = value;
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
    
    // Method used to load the autocertification data from the myweb local db
    // Params: idDomanda -> practice object id; type -> call mode of the function. If 0 only init the autocert params (edit mode), if 1 the method call the payPratica method, if 2 the method init the autocert params (view mode), if 99 is used in edit after changeRic
    $scope.getAutocertificationData = function(idDomanda, type){
    	
    	// Here I have to clear the lists
    	$scope.storicoResidenza = [];
    	$scope.struttureRec = [];
    	
    	var changeRic = false;
    	if(type == 99){
    		changeRic = true;
    	}
    	
    	var autocert_ok = {
    		history_struts : false,
    		history_res : false,
    		trib : false
    	};
    	
    	var method = 'GET';
       	var params = {
       		idDomanda:idDomanda,
       		userIdentity: $scope.userCF
       	};
          	
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "GetPraticaMyWeb", params, $scope.authHeaders, null);	
       	myDataPromise.then(function(result){
            if((result != null) && (result.autocertificazione != null)){
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
            				isAire: periods[i].aire,
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
			    	$scope.separationType = 'nothing';
			    	$scope.sep = {};
			    }
			    if($scope.sep != null){
			    	autocert_ok.trib = true;
			    }
			    // ------------------------------------------------------------
			    if(type == 0 || type == 99){
			    	var mail = result.email;
			    	var pos = $scope.findEditPosition($scope.practice, mail, autocert_ok);	//MB22092014 - uncomment to manage F003 update 
       				$scope.startFromSpecIndex(pos, changeRic);
       				//$scope.setLoading(false);
			    } else if(type == 1){
			    	$scope.payPratica(3);
			    } else if(type == 999){
			    	$scope.initEditTabsForPay(2);
			    } else {
			    	$scope.setLoading(false);
			    }
            } else {
            	if(type == 0  || type == 99){
            		var mail = result.email;
			    	var pos = $scope.findEditPosition($scope.practice, mail, autocert_ok);	//MB22092014 - uncomment to manage F003 update 
       				$scope.startFromSpecIndex(pos, changeRic);
       				//$scope.setLoading(false);
			    } else if(type == 1 || type == 999){
            		// Case of autocertification data not presents
            		//$scope.startFromSpecIndex(0);
            		$dialogs.error(sharedDataService.getMsgErrNoAutocertFromFracticeInPay());
            		$scope.setFrameOpened(false);
            		window.history.back();
            		$scope.setLoading(false);
			    } else {
			    	$scope.setLoading(false);
			    }
            }
            // Mail loading
            if(result != null && result.email != null){
            	$scope.tmp_user.mail = result.email;
        	}
            if(type == 0 || type == 1){
            	$scope.checkRecoveryStruct(1);	// to check the presence of components from recovery structs
            }
        });
    };
    
    // Method used to init alloggioOccupato data in edit mode
    $scope.initAlloggioFromEpu = function(alloggio){
    	if (alloggio != null && alloggio.comuneAlloggio != null){
	    	var tmp = alloggio;
	    	tmp.importoCanone = $scope.correctDecimal(alloggio.importoCanone, 2);
	    	tmp.comuneAlloggio = alloggio.comuneAlloggio.toString();
	    	tmp.dataContratto = $scope.correctDateIt(new Date(alloggio.dataContratto));
	    	$scope.alloggioOccupato = tmp;
    	}
    };
    
    // Method that control the practice data and find where the user has set the data and where not (edit pos)
    $scope.findEditPosition = function(practice, mail, autocert_ok){
    	var sc_ok = true;
    	var anniRes_ok = false;
    	var telMail_ok = false;
    	var alloggioOcc_ok = false;
    	var ambitoTerr_ok = false;
    	var tabIndex = 0;
    	if(practice != null){
    		if(practice.ambitoTerritoriale1 != null){
    			if(practice.residenzaType.numeroComponenti == null || practice.residenzaType.numeroComponenti == 0){
    				ambitoTerr_ok = true;
    			} else if(practice.residenzaType.numeroComponenti != null && practice.residenzaType.numeroComponenti > 0){
    				if(autocert_ok.history_struts == true){
    					ambitoTerr_ok = true;
    				} else {
    					sc_ok = false;
    				}		
    			}	
    		}
    		if((practice.alloggioOccupato.comuneAlloggio != null) && (practice.alloggioOccupato.importoCanone != null)){
    			if(practice.residenzaType.numeroComponenti == null || practice.residenzaType.numeroComponenti == 0){
    				alloggioOcc_ok = true;
    			} else if(practice.residenzaType.numeroComponenti != null && practice.residenzaType.numeroComponenti > 0){
    				if(autocert_ok.history_struts == true){
    					alloggioOcc_ok = true;
    				} else {
    					sc_ok = false;
    				}		
    			}
    		}
    		if(practice.nucleo != ""){
    			var fam_state = $scope.checkFamilyState();
	    		for(var i = 0; i < practice.nucleo.componente.length; i++){
	    			if(practice.nucleo.componente[i].statoCivile == null || fam_state == false){
	    				sc_ok = false;
	    			}
	    			if((practice.nucleo.componente[i].variazioniComponente.anniResidenza != null) && (practice.nucleo.componente[i].variazioniComponente.anniResidenza > 0)){
	    				if(autocert_ok.history_res == true){
	    					anniRes_ok = true;
	    				}		
	    			}
	    			if((practice.nucleo.componente[i].variazioniComponente.telefono != null) && (mail != null && mail != "")){
	    				telMail_ok = true;
	    			}
	    		};
    		}
    	} else {
    		sc_ok = false;
    	}
    	// Here I set the correct tab position
    	if(sc_ok){
    		if(anniRes_ok && telMail_ok){
    			tabIndex = 4;
    		} else {
    			tabIndex = 3;
    		}
    	} else {
    		if(alloggioOcc_ok || ambitoTerr_ok){
    			tabIndex = 1;
    		} else {
    			tabIndex = 0;
    		}
    	}
    	return tabIndex;	
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
        		$scope.listaComuniVallagarina = $scope.getOnlyComunity(result.comuni);
        		$scope.listaAmbiti = result.ambitiTerritoriali;
        		//$scope.listaEdizioni = result.edizioniFinanziate;
        	});
       	} else {
       		$scope.listaComuni = sharedDataService.getStaticComuni();
       		$scope.listaComuniVallagarina = $scope.getOnlyComunity(sharedDataService.getStaticComuni());
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
    		var importo = $scope.correctDecimal(alloggioOccupato.importoCanone, 1);
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
            	if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAlloggio());
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
        		if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditResidenza());
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
        			if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAmbito());
        		} else {
        			$scope.setLoading(false);
        			$dialogs.error(sharedDataService.getMsgErrEditAmbito());
        		}
        	});
       	} else {
       		$scope.setLoading(false);
       		if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAmbito());
       	}
    };
            
    // Method to update the "parentelaStatoCivile" data of every family member 
    $scope.salvaModificheSC = function(type){
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
    	    			if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditParentelaSc());
    	    			$scope.setAutocertificazione($scope.practice.idObj, $scope.practice.versione);		// Here I call the autocertification update
    	    			if($scope.getStartFamEdit() == true){
    	    				$scope.initFamilyTabs(true, false);
    	    			} else {
    	    				$scope.initFamilyTabs(false, false);
    	    			}
    	    			if(type == 0){
    	    				$scope.continueNextTab();
    	    			} else if(type == 1){
    	    				$scope.continueNextEditTab();
    	    			} else {
    	    				$scope.continueNextEditTabForPay($scope.practice.idObj);
    	    			}
    	    		} else {
    	    			$dialogs.error(sharedDataService.getMsgErrEditParentelaSc());
    	    		}
    	    		$scope.setLoadingPSC(false);    		    		
        		});
        	}
        }
    };
            
    // Method to update the "componenteNucleoFamiliare" data
    $scope.updateComponenteVariazioni = function(componenteVariazioni, disability, isLast){
    	
    	if(componenteVariazioni.variazioniComponente.anniResidenza != null && componenteVariazioni.variazioniComponente.anniResidenza > 0){
    		$scope.setStartFamEdit(true);
    	}
            	
        // for extra disability: blind and/or mute    	
        if(disability != null){
        	if(disability != "no-consider"){
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
       			// Here I have to check if exist data from storico Res and update autocertification data
    			if((componenteVariazioni.variazioniComponente.anniResidenza != null) && (componenteVariazioni.variazioniComponente.anniResidenza > 0)){
    				$scope.setAutocertificazione($scope.practice.idObj, $scope.practice.versione);
    			}
       			$scope.setLoading(false);
       			if(isLast == true){
       				if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditAllComponents());
       			} else {
       				if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditComponentData());
       			}
       			
       		} else {
       			$scope.setLoading(false);
       			$dialogs.error(sharedDataService.getMsgErrEditComponentData());
       		}
       	});
    };
            
    // Method to update the extra info of "nucleo familiare"
    $scope.updateNFVarie = function(nucleoFam, type){
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
        		if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditInfoAss());
        		$scope.stampaScheda($scope.practice.idObj, 0);
        		if(type == 1){ 	// creation mode
        			$scope.continueNextTab(); 
        		} else { 		// edit mode
        			$scope.continueNextEditTab();
        		}
        		
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
        var componentiLength = ($scope.componenti != null) ? $scope.componenti.length : 0 ;
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
    $scope.salvaComponente = function(componenteVariazioni, disability, isLast){
       	$scope.setLoading(true);
       	$scope.showEditComponents = false;
       	// richiamo a modifica nucleo famigliare componenti
       	$scope.updateComponenteVariazioni(componenteVariazioni, disability, isLast);
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
            
    //---------- Cambia Richiedente Section -----------
    $scope.setChangeRichiedente = function(value){
       	 $scope.cambiaRichiedente = value;
    };
            
    //$scope.setCFRichiedente = function(value){
    //   	$scope.checkCFRich = value;
    //};
            
    $scope.setLoadingRic = function(value){
       	$scope.isLoadingRic = value;
    };
            
    $scope.confermaRichiedente = function(){
       	// Here i call the service to update the value of "monoGenitore"
       	$scope.setLoadingRic(true);
       	$scope.updateMonoGen();
       	//$scope.setCFRichiedente(true);
    };
            
    // Method to update the monoGenitore field of "nucleo familiare"
    $scope.updateMonoGen = function(){
    	if($scope.nucleo != null){
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
	        		if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditNucleoFam());
	        	} else {
	        		$dialogs.error(sharedDataService.getMsgErrEditNucleoFam());
	        	}
	        	$scope.setLoadingRic(false);
	        }); 
    	} else {
    		$scope.setLoadingRic(false);
    	}	
    };
            
    $scope.changeRichiedente = function(){
       	$scope.OldRichiedente = angular.copy($scope.richiedente.idObj);
       	//$scope.IdRichiedente = $scope.richiedente.idObj;
       	$scope.setChangeRichiedente(true);
    };
            
    $scope.hideChangeRichiedente = function(){
       	$scope.setChangeRichiedente(false);
    };
            
//    $scope.saveRichiedente = function(){
//       	$scope.setLoadingRic(true);
//       	$scope.switchRichiedente();
//       	$scope.getComponenteRichiedente();
//      	$scope.setChangeRichiedente(false);
//    };
            
    // Function to swith user "richiedente" between the family members.
    // Param type: if 1 the function is called in creation mode, if 2 the function is called in edit mode.
    $scope.switchRichiedente = function(id_oldRic, id_newRic, res_type, domanda, type){        	
        //var new_richiedente = $scope.richiedente.idObj;
           	
        var nucleo = {
            	domandaType : {
            		parentelaStatoCivileModificareType : {
            			componenteModificareType : [{
            				idNucleoFamiliare: domanda.nucleo.idObj,
            				idObj: id_oldRic,//$scope.OldRichiedente,
            				richiedente: false,
            				parentela: $scope.affinities[0].value
            			},{
            				idNucleoFamiliare: domanda.nucleo.idObj,
            				idObj: id_newRic,//new_richiedente,
            				richiedente: true,
            				parentela: null
            			}],
            			idDomanda: domanda.idObj,
            			idObj: domanda.nucleo.idObj
            		},
            		idDomanda : domanda.idObj,
            		versione: domanda.versione
            	},
          	idEnte : cod_ente,
          	userIdentity : $scope.userCF
        };
            	
        var value = JSON.stringify(nucleo);
        if($scope.showLog) console.log("Cambia Richiedente domanda : " + value);
        		
        var method = 'POST';
        var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
            	
        myDataPromise.then(function(result){
        	if(result.esito == 'OK'){
        		if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccChangeRic());
        		//$scope.setComponenti(result.domanda.nucleo.componente);
        		$scope.getComponenteRichiedente();
        		//$scope.setComponenteRichiedente(result.domanda.nucleo.componente[0]);
        		if($scope.showLog) console.log("Cambia Richiedente risposta : " + JSON.stringify(result.domanda.nucleo));
        		$scope.updateResidenzaRichiedente(id_newRic, res_type, domanda, type);
        		
        	} else {
        		$dialogs.error(sharedDataService.getMsgErrChangeRic());
        	}
        	$scope.setLoadingRic(false);
        });        	
    };
    
    // Method to copy the residenza data into the new richiedente component
    // Param type: if 1 the function is called in creation mode, if 2 the function is called in edit mode.
    $scope.updateResidenzaRichiedente = function(new_ric_comp, res_type, domanda, type){
            
    	var obj_old_ric = null;
    	var obj_new_ric = null;
    	for(var i = 0; i < domanda.nucleo.componente.length; i++){
    		var tmp_comp = domanda.nucleo.componente[i].variazioniComponente;
    		if(tmp_comp.indirizzoResidenza != null && tmp_comp.indirizzoResidenza != ""){
    			obj_old_ric = tmp_comp;
    		} else if(tmp_comp.idComponente == new_ric_comp){
    			obj_new_ric = tmp_comp;
    		}
    	}
        // model for "variazioniComponente"
        var variazioniComponenteCorr = {
        	anniLavoro: obj_new_ric.anniLavoro,
            anniResidenza: obj_new_ric.anniResidenza,
            anniResidenzaComune: obj_new_ric.anniResidenzaComune,
            categoriaInvalidita: obj_new_ric.categoriaInvalidita,
            donnaLavoratrice: obj_new_ric.donnaLavoratrice,
            flagResidenza: obj_new_ric.flagResidenza,
            frazione: obj_old_ric.frazione,
            fuoriAlloggio: obj_new_ric.fuoriAlloggio,
            gradoInvalidita: obj_new_ric.gradoInvalidita,
            idComponente: new_ric_comp,
            idComuneResidenza: obj_old_ric.idComuneResidenza,
            idObj: obj_new_ric.idObj,
            indirizzoResidenza: obj_old_ric.indirizzoResidenza,
            decsrCittadinanza: obj_new_ric.decsrCittadinanza,
            numeroCivico: obj_old_ric.numeroCivico,
            ospite: obj_new_ric.ospite,
            pensionato: obj_new_ric.pensionato,
            provinciaResidenza: obj_old_ric.provinciaResidenza,
            telefono: obj_old_ric.telefono
       	};
            	
       	// model for nucleo
    	var nucleo = {
        	domandaType : {
        		nucleoFamiliareComponentiModificareType : {
        			componenteModificareType : [{
        				idNucleoFamiliare: domanda.nucleo.idObj,
        				idObj: new_ric_comp,
        				variazioniComponenteModificare: variazioniComponenteCorr
        			}],
        			idDomanda: domanda.idObj,
        			idObj: domanda.nucleo.idObj
        		},
        		idDomanda : domanda.idObj,
        		versione: domanda.versione
        	},
        	idEnte : cod_ente,
        	userIdentity : $scope.userCF
        };
        		
    	var value = JSON.stringify(nucleo);
    	if($scope.showLog) console.log("Copy Residenza : " + value);
    		
    	var method = 'POST';
       	var myDataPromise = invokeWSServiceProxy.getProxy(method, "AggiornaPratica", null, $scope.authHeaders, value);
       	
       	myDataPromise.then(function(result){
       		if(result.esito == 'OK'){
       			// Here I have to check if exist data from storico Res and update autocertification data
       			$scope.setLoading(false);
       			if($scope.showDialogsSucc) $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccEditComponentData());
       			if(type == 1){
	       			$scope.getPracticeData(result.domanda.idObj,1);
	               	// Retrieve the elenchi info
	                $scope.getElenchi();
	                // Here I have to call the setAutocertificazione method to update the storicoStructRec data
	                if((res_type.numeroComponenti != null) && (res_type.numeroComponenti > 0)){
	                	$scope.setAutocertificazione(result.domanda.idObj, result.domanda.versione);
	                } else {
	                	$scope.struttureRec = []; // Clear the data in struttureRec
	                }
       			} else if(type == 2){
       				$scope.nucleo = result.domanda.nucleo;
       				$scope.setComponenti($scope.nucleo.componente);
       				$scope.getAutocertificationData(result.domanda.idObj, 99);
       			} else {
       				$scope.nucleo = result.domanda.nucleo;
       				$scope.setComponenti($scope.nucleo.componente);
       				$scope.getAutocertificationData(result.domanda.idObj, 999);
       			}
       			
       		} else {
       			$scope.setLoading(false);
       			$dialogs.error(sharedDataService.getMsgErrEditComponentData());
       		}
       	});
    };
            
    $scope.setCompEdited = function(value){
       	$scope.compEdited = value;
    };   
    
    var startedFamEdit = false;
    $scope.setStartFamEdit = function(value){
    	startedFamEdit = value;
    };
    
    $scope.getStartFamEdit = function(){
    	return startedFamEdit;
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
            
    $scope.save_info = function(nucleo, type){
       	$scope.setLoadingAss(true);
       	$scope.updateNFVarie(nucleo, type);
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
    $scope.stampaScheda = function(idPratica, type){
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
           	if(result != null && result != ""){	// I have to check if it is correct
	       		$scope.scheda = result.domanda.assegnazioneAlloggio;
	       		$scope.punteggi = result.domanda.dati_punteggi_domanda.punteggi;
	       		$scope.punteggiTotali = $scope.cleanTotal(result.domanda.dati_punteggi_domanda.punteggi.punteggio_totale.totale_PUNTEGGIO.dettaglio.calcolo); //$scope.cleanTotal() + ",00"
	        	if(type == 1){
	        		// Case view practice json from list
	        		 $scope.getPracticeData(idPratica, 3);
	        	} else if(type == 3){
	        		$scope.getSchedaPDF(type-1);	// I call here the function for PDF becouse I need to wait the response of pay before proceed
	        	} else {
	        		$scope.setLoading(false);
	        	}
        	} else {
        		$scope.setLoading(false);
        		$dialogs.error(sharedDataService.getMsgErrPracticeViewJson());
        	}
       	});
    };
       
    // New method to update and store the autocertificazione data - MB17092014
    $scope.setAutocertificazione = function(practiceId, practiceVers){
    	var periodoRes = [];
    	
    	var componenti_strutt = [];
       	var comp1 = {};
       	var comp2 = {};
       	var nameComp = [];
       	var strutture1 = [];
       	var strutture2 = [];
    	
       	if($scope.storicoResidenza != null){
        	for(var i = 0; i < $scope.storicoResidenza.length; i++){
        		var isAire = ($scope.storicoResidenza[i].isAire == null || $scope.storicoResidenza[i].isAire == "") ? false : true;
        		if(i == 0){
        			// case "dalla nascita"
        		    var dataNascita = new Date($scope.componenteMaxResidenza_Obj.persona.dataNascita);
        		    var tmp_Da = $scope.correctDate($scope.storicoResidenza[0].dataDa);
        		    var firstDataDa = $scope.castToDate(tmp_Da);
        		    var diff = firstDataDa.getTime()-dataNascita.getTime();
        		    var oneDay = sharedDataService.getOneDayMillis();  //1000 * 60 * 60 * 24;
        		    var firstStorico = {};
        		    if(diff <= oneDay){
        		    	firstStorico = {
        		    		aire : isAire, //$scope.storicoResidenza[i].isAire, 
        		    		comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        		    		dal : "",
        		    		al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        		    	};
        		    } else {
        		    	periodoRes.push({});	// first empty value
        		    	firstStorico = {
        		    		aire : isAire, //$scope.storicoResidenza[i].isAire, 
        		    		comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        		    		dal : $scope.correctDateIt($scope.storicoResidenza[i].dataDa),
        		    	    al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        		        };
        		    }
        		    periodoRes.push(firstStorico);
        		} else {
        			var res = {
        				aire : isAire, //$scope.storicoResidenza[i].isAire, 
        				comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        				dal : $scope.correctDateIt($scope.storicoResidenza[i].dataDa),
        				al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        			};
        			periodoRes.push(res);
        		}
        	};
        }
    	
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
        
	    var updateAutocert = {
	          	domandaInfo : {
	           	idDomanda: practiceId,	
	           	userIdentity: $scope.userCF,
	           	version : practiceVers
	        },
		    autocertificazione : {
		      	periodiResidenza : periodoRes,  			
		       	componenteMaggiorResidenza : $scope.componenteMaxResidenza,
		       	totaleAnni : $scope.residenzaAnni,
		        dataConsensuale : (sepCons != null) ? $scope.correctDateIt(sepCons.data) : null,
		        tribunaleConsensuale : (sepCons != null) ? sepCons.trib : null,
		        dataGiudiziale : (sepJui != null) ? $scope.correctDateIt(sepJui.data) : null,
		        tribunaleGiudiziale : (sepJui != null) ? sepJui.trib : null,
		        dataTemporaneo : (sepTmp != null) ? $scope.correctDateIt(sepTmp.data) : null,
		        tribunaleTemporaneo : (sepTmp != null) ? sepTmp.trib : null,
		        componenti : (componenti_strutt.length > 0) ? componenti_strutt : null
		    }
	    };
	        
	    //here I have to call the ws and pass the data 'updateAutoCert'
	    var value = JSON.stringify(updateAutocert);
	    if($scope.showLog) console.log("Dati autocert domanda : " + value);
	        	
	    var method = 'POST';
	    var myDataPromise = invokeWSServiceProxy.getProxy(method, "SalvaAutocertificazione", null, $scope.authHeaders, value);	
	
	    myDataPromise.then(function(result){
		    if(result != null && (result.exception == null && result.error == null)){
		      	if($scope.showLog) console.log("Salvataggio autocertificazione ok : " + JSON.stringify(result));
		    } else {
		      	$dialogs.error(result.exception + " " + result.error);
		    }
		       	
		    $scope.setLoading(false);   
	    });  
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
            
    // method to obtain the link to the pdf of the practice
    $scope.getSchedaPDF = function(type){
       	var periodoRes = [];
       	if($scope.storicoResidenza != null){
        	for(var i = 0; i < $scope.storicoResidenza.length; i++){
        		var isAire = ($scope.storicoResidenza[i].isAire == null || $scope.storicoResidenza[i].isAire == "") ? false : true;
        		if(i == 0){
        			// case "dalla nascita"
        		    var dataNascita = new Date($scope.componenteMaxResidenza_Obj.persona.dataNascita);
        		    var tmp_Da = $scope.correctDate($scope.storicoResidenza[0].dataDa);
        		    var firstDataDa = $scope.castToDate(tmp_Da);
        		    var diff = firstDataDa.getTime()-dataNascita.getTime();
        		    var oneDay = sharedDataService.getOneDayMillis();  //1000 * 60 * 60 * 24;
        		    var firstStorico = {};
        		    if(diff <= oneDay){
        		    	firstStorico = {
        		    		aire : isAire, //$scope.storicoResidenza[i].isAire, 
        		    		comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        		    		dal : "",
        		    		al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        		    	};
        		    } else {
        		    	periodoRes.push({});	// first empty value
        		    	firstStorico = {
        		    		aire : isAire, //$scope.storicoResidenza[i].isAire, 
        		    		comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        		    		dal : $scope.correctDateIt($scope.storicoResidenza[i].dataDa),
        		    	    al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        		        };
        		    }
        		    periodoRes.push(firstStorico);
        		} else {
        			var res = {
        				aire : isAire, //$scope.storicoResidenza[i].isAire, 
        				comune : $scope.getComuneById($scope.storicoResidenza[i].idComuneResidenza,2),
        				dal : $scope.correctDateIt($scope.storicoResidenza[i].dataDa),
        				al : $scope.correctDateIt($scope.storicoResidenza[i].dataA)
        			};
        			periodoRes.push(res);
        		}
        	};
        }
    	
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
        		if(message.indexOf("ALC-") != -1){ // to solve bug pdf conversion in infoTN JB
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrPracticeViewPdf());
        		} else {
        			message = message.replace("è", "e'");
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), message);
        		}
        		$scope.setPdfCorrect(false);
        		$scope.setLoading(false);
        	} else if(result.exception != null){
        		var message = JSON.stringify(result.exception);
        		if(message.indexOf("ALC-") != -1){ // to solve bug pdf conversion in infoTN JB
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), sharedDataService.getMsgErrPracticeViewPdf());
        		} else {
        			message = message.replace("è", "e'");
        			$dialogs.notify(sharedDataService.getMsgTextAttention(), message);
        		}
        		$scope.setPdfCorrect(false);
        		$scope.setLoading(false);
        	} else {		
        		//$scope.pdfResponse = result.result;
            	//$scope.linkPdf = 'data:application/pdf;base64,' + encodeURIComponent($base64.encode(result));//result.result.link;
            	$scope.createPdf(result);		
            	//$scope.linkPdf = 'data:application/octet-stream; Content-Disposition: attachment;base64,' + encodeURIComponent($base64.encode(result));//result.result.link;
            	//$scope.namePdf = result.result.attachment.name;
            	//if($scope.showLog) console.log("Respons Pdf " + JSON.stringify(result));		
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
    	if(type != 3){
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
    	} else {
    		$scope.stampaScheda($scope.practice.idObj, type);
    	}
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
                $dialogs.notify(sharedDataService.getMsgTextFailure(),sharedDataService.getMsgErrPracticeConfirmationErrorList() + messaggio);
            } else if((result.exception != null) && (result.exception != '')){
            	if($scope.showLog) console.log("Errore in protocolla " + result.exception);
                $dialogs.notify(sharedDataService.getMsgTextFailure(),sharedDataService.getMsgErrPracticeConfirmationExceptionDesc() + result.exception);
            } else {
            	if($scope.showLog) console.log("Respons Protocolla " + JSON.stringify(result));
                $dialogs.notify(sharedDataService.getMsgTextSuccess(),sharedDataService.getMsgSuccPracticeConfirmation());
            }
            $scope.setLoading(false);
            $scope.setWaitForProtocolla(false);
        });
    };
    
    $scope.setWaitForProtocolla = function(wait){
    	$scope.waitForProtocolla = wait;
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
            $dialogs.notify(sharedDataService.getMsgTextRefused(),sharedDataService.getMsgSuccPracticeRefused());
            $scope.setLoading(false);
            $scope.setWaitForProtocolla(false);
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
       	$scope.practicesOldEF = [];
       	//var now = new Date();
       	if(practiceListWs != null){
       		for(var i = 0; i < practiceListWs.length; i++){
       			//var millisCloseDate = practiceListWs[i].edizioneFinanziata.edizione.dataChiusura;
       			//if(millisCloseDate > now.getTime()){
		           	for(var j = 0; j < practiceListMy.length; j++){
		           		if(practiceListWs[i].idObj == practiceListMy[j].idDomanda){
		           			practiceListWs[i].myStatus = practiceListMy[j].status;
		           			if((practiceListMy[j].status == 'EDITABILE') || (practiceListMy[j].status == 'PAGATA') ||  (practiceListMy[j].status == 'ACCETTATA')  ||  (practiceListMy[j].status == 'RIFIUTATA')){
		           				practicesWSM.push(practiceListWs[i]);
		           			}
		           			break;
		           		}
		           	}
       			//} else {
       				// Here I save the data in the list for old financial edition
       				//$scope.practicesOldEF.push(practiceListWs[i]);
       			//}  	
	        }
        }
            	
        if(type == 1){
       		$scope.practicesEdilWS = $scope.getPracticeEdil(practicesWSM, sharedDataService.getUeCitizen());
       		sharedDataService.setPracticesEdil($scope.practicesEdilWS);
      	} else {
    		$scope.practicesAssWS = $scope.getPracticeAss(practicesWSM, sharedDataService.getUeCitizen());
    		sharedDataService.setPracticesAss($scope.practicesAssWS);
    	}
        $scope.setLoadingPractice(false);
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