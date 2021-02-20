import mongoose from 'mongoose'
let { Schema } = mongoose
let { String } = Schema.Types

let planSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  annual_price: {
    type: Number,
  },
  monthly_price: {
    type: Number,
  },
  subscription_id: {
    type: String,
    required: true,
  },
})


export default planSchema
