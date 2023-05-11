import * as redis from 'redis';

import config from '../../config/env'
const { redis_host, redis_port }: any = config

class Redis {
    private redisClient;

    constructor() {
        const obj = 
        this.redisClient = redis.createClient({
            socket: {
                host: redis_host,
                port: redis_port
            }
        });

        this.redisClient.on('error', (error: Error) => {
            console.error(`Error : ${error}`);
        });

        this.redisClient.on('ready', () => {
            console.log('Redis client connected');
        });

        this.redisClient.connect();
    }

    public async getClient() {
        return this.redisClient;
    }

    public async get(key: any): Promise<string | null> {
        return await this.redisClient.get(key);
    }

    public async set(key: any, value: any): Promise<void> {
        await this.redisClient.set(key, value)
    }
}

const redisInstance = new Redis();
export default redisInstance;
