import express, { Request, Response } from 'express';
import * as redis from 'redis';
import {
    User,
    Role,
    Permission,
    Organization,
    UINavigation,
} from '../config/database';

const app = express();
const port = process.env.PORT ?? 3000;

// Redis client for caching
let redisClient: any

(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error: any) => console.error(`Error : ${error}`));
    
    await redisClient.connect();
})()

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

        const organizations = await Organization.findAll({
            attributes: ['uuid', 'name'],
            include: [
                {
                    model: User,
                    attributes: ['uuid', 'username', 'email'],
                    include: [
                        {
                            model: Role,
                            attributes: ['uuid', 'name'],
                            through: {
                                attributes: [],
                            },
                            include: [
                                {
                                    model: Permission,
                                    attributes: ['uuid', 'name'],
                                    through: {
                                        attributes: [],
                                    },
                                    include: [
                                        {
                                            model: UINavigation,
                                            attributes: ['uuid', 'name', 'url'],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Paginate the data if page and limit parameters are present
        let paginatedData = organizations;
        if (page && limit) {
            const startIndex = (parseInt(page as string) - 1) * parseInt(limit as string);
            const endIndex = parseInt(page as string) * parseInt(limit as string);

            paginatedData = organizations.slice(startIndex, endIndex);
        }

        // Add data to Redis cache for future requests
        await redisClient.set(cacheKey, JSON.stringify(paginatedData.slice(0, 1000)));

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
