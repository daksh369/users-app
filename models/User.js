const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requird: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
