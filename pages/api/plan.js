import connectDB from '../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const Plan = mongoose.model('Plan')

  if (req.method === 'POST') {
    const { name, annual_price, monthly_price, subscription_id } = req.body;

    let new_plan = new Plan({
      name: name.toLowerCase(),
      annual_price,
      monthly_price,
      subscription_id,
    })

    const plan = await new_plan.save()

    res.status(200).json({ plan })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
