const { Schema, model } = require("mongoose");

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        unique: true
    },
    productsId: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
}, {
    timestamps: true
});

module.exports.CartModel = model("cart", schema);