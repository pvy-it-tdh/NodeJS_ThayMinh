import express from 'express'
import { register, wrap } from 'module'
import { loginController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, refreshTokenValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handles'
import { validate } from '~/utils/validation'
const router = express.Router()
/**
 * Description. Register a new user
 * Path: login
 * Method: Post
 * Body{ email: string, pasword: string}
 */
router.post('/login', loginValidator, loginController, wrapRequestHandler(loginController))
/**
 * Description. Register a new user
 * Path: /register
 * Method: Post
 * Body{ name: string, email: string, pasword: string,confirm _password: string,
 * date of birth: ISO8601}
 */
router.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * Description. logout a new user
 * Path: logout
 * Method: Post
 * Body{ email: string, pasword: string}
 */
router.post(
  '/logout',
  accessTokenValidator,
  refreshTokenValidator,
  wrapRequestHandler((req, res) => {
    res.json({ message: 'logout successfully' })
  })
)
// giay thu 17:40
export default router
