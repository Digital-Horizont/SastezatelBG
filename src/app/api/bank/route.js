import { NextResponse } from "next/server";
import { getPrice } from "@/lib/get-price";
import { sendEmail } from "@/lib/emailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();
  const { payment_type, key, email , product_name , phone , description , agreed , quantity } = body;

  if(quantity < 1 || quantity > 20 || !Number.isInteger(quantity)){
     return NextResponse.json(
      { error: "Избрана е невалидна бройка продукти!" },
      { status: 400 }
    );
  }

  const amount = getPrice(payment_type, key, quantity);

  if (amount == null) {
    return NextResponse.json(
      { error: "Невалиден продукт" },
      { status: 400 }
    );
  }

  const email_error = !email ? "Липсва имейл. " : "";
  const description_error = !description ? "Липсва описание. " : "";
  const agreed_error = !agreed ? "Трябва да се съгалсите с общите условия. " : ""
  const final_error = email_error + description_error + agreed_error;

  if (!email) {
    return NextResponse.json(
      { error: final_error },
      { status: 400 }
    );
  }

  try {
    const text = 
    `
      Благодарим ви , ча заявихте поръчка в Състезател.БГ. Поръчката ви ще бъде обработена веднага щом заплатите необходимата сума на следната банкова сметка:
      
      IBAN: BG00 XXXX 0000 0000 0000 00
      BIC: XXXXBGSF
      Титуляр: СъстезателБГ ЕООД
      Цена: ${(amount*1.95583).toFixed(2)}лв

      Молим ви в основание на превода да напишете ваш имейл или телефон , с който сте направили поръчката в нашият сайт!
    `

    await sendEmail({
      to: email,
      subject: `Вашата поръчка от Състезател.БГ: ${product_name}` ,
      text,
    });


    const text_admin = 
    `
      Продукт: ${product_name}
      Цена: ${(amount*1.95583).toFixed(2)}лв
      Email: ${email}
      Телефон: ${phone}
      Описание: ${description}
      Начин на плащане: Банков превод

      Е заявена за плащане от клиент
    `

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Заявена поръчка от Състезател.БГ",
      text: text_admin,
    });

    return NextResponse.json(amount, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
