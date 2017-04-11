app.controller('loginController', [ '$scope', function($scope) {

	if (localStorage.getItem("emailId")) {
		window.location = "#/";
	}

	$scope.email = {
		text : 'me@example.com'
	};
	$scope.name = "Pandian";
	$scope.login = function() {
		console.log($scope.email.text);
		localStorage.setItem("emailId", $scope.email.text);
		console.log("Saved: " + localStorage.getItem("emailId"));
		window.location = "#/";
	}

} ]);
