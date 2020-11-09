const express = require('express')
const router = express.Router()
const categories = require('../controllers/category')

router.route('/')
    .get(categories.get_all_categories)
    .post(categories.create_category)

router.route('/:id')
    .get(findCategory, categories.get_category)
    .delete(findCategory, categories.delete_category)

async function findCategory(req, res, next) {
    let category
    try {
        category = await Category.findById(req.params.id)
        if(category === null) {
            return res.status(404).json({message: err.message})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    req.body = category
    next()
}

module.exports = router