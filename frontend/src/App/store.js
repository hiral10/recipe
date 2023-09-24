import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipeSlice.js";
import filterReducer from "../features/filterSlice.js"
export const store = configureStore({
  reducer: {
   recipe : recipeReducer,
    recipes: recipeReducer,
    filter:filterReducer,
  },
 
});