angular.module('ScoutingApp.services', [])

.service('$localStorage', function($window) {
	var FORM_KEY = "forms";

	var set = function(key, value) {
		$window.localStorage[key] = JSON.stringify(value);
	};
	var get = function(key, defaultValue) {
		return JSON.parse($window.localStorage[key] || defaultValue);
	};
	return {
		getForms: function() {
			return get(FORM_KEY, '[]').sort(function(a,b) {
				return a.teamnumber - b.teamnumber;
			});
		},
		addForm: function(form) {
			if (form.teamnumber === "" || form.teamname === "") {
				console.log("Form is not formatted correctly!");
				throw 1;
			} else {
				console.log("Formatted correctly.");
			}

			var forms = this.getForms();

			// Remove any duplicates
			var duplicateForms = forms.filter(function(f){return f.teamnumber == form.teamnumber;});
			if(duplicateForms.length > 0) {
				duplicateForms.forEach(function(f) {
					forms.splice(forms.indexOf(f), 1);
				});
			}

			forms.push(form);
			set(FORM_KEY, forms);
		},
		deleteForms: function() {
			set(FORM_KEY, []);
		},
		getForm: function(teamNumber) {
			return this.getForms().filter(function(form) {
				return teamNumber == form.teamnumber;
			})[0];
		}
	};
});
