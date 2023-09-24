const express = require("express");
const { recipeController } = require("../../controllers");
const multer = require('multer');
const { recipeService } = require("../../services");
let mongoose = require('mongoose')

const { Recipe, Image } = require("../../models");
const { v4 } = require('uuid');
const router = express.Router();
const DIR = './images';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, v4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype==="image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.get('/',recipeController.getRecipe)
router.get("/:recipeId",recipeController.getRecipeById);
router.post('/',recipeController.postMealFilter)
router.post('/uploadimg',upload.single('file'), async function(req, res) {
  const url = req.protocol + '://' + req.get('host')
  const user = new Image({
      _id: new mongoose.Types.ObjectId(),
      image: url + '/images/' + req.file.filename
  });
  user.save().then(result => {
      res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
              _id: result._id,
              title:result.title,
              image: result.image
          }
      })
  }).catch(err => {
          res.status(500).json({
              error: err
          });
  })
})
router.post('/upload',recipeController.postRecipe)
module.exports = router