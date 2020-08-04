var express = require('express')
var router = express.Router()
var path = require('path')
var fountainController = require('../controllers/fountainController.js')

// Routes for Fountains

/* GET requests */

// Get fountains by id
/* directs to fountain page */
// router.get('/:fountain', fountainController.getFountain)
// temp test page
/*
router.get('/fountain-test', function (req, res) {
  res.sendFile(path.join(__dirname, '/../views/fountain.html'))
})

/* POST requests */
// add fountains from dataset
router.post('/add-fountain', fountainController.addFountain)

// set last visit to fountain given
router.post('/visit-fountain', fountainController.visitFountain)

module.exports = router
