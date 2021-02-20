import mongoose from 'mongoose'
let { Schema } = mongoose
let { ObjectId } = Schema.Types

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
    type: ObjectId,
    required: true,
  },
})


export default planSchema
