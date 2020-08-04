// Code for reset functionality adapted from:
// http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/

var mongoose = require("mongoose");
var User = mongoose.model("User");
var path = require("path");
var passport = require("passport");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// Registration function
var register = function(req, res) {
  // If email is not registered

  User.findOne({
    email: req.body.email
  }).then(function(user) {
    if (user) {
      // req.flash('error', 'That user already exists!')
      console.log("user exists");
      return res.status(401).send({ error: "That user already exists!" });
    } else {
      // If username is not taken
      User.findOne({
        username: req.body.name
      }).then(async name => {
        if (name) {
          // req.flash('error', 'Username taken!')
          console.log(name)
          console.log("username taken");
          res.status(401).send({ error: "Username taken!" });
        } else {
          var hashtmp;
          // asynchronously generate a secure password using 10 hashing rounds
          hashtmp = bcrypt.hashSync(req.body.pwd, 10);
          var user = new User({
            username: req.body.username,
            email: req.body.email,
            hash: hashtmp
          });

          let result = await user.save();
          console.log(result);
          res.status(200).send(result);
        }
      });
    }
  });
};

// Login function
/*
var login = function(req, res) {
  passport.authenticate("user", (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: err });
    }
    if (user) {
      console.log("logging in");
      return res.status(200).send({
        user: user._id,
        username: user.username,
        email: user.email,
        displayPic: user.displayPic,
        userType: "user"
      });
    } else {
      console.log("error: incorrect password");
      return res.status(401).send({ error: "error" });
    }
  })(req, res);
};
*/
var jwt_login = async (req, res) => {
  console.log(req.body);
  var user =
    (await User.findOne({ username: req.body.username }).exec()) ||
    (await User.findOne({ email: req.body.username }).exec());
  console.log(user);
  if (!user) {
    return res.status(401).json({
      message: "Auth failed, user not found"
    });
  }

  if (!bcrypt.compareSync(req.body.pwd, user.hash)) {
    return res.status(401).json({
      message: "Auth failed, password failed"
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id
    },
    // process.env.JWT_KEY,
    "hydrohomies",
    {
      expiresIn: "1h"
    }
  );
  return res
    .status(200)
    .json({
      message: "Auth successful",
      token: token,
      user_id: user._id
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// Retrieve profile
var profile = function(req, res) {
  var userID = req.params.user_id;
  //console.log(req)
  User.findById(userID).exec((err, user) => {
    if (err) {
      console.log(err);
      res.status(401).send({
        "error": err
      })
    }
    //console.log(user)
    res.status(200).send(user);
  });
};

// Logout function
var logout = function(req, res) {
  console.log("Logging out!");
  res.clearCookie("userID");
  res.redirect("/");
};

module.exports.register = register;
module.exports.profile = profile;
module.exports.logout = logout;
module.exports.jwt_login = jwt_login;
