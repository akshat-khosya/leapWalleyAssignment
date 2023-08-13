import * as redis from 'redis';
import log from '../logger';
import config from '../config/default';

class RedisService {
    private client: redis.RedisClientType

    constructor() {
        const url = config.get("redisUrl");
        log.info(url);
        this.client = redis.createClient({ url: url });
        this.client.connect().then(() => {
            log.info("Connected to Redis Client")
        }).catch((err) => {
            console.log(err);
            log.error("Error in connecting client " + err);
        });
    }

    async setKeyValue(key: string, value: string, time: number) {
        try {
            if (await this.client.get(key)) {
                log.info("Key already exits");
                return;
            }
            await this.client.setEx(key, time, value);
        } catch (error) {
            return;
        }

    }

    async getValue(key: string) {
        try {
            const data = await this.client.get(key);
            if (!data) {
                return false;
            }
            return data;
        } catch (error) {
            return false;
        }

    }




}
const redisInstance = new RedisService();

export default redisInstance;
