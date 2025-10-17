import { NextResponse } from "next/server";
import { registerEasyPayBill } from "@/lib/easypay-register";
import { getPrice } from "@/lib/get-price";
import { sendEmail } from "@/lib/emailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();
  const { payment_type, key, email , product_name , phone , description } = body;

  const amount = getPrice(payment_type, key);

  if (amount == null) {
    return NextResponse.json(
      { error: "Невалиден продукт" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Липсва имейл получател" },
      { status: 400 }
    );
  }

  try {
    const result = await registerEasyPayBill({ amount });

    if (!result || !result.idn || !result.expTime || !result.invoice) {
      return NextResponse.json(
        { error: "Възникна грешка при създаването на сметката" },
        { status: 500 }
      );
    }

    const text = 
    `
      Вашата поръчка от Състезател.БГ: ${product_name} \n \n 
       
      Код за EasyPay: ${result.idn} \n \n
      
      Валиден до: ${result.expTime} \n \n

      Дължима сума: ${result.amount*1.9557.toFixed(2)}

      Моля, не го споделяйте с никого!
    `

    await sendEmail({
      to: email,
      subject: "Вашата поръчка от Състезател.БГ",
      text,
    });


    const text_admin = 
    `
      Поръчка с фактура Номер: ${result.invoice}
      Продукт: ${product_name}
      Цена: ${result.amount*1.9557.toFixed(2)}лв
      Email: ${email}
      Телефон: ${phone}
      Описание: ${description}
      Начин на плащане: EasyPay
      Е заявена за плащане от клиент.
    `

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Заявена поръчка от Състезател.БГ",
      text: text_admin,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Възникна грешка при изпращането на имейла" },
      { status: 500 }
    );
  }
}
