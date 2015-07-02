'use strict';

/* Services */
var cpServices = angular.module('cpServices', ['ngResource']);
cp.service('sharedDataService', function(){
	// This section is shared between all the controllers
	
	// Shared field description
	this.usedLanguage = 'ita';
	this.name = '';
	this.surname = '';
	this.ueCitizen = false;
	this.familyAllowances = false;
	this.loading = false;
	this.userIdentity = 'HMTRND69R11Z100M';
	this.base64 = '';
	this.urduAlign = false;
	this.firstTimeAccess = true;
	
	this.practicesEdil = [];
	this.practicesAss = [];
	this.oldPractices = [];
	this.offlinePractices = [];
	
	this.allFamilyUpdated = false;
	this.isTest = false;
	this.userId = '';
	
	// Shared messages section
	//-------------------------------------------------------------
	this.msg_err_creation_no_rec = "";
	this.msg_err_creation_no_ed_fin = "";
	this.msg_err_edit_no_rec = "";
	this.msg_err_stato_civile = "";
	this.msg_text_attention = "";
	this.msg_err_residenza_already_exist = "";
	this.msg_err_no_comune_da_a = "";
	this.msg_err_comune_required = "";
	this.msg_err_data_da_a_required = "";
	this.msg_err_data_da_major_data_a = "";
	this.msg_err_data_da_minor_data_nascita = "";
	this.msg_err_data_a_major_data_creazione = "";
	this.msg_err_no_struct_place_da_a = "";
	this.msg_err_struct_required = "";
	this.msg_err_place_required = "";
	this.msg_err_rec_period_before_lasts_two_years = "";
	this.msg_err_res_required = "";
	this.msg_err_no_requirement_residence = "";
	this.msg_err_no_struct_inserted = "";
	this.msg_err_no_requirement_residence_out_periods = "";
	this.msg_err_no_enouch_month_in_structs = "";
	this.msg_err_no_requirement_component_1 = "";
	this.msg_err_no_requirement_component_2 = "";
	this.msg_err_no_requirement_components_1 = "";
	this.msg_err_no_requirement_components_2 = "";
	this.msg_err_no_requirement_components_3 = "";
	this.msg_err_no_requirement_practice_creation = "";
	this.msg_err_practice_recovery = "";
	this.msg_err_practice_creation_icef = "";
	this.msg_info_practice_creation_richiedente_donna = "";
	this.msg_succ_practice_creation_1 = "";
	this.msg_succ_practice_creation_2 = "";
	this.msg_err_practice_creation_icef_high = "";
	this.msg_text_success = "";
	this.msg_succ_edit_alloggio = "";
	this.msg_err_edit_alloggio = "";
	this.msg_succ_edit_residenza = "";
	this.msg_err_edit_residenza = "";
	this.msg_text_no_ambito_selected = "";
	this.msg_succ_edit_ambito = "";
	this.msg_err_edit_ambito = "";
	this.msg_succ_edit_info_ass = "";
	this.msg_err_edit_info_ass = "";
	this.msg_err_check_parentela_sc = "";
	this.msg_succ_edit_parentela_sc = "";
	this.msg_err_edit_parentela_sc = "";
	this.msg_succ_edit_component_data = "";
	this.msg_succ_edit_all_components = "";
	this.msg_err_edit_component_data = "";
	this.msg_succ_edit_nucleo_fam = "";
	this.msg_err_edit_nucleo_fam = "";
	this.msg_succ_change_ric = "";
	this.msg_err_change_ric = "";
	this.msg_text_err = "";
	this.msg_text_failure = "";
	this.msg_text_refused = "";
	this.msg_err_practice_confirmation = "";
	this.msg_err_practice_confirmation_error_list = "";
	this.msg_err_practice_confirmation_exception_desc = "";
	this.msg_succ_practice_confirmation = "";
	this.msg_succ_practice_refused = "";
	this.msg_err_practice_view_json = "";
	this.msg_err_practice_view_pdf = "";
	this.msg_err_no_autocert_from_practice_in_pay = "";
	this.msg_ask_load_old_practice_in_create = "";
	this.msg_info_load_old_practice_in_create_check_data = "";
	this.text_btn_end = "";
	this.text_btn_next = "";
	this.text_btn_close = "";
	this.text_btn_next_comp = "";
	this.text_btn_save_comp = "";
	this.text_btn_save = "";
	//-------------------------------------------------------------
	
	// Shared time variables
	//-------------------------------------------------------------
	this.three_years_millis = 1000 * 60 * 60 * 24 * 365 * 3;	// I consider an year of 360 days
	this.two_years_millis = 1000 * 60 * 60 * 24 * 365 * 2;
	this.one_year_millis = 1000 * 60 * 60 * 24 * 365; 			// I consider an year of 360 days (12 month of 30 days)
	this.one_year_365_millis = 1000 * 60 * 60 * 24 * 365; 		// I consider an year of 365 days
	this.one_month_millis = 1000 * 60 * 60 * 24 * 30;			// Milliseconds of a month
	this.one_day_millis = 1000 * 60 * 60 * 24 * 2; 				// Milliseconds of a day
	this.six_hours_millis = 1000 * 60 * 60 * 6;					// Milliseconds in six hours
	//-------------------------------------------------------------
	
	this.infoPanelAss = false; 			// default value: the panel is closed
	this.infoPanelLoc = false; 			// default value: the panel is closed
	this.infoPanelStatesAss = false;	// default value: the panel is closed
	this.infoPanelStatesLoc = false;	// default value: the panel is closed
	
//	this.searchTab = '';
//	this.searchOpt = '';
//	this.searchVal = '';
//	this.searchList = [];
	
	this.utente = {};
	
	this.idDomanda = '';
	
    this.static_ambiti = [];
    this.static_comuni = [];
    this.static_edizioni = [];
    this.static_cap = [
        {
        	idComune: 320, // Ala
        	cap: "38061"
        },
        {
        	idComune: 326, // Avio
        	cap: "38063"
        },
        {
        	idComune: 330, // Besenello
        	cap: "38060"
        },
        {
        	idComune: 342, // Brentonico
        	cap: "38060"
        },
        {
        	idComune: 352, // Calliano
        	cap: "38060"
        },
        {
        	idComune: 414, // Isera
        	cap: "38060"
        },
        {
        	idComune: 439, // Mori
        	cap: "38065"
        },
        {
        	idComune: 443, // Nogaredo
        	cap: "38060"
        },
        {
        	idComune: 444, // Nomi
        	cap: "38060"
        },
        {
        	idComune: 460, // Pomarolo
        	cap: "38060"
        },
        {
        	idComune: 451, // Ronzo-Chienis
        	cap: "38060"
        },
        {
        	idComune: 477, // Rovereto
        	cap: "38068"
        },
        {
        	idComune: 509, // Terragnolo
        	cap: "38060"
        },
        {
        	idComune: 519, // Trambileno
        	cap: "38068"
        },
        {
        	idComune: 526, // Vallarsa
        	cap: "38060"
        },
        {
        	idComune: 537, // Villa-Lagarina
        	cap: "38060"
        },
        {
        	idComune: 539, // Volano
        	cap: "38060"
        }
        ];
	
    this.jobs = [ 
         {value:'COLLOCAMENTO', title:'select_job_tile_coll'},
         {value:'LAVORO', title:'select_job_tile_work'}
    ];
            
    this.permissions = [
         {value:'SOGGIORNO', title:'select_permit_title_residency'},
         {value:'CE', title:'select_permit_title_ce'}
    ];
            
    this.rtypes = [ 
         {value:'NORMALE', title:'select_home_type_title_normal'},
         {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'select_home_type_title_wrong_used'},
         {value:'ALLOGGIO_PRIVO_SERVIZI', title:'select_home_type_title_no_toilet'}
    ];
            
    this.rtypes_inidoneo = [ 
         {value:'ALLOGGIO_INIDONEO', title:'select_home_type_title_unsuitable'}
    ];
            
    this.rtypes_all = [ 
         {value:'NORMALE', title:'select_home_type_title_normal'},              
         {value:'ALLOGGIO_INIDONEO', title:'select_home_type_title_unsuitable'},          
         {value:'ALLOGGIO_IMPROPRIAMENTE_ADIBITO', title:'select_home_type_title_wrong_used'},
         {value:'ALLOGGIO_PRIVO_SERVIZI', title:'select_home_type_title_no_toilet'}
    ];
            
    this.genders = [
         'Femminile',
         'Maschile'
    ];
            
    this.municipalities = [
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
            
    this.contracts = [
         {value: 'CANONE_LIBERO', title:'select_fee_title_free'},
         {value: 'CANONE_CONCORDATO', title:'select_fee_title_agree'}
    ];
            
    this.disabilities_under18 = [
         {value: "CATEGORIA_INVALIDA_1", name: '01'},
         {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
         {value: "CATEGORIA_INVALIDA_3", name: '07'}
    ];
            
    this.disabilities_over65 = [
         {value: "CATEGORIA_INVALIDA_1", name: '01'},
         {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
         {value: "CATEGORIA_INVALIDA_4", name: '08'}
    ];
            
    this.disabilities_all = [
         {value: "CATEGORIA_INVALIDA_1", name: '01'},
         {value: "CATEGORIA_INVALIDA_2", name: '05 e 06'},
         {value: "CATEGORIA_INVALIDA_3", name: '07'},
         {value: "CATEGORIA_INVALIDA_4", name: '08'}
    ];
            
    this.citizenships = [
         {code: 1, name: 'select_citizen_title_ita'},
         {code: 2, name: 'select_citizen_title_eu'},
         {code: 3, name: 'select_citizen_title_extra'},
    ];
            
    this.yes_no = [
         {code: 'true' , title: 'select_yes_title'},
         {code: 'false' , title: 'select_no_title'}
    ];    
    
    this.yes_no_val = [
         {value: true , title: 'select_yes_title', title_it: 'Si', title_eng: 'Yes'},
         {value: false , title: 'select_no_title', title_it: 'No', title_eng: 'No'}
    ];
            
    this.affinities = [
         {value: 'ALTRO_CONVIVENTE', name: 'Altro convivente'},
         {value: 'PARENTE_34_GRADO', name: 'Parentela 3/4 grado'},
         {value: 'PARENTE_2_GRADO', name: 'Parentela 2 grado'},
         {value: 'PARENTE_1_GRADO', name: 'Parentela 1 grado'},
         {value: 'FIGLIO', name: 'Figlio'},
         {value: 'CONVIVENTE_MORE_UXORIO', name: 'Convivente More Uxorio'},
         {value: 'CONIUGE_NON_SEPARATO', name: 'Coniuge non separato'}          
    ];
            
    this.maritals = [
         {value: 'GIA_CONIUGATO_A', name: 'Gia coniugato/a'},
         {value: 'CONIUGATO_A', name: 'Coniugato/a'},
         {value: 'VEDOVO_A', name: 'Vedovo/a'},
         {value: 'NUBILE_CELIBE', name: 'Nubile/Celibe'}
    ];
    
    this.affinities_en = [
         {value: 'ALTRO_CONVIVENTE', name: 'Other cohabitant'},
         {value: 'PARENTE_34_GRADO', name: '3/4 level affinity'},
         {value: 'PARENTE_2_GRADO', name: '2 level affinity'},
         {value: 'PARENTE_1_GRADO', name: '1 level affinity'},
         {value: 'FIGLIO', name: 'Son'},
         {value: 'CONVIVENTE_MORE_UXORIO', name: 'More Uxorio cohabitant'},
         {value: 'CONIUGE_NON_SEPARATO', name: 'Not separated spouse'}          
    ];
                          
    this.maritals_en = [
         {value: 'GIA_CONIUGATO_A', name: 'Already married'},
         {value: 'CONIUGATO_A', name: 'Married'},
         {value: 'VEDOVO_A', name: 'Widow/Widower'},
         {value: 'NUBILE_CELIBE', name: 'Single'}
    ];
    
    this.vallagarinaMunicipality = [
         'ALA',
         'AVIO',
         'BESENELLO',
         'BRENTONICO',
         'CALLIANO',
         'ISERA',
         'MORI',
         'NOGAREDO',
         'NOMI',
         'POMAROLO',
         'RONZO-CHIENIS',
         'ROVERETO',
         'TERRAGNOLO',
         'TRAMBILENO',
         'VALLARSA',
         'VILLA LAGARINA',
         'VOLANO'
    ];
    
    this.userClassList = [];
    this.classPubblicationData = "";
    
    this.getUserClassList = function(){
    	return this.userClassList;
    };
    
    this.setUserClassList = function(list){
    	this.userClassList = list;
    };
    
    this.getFirstTimeAccess = function(){
    	return this.firstTimeAccess;
    };
    
    this.setFirstTimeAccess = function(value){
    	this.firstTimeAccess = value;
    };
    
    this.getClassPubblicationData = function(){
    	return this.classPubblicationData;
    };
    
    this.setClassPubblicationData = function(data){
    	this.classPubblicationData = data;
    };
	
	// Get and Set methods
	this.getUsedLanguage = function(){
		//var value = sessionStorage.language;
		return this.usedLanguage;
	};
	
	this.setUsedLanguage = function(value){
		//sessionStorage.language = value;
		this.usedLanguage = value;
	};
	
	this.getName = function(){
		return this.name;
	};
	
	this.setName = function(value){
		this.name = value;
	};
	
	this.getUrduAlign = function(){
		return this.urduAlign;
	};
	
	this.setUrduAlign = function(value){
		this.urduAlign = value;
	};
	
	this.getSurname = function(){
		return this.surname;
	};
	
	this.setSurname = function(value){
		this.surname = value;
	};
	
	this.getUeCitizen = function(){
		return this.ueCitizen;
	};
	
	this.setUeCitizen = function(value){
		this.ueCitizen = value;
	};
	
	this.isFamilyAllowances = function(){
		return this.familyAllowances;
	};
	
	this.setFamilyAllowances = function(value){
		this.familyAllowances = value;
	};
	
	this.isLoading = function(){
		return this.loading;
	};
	
	this.setLoading = function(value){
		this.loading = value;
	};
	
	this.setUserIdentity = function(value){
		//this.userIdentity = value;
		this.utente.codiceFiscale;
	};
	
	this.getVallagarinaMunicipality = function(){
		return this.vallagarinaMunicipality;
	};
	
	this.getStaticAmbiti = function(){
		return this.static_ambiti;
	};
	
	this.getStaticComuni = function(){
		return this.static_comuni;
	};
	
	this.getStaticEdizioni = function(){
		return this.static_edizioni;
	};
	
	this.getStaticCap = function(){
		return this.static_cap;
	};
	
	this.setStaticAmbiti = function(value){
		this.static_ambiti = value;
	};
	
	this.setStaticComuni = function(value){
		this.static_comuni = value;
	};
	
	this.setStaticEdizioni = function(value){
		this.static_edizioni = value;
	};
	
	this.setStaticCap = function(value){
		this.static_cap = value;
	};
	
//	this.getUserIdentity = function(){
//		return this.utente.codiceFiscale;
//	};
	
	// ----------------- ONLY FOR TESTS-------------
	this.getUserIdentity = function(){
		if(this.utente.codiceFiscale == null || this.utente.codiceFiscale == ""){
			return this.userIdentity;
		}
		else {
			return this.utente.codiceFiscale;
		}
	};
	//---------------------------------------------
	
	this.setMail = function(value){
		
		this.utente.email = value;
	};	
	
	this.getMail = function(){
		//return this.mail;
		return this.utente.email;
	};
	
	// ----------------- ONLY FOR TESTS-------------
	this.setBase64 = function(value){
		if(value == null || value == ""){
			this.base64 = 'MIIE6TCCA9GgAwIBAgIDBzMlMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJJVDEYMBYGA1UECgwPUG9zdGVjb20gUy5wLkEuMSIwIAYDVQQLDBlTZXJ2aXppIGRpIENlcnRpZmljYXppb25lMTQwMgYDVQQDDCtQcm92aW5jaWEgQXV0b25vbWEgZGkgVHJlbnRvIC0gQ0EgQ2l0dGFkaW5pMB4XDTExMTEyMzAwMjQ0MloXDTE3MTEyMjAwNTk1OVowgY4xCzAJBgNVBAYTAklUMQ8wDQYDVQQKDAZUUy1DTlMxJTAjBgNVBAsMHFByb3ZpbmNpYSBBdXRvbm9tYSBkaSBUcmVudG8xRzBFBgNVBAMMPkJSVE1UVDg1TDAxTDM3OFMvNjA0MjExMDE5NzU3MTAwNy53aTRldjVNeCtFeWJtWnJkTllhMVA3ZUtkY1U9MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsF81BDJjAQat9Lfo/1weA0eePTsEbwTe/0QqlArfOTG3hfLEiSd+mDNsBUJo+cRXZMp677y9a1kYlB+IDY3LGH36Bs1QxM14KA6WB67KX4ZaXENew6Qm7NnkMRboKQiIOUmw1l4OiTETfqKWyFqfAtnyLHd8ZZ6qfjgSsJoSHoQIDAQABo4IB3TCCAdkwge0GA1UdIASB5TCB4jCBrAYFK0wQAgEwgaIwgZ8GCCsGAQUFBwICMIGSDIGPSWRlbnRpZmllcyBYLjUwOSBhdXRoZW50aWNhdGlvbiBjZXJ0aWZpY2F0ZXMgaXNzdWVkIGZvciB0aGUgaXRhbGlhbiBOYXRpb25hbCBTZXJ2aWNlIENhcmQgKENOUykgcHJvamVjdCBpbiBhY2NvcmRpbmcgdG8gdGhlIGl0YWxpYW4gcmVndWxhdGlvbiAwMQYGK0wLAQMBMCcwJQYIKwYBBQUHAgEWGWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQwOgYIKwYBBQUHAQEELjAsMCoGCCsGAQUFBzABhh5odHRwOi8vcG9zdGVjZXJ0LnBvc3RlLml0L29jc3AwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFO5h8R6jQnz/4EeFe3FeW6ksaogHMEYGA1UdHwQ/MD0wO6A5oDeGNWh0dHA6Ly9wb3N0ZWNlcnQucG9zdGUuaXQvY25zL3Byb3ZpbmNpYXRyZW50by9jcmwuY3JsMB0GA1UdDgQWBBRF3Z13QZAmn85HIYPyIg3QE8WM2DANBgkqhkiG9w0BAQUFAAOCAQEAErn/asyA6AhJAwOBmxu90umMNF9ti9SX5X+3+pcqLbvKOgCNfjhGJZ02ruuTMO9uIi0DIDvR/9z8Usyf1aDktYvyrMeDZER+TyjviA3ntYpFWWIh1DiRnAxuGYf6Pt6HNehodf1lhR7TP+iejH24kS2LkqUyiP4J/45sTK6JNMXPVT3dk/BAGE1cFCO9FI3QyckstPp64SEba2+LTunEEA4CKPbTQe7iG4FKpuU6rqxLQlSXiPVWZkFK57bAUpVL/CLc7unlFzIccjG/MMvjWcym9L3LaU//46AV2hR8pUfZevh440wAP/WYtomffkITrMNYuD1nWxL7rUTUMkvykw==';
		} else {
			this.base64 = value;
		}
	};
	//----------------------------------------------
	
//	this.setBase64 = function(value){
//		this.base64 = value;
//	};
	
	
	this.getBase64 = function(){
		return this.base64;
	};
	
	this.setUtente = function(nome, cognome, sesso, dataNascita, provinciaNascita, luogoNascita, codiceFiscale, cellulare, email, indirizzoRes, capRes, cittaRes, provinciaRes){
		this.utente.nome = nome;
		this.utente.cognome = cognome;
		this.utente.sesso = sesso;
		this.utente.dataNascita = dataNascita;
		this.utente.provinciaNascita = provinciaNascita;
		this.utente.luogoNascita = luogoNascita;
		this.utente.codiceFiscale = codiceFiscale;
		this.utente.cellulare = cellulare;
		if(email != null && email != ""){
			this.utente.email = email;
		}
		this.utente.indirizzoRes = indirizzoRes;
		this.utente.capRes = capRes; 
		this.utente.cittaRes = cittaRes; 
		this.utente.provinciaRes = provinciaRes;
	};
	
	this.getUtente = function(){
		return this.utente;
	};
	
	this.setIdDomanda = function(value){
		this.idDomanda = value;
	};
	
	this.getIdDomanda = function(){
		return this.idDomanda;
	};
	
	// Lists getters
	this.getJobs = function(){
		return this.jobs;
	};
	
	this.getPermissions = function(){
		return this.permissions;
	};
	
	this.getRtypes = function(){
		return this.rtypes;
	};
	
	this.getRtypesInidoneo = function(){
		return this.rtypes_inidoneo;
	};
	
	this.getRtypesAll = function(){
		return this.rtypes_all;
	};
	
	this.getGenders = function(){
		return this.genders;
	};
	
	this.getMunicipalities = function(){
		return this.municipalities;
	};
	
	this.getContracts = function(){
		return this.contracts;
	};
	
	this.getDisabilities_under18 = function(){
		return this.disabilities_under18;
	};
	
	this.getDisabilities_all = function(){
		return this.disabilities_all;
	};
	
	this.getDisabilities_over65 = function(){
		return this.disabilities_over65;
	};
	
	this.getCitizenships = function(){
		return this.citizenships;
	};
	
	this.getYesNo = function(){
		return this.yes_no;
	};
	
	this.getYesNoVal = function(){
		return this.yes_no_val;
	};
	
	this.getAffinities = function(){
		if(this.usedLanguage == 'eng'){
			return this.affinities_en;
		} else {
			return this.affinities;
		}
	};
	
	this.getMaritals = function(){
		if(this.usedLanguage == 'eng'){
			return this.maritals_en;
		} else {
			return this.maritals;
		}
	};
	
	this.getInfoPanelAss = function(){
		return this.infoPanelAss;
	};
	
	this.getInfoPanelLoc = function(){
		return this.infoPanelLoc;
	};
	
	this.getInfoPanelStatesAss = function(){
		return this.infoPanelStatesAss;
	};
	
	this.getInfoPanelStatesLoc = function(){
		return this.infoPanelStatesLoc;
	};
	
	this.setInfoPanelAss = function(value){
		this.infoPanelAss = value;
	};
	
	this.setInfoPanelLoc = function(value){
		this.infoPanelLoc = value;
	};
	
	this.setInfoPanelStatesAss = function(value){
		this.infoPanelStatesAss = value;
	};
	
	this.setInfoPanelStatesLoc = function(value){
		this.infoPanelStatesLoc = value;
	};
	
	this.getThreeYearsMillis = function(){
		return this.three_years_millis;
	};
	
	this.getTwoYearsMillis = function(){
		return this.two_years_millis;
	};
	
	this.getOneYearMillis = function(){
		return this.one_year_millis;
	};
	
	this.getOneYear365Millis = function(){
		return this.one_year_365_millis;
	};
	
	this.getOneMonthMillis = function(){
		return this.one_month_millis;
	};
	
	this.getOneDayMillis = function(){
		return this.one_day_millis;
	};
	
	this.getSixHoursMillis = function(){
		return this.six_hours_millis;
	};
	
	this.getPracticesEdil = function(){
		return this.practicesEdil;
	};
	
	this.setPracticesEdil = function(list){
		this.practicesEdil = list;
	};
	
	this.getPracticesAss = function(){
		return this.practicesAss;
	};
	
	this.setPracticesAss = function(list){
		this.practicesAss = list;
	};
	
	this.getOldPractices = function(){
		return this.oldPractices;
	};
	
	this.setOldPractices = function(list){
		this.oldPractices = list;
	};
	
	this.getOfflinePractices = function(){
		return this.offlinePractices;
	};
	
	this.setOfflinePractices = function(list){
		this.offlinePractices = list;
	};
	
	this.setAllFamilyUpdate = function(value){
		this.allFamilyUpdated = value;
	};
	
	this.getAllFamilyUpdate = function(){
		return this.allFamilyUpdated;
	};
	
	this.setIsTest = function(value){
		this.isTest = value;
	};
	
	this.getIsTest = function(){
		return this.isTest;
	};
	
	this.setUserId = function(value){
		this.userId = value;
	};
	
	this.getUserId = function(){
		return this.userId;
	};
	
//	this.getSearchTab = function(){
//		return this.searchTab;
//	};
//	
//	this.setSearchTab = function(value){
//		this.searchTab = value;
//	};
//	
//	this.getSearchOpt = function(){
//		return this.searchOpt;
//	};
//	
//	this.setSearchOpt = function(value){
//		this.searchOpt  = value;
//	};
//	
//	this.getSearchVal = function(){
//		return this.searchVal;
//	};
//	
//	this.setSearchVal = function(value){
//		this.searchVal  = value;
//	};
//	
//	this.getSearchList = function(){
//		return this.searchList;
//	};
//	
//	this.setSearchList = function(value){
//		this.searchList  = value;
//	};
	
	//Getters and Setters Methods for messages
	this.getMsgErrCreationNoRec = function(){
		return this.msg_err_creation_no_rec;
	};
	
	this.setMsgErrCreationNoRec = function(value){
		this.msg_err_creation_no_rec = value;
	};
	
	this.getMsgErrCreationNoEdFin = function(){
		return this.msg_err_creation_no_ed_fin;
	};
	
	this.setMsgErrCreationNoEdFin = function(value){
		this.msg_err_creation_no_ed_fin = value;
	};
	
	this.getMsgErrEditNoRec = function(){
		return this.msg_err_edit_no_rec;
	};
	
	this.setMsgErrEditNoRec = function(value){
		this.msg_err_edit_no_rec = value;
	};
	
	this.getMsgErrStatoCivile = function(){
		return this.msg_err_stato_civile;
	};
	
	this.setMsgErrStatoCivile = function(value){
		this.msg_err_stato_civile = value;
	};
	
	this.getMsgTextAttention = function(){
		return this.msg_text_attention;
	};
	
	this.setMsgTextAttention = function(value){
		this.msg_text_attention = value;
	};
	
	this.getMsgErrResidenzaAlreadyExist = function(){
		return this.msg_err_residenza_already_exist;
	};
	
	this.setMsgErrResidenzaAlreadyExist = function(value){
		this.msg_err_residenza_already_exist = value;
	};
	
	this.getMsgErrNoComuneDaA = function(){
		return this.msg_err_no_comune_da_a;
	};
	
	this.setMsgErrNoComuneDaA = function(value){
		this.msg_err_no_comune_da_a = value;
	};
	
	this.getMsgErrComuneRequired = function(){
		return this.msg_err_comune_required;
	};
	
	this.setMsgErrComuneRequired = function(value){
		this.msg_err_comune_required = value;
	};
	
	this.getMsgErrDataDaARequired = function(){
		return this.msg_err_data_da_a_required;
	};
	
	this.setMsgErrDataDaARequired = function(value){
		this.msg_err_data_da_a_required = value;
	};
	
	this.getMsgErrDataDaMajorDataA = function(){
		return this.msg_err_data_da_major_data_a;
	};
	
	this.setMsgErrDataDaMajorDataA = function(value){
		this.msg_err_data_da_major_data_a = value;
	};
	
	this.getMsgErrDataDaMinorDataNascita = function(){
		return this.msg_err_data_da_minor_data_nascita;
	};
	
	this.setMsgErrDataDaMinorDataNascita = function(value){
		this.msg_err_data_da_minor_data_nascita = value;
	};
	
	this.getMsgErrDataAMajorDataCreazione = function(){
		return this.msg_err_data_a_major_data_creazione; 
	};
	
	this.setMsgErrDataAMajorDataCreazione = function(value){
		this.msg_err_data_a_major_data_creazione = value; 
	};
	
	this.getMsgErrNoStructPlaceDaA = function(){
		return this.msg_err_no_struct_place_da_a;
	};
	
	this.setMsgErrNoStructPlaceDaA = function(value){
		this.msg_err_no_struct_place_da_a = value;
	};
	
	this.getMsgErrStructRequired = function(){
		return this.msg_err_struct_required;
	};
	
	this.setMsgErrStructRequired = function(value){
		this.msg_err_struct_required = value;
	};
	
	this.getMsgErrPlaceRequired = function(){
		return this.msg_err_place_required;
	};
	
	this.setMsgErrPlaceRequired = function(value){
		this.msg_err_place_required = value;
	};
	
	this.getMsgErrRecPeriodBeforeLastsTwoYears = function(){
		return this.msg_err_rec_period_before_lasts_two_years;
	};
	
	this.setMsgErrRecPeriodBeforeLastsTwoYears = function(value){
		this.msg_err_rec_period_before_lasts_two_years = value;
	};
	
	this.getMsgErrResRequired = function(){
		return this.msg_err_res_required;
	};
	
	this.setMsgErrResRequired = function(value){
		this.msg_err_res_required = value;
	};
	
	this.getMsgErrNoRequirementResidence = function(){
		return this.msg_err_no_requirement_residence;
	};
	
	this.setMsgErrNoRequirementResidence = function(value){
		this.msg_err_no_requirement_residence = value;
	};
	
	this.getMsgErrNoStructInserted = function(){
		return this.msg_err_no_struct_inserted;
	};
	
	this.setMsgErrNoStructInserted = function(value){
		this.msg_err_no_struct_inserted = value;
	};
	
	this.getMsgErrNoRequirementResidenceOutPeriods = function(){
		return this.msg_err_no_requirement_residence_out_periods;
	};
	
	this.setMsgErrNoRequirementResidenceOutPeriods = function(value){
		this.msg_err_no_requirement_residence_out_periods = value;
	};
	
	this.getMsgErrNoEnouchMonthInStructs = function(){
		return this.msg_err_no_enouch_month_in_structs;
	};
	
	this.setMsgErrNoEnouchMonthInStructs = function(value){
		this.msg_err_no_enouch_month_in_structs = value;
	};
	
	this.getMsgErrNoRequirementComponent1 = function(){
		return this.msg_err_no_requirement_component_1;
	};
	
	this.setMsgErrNoRequirementComponent1 = function(value){
		this.msg_err_no_requirement_component_1 = value;
	};
	
	this.getMsgErrNoRequirementComponent2 = function(){
		return this.msg_err_no_requirement_component_2;
	};
	
	this.setMsgErrNoRequirementComponent2 = function(value){
		this.msg_err_no_requirement_component_2 = value;
	};
	
	this.getMsgErrNoRequirementComponents1 = function(){
		return this.msg_err_no_requirement_components_1;
	};
	
	this.setMsgErrNoRequirementComponents1 = function(value){
		this.msg_err_no_requirement_components_1 = value;
	};
	
	this.getMsgErrNoRequirementComponents2 = function(){
		return this.msg_err_no_requirement_components_2;
	};
	
	this.setMsgErrNoRequirementComponents2 = function(value){
		this.msg_err_no_requirement_components_2 = value;
	};
	
	this.getMsgErrNoRequirementComponents3 = function(){
		return this.msg_err_no_requirement_components_3;
	};
	
	this.setMsgErrNoRequirementComponents3 = function(value){
		this.msg_err_no_requirement_components_3 = value;
	};
	
	this.getMsgErrNoRequirementPracticeCreation = function(){
		return this.msg_err_no_requirement_practice_creation;
	};
	
	this.setMsgErrNoRequirementPracticeCreation = function(value){
		this.msg_err_no_requirement_practice_creation = value;
	};
	
	this.getMsgErrPracticeRecovery = function(){
		return this.msg_err_practice_recovery;
	};
	
	this.setMsgErrPracticeRecovery = function(value){
		this.msg_err_practice_recovery = value;
	};
	
	this.getMsgErrPracticeCreationIcef = function(){
		return this.msg_err_practice_creation_icef;
	};
	
	this.setMsgErrPracticeCreationIcef = function(value){
		this.msg_err_practice_creation_icef = value;
	};
	
	this.getMsgErrPracticeCreationRichiedenteDonna = function(){
		return this.msg_info_practice_creation_richiedente_donna;
	};
	
	this.setMsgErrPracticeCreationRichiedenteDonna = function(value){
		this.msg_info_practice_creation_richiedente_donna = value;
	};
	
	this.getMsgSuccPracticeCreation1 = function(){
		return this.msg_succ_practice_creation_1;
	};
	
	this.setMsgSuccPracticeCreation1 = function(value){
		this.msg_succ_practice_creation_1 = value;
	};
	
	this.getMsgSuccPracticeCreation2 = function(){
		return this.msg_succ_practice_creation_2;
	};
	
	this.setMsgSuccPracticeCreation2 = function(value){
		this.msg_succ_practice_creation_2 = value;
	};
	
	this.getMsgErrPracticeCreationIcefHigh = function(){
		return this.msg_err_practice_creation_icef_high;
	};
	
	this.setMsgErrPracticeCreationIcefHigh = function(value){
		this.msg_err_practice_creation_icef_high = value;
	};
	
	this.getMsgTextSuccess = function(){
		return this.msg_text_success;
	};
	
	this.setMsgTextSuccess = function(value){
		this.msg_text_success = value;
	};
	
	this.getMsgSuccEditAlloggio = function(){
		return this.msg_succ_edit_alloggio;
	};
	
	this.setMsgSuccEditAlloggio = function(value){
		this.msg_succ_edit_alloggio = value;
	};
	
	this.getMsgErrEditAlloggio = function(){
		return this.msg_err_edit_alloggio;
	};
	
	this.setMsgErrEditAlloggio = function(value){
		this.msg_err_edit_alloggio = value;
	};
	
	this.getMsgSuccEditInfoAss = function(){
		return this.msg_succ_edit_info_ass;
	};
	
	this.setMsgSuccEditInfoAss = function(value){
		this.msg_succ_edit_info_ass = value;
	};
	
	this.getMsgErrEditInfoAss = function(){
		return this.msg_err_edit_info_ass;
	};
	
	this.setMsgErrEditInfoAss = function(value){
		this.msg_err_edit_info_ass = value;
	};
	
	this.getMsgSuccEditResidenza = function(){
		return this.msg_succ_edit_residenza;
	};
	
	this.setMsgSuccEditResidenza = function(value){
		this.msg_succ_edit_residenza = value;
	};
	
	this.getMsgErrEditResidenza = function(){
		return this.msg_err_edit_residenza;
	};
	
	this.setMsgErrEditResidenza = function(value){
		this.msg_err_edit_residenza = value;
	};
	
	this.getMsgTextNoAmbitoSelected = function(){
		return this.msg_text_no_ambito_selected;
	};
	
	this.setMsgTextNoAmbitoSelected = function(value){
		this.msg_text_no_ambito_selected = value;
	};
	
	this.getMsgSuccEditAmbito = function(){
		return this.msg_succ_edit_ambito;
	};
	
	this.setMsgSuccEditAmbito = function(value){
		this.msg_succ_edit_ambito = value;
	};
	
	this.getMsgErrEditAmbito = function(){
		return this.msg_err_edit_ambito;
	};
	
	this.setMsgErrEditAmbito = function(value){
		this.msg_err_edit_ambito = value;
	};
	
	this.setMsgErrCheckParentelaSc = function(value){
		this.msg_err_check_parentela_sc = value;
	};
	
	this.getMsgErrCheckParentelaSc = function(){
		return this.msg_err_check_parentela_sc;
	};
	
	this.getMsgSuccEditParentelaSc = function(){
		return this.msg_succ_edit_parentela_sc;
	};
	
	this.setMsgSuccEditParentelaSc = function(value){
		this.msg_succ_edit_parentela_sc = value;
	};
	
	this.getMsgErrEditParentelaSc = function(){
		return this.msg_err_edit_parentela_sc;
	};
	
	this.setMsgErrEditParentelaSc = function(value){
		this.msg_err_edit_parentela_sc = value;
	};
	
	this.getMsgSuccEditComponentData = function(){
		return this.msg_succ_edit_component_data;
	};
	
	this.setMsgSuccEditComponentData = function(value){
		this.msg_succ_edit_component_data = value;
	};
	
	this.getMsgSuccEditAllComponents = function(){
		return this.msg_succ_edit_all_components;
	};
	
	this.setMsgSuccEditAllComponents = function(value){
		this.msg_succ_edit_all_components = value;
	};
	
	this.getMsgErrEditComponentData = function(){
		return this.msg_err_edit_component_data;
	};
	
	this.setMsgErrEditComponentData = function(value){
		this.msg_err_edit_component_data = value;
	};
	
	this.getMsgSuccEditNucleoFam = function(){
		return this.msg_succ_edit_nucleo_fam;
	};
	
	this.setMsgSuccEditNucleoFam = function(value){
		this.msg_succ_edit_nucleo_fam = value;
	};
	
	this.getMsgErrEditNucleoFam = function(){
		return this.msg_err_edit_nucleo_fam;
	};
	
	this.setMsgErrEditNucleoFam = function(value){
		this.msg_err_edit_nucleo_fam = value;
	};
	
	this.getMsgSuccChangeRic = function(){
		return this.msg_succ_change_ric;
	};
	
	this.setMsgSuccChangeRic = function(value){
		this.msg_succ_change_ric = value;
	};
	
	this.getMsgErrChangeRic = function(){
		return this.msg_err_change_ric;
	};
	
	this.setMsgErrChangeRic = function(value){
		this.msg_err_change_ric = value;
	};
	
	this.getMsgTextErr = function(){
		return this.msg_text_err;
	};
	
	this.setMsgTextErr = function(value){
		this.msg_text_err = value;
	};
	
	this.getMsgTextFailure = function(){
		return this.msg_text_failure;
	};
	
	this.setMsgTextFailure = function(value){
		this.msg_text_failure = value;
	};
	
	this.getMsgTextRefused = function(){
		return this.msg_text_refused;
	};
	
	this.setMsgTextRefused = function(value){
		this.msg_text_refused = value;
	};
	
	this.getMsgErrPracticeConfirmation = function(){
		return this.msg_err_practice_confirmation;
	};
	
	this.setMsgErrPracticeConfirmation = function(value){
		this.msg_err_practice_confirmation = value;
	};
	
	this.getMsgErrPracticeConfirmationErrorList = function(){
		return this.msg_err_practice_confirmation_error_list;
	};
	
	this.setMsgErrPracticeConfirmationErrorList = function(value){
		this.msg_err_practice_confirmation_error_list = value;
	};
	
	this.getMsgErrPracticeConfirmationExceptionDesc = function(){
		return this.msg_err_practice_confirmation_exception_desc;
	};
	
	this.setMsgErrPracticeConfirmationExceptionDesc = function(value){
		this.msg_err_practice_confirmation_exception_desc = value;
	};
	
	this.getMsgSuccPracticeConfirmation = function(){
		return this.msg_succ_practice_confirmation;
	};
	
	this.setMsgSuccPracticeConfirmation = function(value){
		this.msg_succ_practice_confirmation = value;
	};
	
	this.getMsgSuccPracticeRefused = function(){
		return this.msg_succ_practice_refused;
	};
	
	this.setMsgSuccPracticeRefused = function(value){
		this.msg_succ_practice_refused = value;
	};
	
	this.getMsgErrPracticeViewJson = function(){
		return this.msg_err_practice_view_json;
	};
	
	this.setMsgErrPracticeViewJson = function(value){
		this.msg_err_practice_view_json = value;
	};
	
	this.getMsgErrPracticeViewPdf = function(){
		return this.msg_err_practice_view_pdf;
	};
	
	this.setMsgErrPracticeViewPdf = function(value){
		this.msg_err_practice_view_pdf = value;
	};
	
	this.getMsgErrNoAutocertFromFracticeInPay = function(){
		return this.msg_err_no_autocert_from_practice_in_pay;
	};
	
	this.setMsgErrNoAutocertFromFracticeInPay = function(value){
		this.msg_err_no_autocert_from_practice_in_pay = value;
	};
	
	this.getMsgAskLoadOldPracticeInCreate = function(){
		return this.msg_ask_load_old_practice_in_create;
	};
	
	this.setMsgAskLoadOldPracticeInCreate = function(value){
		this.msg_ask_load_old_practice_in_create = value;
	};
	
	this.getMsgInfoLoadOldPracticeInCreateCheckData = function(){
		return this.msg_info_load_old_practice_in_create_check_data;
	};
	
	this.setMsgInfoLoadOldPracticeInCreateCheckData = function(value){
		this.msg_info_load_old_practice_in_create_check_data = value;
	};
	
	this.getTextBtnEnd = function(){
		return this.text_btn_end;
	};
	
	this.setTextBtnEnd = function(value){
		this.text_btn_end = value;
	};
	
	this.getTextBtnNext = function(){
		return this.text_btn_next;
	};
	
	this.setTextBtnNext = function(value){
		this.text_btn_next = value;
	};
	
	this.getTextBtnClose = function(){
		return this.text_btn_close;
	};
	
	this.setTextBtnClose = function(value){
		this.text_btn_close = value;
	};

	this.getTextBtnNextComp = function(){
		return this.text_btn_next_comp;
	};
	
	this.setTextBtnNextComp = function(value){
		this.text_btn_next_comp = value;
	};
	
	this.getTextBtnSaveComp = function(){
		return this.text_btn_save_comp;
	};
	
	this.setTextBtnSaveComp = function(value){
		this.text_btn_save_comp = value;
	};
	
	this.getTextBtnSave = function(){
		return this.text_btn_save;
	};
	
	this.setTextBtnSave = function(value){
		this.text_btn_save = value;
	};
	
	//Method that inithialize all the messages used in myweb
	this.inithializeAllMessages = function(data){
		var endMessages = false;
		for(var i = 0; (i < data.length) && (!endMessages); i++){
			switch (data[i].key){
				case "msg_err_creation_no_rec": 
					this.setMsgErrCreationNoRec(data[i].value); 
					break;
				case "msg_err_creation_no_ed_fin": 
					this.setMsgErrCreationNoEdFin(data[i].value); 
					break;	
				case "msg_err_edit_no_rec":
					this.setMsgErrEditNoRec(data[i].value);
					break;
				case "msg_err_stato_civile":
					this.setMsgErrStatoCivile(data[i].value);
					break;
				case "msg_text_attention":
					this.setMsgTextAttention(data[i].value);
					break;
				case "msg_err_residenza_already_exist":
					this.setMsgErrResidenzaAlreadyExist(data[i].value);
					break;
				case "msg_err_no_comune_da_a":
					this.setMsgErrNoComuneDaA(data[i].value);
					break;
				case "msg_err_comune_required":
					this.setMsgErrComuneRequired(data[i].value);
					break;
				case "msg_err_data_da_a_required":
					this.setMsgErrDataDaARequired(data[i].value);
					break;
				case "msg_err_data_da_major_data_a":
					this.setMsgErrDataDaMajorDataA(data[i].value);
					break;
				case "msg_err_data_da_minor_data_nascita":
					this.setMsgErrDataDaMinorDataNascita(data[i].value);
					break;
				case "msg_err_data_a_major_data_creazione":
					this.setMsgErrDataAMajorDataCreazione(data[i].value);
					break;	
				case "msg_err_no_struct_place_da_a":
					this.setMsgErrNoStructPlaceDaA(data[i].value);
					break;
				case "msg_err_struct_required":
					this.setMsgErrStructRequired(data[i].value);
					break;
				case "msg_err_place_required":
					this.setMsgErrPlaceRequired(data[i].value);
					break;	
				case "msg_err_rec_period_before_lasts_two_years":
					this.setMsgErrRecPeriodBeforeLastsTwoYears(data[i].value);
					break;
				case "msg_err_res_required":
					this.setMsgErrResRequired(data[i].value);
					break;
				case "msg_err_no_requirement_residence":
					this.setMsgErrNoRequirementResidence(data[i].value);
					break;
				case "msg_err_no_struct_inserted":
					this.setMsgErrNoStructInserted(data[i].value);
					break;	
				case "msg_err_no_requirement_residence_out_periods":
					this.setMsgErrNoRequirementResidenceOutPeriods(data[i].value);
					break;
				case "msg_err_no_enouch_month_in_structs":
					this.setMsgErrNoEnouchMonthInStructs(data[i].value);
					break;	
				case "msg_err_no_requirement_component_1":
					this.setMsgErrNoRequirementComponent1(data[i].value);
					break;
				case "msg_err_no_requirement_component_2":
					this.setMsgErrNoRequirementComponent2(data[i].value);
					break;	
				case "msg_err_no_requirement_components_1":
					this.setMsgErrNoRequirementComponents1(data[i].value);
					break;
				case "msg_err_no_requirement_components_2":
					this.setMsgErrNoRequirementComponents2(data[i].value);
					break;
				case "msg_err_no_requirement_components_3":
					this.setMsgErrNoRequirementComponents3(data[i].value);
					break;	
				case "msg_err_no_requirement_practice_creation":
					this.setMsgErrNoRequirementPracticeCreation(data[i].value);
					break;
				case "msg_err_practice_recovery":
					this.setMsgErrPracticeRecovery(data[i].value);
					break;
				case "msg_err_practice_creation_icef":
					this.setMsgErrPracticeCreationIcef(data[i].value);
					break;
				case "msg_info_practice_creation_richiedente_donna":
					this.setMsgErrPracticeCreationRichiedenteDonna(data[i].value);
					break;
				case "msg_succ_practice_creation_1":
					this.setMsgSuccPracticeCreation1(data[i].value);
					break;
				case "msg_succ_practice_creation_2":
					this.setMsgSuccPracticeCreation2(data[i].value);
					break;
				case "msg_err_practice_creation_icef_high":
					this.setMsgErrPracticeCreationIcefHigh(data[i].value);
					break;
				case "msg_text_success":
					this.setMsgTextSuccess(data[i].value);
					break;
				case "msg_succ_edit_alloggio":
					this.setMsgSuccEditAlloggio(data[i].value);
					break;
				case "msg_err_edit_alloggio":
					this.setMsgErrEditAlloggio(data[i].value);
					break;
				case "msg_succ_edit_info_ass":
					this.setMsgSuccEditInfoAss(data[i].value);
					break;
				case "msg_err_edit_info_ass":
					this.setMsgErrEditInfoAss(data[i].value);
					break;	
				case "msg_succ_edit_residenza":
					this.setMsgSuccEditResidenza(data[i].value);
					break;	
				case "msg_err_edit_residenza":
					this.setMsgErrEditResidenza(data[i].value);
					break;
				case "msg_text_no_ambito_selected":
					this.setMsgTextNoAmbitoSelected(data[i].value);
					break;
				case "msg_succ_edit_ambito":
					this.setMsgSuccEditAmbito(data[i].value);
					break;	
				case "msg_err_edit_ambito":
					this.setMsgErrEditAmbito(data[i].value);
					break;
				case "msg_err_check_parentela_sc":
					this.setMsgErrCheckParentelaSc(data[i].value);
					break;	
				case "msg_succ_edit_parentela_sc":
					this.setMsgSuccEditParentelaSc(data[i].value);
					break;
				case "msg_err_edit_parentela_sc":
					this.setMsgErrEditParentelaSc(data[i].value);
					break;
				case "msg_succ_edit_component_data":
					this.setMsgSuccEditComponentData(data[i].value);
					break;
				case "msg_succ_edit_all_components":
					this.setMsgSuccEditAllComponents(data[i].value);
					break;	
				case "msg_err_edit_component_data":
					this.setMsgErrEditComponentData(data[i].value);
					break;
				case "msg_succ_edit_nucleo_fam":
					this.setMsgSuccEditNucleoFam(data[i].value);
					break;
				case "msg_err_edit_nucleo_fam":
					this.setMsgErrEditNucleoFam(data[i].value);
					break;
				case "msg_succ_change_ric":
					this.setMsgSuccChangeRic(data[i].value);
					break;
				case "msg_err_change_ric":
					this.setMsgErrChangeRic(data[i].value);
					break;
				case "msg_text_err":
					this.setMsgTextErr(data[i].value);
					break;
				case "msg_text_failure":
					this.setMsgTextFailure(data[i].value);
					break;	
				case "msg_text_refused":
					this.setMsgTextRefused(data[i].value);
					break;
				case "msg_err_practice_confirmation":
					this.setMsgErrPracticeConfirmation(data[i].value);
					break;
				case "msg_err_practice_confirmation_error_list":
					this.setMsgErrPracticeConfirmationErrorList(data[i].value);
					break;
				case "msg_err_practice_confirmation_exception_desc":
					this.setMsgErrPracticeConfirmationExceptionDesc(data[i].value);
					break;
				case "msg_succ_practice_confirmation":
					this.setMsgSuccPracticeConfirmation(data[i].value);
					break;
				case "msg_succ_practice_refused":
					this.setMsgSuccPracticeRefused(data[i].value);
					break;
				case "msg_err_practice_view_json":
					this.setMsgErrPracticeViewJson(data[i].value);
					break;
				case "msg_err_practice_view_pdf":
					this.setMsgErrPracticeViewPdf(data[i].value);
					break;
				case "msg_err_no_autocert_from_practice_in_pay":
					this.setMsgErrNoAutocertFromFracticeInPay(data[i].value);
					break;
				case "msg_ask_load_old_practice_in_create":
					this.setMsgAskLoadOldPracticeInCreate(data[i].value);
					break;
				case "msg_info_load_old_practice_in_create_check_data":
					this.setMsgInfoLoadOldPracticeInCreateCheckData(data[i].value);
					break;	
				case "text_btn_end":
					this.setTextBtnEnd(data[i].value);
					break;
				case "text_btn_next":
					this.setTextBtnNext(data[i].value);
					break;	
				case "text_btn_close":
					this.setTextBtnClose(data[i].value);
					break;
				case "text_btn_next_comp":
					this.setTextBtnNextComp(data[i].value);
					break;
				case "text_btn_save_comp":
					this.setTextBtnSaveComp(data[i].value);
					break;
				case "text_btn_save":
					this.setTextBtnSave(data[i].value);
					break;
					
				default: endMessages = true; break;
				
			}
			
		}
	};
	
});

//Message retriever method
cp.factory('getMyMessages', function($http, $q) {
	
	//var _this = this;

    var promiseToHaveData = function(language) {
        var deferred = $q.defer();
        
        var fileJson = '';
        switch(language){
	        case 'ita': 
	        	fileJson = 'i18n/resources-locale_it-IT.json';
	        	break;
	        case 'eng': 
	        	fileJson = 'i18n/resources-locale_en-US.json';
	        	break;
	        case 'ser':
	        	fileJson = 'i18n/resources-locale_sr-latn.json';
	        	break;
	        case 'alb':
	        	fileJson = 'i18n/resources-locale_sq-AL.json';
	        	break;
	        case 'urd':
	        	fileJson = 'i18n/resources-locale_ur-PK.json';
	        	break;
	        default:
	        	fileJson = 'i18n/resources-locale_it-IT.json';
	        	break;
        }
//        if(language == 'ita'){
//        	fileJson = 'i18n/resources-locale_it-IT.json';
//        } else {
//        	fileJson = 'i18n/resources-locale_en-US.json';
//        }

        $http.get(fileJson)
            .success(function(data) {
                //angular.extend(_this, data);
                deferred.resolve(data);
                // Funzione di caricamento stringhe messaggi in variabili di service
                //console.log("Finded message data: " + JSON.stringify(data));
            })
            .error(function() {
                deferred.reject('could not find someFile.json');
                console.log("Error in message data recovery.");
            });

        return deferred.promise;
    };
    return {promiseToHaveData : promiseToHaveData};

});

// Proxy Methods section
cp.factory('invokeWSService', function($http, $q) {
	
	var url = '/service.epu/';
	var getProxy = function(method, funcName, params, headers, data){
		var deferred = $q.defer();
		$http({
			method : method,
			url : url + funcName,
			params : params,
			headers : headers,
			data : data
		}).success(function(data) {
			//console.log("Returned data ok: " + JSON.stringify(data));
			deferred.resolve(data);
		}).error(function(data) {
			console.log("Returned data FAIL: " + JSON.stringify(data));
			deferred.resolve(data);
		});
		return deferred.promise;
	};
	return {getProxy : getProxy};
});
cp.factory('invokeWSServiceProxy', function($http, $q) {
	var getProxy = function(method, funcName, params, headers, data){
		var deferred = $q.defer();
		
		//var url = 'http://localhost:8080/service.epu/';
		//var urlWS = url + funcName;
		var urlWS = funcName;
		if(params != null){
			urlWS += '?';
			for(var propertyName in params) {
				urlWS += propertyName + '=' + params[propertyName];
				urlWS += '&';
			};
			urlWS = urlWS.substring(0, urlWS.length - 1); // I remove the last '&'
		}
		//console.log("Proxy Service: url completo " + urlWS);
		
		if(method == 'GET' && params != null){
			$http({
				method : method,
				url : 'rest/allGet',
				params : {
					"urlWS" : urlWS + '&noCache=' + new Date().getTime()	// quela mer.. de ie el cacheava tut e con sta modifica el funzia
				},
				headers : headers
			}).success(function(data) {
				//console.log("Returned data ok: " + JSON.stringify(data));
				deferred.resolve(data);
			}).error(function(data) {
				console.log("Returned data FAIL: " + JSON.stringify(data));
				deferred.resolve(data);
			});
		} else if(method == 'GET' && params == null){
			$http({
				method : method,
				url : 'rest/allGet',
				params : {
					"urlWS" : urlWS + '?noCache=' + new Date().getTime()	// quela mer.. de ie el cacheava tut e con sta modifica el funzia
				},
				headers : headers
			}).success(function(data) {
				//console.log("Returned data ok: " + JSON.stringify(data));
				deferred.resolve(data);
			}).error(function(data) {
				console.log("Returned data FAIL: " + JSON.stringify(data));
				deferred.resolve(data);
			});
		} else {
			$http({
				method : method,
				url : 'rest/allPost',
				params : {
					"urlWS" : urlWS,
				},
				headers : headers,
				data : data
			}).success(function(data) {
				//console.log("Returned data ok: " + JSON.stringify(data));
				deferred.resolve(data);
			}).error(function(data) {
				console.log("Returned data FAIL: " + JSON.stringify(data));
				deferred.resolve(data);
			});
		}
		return deferred.promise;
	};
	return {getProxy : getProxy};
});
cp.factory('invokePdfServiceProxy', function($http, $q) {
	var getProxy = function(method, funcName, params, headers, data){
		var deferred = $q.defer();
		
		$http({
			method : method,
			url : funcName,
			params : params,
			headers : headers,
			data : data
		}).success(function(data) {
			//console.log("Returned data ok: " + JSON.stringify(data));
			deferred.resolve(data);
		}).error(function(data) {
			console.log("Returned data FAIL: " + JSON.stringify(data));
			deferred.resolve(data);
		});
		return deferred.promise;
	};
	return {getProxy : getProxy};
	
});
