const express = require('express');

const router = express.Router();

//controllers
const { addJob, getJobs } = require('../controllers/job');
const { requireSignin } = require('../controllers/auth');

//routes
router.get('/jobs/:userId', requireSignin, getJobs);
router.post('/add-job/:userId', requireSignin, addJob);
// router.post('/edit-category/:userId', requireSignin, editCategory);
// router.post('/delete-category/:userId', requireSignin, deleteCategory);

module.exports = router;
