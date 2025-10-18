import 'server-only';
import { ACCOUNT_NAME , BIC , IBAN } from "@/constants/bank_details";
import { EUR_TO_BGN } from '@/constants/common';

// EASYPAY EMAIL TEXTS
export function getEasyPayCustomerEmailText(product_name , payment_type , result , email , phone , description , quantity){
  return `
    Вашата поръчка от Състезател.БГ:

    Име на продукт: ${product_name}
    ${payment_type !== 'merch' && payment_type !== 'book' ? 'Брой месеци' : 'Количество продукти'}: ${quantity}
    Код за EasyPay: ${result.idn}
    Валиден до: ${result.expTime}
    Дължима сума: ${(result.amount*EUR_TO_BGN).toFixed(2)}лв

    Можете да заплатите поръчката на всеки един пункт на EasyPay , използвайки еднократният код 10-цифрен изпратен по-горе. Моля, не го споделяйте с никого!

    След направено успешно плащане ще изпратим поръчката до посочен от вас офис на Еконт , Спиди или школа или ще се свържем с вас за доуточняване при некоректно въведено допълнително описание.
  `
}

export function getEasyPayAdminEmailText(product_name , payment_type , result , email , phone , description , quantity){
  return `
    Нова поръчка:
    Фактура_No: ${result.invoice}
    Продукт: ${product_name}
    ${payment_type !== 'merch' && payment_type !== 'book' ? 'Брой месеци' : 'Количество продукти'}: ${quantity}
    Обща Цена: ${(result.amount*EUR_TO_BGN).toFixed(2)}лв
    Email: ${email}
    Телефон: ${phone || "НЕВЪВЕДЕН"}
    Описание: ${description || "НЯМА"}
    Начин на плащане: EasyPay
    Е заявена за плащане от клиент.
  `
}



// BANK EMAIL TEXTS
export function getBankCustomerEmailText(product_name , amount , email , phone , description , quantity){
  return `
    Вашата поръчка от Състезател.БГ:
    Име на продукт: ${product_name}
    ${payment_type !== 'merch' && payment_type !== 'book' ? 'Брой месеци' : 'Количество продукти'}: ${quantity}

    Благодарим ви , ча заявихте поръчка в Състезател.БГ. Поръчката ви ще бъде обработена веднага щом заплатите необходимата сума на следната банкова сметка:

    IBAN: ${IBAN}
    BIC: ${BIC}
    Титуляр: ${ACCOUNT_NAME}
    Цена: ${(amount*EUR_TO_BGN).toFixed(2)}лв

    Молим ви в основание на превода да напишете ваш имейл или телефон , с който сте направили поръчката в нашият сайт!
   
    След получено плащане ще изпратим поръчката до посочен от вас офис на Еконт , Спиди или школа или ще се свържем с вас за доуточняване при некоректно въведено допълнително описание.
  `
}

export function getBankAdminEmailText(product_name , amount , email , phone , description , quantity){
  return   `
    Нова поръчка:
  
    Продукт: ${product_name}
    ${payment_type !== 'merch' && payment_type !== 'book' ? 'Брой месеци' : 'Количество продукти'}: ${quantity}
    Обща Цена: ${(amount*EUR_TO_BGN).toFixed(2)}лв
    Email: ${email}
    Телефон: ${phone}
    Описание: ${description}
    Начин на плащане: Банков превод

    Е заявена за плащане от клиент.
  `
}