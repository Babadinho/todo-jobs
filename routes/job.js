const express = require('express');

const router = express.Router();

//controllers
const {
  fetchJob,
  addJob,
  editJob,
  getJobs,
  deleteJob,
  changeJobStatus,
  getJobSites,
  getJobStats,
} = require('../controllers/job');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/fetch-job', requireSignin, fetchJob);
router.post('/jobs/:userId', requireSignin, getJobs);
router.post('/add-job/:userId', requireSignin, addJob);
router.post('/edit-job/:userId', requireSignin, editJob);
router.post('/delete-job/:userId', requireSignin, deleteJob);
router.post('/status/:jobId', requireSignin, changeJobStatus);
router.get('/job-sites/:userId', requireSignin, getJobSites);
router.get('/job-stats/:userId', requireSignin, getJobStats);

module.exports = router;
