import connectDB from '../../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const { id } = req.query

  const Plan = mongoose.model('Plan')
  // Finds a plan by name
  const plan = await Plan.findById(id)

  res.status(200).json({ plan })
}

export default connectDB(handler)



