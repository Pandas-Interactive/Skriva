import connectDB from '../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const { name } = req.query
  const { new_name, new_annual_price, new_monthly_price, new_subscription_id } = req.body

  const Plan = mongoose.model('Plan')

  if (req.method === 'GET') {
    // Finds a plan by name
    const plan = await Plan.findOne({ name }).exec()

    res.status(200).json({ plan })
    
  } else if (req.method === 'DELETE') {
    // Finds a subsciption and deletes it
    const plan = await Plan.deleteOne({ name }).exec()
  
    res.status(200).json({ plan })

  } else if (req.method === 'PATCH') {
    // Finds a plan by name
    const { name: name1, annual_price, monthly_price, subscription_id } = await Plan.findOne({ name }).exec()
    
    let new_plan = {
      name: new_name || name1,
      annual_price: new_annual_price|| annual_price,
      monthly_price: new_monthly_price|| monthly_price,
      subscription_id: new_subscription_id || subscription_id
    }

    // Finds a subsciption and updates it
    const plan = await Plan.updateOne({ name }, new_plan).exec()

    res.status(200).json({ plan })
  
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)

