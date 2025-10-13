import 'server-only';

const books_prices={
    "book1": 22.39,
    "book2": 17.69,
}

const platform_3_4_price = 22.40;
const platform_5_7_price = 31.20;

export function getPrice({ payment_type , key }) {
  switch(payment_type){
    case "platform-3-4":
      return platform_3_4_price;
    case "platform-5-7":
      return platform_5_7_price;
    case "book":
      return books_prices[key] || null;
    default:
      return null;
  }
}