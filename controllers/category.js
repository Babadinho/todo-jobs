const Category = require('../models/Category');
const Job = require('../models/Job');
const Note = require('../models/Note');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.params.userId }).sort({
      createdAt: 'ascending',
    });
    if (categories) {
      res.json(categories);
    }
  } catch (error) {
    res.status(400).send('Error loading categories');
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

    if (!name) return res.status(400).send('Field cannot be empty');

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

    // first delete notes
    const jobsToDeleteNote = await Job.find({
      category: categoryId,
      user: req.params.userId,
    });

    await Note.deleteMany({ job: { $in: jobsToDeleteNote } });

    // delete jobs in the category
    await Job.deleteMany({
      user: req.params.userId,
      category: categoryId,
    }).exec();

    // Delete the category
    await Category.deleteOne({
      user: req.params.userId,
      _id: categoryId,
    }).exec();

    const jobs = await Job.find({ user: req.params.userId })
      .populate('category')
      .populate({ path: 'notes', options: { sort: { createdAt: -1 } } })
      .sort({
        createdAt: 'descending',
      });
    if (jobs) {
      return res.json(jobs);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again');
  }
};
