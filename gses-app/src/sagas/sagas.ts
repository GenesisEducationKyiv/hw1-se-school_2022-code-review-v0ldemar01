import { Amqp, Subscription } from '../services/services.js';
import { User as UserSaga } from './user/user.saga.js';

interface IInitSagasReturn {
  userSaga: UserSaga;
}

const initSagas = (services: { amqp: Amqp; subscription: Subscription }): IInitSagasReturn => {
  const { amqp: amqpClient, subscription: subscriptionService } = services;

  const userSaga = new UserSaga({ amqpClient, subscriptionService });
  return { userSaga };
};

export { initSagas, type UserSaga };
