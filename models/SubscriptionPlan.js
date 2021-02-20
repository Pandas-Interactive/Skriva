import mongoose from 'mongoose'
let { Schema } = mongoose
let { ObjectId } = Schema.Types

const subscriptionPlanSchema = new Schema({
  display_name: {
    type: String,
    required: true,
    unique: true,
  },
  subscription_id: {
    type: ObjectId,
    required: true,
  },
  plan_id: {
    type: ObjectId,
    required: true,
  },
  billing_interval: {
    type: Number,
    required: true,
  },
  date_start: {
    type: Date,
  },
  date_end: {
    type: Date,
  },
})


export default subscriptionPlanSchema
