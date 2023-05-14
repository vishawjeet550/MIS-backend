import { Response, Request, NextFunction } from 'express';

import redisInstance from '../helpers/redis';
import { Report, Organization } from '../../config/database'
import { sendErrorResponse, sendResponseHandler } from '../middlewares/auth.middlewares';
import { misValidation } from '../validations/mis_report.validation';
import { errorCodes } from '../helpers';
import { Sequelize } from 'sequelize';

export const generateMisReport = async (req: Request, res: Response, next: NextFunction) => {
    const { report_type, page, limit }: any = req.query;

    const joiResponse = misValidation({ report_type, page, limit });
    if (joiResponse.error) return sendErrorResponse(res, joiResponse.error.message, errorCodes.BAD_REQUEST);

    const cacheKey = `mis-report:${report_type}:${page}:${limit}`;
    const cachedData = await redisInstance.get(cacheKey);

    if (cachedData) {
        return sendResponseHandler(201, JSON.parse(cachedData));
    }
    const pageSize = parseInt(limit as string);
    const pageNumber = parseInt(page as string) || 1;
    const offset = (pageNumber - 1) * pageSize;
    
    const reports: any = await Report.findAll({
        where: { report_type: decodeURI(report_type) },
        include: [{ model: Organization, attributes: ['uuid', 'name'] }],
        attributes: ['report_data', 'report_date'],
        offset: offset,
        limit: pageSize,
        raw: true // Add this option to return plain JSON objects
    });
    await redisInstance.set(cacheKey, JSON.stringify(reports));
    sendResponseHandler(200, reports.map((i: any) => { return { ...i, report_data: { ...JSON.parse(i.report_data), report_date: i.report_date } }}))(req, res, next)
}

export const getReports = async (req: Request, res: Response, next: NextFunction) => {
    const reportTypes = await Report.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('report_type')), 'report_type']
        ]
      });
    sendResponseHandler(200, reportTypes.map((i: any) => i.report_type))(req, res, next)
}