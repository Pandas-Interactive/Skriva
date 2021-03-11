import connectDB from '../../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const { id } = req.query

  const Subscription = mongoose.model('Subscription')
  // Finds a subscription by name
const subscription = await Subscription.findById(id)

  res.status(200).json({ subscription })
}

export default connectDB(handler)


