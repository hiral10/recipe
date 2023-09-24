import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title:" ",
    ingridients:"",
    steps:"",
    calories:"",
    prepTime:"",
    image:"",
    foodType:"",
    mealType:"",
};
export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    getRecipes:(state,action)=>{
        state.recipes = action.payload
    },

    changeRecipe:(state,action)=>{
        state.recipe = action.payload
    },
    
    changeOption:(state,action)=>{
      state.meal =action.payload
    },
    changeDurationOption:(state,action)=>{
      state.duration = action.payload
    }
  },
});
export const {
getRecipes,
changeRecipe,
changeOption,
changeDurationOption,
} = recipeSlice.actions;
export default recipeSlice.reducer;