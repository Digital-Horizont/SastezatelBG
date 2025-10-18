import { NextResponse } from "next/server";
import { registerEasyPayBill } from "@/lib/easypay-register";
import { getPrice } from "@/lib/get-price";
import { sendEmail } from "@/lib/emailer";
import { getEasyPayCustomerEmailText , getEasyPayAdminEmailText } from "@/lib/get-email-text";

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

  const amount = getPrice(payment_type, key , quantity);

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
    const result = await registerEasyPayBill({ amount });

    if (!result || !result.idn || !result.expTime || !result.invoice) {
      return NextResponse.json(
        { error: "Възникна грешка при създаването на сметката" },
        { status: 500 }
      );
    }

    const customer_text = getEasyPayCustomerEmailText(product_name , payment_type , result , email , phone , description , quantity); 
    await sendEmail({
      to: email,
      subject: `Вашата поръчка от Състезател.БГ: ${product_name}` ,
      text: customer_text,
    });


    const admin_text = getEasyPayAdminEmailText(product_name , payment_type , result , email , phone , description , quantity); 

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Заявена поръчка от Състезател.БГ",
      text: admin_text,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
     console.error("Email sending error:", err);
    return NextResponse.json(
      { error: "Възникна грешка при изпращането на имейла" },
      { status: 500 }
    );
  }
}
