const { default: mongoose } = require("mongoose");
const { ProductModel } = require("../models/product.model");

const getProductList = async (req, res) => {
    try {
        const list = await ProductModel.find().select({ __v: 0 });
        return res.status(200).send({
            error: false,
            message: 'success',
            response: list
        });
    } catch (error) {
        console.error(error);
    }
}

const addProduct = async (req, res) => {
    try {
        const data = await ProductModel.create(req.body);
        return res.status(200).send({
            error: false,
            message: 'product successfully added',
            response: data
        });
    } catch (e) {
        console.error(e);
    }
}

const updateProduct = async (req, res) => {
    try {
        const {
            _id,
            name,
            brand,
            price,
            category
        } = req.body;

        if (!mongoose.isValidObjectId(_id)) return res.status(200).send({
            error: true,
            message: 'Product _id is invalid.',
            response: null
        });
        const getProduct = await ProductModel.findById(_id);
        if (name) getProduct.name = name;
        if (brand) getProduct.brand = brand;
        if (category) getProduct.category = category;
        if (price) getProduct.price = price;

        const data = await ProductModel.save();
        return res.status(200).send({
            error: false,
            message: 'product successfully update!',
            response: data
        });
    } catch (e) {
        console.error(e);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const data = await ProductModel.deleteOne({
            _id: req.params.id
        });
        return res.status(200).send({
            error: false,
            message: 'product successfully deleted!',
            response: data
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getProductList, addProduct, updateProduct, deleteProduct };