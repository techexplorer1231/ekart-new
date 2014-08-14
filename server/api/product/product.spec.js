'use strict';
var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Product = require('./product.model');
var product = new Product({
    category: "Watches",
    created: new Date(),
    description: {
        brand: "String",
        detail: "String",
        offer: "String",
        price: 1000,
        stock: 10,
        seller: "String",
        title: "String"
    },
    image: {
        main: "String",
        thumbnail: "String"
    },
    review: "String"
});
var updatedProduct = new Product({
    category: "Watches Updated",
    created: new Date(),
    description: {
        brand: "String Updated",
        detail: "String Updated",
        offer: "String Updated",
        price: 1000,
        stock: 10,
        seller: "String Updated",
        title: "String Updated"
    },
    image: {
        main: "String Updated",
        thumbnail: "String Updated"
    },
    review: "String Updated"
});
describe('GET /api/products/random/Watches/1', function() {
	    var product_id = '';
    before(function(done) {
        Product.create(product, function(err, res) {
            product_id = res._id;
            done();
        })
    });
    after(function(done) {
        Product.remove().exec().then(function() {
            done();
        });
    });
    it('should respond with random products', function(done) {
        request(app).get('/api/products/random/Watches/2').expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if(err) return done(err);
            res.body.should.be.instanceof(Array);
            res.body.length.should.eql(2);
            done();
        });
    })
});
describe('GET /api/products', function() {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var product_id = '';
    before(function(done) {
        Product.create(product, function(err, res) {
            product_id = res._id;
            done();
        })
    });
    after(function(done) {
        Product.remove().exec().then(function() {
            done();
        });
    });
    it('should respond with JSON array of all products', function(done) {
        request(app).get('/api/products').expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if(err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
        });
    });
    it('should respond with JSON array of product with specific id', function(done) {
        request(app).get('/api/products/' + product_id).expect('Content-Type', /json/).expect(200).end(function(err, res) {
            if(err) return done(err);
            res.body.should.be.instanceof(Object);
            done();
        });
    });
    it('should respond with 404 error if product with specific id is not found', function(done) {
        request(app).get('/api/products/mockid000000000000000000').expect(404).end(function(err, res) {
            if(err) return done(err);
            done();
        });
    });
    it('should respond with 500 internal server error if id is not in correct format(less than 24 digits)', function(done) {
        request(app).get('/api/products/mockid00000000000000000').expect(500).end(function(err, res) {
            if(err) return done(err);
            checkForHexRegExp.test('mockid00000000000000000').should.not.be.true;
            done();
        });
    });
    it('should respond with 500 internal server error if id is not in correct format(more than 24 digits)', function(done) {
        request(app).get('/api/products/mockid0000000000000000000').expect(500).end(function(err, res) {
            checkForHexRegExp.test('mockid0000000000000000000').should.not.be.true;
            done();
        });
    });
});
describe("DELETE /api/products/:id", function() {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var product_id = '';
    before(function(done) {
        Product.create(product, function(err, res) {
            product_id = res._id;
            done();
        });
    });
    it('should delete a product with specific id', function(done) {
        request(app).del('/api/products/' + product_id).expect(204).end(function(err, res) {
            if(err) return done(err);
            done();
        });
    });
    it('should respond with 404 status if product with specific id is not found for deletion', function(done) {
        request(app).del('/api/products/mockid000000000000000000').expect(404).end(function(err, res) {
            if(err) return done(err);
            done();
        });
    });
    it('should respond with 500 internal server error if id is not in correct format(less than 24 digits)', function(done) {
        request(app).del('/api/products/mockid00000000000000000').expect(500).end(function(err, res) {
            if(err) return done(err);
            checkForHexRegExp.test('mockid0000000000000000000').should.not.be.true;
            done();
        });
    });
    it('should respond with 500 internal server error if id is not in correct format(more than 24 digits)', function(done) {
        request(app).del('/api/products/mockid0000000000000000000').expect(500).end(function(err, res) {
            if(err) return done(err);
            checkForHexRegExp.test('mockid0000000000000000000').should.not.be.true;
            done();
        });
    });
});
describe("PUT /api/products/:id", function() {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var product_id = '';
    before(function(done) {
        Product.create(product, function(err, res) {
            product_id = res._id;
            done();
        });
    });
    after(function(done) {
        Product.remove().exec().then(function() {
            done();
        });
    });
    it('should updated a product with specific id', function(done) {
        request(app).put('/api/products/' + product_id).send(updatedProduct).expect(200).end(function(err, res) {
            if(err) return done(err);
            done();
        });
    });
    it('should respond with 404 status if product with specific id is not found for update', function(done) {
        request(app).put('/api/products/mockid000000000000000000').expect(404).end(function(err, res) {
            if(err) return done(err);
            done();
        });
    });
    it('should respond with 500 internal server error if id is not in correct format(less than 24 digits)', function(done) {
        request(app).put('/api/products/mockid00000000000000000').expect(500).end(function(err, res) {
            if(err) return done(err);
            checkForHexRegExp.test('mockid0000000000000000000').should.not.be.true;
            done();
        });
    });
    it('should respond with 500 internal server error if id is not in correct format(more than 24 digits)', function(done) {
        request(app).put('/api/products/mockid0000000000000000000').expect(500).end(function(err, res) {
            if(err) return done(err);
            checkForHexRegExp.test('mockid0000000000000000000').should.not.be.true;
            done();
        });
    });
});