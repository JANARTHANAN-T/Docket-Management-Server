const mongoose = require("mongoose")
const Schema=mongoose.Schema

const imageSchema = new Schema({
    title:String,
    image:String
},{ timestamps: true })

module.exports=mongoose.model("Image",imageSchema);