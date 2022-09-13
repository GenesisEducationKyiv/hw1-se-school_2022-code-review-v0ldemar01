import { ExceptionMessage } from '../../common/enums/enums.js';
import { SubscriptionError } from '../../exceptions/exceptions.js';
import {
  ISubscribeUserRequestDto,
} from '../../common/model-types/model-types.js';
import { User as UserRepository } from '../../data/repositories/repositories.js';
import {
  Email as EmailService,
  Currency as CurrencyService,
} from '../../services/services.js';

interface ISubscriptionServiceConstructor {
  currencyService: CurrencyService;
  userRepository: UserRepository;
  emailService: EmailService;
}

class Subscription {
  #currencyService: CurrencyService;
  #userRepository: UserRepository;
  #emailService: EmailService;

  constructor({ userRepository, currencyService, emailService }: ISubscriptionServiceConstructor) {
    this.#currencyService = currencyService;
    this.#userRepository = userRepository;
    this.#emailService = emailService;
  }

  async subscribeUser({ email }: ISubscribeUserRequestDto): Promise<void> {
    const existingUser = await this.#userRepository.getOne({ email });

    if (existingUser) {
      throw new SubscriptionError({
        message: ExceptionMessage.USER_ALREADY_EXISTS,
      });
    }

    await this.#userRepository.subscribe({ email });
  }

  async sendEmails(): Promise<void> {
    const users = await this.#userRepository.getAll();
    const receiverString = users.map(({ email }) => email).join(', ');
    const getCurrentRate = await this.#currencyService.getBTCInUAH();

    await this.#emailService.sendCurrentBTCToUAHCurrencyEmail({
      to: receiverString,
      rate: getCurrentRate,
    });
  }
}

export { Subscription };
