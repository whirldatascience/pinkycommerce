app.controller('homePageController', [ '$scope', function($scope) {

	if (!localStorage.getItem("emailId")){ 
		window.location = "#/login";
	}
} ]);