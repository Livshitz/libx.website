var componentName = bundular.tryGetComponentName(__moduleUri); // <------ Edit this or let __moduleUri (injected by `libx.browser.require`)
var componentTemplate = 'components/' + componentName.kebabCase() + '/template.html'; 

bundular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		templateUrl: componentTemplate
	};
});
