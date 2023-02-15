import { Schema, model } from "mongoose";

const UserModel = new Schema({
  username: {
    type: String,
    require: true
  },

  password: {
    type: String,
    require: true
  },

  role: {
    type: String,
    default: 'user'
  },

  salary: {
    type: Number,
    default: 0
  }
  
})

export default model('user', UserModel)