(function (){
    'use strict';

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['info'];
    function InfoController(info) {
        var $ctrl = this;
        $ctrl.info = info;
        if($ctrl.info.length > 0) {
            $ctrl.show = true;
        }
        else{
            $ctrl.show = false;
        }
    }
})();