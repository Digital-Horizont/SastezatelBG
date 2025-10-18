import 'server-only';

const books_prices={
    "book1": 19.99,
}

const merch_prices={

}

const platform_3_4_price = 20.99;
const platform_5_7_price = 21.99;

export function getPrice(payment_type , key , quantity) {
  switch(payment_type){
    case "platform-3-4":
      return platform_3_4_price * quantity;
    case "platform-5-7":
      return platform_5_7_price * quantity;
    case "book":
      return books_prices[key] * quantity || null;
    case "merch":
      return merch_prices[key] * quantity || null;
    default:
      return null;
  }
}