import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/user.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'phucvy107@gamil.com' && password === 'nguyentranthanhhang') {
    return res.json({
      message: 'Login success'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  // throw new Error('Lỗi rồi')
  const result = await usersService.register(req.body)
  return res.json({
    message: 'Register success',
    result
  })
}
