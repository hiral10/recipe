const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
    {
     
      image:{
        type:String,
        //required:true,
      },
     
    },
    {
      timestamps: false,
    },
  );
  
  const Image = mongoose.model("Image", imageSchema,'image');
  
  module.exports.Image = Image;
  module.exports.imageSchema = imageSchema;