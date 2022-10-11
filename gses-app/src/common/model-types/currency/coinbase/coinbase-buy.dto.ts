import { Currency } from '../../../enums/enums.js';

interface ICoinbaseBuyDto {
  base: Currency;
  currency: Currency;
  amount: number;
}

export { type ICoinbaseBuyDto };