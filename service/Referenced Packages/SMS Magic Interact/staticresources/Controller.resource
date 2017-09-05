angular.module('starter').controller('Ctrl', ['$translate', '$scope', '$compile', function ($translate, $scope, $compile) {
var language = window.navigator.userLanguage || window.navigator.language;
$translate.use(language);
alert(hi);
this.recompile = function(refreshedElements) {
if (refreshedElements && refreshedElements.length > 0) {
	for (var count = 0; count < refreshedElements.length; count++) {
		if(refreshedElements[count] && refreshedElements[count].trim() != '') {
			$compile(document.getElementById(refreshedElements[count]))($scope);
		}
	}
	
	$scope.$digest();
}
}
}]);

function handleRerender(controllerDiv, refreshedElements) {
angular.element(document.getElementById(controllerDiv)).controller().recompile(refreshedElements);
}