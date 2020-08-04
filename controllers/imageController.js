const fs = require('fs')
var storage = require('sessionstorage')
var mongoose = require('mongoose')
var defaultDP = mongoose.Types.ObjectId('5d85d612220b38000446b55c')
var Image = mongoose.model('Image')
var User = mongoose.model('User')
var Fountain = mongoose.model('Fountain')

// Upload Fountain images
var uploadImages = function (req, res) {
  // collect the images uploaded
  var files = req.files
  // Get the Fountain that these images are assigned to
  var fountainID = storage.fountainId || mongoose.Types.ObjectId('5eb0ad026182844a5a591e7f')
  Fountain.findById(fountainID, function (err, fountain) {
    if (err) return console.log(err)

    // Upload images to the assigned fountain
    files.forEach(function (thisImg) {
      var imgname = thisImg.originalname
      var image = new Image({
        name: imgname,
        data: fs.readFileSync(thisImg.path),
        contentType: thisImg.mimetype
      })
      fountain.images.push(image._id)
      console.log('Updating Images Image for ' + fountainID)
      // Update image schema link
      image.fountainId = fountainID
      image.save()
      console.log('Image ' + thisImg.originalname + ' has been uploaded!')
    })
    fountain.save()
  })
  // direct to fountain page
  return res.redirect('/profile')
}

// Uploads display picture function
var uploadDisplayPic = function (req, res) {
  var imgname = req.file.originalname

  var image = new Image({
    name: imgname,
    data: fs.readFileSync(req.file.path),
    contentType: req.file.mimetype
  })

  var imgID = image._id
  var userID = req.session.user
  console.log('Updating User Profile Photo ' + userID)
  User.findById(userID, function (err, user) {
    if (err) return console.log(err)
    var oldDp = user.displayPic
    if (oldDp !== defaultDP) {
      console.log(oldDp)
      Image.findByIdAndDelete(oldDp, function (err, img) {
        if (err) return console.log(err)
        console.log('deleted: ' + img._id)
      })
    }
    user.displayPic = imgID
    console.log('new img is: ' + user.displayPic)
    user.save()
  })

  image.userId = userID
  image.usage = 'user display picture'
  image.save()
  console.log('Image ' + req.file.originalname + ' has been uploaded!')
  return res.redirect('/')
}

// Retrive images from mongo
var getImage = function (req, res) {
  var cond = req.params.image
  console.log(req.params)
  // Look for image by name
  Image.findOne({
    name: cond
  }, function (err, image) {
    if (err) return console.log(err)
    if (image) {
      // Image found
      res.contentType(image.contentType)
      return res.send(image.data)
    }
  })

  /* this works but throws an error for some reason grr */

  // If not found look by ID
  Image.findOne({
    _id: cond
  }, function (err, img) {
    if (err) return console.log(err)
    res.contentType(img.contentType)
    res.send(img.data)
  })
}

module.exports.uploadImages = uploadImages
module.exports.uploadDisplayPic = uploadDisplayPic
module.exports.getImage = getImage
