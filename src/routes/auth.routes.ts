import * as express from 'express'

import { generateToken } from '../controllers/auth.controllers';

const routes = express.Router();

routes.get('/generate-token', generateToken)

export default routes