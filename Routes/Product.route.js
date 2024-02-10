const express = require('express');
const router = express.Router();

const  productController = require('../Controllers/Product.Controller.js')

// posing  products
router.post('/', productController.createNewProduct)

// Getting list of all products
router.get('/', productController.getAllProducts);

// Get product by id
router.get('/:id', productController.findProductById)

// delete product by id
router.delete('/:id', productController.deleteProductById)

// update product by id
router.patch('/:id', productController.updateProductById)

module.exports = router;