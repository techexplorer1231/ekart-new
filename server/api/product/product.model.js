'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ProductSchema = new Schema({
    category: String,
    created: {
        type: Date,
        default: Date.now
    },
    description: {
        brand: String,
        detail: String,
        offer: String,
        price: Number,
        stock: Number,
        seller: String,
        title: String,
    },
    image: {
        main: String,
        thumbnail: String
    },
    review: String
});
module.exports = mongoose.model('Product', ProductSchema);