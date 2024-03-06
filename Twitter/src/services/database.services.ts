import { connect } from 'http2'
import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter-dev.ixtapag.mongodb.net/?retryWrites=true&w=majority&appName=Twitter-dev`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri)
class DatabaseService {
  private client: MongoClient
  private db:Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db=this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
  get user(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string)
  }
}
// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
