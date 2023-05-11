import Joi from "joi";

import { generateJoiError } from "../helpers";

const MISReportData = Joi.object({
    "report_type": Joi.string().required(),
    "page": Joi.number().integer().required(),
    "limit": Joi.number().integer().required()
}).error(generateJoiError)

export const misValidation = (data: any) => MISReportData.validate(data, { "abortEarly": false })