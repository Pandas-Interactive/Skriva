import connectDB from '../../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const { name } = req.query
  const { new_name, new_domain, new_logo } = req.body

  const Subscription = mongoose.model('Subscription')

  if (req.method === 'GET') {
    // Finds a subscription by name
    const subscription = await Subscription.findOne({ name }).exec() 

    res.status(200).json({ subscription })
    
  } else if (req.method === 'DELETE') {
    // Finds a subsciption and deletes it
    const subscription = await Subscription.deleteOne({ name }).exec()
  
    res.status(200).json({ subscription })

  } else if (req.method === 'PATCH') {
    // Finds a subscription by name
    const { name: name1, domain, logo } = await Subscription.findOne({ name }).exec()
    
    let new_subscription = {
      name: new_name || name1,
      domain: new_domain || domain,
      logo: new_logo || logo,
    }

    // Finds a subsciption and updates it
    const subscription = await Subscription.updateOne({ name }, new_subscription).exec()

    res.status(200).json({ subscription })
  
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)

