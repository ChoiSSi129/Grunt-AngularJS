app.directive('contents', [function(){
    return {
        restrict: 'EC',
        controller: 'testCtrl',
        templateUrl: '/src/view.html',
        replace: true,
        transclude: true,
        link: function($scope, $el, attrs){
            
        }
    }
}]);