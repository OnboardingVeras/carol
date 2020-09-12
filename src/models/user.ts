import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    lowercase: true
  }
})
