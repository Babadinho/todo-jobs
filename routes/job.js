const express = require('express');

const router = express.Router();

//controllers
const { fetchJob, addJob, getJobs } = require('../controllers/job');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/fetch-job', requireSignin, fetchJob);
router.post('/jobs/:userId', requireSignin, getJobs);
router.post('/add-job/:userId', requireSignin, addJob);
// router.post('/edit-category/:userId', requireSignin, editCategory);
// router.post('/delete-category/:userId', requireSignin, deleteCategory);

module.exports = router;
