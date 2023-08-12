import * as redis from 'redis';
import log from '../logger';

class RedisService {
    private client: redis.RedisClientType

    constructor() {
        this.client = redis.createClient();
        this.client.connect().then(() => {
            log.info("Connected to Redis Client")
        }).catch((err) => {
            log.error("Error in connecting client " + err);
        });
    }

    async setKeyValue(key: string, value: string, time: number) {
        if (await this.client.get(key)) {
            log.info("Key already exits");
            return;
        }
        await this.client.setEx(key, time, value);
    }

    async getValue(key: string) {
        const data = await this.client.get(key);
        if (!data) {
            return false;
        }
        return data;
    }




}
const redisInstance = new RedisService();

export default redisInstance;
