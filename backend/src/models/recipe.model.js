const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
    {
      title: {
        type: String,
        // required: true,
        
      },
      ingredients: {
        type: Array,
        // required: true,
      },
      steps: {
        type: Array,
        // required: true,
       
      },
      calories: {
        type: Number,
      //   required: true,

      },
      prepTime:{
        type: String,
        // required: true,

      },
      image:{
        type:String,
        //required:true,
      },
      mealType:{
        type:String,
        // required:true
      },
      servings:{
        type:String,
        // required:true
      }
    },
    {
      timestamps: false,
    },
  );
  
  const Recipe = mongoose.model("Recipe", recipeSchema);
  
  module.exports.Recipe = Recipe;
  module.exports.recipeSchema = recipeSchema;