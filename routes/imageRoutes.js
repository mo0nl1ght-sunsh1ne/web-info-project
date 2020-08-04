var express = require("express");
var router = express.Router();
// var path = require('path')
var multer = require("multer");
var upload = multer({
  dest: "uploads/"
});
var imageController = require("../controllers/imageController.js");

// Routes for image related stuff

/* GET requests */
/*
// Get upload displayPic page
router.get('/upload-DP', function (req, res) {
  // TODO: front end page get
  res.sendFile(path.join(__dirname, '/../views/image-uploads/display-picture-upload.html'))
})

// Get upload fountain picture page
router.get('/upload-images', function (req, res) {
  // TODO: front end page get
  res.sendFile(path.join(__dirname, '/../views/uploadImage.html'))
})

/* !!!! ATTENTION: Add new get pages before this comment !!! */

// Get images
router.get("/:image", imageController.getImage);

/* POSTS requests */

// upload mutliple pictures (For fountains)
var type = upload.array("pro-image", 5);
router.post("/upload-images", type, imageController.uploadImages);

// Upload Display Picture
type = upload.single("myImage");
router.post("/upload-DP", type, imageController.uploadDisplayPic);

module.exports = router;
