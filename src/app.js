var app = angular.module('app', []);

app.controller('testCtrl', ['$scope', '$http', function($scope, $http){
    $scope.gnbData = null;
    $scope.viewData = null;
    $scope.tabIdx = 0;

    var getData = {
        gnb: function(){
            $http.get('/json/gnb.json').success(function(data){
                $scope.gnbData = data.data;
            }).error(function(e){
                console.log(e)
            });
        },
        gnbView: function(){
            $http.get('/json/gnbView.json').success(function(data){
                $scope.viewData = data.disp;
                $scope.bannerData = data.disp[0].moduleData[1];
                $scope.serviceData = data.disp[0].moduleData[2];
                $scope.cardData = data.disp[0].moduleData[3];
                $scope.surpriseTitData = data.disp[0].moduleData[4];
                $scope.surpriseData = data.disp[0].moduleData[5];
            }).error(function(e){
                console.log(e)
            });
        }
    };
    getData.gnb();
    getData.gnbView();
}]);

app.directive('header', [function(){
    return {
        restrict: 'EC',
        controller: 'testCtrl',
        templateUrl: '/src/common/header.html',
        replace: true,
        transclude: true,
        link: function($scope, $el, $attr){
            $scope.handleGnbClick = function(idx){
                var dispNo = $scope.gnbData.items[idx].dispNo;
                angular.forEach($scope.viewData, function(val, key){
                    if(dispNo === val.dispNo){
                        $scope.tabIdx = key;
                    }
                });
            };
        }
    }
}]);