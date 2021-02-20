import connectDB from '../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const Subscription = mongoose.model('Subscription')
  const Plan = mongoose.model('Plan')
  const SP = mongoose.model('SubscriptionPlan')

  if (req.method === 'POST') {
    // Handle POST request 
  } else if (req.method === 'GET') {
    // Handle GET request

    const subscriptions = await Subscription.find({})
    const plans = await Plan.find({})
    const sps = await SP.find({})

    res.status(200).json({ subscriptions, plans, sps  })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
