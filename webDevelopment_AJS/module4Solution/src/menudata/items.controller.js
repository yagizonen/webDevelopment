(function () {
'use strict';

angular.module('Data')
.controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['MenuDataService', 'cItems'];
function CategoryItemsController(MenuDataService, cItems) {
  var categoryItems = this;
  categoryItems.categoryShortName=cItems.category.short_name;
  categoryItems.categoryName=cItems.category.name;
  categoryItems.items = cItems.menu_items;
}

})();
