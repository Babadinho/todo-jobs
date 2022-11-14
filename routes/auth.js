const express = require('express');

const router = express.Router();

//controllers
const { register, login, signinGoogle } = require('../controllers/auth');

//routes
router.post('/register', register);
router.post('/signin-google', signinGoogle);
router.post('/login', login);

module.exports = router;
