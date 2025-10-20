import 'server-only';
import { EUR_TO_BGN } from '@/constants/common';

const books_prices={
    "sasetzatel-bg-chast-1": 12,
    "sasetzatel-bg-chast-2": 12,
}

const merch_prices={

}

const platform_3_4_price = 17.8952158;
const platform_5_8_price = 20.4516752;

export function getPrice(payment_type , key , quantity) {
  switch(payment_type){
    case "platform-3-4":
      return (platform_3_4_price * quantity * EUR_TO_BGN).toFixed(2);
    case "platform-5-8":
      return (platform_5_8_price * quantity * EUR_TO_BGN).toFixed(2);
    case "book":
      return (books_prices[key] * quantity * EUR_TO_BGN).toFixed(2) || null;
    case "merch":
      return (merch_prices[key] * quantity * EUR_TO_BGN).toFixed(2) || null;
    default:
      return null;
  }
}