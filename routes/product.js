const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const products = require('../controllers/product')

async function findProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id).populate('category')
        if(product === null) {
            return res.status(404).json({message: err.message})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    req.body = product
    next()
}

router.route('/')
    .get(products.get_all_products)
    .post(products.create_product)

router.route('/:id')
    .get(findProduct, products.get_product)
    .delete(findProduct, products.delete_product)

module.exports = router