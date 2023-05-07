import express, { Request, Response } from 'express';
import * as redis from 'redis';
import jwt from 'jsonwebtoken';

import {
    Organization,
    Report,
} from '../config/database';
import { verifyToken } from './middlewares/auth.middlewares';

const app = express();
const port = process.env.PORT ?? 3000;

// Redis client for caching
let redisClient: any

(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error: any) => console.error(`Error : ${error}`));

    await redisClient.connect();
})()


app.get('/generate-token', (req, res) => {
    // Set up a payload with some user data
    const payload = {
        id: 123,
        username: 'john_doe',
        role: 'admin'
    };

    // Generate a JWT token with the payload and a secret key
    const secretKey = 'my_secret_key';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);

    // Return the token as a JSON response
    res.json({ token });
});

app.use(verifyToken)

// API endpoint for MIS report
app.get('/mis-report', async (req: Request, res: Response) => {
    const { report_type, page, limit } = req.query;

    try {
        // Check Redis cache for requested data
        const cacheKey = `mis-report:${report_type}:${page}:${limit}`;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            console.log('Data retrieved from Redis cache');
            return res.json(JSON.parse(cachedData));
        }

        // If data not found in cache, fetch from database
        console.log('Data fetched from database');

        // Fetch reports and organizations based on report_type
        const reports: any = await Report.findAll({
            where: { report_type: report_type },
            include: [{ model: Organization, attributes: ['uuid', 'name'] }],
            attributes: ['report_data', 'report_date'],
        });
        // Transform reports into an object with organization names as keys
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

        // Paginate the data if page and limit parameters are present
        let paginatedData = Object.entries(data);
        if (page && limit) {
            const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
            const endIndex = parseInt(page as string) * parseInt(limit as string);

            paginatedData = paginatedData.slice(startIndex, endIndex);
        }

        // Add data to Redis cache for future requests
        await redisClient.set(cacheKey, JSON.stringify(paginatedData));

        res.json(paginatedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
