import { AmqpQueue } from '../../common/enums/enums.js';
import { ISubscribeUserRequestDto } from '../../common/model-types/model-types.js';
import {
  Amqp as AmqpService,
  Subscription as SubscriptionService,
} from '../../services/services.js';

interface IUserSagaConstructor {
  amqpClient: AmqpService;
  subscriptionService: SubscriptionService;
}

class User {
  #amqpClient: AmqpService;
  #subscriptionService: SubscriptionService;

  constructor({ amqpClient, subscriptionService }: IUserSagaConstructor) {
    this.#amqpClient = amqpClient;
    this.#subscriptionService = subscriptionService;
  }

  async subscribeUser({ email }: ISubscribeUserRequestDto): Promise<void> {
    await this.#subscriptionService.subscribeUser({ email });
    await this.#amqpClient.sendToQueue({
      queue: AmqpQueue.CUSTOMERS,
      content: { email },
    });
  }
}

export { User };