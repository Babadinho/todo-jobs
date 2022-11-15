const Category = require('../models/Category');
const Job = require('../models/Job');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.params.userId }).sort({
      createdAt: 'ascending',
    });
    if (categories) {
      res.json(categories);
    }
  } catch (error) {
    res.status(400).send('Error Loading categories');
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // validate fields
    if (!name) return res.status(400).send('Field cannot be empty');

    //check if list with same name exists
    let categoryExist = await Category.findOne({
      name: name[0].toLowerCase() + name.substring(1),
      user: req.params.userId,
    }).exec();
    if (categoryExist) return res.status(400).send('Category already exists');

    const newCategory = new Category({
      name: name[0].toLowerCase() + name.substring(1),
      user: req.params.userId,
    });

    await newCategory.save();

    const category = await Category.find({ user: req.params.userId });
    if (category) {
      res.json(category);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    let editCategory = await Category.findOne({
      _id: categoryId,
      user: req.params.userId,
    }).exec();

    editCategory.name = name[0].toLowerCase() + name.substring(1);
    await editCategory.save();

    const category = await Category.find({ user: req.params.userId });
    if (category) {
      res.json(category);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    await Category.deleteOne({
      user: req.params.userId,
      _id: categoryId,
    }).exec();
    // await Job.deleteMany({ user: req.params.userId, list: categoryId }).exec();

    const category = await Category.find({ user: req.params.userId });
    if (category) {
      res.json(category);
    }
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
