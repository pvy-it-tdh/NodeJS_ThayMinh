import {} from 'express'
import { TokenPayLoad } from './models/requests/User.requests'
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayLoad
    decoded_refresh_token?: TokenPayLoad
  }
}
