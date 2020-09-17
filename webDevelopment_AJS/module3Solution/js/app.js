(function (){
'use strict';

angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json")
    .directive('foundItems', foundItemsDirective);

function foundItemsDirective(){
    var ddo = {
        templateUrl: 'loader/itemsloaderindicator.template.html',
        scope: {
            foundItems: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'controller',
        bindToController: true
    }

    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
function NarrowItDownController(MenuSearchService, $scope) {
    var controller = this;

    $scope.searchTerm = "";

    controller.menuItems = []

    controller.showMenuCategories = function(){

        controller.isVisible = true;
        controller.menuItems = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
    }

    controller.logMenuItems = function(shortName){
        var promise = MenuSearchService.getMenuForCategory(shortName);

        promise.then(function (response){
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    controller.removeItem = function(itemIndex){
        MenuSearchService.removeItem(controller.menuItems, itemIndex);
    }

    console.log(controller);
}

MenuSearchService.$inject = ['$http', 'ApiPath']
function MenuSearchService($http, ApiPath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        var foundItems = [];

        var response = $http({
            method: "GET",
            url: (ApiPath)
        });

        response.then(function (result) {
            for (var i = 0; i < result.data.menu_items.length; i++){
                var obj = result.data.menu_items[i];
                if (obj.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
                    foundItems.push(obj);
                }
            }
        })
        .catch(function (error) {
            console.log("something is not right");
        });

        return foundItems;
    };

    service.removeItem = function (menu, itemIndex) {
        menu.splice(itemIndex, 1);
    };

    service.getMenuForCategory = function (shortName) {
        var response = $http({
            method: "GET",
            url: (ApiPath),

        });

        return response;
    }
}

})();