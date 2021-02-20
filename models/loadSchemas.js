import mongoose from 'mongoose'

import planSchema from './Plan'
import subscriptionSchema from './Subscription'
import subscriptionPlanSchema from './SubscriptionPlan'

const loadSchemas = () => {
  let Subscription = mongoose.models.Subscription|| mongoose.model('Subscription', subscriptionSchema)
  let Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema)
  let SubscriptionPlan = mongoose.models.SubscriptionPlan || mongoose.model('SubscriptionPlan', subscriptionPlanSchema)
}

export default loadSchemas
