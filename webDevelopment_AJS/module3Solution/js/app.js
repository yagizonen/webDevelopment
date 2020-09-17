(function (){
'use strict';

angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', foundItemsDirective);

function foundItemsDirective(){
    var ddo = {
        restrict: 'E',
        templateUrl: 'loader/itemsloaderindicator.template.html',
        scope: {
            foundItems: '<',
            onEmpty: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'controller',
        bindToController: true
    }

    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.searchTerm = "";

    controller.showMenuCategories = function(searchTerm){
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function(items) {
            if (items && items.length > 0) {
                controller.emptyMsg = '';
                controller.menuItems = items;
            } else {
                controller.emptyMsg = 'Nothing found!';
                controller.menuItems = [];
            }
        })
         .catch(function (error) {
            console.log(error);
        });
    };

    controller.removeItem = function(itemIndex){
        MenuSearchService.removeItem(controller.menuItems, itemIndex);
    }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            var foundItems = [];

            for (var i = 0; i < result.data.menu_items.length; i++){
                var obj = result.data.menu_items[i];
                if (searchTerm.length > 0 && obj.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
                    foundItems.push(obj);
                }
            }
            return foundItems;
        })
        .catch(function (error) {
            console.log("something is not right");
        });
    };

    service.removeItem = function (menu, itemIndex) {
        menu.splice(itemIndex, 1);
    };
}

})();