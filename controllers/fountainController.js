var storage = require('sessionstorage')
var mongoose = require('mongoose')
var path = require('path')
var Fountain = mongoose.model('Fountain')
var User = mongoose.model('User')

// Adds Fountains recorded by dataset
var addFountain = function (req, res) {
  var fountain = new Fountain({
    // TODO: fix field data
    name: req.body.name,
    locationId: req.body.location,
    status: req.body.status,
    refill: req.session.refill,
    tags: req.body.tags.split(',')
  })

  // Save fountain and update the id to session storage
  fountain.save()
  var fID = fountain._id
  storage.fountainId = fID
  return res.redirect(307, '/')
}

// Gets a single fountain by id
var getFountain = function (req, res) {
  var fountainID = req.params.fountain
  // var userID = req.session.user
  Fountain.findById(fountainID, function (err, fountain) {
    if (err) {
      return console.log(err)
    }
    storage.fountainId = fountain.id
    // idk the path for this cause we don't have a page for this yet
    return res.render(path.join(__dirname, '../views/fountain/fountain.pug'))
  })
}

var visitFountain = function (req, res) {
  var fountainID = req.params.fountain
  User.findOneAndUpdate({
    username: req.session.username
  }, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      user.lastVisit = fountainID
    }
  })
}

module.exports.addFountain = addFountain
module.exports.getFountain = getFountain
module.exports.visitFountain = visitFountain
