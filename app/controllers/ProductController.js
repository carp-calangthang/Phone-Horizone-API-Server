
require('dotenv').config();
const uuid = require('uuid');
const asyncHandler = require('express-async-handler');

const Products = require('../model/Product');

function convertId(str){
    return str.replace(/\s+/g, '_').toLowerCase();
}

const Show_Products = asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.status(200).json(products);
});

const Find_Product = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Products.findOne({ id: `${id}` });
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const Product_Upload = asyncHandler(async (req, res) => {
    const { name, image, price, description } = req.body;
    try {
        const existingProducts = await Products.findOne({ name: `${name}` });
        if (existingProducts) {
            res.status(401).json({ message: 'Product already exists', ping: '0' });
        } else {
            const random_id = `${convertId(name)}_${uuid.v4()}`;
            const products = new Products({ id: random_id, name, image, price, description });
            await products.save();
            res.status(200).json({ message: `User ${name} created successfully`, ping: '1' });
        }
    } catch (error) {
        console.log(error);
    }
});

const Delete_Product = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const products = await Products.findOneAndDelete({ name: `${name}` });
        if (products) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const Update_Product = asyncHandler(async (req, res) => {
    try {
        const id = req.params;
        const { name, image, price, description } = req.body;
        const updatedProduct = await Products.findOneAndUpdate({ id: `${id}` }, { name, image, price, description }, { new: true });
        if (updatedProduct) {
            res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { Product_Upload, Show_Products, Find_Product, Delete_Product, Update_Product };