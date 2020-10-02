(function (){
'use strict';

angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath){
    var categories = this;

    categories.getCategories = function () {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        })
        .then(function (result) {
            //console.log("categories.getCategories: ", result.data);
            return result.data;
        })
        .catch(function (error) {
            console.log("something is not right");
        });
    }

    categories.getItemsForCategory = function (categoryShortName){
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
        })
        .then(function (result) {
            //console.log("categories.getItemsForCategory: ", result.data.menu_items);
            return result.data;
        })
        .catch(function (error) {
            console.log("something is not right");
        });

    }

}




})();