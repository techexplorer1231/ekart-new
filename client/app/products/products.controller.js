'use strict';
angular.module('workspaceApp').controller('ProductsCtrl', function($scope, ProductsSrvc) {
    $scope.getProductsList = ProductsSrvc.getProducts();
});