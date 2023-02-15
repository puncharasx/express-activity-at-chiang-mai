import { Router } from 'express'
import UserController from './user.controller.js'

import AuthenticationMiddleWare from '../../middlewares/authentication.middleware.js'
import AuthorizationMiddleWare from '../../middlewares/authorization.middleware.js'

const router = Router()

router.post('/auth/register', UserController.register)

router.post('/auth/login', UserController.login)

router.get('/auth/me',AuthenticationMiddleWare, AuthorizationMiddleWare(['admin', 'manager']), UserController.getProfile)

export default router