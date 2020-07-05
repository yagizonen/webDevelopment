(function (){
'use strict';

angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getBuyItems();
    buyList.errorMessage = "Everything is bought!";


    buyList.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex, false);
    };
}
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    boughtList.errorMessage = "Nothing bought yet";

    boughtList.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex, true);
    };
}

function ShoppingListCheckOffService() {
    var service = this;

    var buyItems = [
        {
            name: 'Cookies',
            quantity: 10
        },
        {
            name: 'Chips',
            quantity: 5
        },
        {
            name: 'Drinks',
            quantity: 2
        },
        {
            name: 'Gums',
            quantity: 20
        },
        {
            name: 'Ice Creams',
            quantity: 5
        }
    ];

    var boughtItems = [];

    service.getBuyItems = function () {
        return buyItems;
    }

    service.getBoughtItems = function () {
        return boughtItems;
    }

    service.removeItem = function(itemIndex, flag) {
        var listToAdd = boughtItems;
        var listToRemove = buyItems;
        if(flag){
            listToAdd = buyItems;
            listToRemove = boughtItems;
        }

        listToAdd.push(listToRemove[itemIndex])
        listToRemove.splice(itemIndex, 1);
    }
}

})();