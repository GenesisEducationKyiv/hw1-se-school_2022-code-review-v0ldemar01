import { it, describe, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import {
  HttpCode,
  CurrencyApiPath,
  ExceptionMessage,
  SubscriptionApiPath,
  UserValidationMessage,
} from '../../src/common/enums/enums.js';
import { ENV } from '../../src/configs/configs.js';
import { buildApp } from '../helpers/helpers.js';

describe('testing api endpoints', async () => {
  const app = await buildApp();

  describe(`${ENV.API.V1_PREFIX}${CurrencyApiPath.GetRate} endpoint`, () => {
    it('should return 200 and number response', async () => {
      const response = await app.inject(
        `${ENV.API.V1_PREFIX}${CurrencyApiPath.GetRate}`,
      );

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(typeof response.json()).toBe('number');
    });
  });

  describe(`${ENV.API.V1_PREFIX}${SubscriptionApiPath.Subscribe} endpoint`, () => {
    it('should return 400 and correct message if body is empty', async () => {
      const response = await app.inject().post(
        `${ENV.API.V1_PREFIX}${SubscriptionApiPath.Subscribe}`,
      )
      .body({});

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_REQUIRED);
    });

    it('should return 400 and correct message if email is invalid', async () => {
      const response = await app
        .inject()
        .post(
          `${ENV.API.V1_PREFIX}${SubscriptionApiPath.Subscribe}`,
        )
        .body({ email: 'qwerrty' });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.json().message).toBe(UserValidationMessage.EMAIL_INVALID);
    });

    it('should return 409 and correct message if email exists', async () => {
      const fakeEmail = faker.internet.email();
      await app
        .inject()
        .post(
          `${ENV.API.V1_PREFIX}${SubscriptionApiPath.Subscribe}`,
        )
        .body({ email: fakeEmail });
      const response = await app
        .inject()
        .post(
          `${ENV.API.V1_PREFIX}${SubscriptionApiPath.Subscribe}`,
        )
        .body({ email: fakeEmail });

      expect(response.statusCode).toBe(HttpCode.CONFLICT);
      expect(response.json().message).toBe(ExceptionMessage.USER_ALREADY_EXISTS);
    });
  });

  describe(`${ENV.API.V1_PREFIX}${SubscriptionApiPath.SendEmails} endpoint`, () => {
    it('should return 200', async () => {
      const response = await app.inject().post(
        `${ENV.API.V1_PREFIX}${SubscriptionApiPath.SendEmails}`,
      );

      expect(response.statusCode).toBe(HttpCode.OK);
    });
  });
});