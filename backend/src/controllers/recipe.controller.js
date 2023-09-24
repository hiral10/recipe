const { recipeService } = require("../services");
const httpStatus = require("http-status");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

const getRecipe = async (req, res) => {
  const recipe = await recipeService.getRecipe();
  res.send(recipe)
  };

const getRecipeById = async(req,res)=>{
  
  const recipe = await recipeService.getRecipeById(req.params.recipeId);
 
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe);
}
async function postRecipe (req,res){
  const recipe = await recipeService.postRecipe(req.body)
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe); 
}
const postMealFilter = async(req,res)=>{
    if(req.query.meal && !req.query.duration){
  const recipe = await recipeService.postFilter(req.query);
 
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe);
}
if(req.query.duration && !req.query.meal){
  const recipe = await recipeService.postFilter(req.query);
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe);
}
if(req.query.meal && req.query.duration){
  const recipe = await recipeService.postFilter(req.query);
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe);
}
if(req.query.title){
  const recipe = await recipeService.postFilter(req.query);
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe);
}
if(req.query.title===''){
  const recipe = await recipeService.postFilter(req.query);
  if (!recipe) {
    throw new Error(httpStatus.NOT_FOUND, "Recipe not found");
  }
  res.send(recipe);
}
}
  module.exports ={getRecipe,getRecipeById,postMealFilter,postRecipe}