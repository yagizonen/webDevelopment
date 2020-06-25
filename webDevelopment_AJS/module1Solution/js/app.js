(function () {
    angular.module('LunchApp',[])
        .controller('LunchController', LunchController)
    LunchController.$inject = ['$scope'];

    function LunchController($scope) {
        $scope.foods = "";

        $scope.msgFunc = function () {
            var tmpFoods = $scope.foods;
            var foodArr = $scope.foods.split(',');

            if(tmpFoods === "") {
                $scope.outputMsg = "Please enter data first";
                $scope.msgColor = {'display': 'inline','color':'red', 'border':'2px solid red'};
            }
            else if(foodArr.length < 4) {
                $scope.outputMsg = "Enjoy!";
                $scope.msgColor = {'display': 'inline','color':'green', 'border':'2px solid green'};
            }
            else {
                $scope.outputMsg = "Too much!";
                $scope.msgColor = {'display': 'inline','color':'green', 'border':'2px solid green'};
            }
        }
    }
})();