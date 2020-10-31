const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id',getProduct, (req, res) => {
    res.json(req.body)
})

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category
      })
      try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }      
})

router.delete('/:id', getProduct, async (req, res) => {
   try {
        await res.product.remove()
        res.json({ message: 'Deleted product' })
   } catch (err) {
       res.status(500).json({message: err.message})
   }    
})

async function getProduct(req, res, next) {
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

module.exports = router