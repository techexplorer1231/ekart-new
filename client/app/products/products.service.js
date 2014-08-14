'use strict';
angular.module('workspaceApp').factory('ProductsResrc', ['ngResource', function(ngResource){
    return $resource('/notes/:id', null,
    {
    	'update':{method:'PUT'}
    });
}]).factory('ProductsSrvc', ['ProductsResrc', function(ProductsResrc){
	return{
		getProducts: function(){
			return "Hello"
		}
	};
}]);