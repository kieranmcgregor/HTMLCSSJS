(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
      toBuyList.empty = ShoppingListCheckOffService.getToBuyStatus();
    }

  }

  AlreadyBoughtShoppingController.$inject['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    boughtList.empty = function () {
      return ShoppingListCheckOffService.getBoughtStatus();
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var emptyToBuyList = false;
    var emptyBoughtList = true;

    var toBuyItems = [
      {
        name: "Cookies",
        quantity: "10 bags"
      },
      {
        name: "Milk",
        quantity: "2 bags"
      },
      {
        name: "Pop",
        quantity: "2 bottles"
      },
      {
        name: "Chips",
        quantity: "5 bags"
      },
      {
        name: "Carrots",
        quantity: "2 kilos"
      }
    ];

    var boughtItems = [];

    service.buyItem = function(index) {
      boughtItems[boughtItems.length] = toBuyItems[index];
      toBuyItems.splice(index, 1);

      if (boughtItems.length > 0 ) {
        emptyBoughtList = false;
      }

      if (toBuyItems.length == 0) {
        emptyToBuyList = true;
      }
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.getToBuyStatus = function () {
      return emptyToBuyList;
    };

    service.getBoughtStatus = function () {
      return emptyBoughtList;
    }
  }
})();
