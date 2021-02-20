import mongoose from 'mongoose'
import loadSchemas from '../models/loadSchemas'

const connectDB = handler => async (req, res) => {

  if (mongoose.connections[0].readyState) {
    loadSchemas()
    
    // Use current db connection
    return handler(req, res)
  }
  // Use new db connection
  await mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })

  loadSchemas()
  
  return handler(req, res)
}

export default connectDB
