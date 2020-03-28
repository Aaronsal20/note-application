const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = require('../models/user');
const tokenSchema = require('../models/token');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.createUser = async (req, res, next) => {
  console.log("neter")
  const password = await bcrypt.hash(req.body.password, 10);
  const uId = mongoose.Types.ObjectId();
  console.log("exports.createUser -> uId", uId)
  const user = new userSchema({
    _id: uId,
    name: req.body.name,
    password: password,
    number: req.body.number,
    email: req.body.email,
    active: false
  });
  const result = await user.save();
  console.log("exports.createUser -> result", result)
  const tok = crypto.randomBytes(16).toString('hex')
  const newToken = new tokenSchema({
    _userId: uId,
    token: tok
  });
  const tokenResult = await newToken.save();

  transporter.sendMail({
    to: req.body.email,
    from: 'shop@node-complete.com',
    subject: 'Password reset',
    html: `
      <p>You requested a password reset</p>
      <p> Enter this token ${tok} to verify your account.</p>
    `
  });
  res.status(201).json({
    message: 'User created',
    result: result
  });
}

exports.signIn = async (req, res, next) => {
  console.log("exports.signIn ->  process.env.JWT_KEY",  process.env.JWT_KEY)
  let fetchedUser;
  userSchema.findOne({email: req.body.email })
  .then(user => {
    fetchedUser = user;
    if(!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},"secret_this_should_be_longer",
    { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    })
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
}

exports.confirmEmail = async (req, res, next) => {
  tokenSchema.findOne({ token: req.body.token }).populate("_userId").then(user => {
  console.log("exports.confirmEmail -> user", user)
    if (!user) {
      return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
    }
    if (user.active) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
    user._userId.active = true;
    user._userId.save().then((result) => {
      console.log("exports.confirmEmail -> result", result)
      if (result) return res.status(200).json({ done: true ,message:"The account has been verified. Please log in."});
    });

  })
}
