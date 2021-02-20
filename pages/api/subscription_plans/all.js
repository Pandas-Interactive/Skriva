import connectDB from '../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const SubscriptionPlan = mongoose.model('SubscriptionPlan')

  if (req.method === 'POST') {
    // Handle POST request 
  } else if (req.method === 'GET') {
    // Handle GET request
    const subscription_plans = await SubscriptionPlan.find({})

    res.status(200).json({ subscription_plans  })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
