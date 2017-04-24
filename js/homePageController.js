var welcomeMsg = "Hi Welcome to PINKY Voice Commerce!";
var askName = "Hey, I don't have your name, can you please tell your name";
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();

app.controller('homePageController', [ '$scope', function($scope) {

	if (!localStorage.getItem("emailId")) {
		window.location = "#/login";
	}

	$scope.speak = function() {
		recognition = new webkitSpeechRecognition();

		recognition.onresult = function(event) {
			var text = "";
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				text += event.results[i][0].transcript;
			}
			$scope.setInput(text);
			// stopRecognition();
		};
		recognition.onend = function() {
			$scope.stopRecognition();
		};
		recognition.lang = "en-US";
		recognition.start();
	}

	$scope.setInput = function(text) {
		$("#input").val(text);
		$scope.sendRequest();
	}

	$scope.sendRequest = function() {
		console.log("Hi");
		var text = $("#input").val();
		$.ajax({
			type : "POST",
			url : baseUrl + "query?v=20150910",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			headers : {
				"Authorization" : "Bearer " + accessToken
			},
			data : JSON.stringify({
				query : text,
				lang : "en",
				sessionId : "somerandomthing"
			}),

			success : function(data) {
				console.log("Data is printing");
				$scope.setResponse(JSON.stringify(data, undefined, 2));
				$scope.searchProduct(data.result.parameters.product);
			},
			error : function() {
				$scope.setResponse("Internal Server Error");
			}
		});
		$scope.setResponse("Loading...");
	}

	$scope.searchProduct = function(productName) {
		console.log("Started searching for the product using API: " + productName);
		var apiUrl="/pinkycommerce/services/index.php/api/"
		if (typeof productName !== "undefined") {
			$.ajax({
				type : "GET",
				url : apiUrl + "productDetails/"+productName,

				success : function(data) {
					console.log("Called==> "+apiUrl + "productDetails/"+productName);
					console.log("Data is printing");
					console.log("==>"+data);
					$scope.speech(data);
				},
				error : function() {
					$scope.setResponse("Internal Server Error");
				}
			});
		}
	}

	$scope.stopRecognition = function() {
		if (recognition) {
			recognition.stop();
			recognition = null;
		}
	}
	$scope.setResponse = function(data) {
		console.log(data);
	}

	$scope.speech = function(text) {
		voices = window.speechSynthesis.getVoices();
		voiceToPlay=0;
		for (i = 0; i < voices.length; i++) {
			
			if(voices[i].default){
				voiceToPlay=i;
			}
		}
		$("#voiceResponse").append(text+"<br>");
		msg.lang = 'en-US';
		msg.voice = voices[voiceToPlay];
		msg.text = text;
		msg.onend = function(e) {
			console.log('Finished in ' + event.elapsedTime + ' seconds.');
		};
		speechSynthesis.speak(msg);
	}

	$scope.speech(welcomeMsg);
	if (!localStorage.getItem("userName")) {
		// $scope.speech(askName);
	}
} ]);