import { storesRouter } from '@modules/store/infra/http/routes/stores.routes'
import { authRouter } from '@modules/user/infra/http/routes/auth.routes'
import { usersRouter } from '@modules/user/infra/http/routes/users.routes'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)

router.use('/stores', ensureAuthenticated, storesRouter)

export default router