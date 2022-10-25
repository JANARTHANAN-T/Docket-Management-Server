const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
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
}]
  
});

module.exports = mongoose.model("User", userSchema);
