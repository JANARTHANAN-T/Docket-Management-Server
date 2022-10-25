const mongoose=require('mongoose')
const Schema=mongoose.Schema

const subDocumentSchema=new Schema({
    name:String,
    content:String,
    image:[{
      type:Schema.Types.ObjectId,
      ref:'Image'
  }]
})

module.exports=mongoose.model("SubDocument",subDocumentSchema);