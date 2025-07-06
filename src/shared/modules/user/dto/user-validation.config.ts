import { enumToString } from '../../../helpers/index.js';
import { UserType } from '../../../types/index.js';

const USER_NAME_MIN_LENGTH = 1;
const USER_NAME_MAX_LENGTH = 15;
const USER_PASSWORD_MIN_LENGTH = 6;
const USER_PASSWORD_MAX_LENGTH = 12;

export const UserValidationConfig = {
  name: {
    length: {
      minValue: USER_NAME_MIN_LENGTH,
      maxValue: USER_NAME_MAX_LENGTH,
      message: `Minimum name length is ${USER_NAME_MIN_LENGTH}, maximum is ${USER_NAME_MAX_LENGTH}`,
    },
  },
  email: {
    invalidFormat: {
      message: 'Email must be a valid address',
    },
  },
  password: {
    length: {
      minValue: USER_PASSWORD_MIN_LENGTH,
      maxValue: USER_PASSWORD_MAX_LENGTH,
      message: `Minimum password length is ${USER_PASSWORD_MIN_LENGTH}, maximum is ${USER_PASSWORD_MAX_LENGTH}`,
    },
  },
  type: {
    invalid: {
      message: `Must be one of ${ enumToString(UserType) }`,
    },
  },
};
