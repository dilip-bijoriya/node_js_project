const { Schema, model } = require('mongoose');

const schema = new Schema({
    "name": {
        type: String,
        required: true,
        trim: true
    },
    "brand": {
        type: String,
        required: true,
        trim: true
    },
    "price": {
        type: Number,
        required: true,
        min: 0
    },
    "category": {
        type: String,
        required: true,
        trim: true
    }
});

module.exports.ProductModel = model('Product', schema);