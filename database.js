const mongoose = require("mongoose");


const connection = mongoose.connect("mongodb+srv://Vishal_solanki:uVymvztSy0G2JkF0@cluster0.ccqdks2.mongodb.net/vishal?retryWrites=true&w=majority", {useUnifiedTopology:true, useNewUrlParser:true})
.then(result => (
    console.log("connected")
))
.catch(err => {
 console.log(err)
})  
     
module.exports = connection;