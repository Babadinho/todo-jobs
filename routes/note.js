const express = require('express');

const router = express.Router();

//controllers
const { addNote, getNotes, deleteNote } = require('../controllers/note');
const { requireSignin } = require('../controllers/auth');

//routes
router.post('/notes/:userId', requireSignin, getNotes);
router.post('/add-note/:userId', requireSignin, addNote);
router.post('/delete-note/:userId', requireSignin, deleteNote);

module.exports = router;
