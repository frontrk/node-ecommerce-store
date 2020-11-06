const Product = require('../models/product')

exports.get_all_products = async (req,res) => {
    try {
        const product = await Product.find()
        res.json(product)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

exports.get_product = async (req, res) => {
    res.json(req.body)
}

exports.create_product = async (req, res) => {
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
}

exports.delete_product = async (req, res) => {
   try {
        await res.product.remove()
        res.json({ message: 'Deleted product' })
   } catch (err) {
       res.status(500).json({message: err.message})
   }      
}

