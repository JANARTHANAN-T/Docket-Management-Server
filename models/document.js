const mongoose = require("mongoose")
const Schema=mongoose.Schema

const documentSchema=new Schema({
    name:String,
    description:String,
    subDocument:[{
        type:Schema.Types.ObjectId,
        ref:'SubDocument'
    }],
    owner:String
})

module.exports=mongoose.model("Document",documentSchema);