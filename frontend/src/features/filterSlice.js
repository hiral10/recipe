import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   meal:"",
   duration:"",
   title:""
};
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
  
    changeOption:(state,action)=>{
      state.meal =action.payload
    },
    changeDurationOption:(state,action)=>{
      state.duration = action.payload
    },
    getTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});
export const {

changeOption,
changeDurationOption,
getTitle,
} = filterSlice.actions;
export default filterSlice.reducer;