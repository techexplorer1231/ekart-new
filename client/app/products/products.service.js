'use strict';
angular.module('workspaceApp').factory('ProductsSrvc', function(ProductsResrc){
	return{
		getProducts: function(){
			return ProductsResrc.query();
		}
	};
}).factory('ProductsResrc', function($resource){
    return $resource('/api/products/:id', null,
    {
    	update: {method:'PUT'}
    });
});