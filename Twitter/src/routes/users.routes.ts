import express from 'express'
import { register } from 'module'
import { loginController,registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const router = express.Router()
router.post('/login', loginValidator, loginController)
/**
 * Description. Register a new user
 * Path: /register
 * Method: Post
 * Body{ name: string, email: string, pasword: string,confirm _password: string,
 * date of birth: ISO8601}
 */
router.post('/register', registerController)
export default router
