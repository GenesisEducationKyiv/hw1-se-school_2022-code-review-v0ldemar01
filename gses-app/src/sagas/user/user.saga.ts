/* eslint-disable no-console */
import { AmqpQueue, EventName } from '../../common/enums/enums.js';
import { ICreateCustomerRejectedResult, ISubscribeUserRequestDto } from '../../common/model-types/model-types.js';
import {
  Amqp as AmqpService,
  Subscription as SubscriptionService,
} from '../../services/services.js';
import { AbstractSaga } from '../abstract/abstract.saga.js';

interface IUserSagaConstructor {
  amqpClient: AmqpService;
  subscriptionService: SubscriptionService;
}

class User extends AbstractSaga {
  #amqpClient: AmqpService;
  #subscriptionService: SubscriptionService;

  constructor({ amqpClient, subscriptionService }: IUserSagaConstructor) {
    super();
    this.#amqpClient = amqpClient;
    this.#subscriptionService = subscriptionService;
  }

  async subscribeUser({ email }: ISubscribeUserRequestDto): Promise<void> {
    const saga = this.getSagaDefinition({
      invokeCallback: async <ISubscribeUserRequestDto>(user: ISubscribeUserRequestDto) => {
        await this.#subscriptionService.subscribeUser({ email });
        await this.#amqpClient.sendToQueue({
          queue: AmqpQueue.CUSTOMERS,
          content: {
            name: EventName.CREATE_CUSTOMER_PENDING,
            data: user,
          },
        });

        const result = await new Promise((resolve) => this.#amqpClient.consume({
          queue: AmqpQueue.CUSTOMERS_REPLY,
          onMessage: (data: Buffer) => {
            resolve(JSON.parse(data.toString('utf-8')));
          },
        }));

        if (
          (result as ICreateCustomerRejectedResult).name === EventName.CREATE_CUSTOMER_REJECTED
        ) {
          return Promise.reject((result as ICreateCustomerRejectedResult).err);
        }
      },
      withCompensationCallback: async () => {
        await this.#amqpClient.sendToQueue({
          queue: AmqpQueue.CUSTOMERS,
          content: {
            name: EventName.CREATE_CUSTOMER_COMPENSATION_PENDING,
            data: { email },
          },
        });
        const result = await new Promise((resolve) => this.#amqpClient.consume({
          queue: AmqpQueue.CUSTOMERS_REPLY,
          onMessage: (data: Buffer) => {
            resolve(JSON.parse(data.toString('utf-8')));
          },
        }));

        if ((result as ICreateCustomerRejectedResult).name === EventName.CREATE_CUSTOMER_COMPENSATION_REJECTED) {
          return Promise.reject((result as ICreateCustomerRejectedResult).err);
        }
      },
    });
    await saga.execute({ email });
  }
}

export { User };