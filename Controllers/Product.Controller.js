const mongoose = require('mongoose');
const createError = require('http-errors');

const Product =require('../Models/Product.model');

module.exports = {

    getAllProducts : async(req,res,next)=>{
        try {
            // let result = await Product.find();
            // let result = await Product.find({}, {__v:0});
            let result = await Product.find({}, {name: 1, price: 1, _id: 1});
            res.send(result)
    } catch (error) {
            console.log(error.message);
        }
    },   

    findProductById : async(req,res,next)=>{
        const id = req.params.id;
        try {
            let product = await Product.findById(id);
            // let product = await Product.findOne({_id:id});
            // console.log(product);
            if (!product) {
                throw createError(404, "Product does not exists.")
            }
            res.send(product); 
        } catch (error) {
            // console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid product Id"))
            }
            next(error);
        }
    },

    createNewProduct : async(req,res,next)=>{
        try {
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result)
            console.log(result);
        } catch (error) {
            console.log(error.message);
            if (error === 'validationError') {
                next(createError(422, error.message))
            }
            next(error)
        }
    },

    deleteProductById : async(req,res,next)=>{
        try {
            const id  = req.params.id;
            const result = await Product.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, "Product does not exists.")
            }
            // console.log(result);
            res.send(result);
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid product Id"))
            }
            console.log(error.message);
            next(error);
        }
    },

    updateProductById : async(req,res,next)=>{
        try {
            const id = req.params.id;
            const updates = req.body;
            const result = await Product.findByIdAndUpdate(id,updates);
            if (!result) {
                throw createError(404, "Product does not exists.")
            }
            res.send(result)
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid product Id"))
            }
        next(error)
    }

}
}