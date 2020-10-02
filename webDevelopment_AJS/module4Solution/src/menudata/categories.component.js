(function (){
'use strict';

angular.module('Data')
    .component('categories',{
        templateUrl: 'src/menudata/templates/categories.template.html',
        bindings: {
            data: '<'
        }
    });

})();