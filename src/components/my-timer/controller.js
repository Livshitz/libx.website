var componentName = bundular.tryGetComponentName(__moduleUri); 
var componentTemplate = 'components/' + componentName.kebabCase() + '/template.html'; 

bundular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		controller: componentController,
		templateUrl: componentTemplate,
		link: function ($scope, $element, $attr) {
			$scope.$broadcast('$' + componentName + 'Loaded', $element);
		}
	};

	function componentController($scope, $element, $interval) {
		libx.log.debug('componentController:' + componentName + ':');
		this.$scope = $scope;
		this.$element = $element;

		$scope.handler = null;
		$scope.state = "stopped";
		$scope.timerStartMin = 1;
		$scope.timerStartSec = 0;
		$scope.timerTotal = ()=>((($scope.timerStartMin || 0) * 60) + ($scope.timerStartSec || 0) * 1);
		$scope.timerCur = null;

		$scope.start = ()=>{
			$scope.state = "playing";
			$scope.timerCur = $scope.timerTotal();
			$scope.handler = $interval(()=>{
				if ($scope.state == "paused") return;
				$scope.timerCur -= 1;
			}, 1000);
		}
		$scope.resume = ()=>{
			$scope.state = "playing";
		}
		$scope.pause = ()=>{
			$scope.state = "paused";

		}
		$scope.stop = ()=>{
			$scope.state = "stopped";
			$interval.cancel($scope.handler);
			$scope.timerCur = null;
		}
	}
});
