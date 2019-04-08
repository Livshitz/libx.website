'use strict';

app.config(($routeProvider, $sceDelegateProvider, $locationProvider) => {
	libx.log.verbose('init routes');

	$routeProvider.
		when('/', { templateUrl: '/views/main.html' }). //, reloadOnSearch:false }).
		when('/test', { templateUrl: '/views/test.html' }).
	
		// System:
		when('/sys/_css', { templateUrl: '/views/sys/_css.html' }).
		when('/sys/_theme', { templateUrl: '/views/sys/_theme.html' }).
		when('/sys/_icons', { templateUrl: '/views/sys/_icons.html' }).
		// Fallback:
		otherwise({ templateUrl: '/views/404.html' }); // template: '<div>404 - Not Found</div>' }); 

	app.isHtml5Mode = true; //false;

	$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('.*')]);
	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode({
		enabled: app.isHtml5Mode,
		requireBase: true
	});
	$sceDelegateProvider.resourceUrlWhitelist([
		'self', // Allow same origin resource loads.
		window.location.href + '/**' // Allow loading from our assets domain.  Notice the difference between * and **.
	]);

});
