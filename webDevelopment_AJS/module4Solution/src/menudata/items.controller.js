(function () {
'use strict';

angular.module('Data')
.controller('CategoryItemsController', CategoryItemsController);

CategoryItemsController.$inject = ['MenuDataService', 'cItems'];
function CategoryItemsController(MenuDataService, cItems) {
  var categoryItems = this;
  categoryItems.items = cItems;
}

})();
