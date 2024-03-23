import express from 'express'
import { register, wrap } from 'module'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handles'
import { validate } from '~/utils/validation'
const router = express.Router()
router.post('/login', loginValidator, loginController)
/**
 * Description. Register a new user
 * Path: /register
 * Method: Post
 * Body{ name: string, email: string, pasword: string,confirm _password: string,
 * date of birth: ISO8601}
 */
router.post('/register', registerValidator, wrapRequestHandler(registerController))
export default router
