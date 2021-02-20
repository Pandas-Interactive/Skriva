import connectDB from '../../middleware/mongodb'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  const Subscription = mongoose.model('Subscription')

  if (req.method === 'POST') {
    const { name, domain, logo } = req.body;

    let new_subscription = new Subscription({
      name: name.toLowerCase(),
      domain,
      logo,
    })

    const subscription = await new_subscription.save()

    res.status(200).json({ subscription })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
