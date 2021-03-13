import connectDB from '../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const { name: display_name } = req.query
  const { 
    new_display_name,
    new_subscription_id,
    new_plan_id,
    new_billing_interval, 
    new_date_start, 
    new_date_end
  } = req.body

  const SubscriptionPlan = mongoose.model('SubscriptionPlan')

  if (req.method === 'GET') {
    // Finds a subscription_plan by display_name
    const subscription_plan = await SubscriptionPlan.findOne({ display_name })

    res.status(200).json({ subscription_plan })
    
  } else if (req.method === 'DELETE') {
    // Finds a subsciption and deletes it
    const subscription_plan = await SubscriptionPlan.deleteOne({ display_name })
  
    res.status(200).json({ subscription_plan })

  } else if (req.method === 'PATCH') {
    // Finds a subscription_plan by display_name
    const { 
      display_name: display_name1,
      subscription_id, 
      plan_id, 
      billing_interval,
      date_start,
      date_end
    } = await SubscriptionPlan.findOne({ display_name }).exec()
    
    let new_subscription_plan = {
      display_name: new_display_name || display_name1,
      subscription_id: new_subscription_id || subscription_id,
      plan_id: new_plan_id || plan_id,
      billing_interval: new_billing_interval || billing_interval,
      date_start: new_date_start || date_start,
      date_end: new_date_end || date_end,
    }

    // Finds a subsciption and updates it
    const subscription_plan = await SubscriptionPlan.updateOne({ display_name }, new_subscription_plan).exec()

    res.status(200).json({ subscription_plan })
  
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)

