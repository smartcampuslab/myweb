'use strict';

/* Filters */

angular.module('cpFilters', []).filter('truncate', function() {
	return function(text, length, end) {
		if (isNaN(length))
		length = 60;

		if (end === undefined)
			end = "...";

		if (text.length <= length || text.length - end.length <= length) {
			return text;
		} else {
			return String(text).substring(0, length - end.length) + end;
		}		

	};
}).filter('dateformat', function() {
	return function(text, length, end) {
		return new Date(text).toLocaleString();
	};
}).filter('startFrom', function() {
	return function(input, start) {
		start = +start; // parse to int
		return input.slice(start);
	};
}).filter('nullString', function() {
	return function(input) {		
		if(input=="null")
			return "";
		else
			return input;
	};
}).filter('getById', function() {
	return function(input, id) {
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (+input[i].id == +id) {
		        return input[i];
		    }
		}
		return null;
	};
}).filter('getByCode', function() {
	return function(input, code) {
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (+input[i].value == +code) {
		        return input[i];
		    }
		}
		return null;
	};
}).filter('dateToMillis', function() {
	return function(data){
		if(data=="")
			return "";
		else
			return Date.parse(data);
	};
}).filter('boolToString', function() {
	return function(input){
		return input ? 'SI' : 'NO';
	};
}).filter('idToMunicipality', function() {
	return function(input, id){
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (+input[i].idObj == +id) {
		        return input[i];
		    }
		}
		return null;
	};
}).filter('idToDescComune', function() {
	return function(id, input){
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (input[i].idObj == id) {
		        return input[i];
		    }
		}
		return null;
	};
}).filter('codeToName', function() {
	return function(code, input){
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (input[i].value == code) {
		        return input[i].name;
		    }
		}
		return null;
	};
}).filter('valueToTitle', function() {
	return function(value, input){
		var i=0, len=input.length;
		for (; i<len; i++) {
			if (input[i].value == value) {
		        return input[i].title;
		    }
		}
		return null;
	};
});
