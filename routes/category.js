const express = require('express');

const router = express.Router();

//controllers
const {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory,
} = require('../controllers/category');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/categories/:userId', requireSignin, getCategories);
router.post('/add-category/:userId', requireSignin, addCategory);
router.post('/edit-category/:userId', requireSignin, editCategory);
router.post('/delete-category/:userId', requireSignin, deleteCategory);

module.exports = router;
