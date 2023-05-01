const { response } = require("express");
const { CustomerModel } = require("../models/customers.model");
const jwt = require('jsonwebtoken');


const CreateAccount = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name) return res.status(404).send({ error: true, message: 'name is required!', response: null });
        if (!email) return res.status(404).send({ error: true, message: 'email is required', response: null });
        if (!password) return res.status(404).send({ error: true, message: 'password is required', response: null });
        if (!phone) return res.status(404).send({ error: true, message: 'phone is required', response: null });
        const alreadyExists = await CustomerModel.findOne({ email });
        if (alreadyExists) {
            return res.status(400).send({ error: true, message: "User already exists", response: null });
        }
        const signUp = await CustomerModel.create({ name, email, password, phone });
        return res.status(200).send({
            error: false,
            message: "user signup successfully",
            response: signUp
        });
    } catch (error) {
        console.error(error);
    }
}

const LoginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(404).send({ error: true, message: 'email is required', response: null });
        if (!password) return res.status(404).send({ error: true, message: 'password is required', response: null });
        const signIn = await CustomerModel.findOne({ email, password });
        const token = jwt.sign({ data: 'dilip' }, 'secret', { expiresIn: 60 * 60 });
        if (!signIn) return res.status(403).send({
            error: false,
            message: "Invalid user email and/or password!",
            response: signIn
        });
        return res.status(200).send({
            error: false,
            message: "user login Successfully!",
            response: { signIn, token }
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { CreateAccount, LoginAccount };