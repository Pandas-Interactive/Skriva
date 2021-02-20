import connectDB from '../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const Plan = mongoose.model('Plan')

  if (req.method === 'POST') {
    // Handle POST request 
  } else if (req.method === 'GET') {
    // Handle GET request
    const plans = await Plan.find({})

    res.status(200).json({ plans  })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
