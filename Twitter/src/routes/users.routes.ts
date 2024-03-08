import express from 'express'
import { register } from 'module'
import { loginController,registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const router = express.Router()
router.post('/login', loginValidator, loginController)
router.post('/register',registerController)
export default router
