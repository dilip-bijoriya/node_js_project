const { CartModel } = require("../models/cart.model");

const addCart = async (req, res) => {
    try {
        let data = await CartModel.count(req.body)
        return res.status(200).send({
            error: false,
            message: "card added successfully",
            response: data
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { addCart };