var EVENT_CODE = "2016nyny";
var APP_CODE = "frc5806:scouting-system:v01";
var BLUE_ALLIANCE = "http://www.thebluealliance.com/api/v2/event/" + EVENT_CODE +"/rankings?X-TBA-App-Id=" + APP_CODE;
var HEADERS = {"If-Modified-Since": ""}

angular.module('ScoutingApp.services', [])

.service('$rankingData', function($http) {
	return {
		calcRank: function(teamArray) {
			$http({
				method: "GET",
				url: BLUE_ALLIANCE,
				config: HEADERS
			}).then(function(response) {
				console.log("Sucess in get");
				var rankingData = response.data;
				for (var i = 0; i < teamArray.length; i++) {
					for (var j = 0; j < response.data.length; i++) {
						if (response.data[j][1] == teamArray[i].teamnumber) {
							teamArray[i].rank = response.data[j][0];
							console.log(response.data[j][1])
						} else {
							teamArray[i].rank = "Unknown";
						}
					}
				}
				set(FORM_KEY, teamArray);
				console.log(teamArray);
			}, function(response) {
				console.log("Error on get");
				console.log(JSON.stringify(response));
			});
			console.log("Returning: ");
			console.log(teamArray);
			return teamArray;
		}
	};
})

.service('$localStorage', function($window, $rankingData) {
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
		getRankings: function() {
			return $rankingData.calcRank(get(FORM_KEY, '[]').sort(function(a,b) {
				return a.rank - b.rank;
			}))
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
			return this.getRankings().filter(function(form) {
				return teamNumber == form.teamnumber;
			})[0];
		}
	};
});
