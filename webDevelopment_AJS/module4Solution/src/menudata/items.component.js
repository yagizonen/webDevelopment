(function (){
'use strict';

angular.module('Data')
    .component('items',{
        templateUrl: 'src/menudata/templates/items.template.html',
        bindings: {
            data: '<'
        }
    });

})();