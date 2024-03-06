import express from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const router = express.Router()
router.post('/login', loginValidator, loginController)
export default router
