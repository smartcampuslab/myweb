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
    $scope.tabs = [ 
        { title:'Creazione', index: 1, content:"partials/practice/create_form.html"},
        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled: true},
        { title:'Nuclei Familiari', index: 3, content:"partials/practice/family_form.html", disabled: true}
    ];
    $scope.tabIndex = 0;
    $scope.buttonNextLabel = "Salva e continua";
    $scope.initForm = true;
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
        } else {
            activeLinkEdil="";
            activeLinkAss="active";
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

cp.controller('PracticeCtrl', ['$scope', '$http', '$routeParams', '$rootScope', '$route', '$location', '$dialogs', 'sharedDataService',
                       function($scope, $http, $routeParams, $rootScope, $route, $location, $dialogs, sharedDataService, $filter, $timeout) { 
	this.$scope = $scope;
    $scope.params = $routeParams;
    
    $scope.isUeCitizen = function(){
    	return sharedDataService.getUeCitizen();
    };
    
    $scope.practice = {};
    
    // The tab directive will use this data
//    $scope.tabs = [ 
//        { title:'Creazione', index: 1, content:"partials/practice/create_form.html"},
//        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html", disabled: true},
//        { title:'Nuclei Familiari', index: 3, content:"partials/practice/family_form.html", disabled: true}
//    ];
    // For test all the tabs are active
    $scope.tabs = [ 
        { title:'Creazione', index: 1, content:"partials/practice/create_form.html"},
        { title:'Dettaglio', index: 2, content:"partials/practice/details_form.html"},
        { title:'Nuclei Familiari', index: 3, content:"partials/practice/family_form.html"}
    ];
    $scope.tabIndex = 0;
    $scope.buttonNextLabel = "Salva e continua";
    $scope.initForm = true;
    
    $scope.nextTab = function(value){
    	if(!value){		// check form invalid
    		if($scope.tabIndex !== ($scope.tabs.length -1) ){
    	    	$scope.tabs[$scope.tabIndex].active = false;	// deactive actual tab
    	    	$scope.tabIndex++;								// increment tab index
    	    	$scope.tabs[$scope.tabIndex].active = true;		// active new tab
    	    	$scope.tabs[$scope.tabIndex].disabled = false;	
    		} else {
    			$scope.buttonLabel = "Termina";
    		}
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
           'Collocamento',
           'Lavoro'
    ];
    
    $scope.permissions = [ 
           'Soggiorno',
           'Ce'
    ];
    
    $scope.rtypes = [ 
          'Idoneo',
    	  'Impropriamente Adibito',
    	  'Privo di Servizi',
    	  'Normale'
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

    $scope.update = function(data) {
    	//console.log("req id " + id + " ,citizenId " + $scope.citizenId );
    	$scope.initForm = false;
    	$scope.practice = data;
    	//$scope.savePractice(data);
    };
    
    $scope.showMembers = false;
    $scope.applicantInserted = false;
    $scope.newMemberShow = false;
    $scope.newMemberInserted = false;
    $scope.insertedEcoIndex = false;
    $scope.showedEcoIndex = false;
    
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
    
    $scope.insertEcoIndex = function(){
    	$scope.insertedEcoIndex = true;	
    };
    
    $scope.saveEcoIndex = function(data){
    	$scope.insertedEcoIndex = false;
    	$scope.showedEcoIndex = true;
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
                  	
    $scope.savePractice = function(practice){
    	$http({
            method : 'POST',
            url : 'https://vas-dev.smartcampuslab.it/service.epu/CreaPratica',
            params : {},
            headers : $scope.authHeaders,
            data: practice
        }).success(function() {
        }).error(function() {
        });
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