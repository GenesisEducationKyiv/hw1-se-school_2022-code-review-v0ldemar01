import { AmqpQueue, EventName, ExceptionMessage } from '../../common/enums/enums.js';
import { ICreateUserDto, IUserDto } from '../../common/model-types/model-types.js';
import { Customer as CustomerRepository } from '../../data/repositories/repositories.js';
import { CustomerError } from '../../exceptions/exceptions.js';
import { Amqp as AmqpService } from '../amqp/amqp.service.js';

interface ICustomerServiceConstructor {
  amqpClient: AmqpService;
  customerRepository: CustomerRepository;
}

class Customer {
  #amqpClient: AmqpService;
  #customerRepository: CustomerRepository;

  constructor({ amqpClient, customerRepository }: ICustomerServiceConstructor) {
    this.#amqpClient = amqpClient;
    this.#customerRepository = customerRepository;
  }

  async createCustomer({ email }: ICreateUserDto): Promise<void> {
    try {
      const existingUser = await this.#customerRepository.getOne({ email });

      if (existingUser) {
        throw new CustomerError({
          message: ExceptionMessage.USER_ALREADY_EXISTS,
        });
      }

      const customer = await this.#customerRepository.create({ email });
      await this.#amqpClient.sendToQueue({
        queue: AmqpQueue.CUSTOMERS_REPLY,
        content: {
          name: EventName.CREATE_CUSTOMER_FULFILLED,
          data: customer,
        },
      });
    } catch (err) {
      if (err instanceof CustomerError) {
        await this.#amqpClient.sendToQueue({
          queue: AmqpQueue.CUSTOMERS_REPLY,
          content: {
            name: EventName.CREATE_CUSTOMER_REJECTED,
            err: {
              name: err.name,
              message: err.message,
            },
          },
        });
      }
    }
  }

  async removeCustomer({ email }: IUserDto): Promise<void> {
    try {
      const existingUser = await this.#customerRepository.getOne({ email });

      if (!existingUser) {
        throw new CustomerError({
          message: ExceptionMessage.USER_NOT_EXISTS,
        });
      }

      const isDeleted = await this.#customerRepository.deleteOne({ email });
      await this.#amqpClient.sendToQueue({
        queue: AmqpQueue.CUSTOMERS_REPLY,
        content: {
          name: EventName.CREATE_CUSTOMER_COMPENSATION_FULFILLED,
          data: { isDeleted },
        },
      });
    } catch (err) {
      if (err instanceof CustomerError) {
        await this.#amqpClient.sendToQueue({
          queue: AmqpQueue.CUSTOMERS_REPLY,
          content: {
            name: EventName.CREATE_CUSTOMER_COMPENSATION_REJECTED,
            err: {
              name: err.name,
              message: err.message,
            },
          },
        });
      }
    }
  }
}

export { Customer };