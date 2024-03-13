import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/utils/crypto'

class UsersService {
  async register(payload: RegisterReqBody) {
    const result = await databaseService.user.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    return result
  }
  async checkEmailExist(email: string) {
    const user = await databaseService.user.findOne({ email })
    console.log(user)
    return Boolean(user)
  }
}

const usersService = new UsersService()
export default usersService
