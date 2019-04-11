var componentName = bundular.tryGetComponentName(__moduleUri); // <------ Edit this or let __moduleUri (injected by `libx.browser.require`)
var componentTemplate = 'components/' + componentName.kebabCase() + '/template.html'; 

bundular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		controller: componentController,
		transclude: true,
		//template: '<div ng-transclude></div>',
		templateUrl: componentTemplate,
		scope: {
			content: "=",
			text: '@',
		},
		link: function ($scope, $element, $attr) {
			// Broadcast when component is ready
			$scope.$broadcast('$' + componentName + 'Loaded', $element);
			
			// Custom resolve:
			// $http.get('url?v' + Date.now()).then(function(res) {
            //     element.html(res.data);
            //     $compile(element.contents())(scope);
            //     scope.message = $sce.trustAsHtml(res.data);
            // });
		}
	};

	function componentController($scope, $element) {
		libx.log.debug('componentController:' + componentName + ':');
		this.$scope = $scope;
		this.$element = $element;

		// Component logic here <------
	}
});
