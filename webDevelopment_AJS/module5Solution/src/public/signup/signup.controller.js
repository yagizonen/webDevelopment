(function (){
    'use strict';

    angular.module('public')
        .controller('SignController', SignController);

    SignController.$inject = ['MenuService'];
    function SignController(MenuService) {
        var $ctrl = this;
        $ctrl.submit = function () {
            var promise = MenuService.getMenuItem($ctrl.user.fav);

            promise.then(function(result) {
                $ctrl.completed = true;
                $ctrl.showErr = false;
                $ctrl.user.favData = result;
                MenuService.addUserInfo($ctrl.user);
            })
                .catch(function (error) {
                    $ctrl.completed = false;
                    $ctrl.showErr = true;
                });
        };
    }
})();