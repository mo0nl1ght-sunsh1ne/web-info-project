var express = require('express')
var router = express.Router()
var path = require('path')
// controller imports
var loginController = require('../controllers/loginController.js')
// routes imports
var image = require('./imageRoutes.js')
var fountain = require('./fountainRoutes.js')
const checkAuth = require('../controllers/checkAuth');

// External routes
router.use('/images', image)
router.use('/fountain', fountain)

/* GET Requests */

// Get homepage
/*
router.get('/', function (req, res) {
  if (!req.session.user) {
    res.sendFile(path.join(__dirname, '/../views/homepage.html'))
  } else {
    // TODO: set up landing page after signin/login
    res.redirect('/main')
  }
  // dirname : It will resolve to your project folder.
})

// Get login page
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '/../views/LogIn.html'))
})

// Get login page
router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '/../views/SignUp.html'))
})

*/

// Get profile page
router.get('/profile/:user_id', checkAuth, loginController.profile)

/* POST requests */

// Login
router.post('/login', loginController.jwt_login)

// Logout
router.post('/logout', loginController.logout)

// Register
router.post('/register', loginController.register)

module.exports = router
