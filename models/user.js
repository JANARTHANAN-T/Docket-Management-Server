const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
    unique:true,
  },
  firstName: String,
  lastName: String,
  type: String,
  email: String,
  password: String,
  joinedOn: {
    type: Date,
    default: Date.now,
  },
  mobile: {
    type: String,
  },
  document:[{
    type:Schema.Types.ObjectId,
    ref:'Document'
}],
received:[{
  type:Schema.Types.ObjectId,
  ref:'Document'
}]
  
});

module.exports = mongoose.model("User", userSchema);
