import * as express from 'express'

import { generateMisReport } from '../controllers/mis_report.controllers';

const routes = express.Router();

routes.get('/mis-report', generateMisReport)

export default routes