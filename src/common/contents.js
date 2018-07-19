app.directive('contents', [function(){
    return {
        restrict: 'EC',
        controller: 'testCtrl',
        templateUrl: '/src/common/contents1.html',
        replace: true,
        transclude: true,
        link: function($scope, $el, attrs){
            
        }
    }
}]);