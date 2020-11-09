const Category = require('../models/category');

exports.get_all_categories = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_category = async (req, res) => {
  res.json(req.body);
};

exports.create_category = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete_category = async (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: 'Deleted category' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
