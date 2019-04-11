window.prerenderReady = false;

// Init bundularjs
window.bundular = libx.di.get('bundular');
window.app  = angular.module('myApp', ['bundular']); // , 'angular-google-analytics'

// Define app routes
bundular.routes.init({
	routes: [
		new bundular.routes.Route('/', '/views/main.html'),
		new bundular.routes.Route('/test', '/views/test.html'),
	],
	notFoundTemplate: '/views/404.html',
	isDarkMode: true,
})

// App config
app.api = {};
app.layout = {};
app.name = "libx";
app.desc = "Libx";
app.titlePrefix = "Libx";

app.layout.title = 'Libx';
app.getTitle = ()=> 'Test';

// libx modules:
app.firebase = libx.di.get('firebase');
app.firebase.firebasePathPrefix = '/libx';

app.userManager = libx.di.get('userManager');

libx.di.inject(firebase=>{
	firebase.onReady.subscribe(()=>{
		window.prerenderReady = true;
		console.log('!!! fib-ready')
	})
});

bundular.run( ($rootScope, utils, $window, $location) => {
	libx.log.debug('app:run')

	app.firebase.isConnected(()=> {
		bundular.broadcast('fib-ready');
	});

	// Load components ahead of time (otherwise, require them from the specific controller)
	var components = ['my-loader', 'my-widget'];
	_.each(components, compName=> {
		libx.browser.require('components/' + compName + '/controller.js');
	})
	libx.browser.require('resources/scripts/lib/ng-inline-edit.js')

	bundular.on('$viewContentLoaded', function () {
		$rootScope.layout.pageUrl = location.href; //$location.$$path;
	});
});

bundular.controller('layoutEx', ($scope, $rootScope, $sce, $compile, $templateCache, $templateRequest, $timeout, $mdSidenav, $location, $cookies) => {
	libx.log.verbose('app:layoutEx');

	$rootScope.layout = app.layout;
	$rootScope.layout.ogImage = "/resources/imgs/Libx_Icon.png";
	$rootScope.layout.desc = "Libx + bundularjs"

	$rootScope.layout.no_bg = libx.browser.helpers.urlParams['no-bg'] != null;
});

(()=>{
	bundular.bootstrap('myApp');
})()
