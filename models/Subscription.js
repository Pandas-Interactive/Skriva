import mongoose from 'mongoose'
let { Schema } = mongoose

let subscriptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
})

let Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription