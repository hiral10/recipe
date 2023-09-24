const express = require("express");
const recipeRoute = require("./recipe.route");

const router = express.Router();

router.use('/recipe',recipeRoute)
 
module.exports = router