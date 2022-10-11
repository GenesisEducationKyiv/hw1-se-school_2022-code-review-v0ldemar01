import { config } from 'dotenv';

config();

const {
  RABBITMQ_HOST,
  RABBITMQ_PORT,
} = process.env;

const ENV = {
  RABBITMQ: {
    URL: `amqp://${String(RABBITMQ_HOST)}:${Number(RABBITMQ_PORT)}`,
  },

} as const;

export { ENV };