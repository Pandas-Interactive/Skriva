import mongoose from 'mongoose'
let { Schema } = mongoose

let subscriptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  logo: {
    type: String,
  },
})


export default subscriptionSchema
