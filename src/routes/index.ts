import * as express from 'express';

import authRoutes from './auth.routes'
import misRoutes from './mis_report.routes'
import { verifyToken } from '../middlewares/auth.middlewares';

const routes = express.Router();

routes.use('/token', authRoutes)
routes.use('/mis', verifyToken, misRoutes)

export default routes