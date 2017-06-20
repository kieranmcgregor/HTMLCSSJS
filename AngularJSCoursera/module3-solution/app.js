(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems);

  function FoundItems () {
    var ddo = {
      restrict: 'E',
      templateUrl: "foundList.html",
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "foodPreferenceFinder",
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController () {}

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var foodPreferenceFinder = this;

      var promise = MenuSearchService.getAllMenuItems();

      promise.then(function(response) {
        MenuSearchService.setWholeMenuList(response);
        foodPreferenceFinder.findFoodByDescription = function (userFoodPreference) {
          if (userFoodPreference == undefined) {
            MenuSearchService.setMatchedListStatus();
          } else if (userFoodPreference.length == 0){
            MenuSearchService.clearMatchedMenuList();
            MenuSearchService.setMatchedListStatus();
          } else {
            foodPreferenceFinder.foundItems = MenuSearchService.getMatchedMenuItems(userFoodPreference);
            MenuSearchService.setMatchedListStatus();
          }
        }
      })
      .catch(function(error){
        console.log("Something went terribly wrong!");
      })

    foodPreferenceFinder.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }

    foodPreferenceFinder.emptyList = function () {
      return MenuSearchService.getMatchedListStatus();
    }
  }

  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http) {
    var service = this;
    var wholeMenuList = [];
    var matchedItemsList = [];
    var isEmpty = false;

    service.getAllMenuItems = function () {
      var response = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      });

      return response;
    };

    service.getMatchedMenuItems = function (userFoodPreference) {

      for (var i = 0; i < wholeMenuList.length; i++) {
        var descriptionToSearch = wholeMenuList[i].description;
        if (descriptionToSearch.indexOf(userFoodPreference) > -1) {
          matchedItemsList.push(wholeMenuList[i]);
        }
      }

      return matchedItemsList;
    };

    service.getMatchedListStatus = function () {
      return isEmpty;
    }

    service.setWholeMenuList = function (promiseResponse) {
      wholeMenuList = promiseResponse.data.menu_items;
    };

    service.setMatchedListStatus = function () {
      if (matchedItemsList.length <= 0) {
        isEmpty = true;
      } else {
        isEmpty = false;
      }
    }

    service.removeItem = function(itemIndex) {
      matchedItemsList.splice(itemIndex, 1);
    };

    service.clearMatchedMenuList = function () {
      matchedItemsList.splice(0, matchedItemsList.length);
    }

  }
})();
