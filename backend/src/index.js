const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoose.url,{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then(()=>console.log("connect to DB",config.mongoose.url))
        .catch((e)=>console.log("failed to connect to DB",e))
        
app.listen(config.port,()=>{
    console.log("Listening to port",config.port)
})