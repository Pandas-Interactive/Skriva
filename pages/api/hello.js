import connectDB from '../../middleware/mongodb'
import Subscription from '../../models/Subscription'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Handle POST request 
  } else if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ success: true })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)