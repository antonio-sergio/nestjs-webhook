import { DataSource } from 'typeorm';
import { Webhook } from './src/webhook/webhook.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Webhook],
  synchronize: true,
});
