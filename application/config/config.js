var config = {
	session: {
		storeurl : "mongodb://localhost/session",
		secret : "1234567890QWERTY"		
	},

	application: {
		views: "/application/views",
		title: "Centurion eCommerce",
		copy: "&copy;2015 MIP",
		env: "development",
		favicon: "../../favicon.ico"	
	},

	db: {
		connection: "mongodb://localhost/nodeERP",
		options: {}
	},

	scripts: [
	'../bower_components/jquery/dist/jquery.js',
	'/bower_components/angularjs/angular.js'
	],

	stylesheets: [
	'bower_components/bootstrap/dist/css/bootstrap.css',
	'style/style.css'
	],

	adminScripts: [
	'../bower_components/jquery/dist/jquery.js',
	'/bower_components/angularjs/angular.js'
	],

	adminStylesheets: [
	'bower_components/bootstrap/dist/css/bootstrap.css',
	'style/adminStyle.css'
	]

};

module.exports = config;