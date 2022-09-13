import Joi from 'joi';

import { UserValidationMessage } from '../../../common/enums/enums.js';
import { ISubscribeUserDto } from '../../../common/model-types/model-types.js';

const subscribeUser = Joi.object<ISubscribeUserDto>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': UserValidationMessage.EMAIL_REQUIRED,
      'string.email': UserValidationMessage.EMAIL_INVALID,
    }),
});

export { subscribeUser };
