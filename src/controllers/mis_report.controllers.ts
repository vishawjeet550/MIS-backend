import { Response, Request, NextFunction } from 'express';

import redisInstance from '../helpers/redis';
import { Report, Organization } from '../../config/database'
import { sendErrorResponse, sendResponseHandler } from '../middlewares/auth.middlewares';
import { misValidation } from '../validations/mis_report.validation';
import { errorCodes } from '../helpers';

export const generateMisReport = async (req: Request, res: Response, next: NextFunction) => {
    const { report_type, page, limit }: any = req.query;

    const joiResponse = misValidation({ report_type, page, limit });
    if (joiResponse.error) return sendErrorResponse(res, joiResponse.error.message, errorCodes.BAD_REQUEST);

    const cacheKey = `mis-report:${report_type}:${page}:${limit}`;
    const cachedData = await redisInstance.get(cacheKey);

    if (cachedData) {
        return sendResponseHandler(201, JSON.parse(cachedData));
    }
    const reports: any = await Report.findAll({
        where: { report_type: report_type },
        include: [{ model: Organization, attributes: ['uuid', 'name'] }],
        attributes: ['report_data', 'report_date'],
    });
    const data: Record<string, any[]> = {};
    for (const report of reports) {
        const { name } = report.Organization;
        if (!data[name]) {
            data[name] = [];
        }
        data[name].push({
            report_data: report.report_data,
            report_date: report.report_date,
        });
    }

    let paginatedData = Object.entries(data);
    if (page && limit) {
        const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
        const endIndex = parseInt(page as string) * parseInt(limit as string);

        paginatedData = paginatedData.slice(startIndex, endIndex);
    }

    await redisInstance.set(cacheKey, JSON.stringify(paginatedData));

    sendResponseHandler(200, paginatedData)(req, res, next)
}