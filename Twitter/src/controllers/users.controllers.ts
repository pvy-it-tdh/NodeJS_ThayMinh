import { Request, Response } from 'express'
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
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    return res.json({
      message: 'Register success', 
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
