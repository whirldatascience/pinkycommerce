var app = angular.module('pinkyCommerce', [ 'ngRoute' ]);

/*
 * Angular Moment for showing time now
 */

app.config([ '$routeProvider', function($routeProvider) {

	$routeProvider
	// Home
	.when("/", {
		templateUrl : "home.html",
		controller : "homePageController",
	}).when("/login", {
		templateUrl : "login.html",
		controller : "LoginController",
	}).when("/author/:authorId/", {
		templateUrl : "core/authorHome.html",
		controller : "userController",
	}).when("/c/:categoryId/", {
		templateUrl : "core/category.html",
		controller : "commonController",
	})

	// else 404
	.otherwise("/404", {
		templateUrl : "core/404.html",
		controller : ""
	});

} ]);