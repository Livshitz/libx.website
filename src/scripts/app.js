window.prerenderReady = false;

window.bundular = libx.di.get('bundular');
window.app  = angular.module('myApp', ['bundular']); // , 'angular-google-analytics'

app.api = {};
app.layout = {};
app.name = "libx";
app.desc = "Libx";
app.titlePrefix = "Libx";
app.isDarkMode = false;

app.layout.title = 'Libx';
app.getTitle = ()=> 'Test';

app.firebase = libx.di.get('firebase');
app.firebase.firebasePathPrefix = '/libx';

app.userManager = libx.di.get('userManager');

libx.di.inject(firebase=>{
	firebase.onReady.subscribe(()=>{
		window.prerenderReady = true;
		console.log('!!! fib-ready')
	})
});

app.config(()=> {
	app.lazy = bundular.lazy;
});

app.run( ($rootScope, utils, $window, $location) => {
	libx.log.debug('app:run')

	app.firebase.isConnected(()=> {
		bundular.broadcast('fib-ready');
	});

	// Load components ahead of time (otherwise, require them from the specific controller)
	var components = ['my-loader', 'my-widget'];
	_.each(components, compName=> {
		libx.browser.require('resources/components/' + compName + '/controller.js');
	})
	libx.browser.require('resources/scripts/lib/ng-inline-edit.js')

	bundular.on('$viewContentLoaded', function () {
		$rootScope.layout.pageUrl = location.href; //$location.$$path;
	});
});

app.controller('layoutEx', ($scope, $rootScope, $sce, $compile, $templateCache, $templateRequest, $timeout, $mdSidenav, $location, $cookies) => {
	libx.log.verbose('app:layoutEx');

	$rootScope.layout = app.layout;
	$rootScope.layout.ogImage = "https://d33wubrfki0l68.cloudfront.net/c5484de00f56c7916cbf59c3da005362357c24d6/36ece/resources/imgs/bg_matrix_optimized.gif";

});

