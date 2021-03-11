import connectDB from '../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const SubscriptionPlan = mongoose.model('SubscriptionPlan')

  if (req.method === 'POST') {
    const { 
      display_name,
      subscription_id, 
      plan_id, 
      billing_interval,
      date_start,
      date_end
    } = req.body;

    let new_subscription_plan = new SubscriptionPlan({
      display_name: display_name.toLowerCase(),
      subscription_id, 
      plan_id, 
      billing_interval,
      date_start,
      date_end
    })

    const subscription_plan = await new_subscription_plan.save()

    res.status(200).json({ subscription_plan })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
