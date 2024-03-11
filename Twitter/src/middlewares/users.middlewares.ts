import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password '
    })
  }
  next()
}
export const registerValidator = checkSchema({
  name: {
    isString: true,
    notEmpty: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      }
    },
    trim: true
  },
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 50
      }
    }
  }
})