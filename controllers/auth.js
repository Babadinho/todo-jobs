const User = require('../models/User');
const Category = require('../models/Category');
const Job = require('../models/Job');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { OAuth2Client } = require('google-auth-library');

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// server.js
/**
 *  This function is used verify a google account
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: 'Invalid user detected. Please try again' };
  }
};

// local user signup
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //validate fields
    if (!firstName || !lastName || !email || !password)
      return res.status(400).send('All fields are required');

    //validate password
    if (password.length < 6)
      return res
        .status(400)
        .send('Pasword too short, must be 6 characters and above');

    //check if user user already exists
    let userExist = await User.findOne({ email: email }).exec();
    if (userExist)
      return res.status(400).send('User with that email already exists');

    //register user
    const user = new User({ ...req.body, user_type: 'local' });

    // hash password and save user
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.save();

        // create a default category for user
        const category = new Category({
          name: 'default',
          user: user._id,
        });

        category.save();

        //Generate jwt signed token
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        // send response to client
        res.json({
          token,
          user,
        });
      });
    });
  } catch (err) {
    console.log('User registration failed', err);
    return res.status(400).send('Error. Try again');
  }
};

// local user sign in
exports.login = async (req, res) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password)
    return res.status(400).send('All fields are required');

  try {
    let user = await User.findOne({ email }).select('+password').exec();
    if (!user) return res.status(400).send('User does not exist');

    //match password
    bcrypt.compare(password, user.password, function (err, match) {
      if (!match || err) {
        return res.status(400).send('Password is incorrect');
      }
      //Generate jwt signed token and send as reponse to client
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      const today = new Date();

      Job.updateMany(
        { endDate: { $lte: today } },
        {
          $set: { status: 'closed' },
        }
      );

      return res.json({
        token,
        user,
      });
    });
  } catch (err) {
    console.log('Login Error', err);
    res.status(400).send('Login failed. try again');
  }
};

//  google user signup & signin
exports.signinGoogle = async (req, res) => {
  const { credential } = req.body;
  try {
    if (credential) {
      const verificationResponse = await verifyGoogleToken(credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const user = await User.findOne({ email: profile?.email });

      if (!user) {
        const user = new User({
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          picture: profile.picture,
          user_type: 'google',
        });

        await user.save();

        // create a default category for user
        const category = new Category({
          name: 'default',
          user: user._id,
        });

        await category.save();
      }

      const today = new Date();

      await Job.updateMany(
        { endDate: { $lte: today } },
        {
          $set: { status: 'closed' },
        }
      );

      const new_user = await User.findOne({ email: profile?.email });

      //Generate jwt signed token
      let token = jwt.sign({ _id: new_user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.status(201).json({
        token,
        user: new_user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('An error occurred. Sign in failed.');
  }
};
