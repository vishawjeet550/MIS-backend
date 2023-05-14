import * as express from 'express'

import { generateMisReport, getReports } from '../controllers/mis_report.controllers';

const routes = express.Router();

routes.get('/mis-report', generateMisReport)
routes.get('/reports', getReports)

export default routes