/*
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 * GET     /api/products/random/:category/:count -> random products
 */
'use strict';
var _ = require('lodash');
var Product = require('./product.model');
// Get list of products
exports.index = function(req, res) {
    Product.find(function(err, products) {
        if(err) {
            return handleError(res, err);
        }
        return res.json(200, products);
    });
};
// Get a single product
exports.show = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if(err) {
            return handleError(res, err);
        }
        if(!product) {
            return res.send(404);
        }
        return res.json(product);
    });
};
// Creates a new product in the DB.
exports.create = function(req, res) {
    Product.create(req.body, function(err, product) {
        if(err) {
            return handleError(res, err);
        }
        return res.json(201, product);
    });
};
// Updates an existing product in the DB.
exports.update = function(req, res) {
    if(req.body._id) {
        delete req.body._id;
    }
    Product.findById(req.params.id, function(err, product) {
        if(err) {
            return handleError(res, err);
        }
        if(!product) {
            return res.send(404);
        }
        var updated = _.merge(product, req.body);
        updated.save(function(err) {
            if(err) {
                return handleError(res, err);
            }
            return res.json(200, product);
        });
    });
};
// Deletes a product from the DB.
exports.destroy = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if(err) {
            return handleError(res, err);
        }
        if(!product) {
            return res.send(404);
        }
        product.remove(function(err) {
            if(err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};
// Get Random products from the DB
exports.random = function(req, res) {
    Product.count().exec(function(err, totalCount) {
        var skipItems = Math.floor(Math.random() * (totalCount - 1 + req.params.category)) + 1;
        Product.find({ category: req.param('category')}).limit(req.param('count')).skip(skipItems).exec(function(err, products) {
            if(err) {
                return handleError(res, err);
            }
            return res.json(200, products);
        });
    })
};

function handleError(res, err) {
    return res.send(500, err);
}