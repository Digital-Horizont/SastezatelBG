import { NextResponse } from "next/server";
import { getPrice } from "@/lib/get-price";
import { sendEmail } from "@/lib/emailer";
import { getBankCustomerEmailText , getBankAdminEmailText } from "@/lib/get-email-text";

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
    const customer_text = getBankCustomerEmailText(payment_type , product_name , amount , email , phone , description , quantity)

    await sendEmail({
      to: email,
      subject: `Вашата поръчка от Състезател.БГ: ${product_name}` ,
      text: customer_text,
    });


    const admin_text = getBankAdminEmailText(payment_type , product_name , amount , email , phone , description , quantity);

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Заявена поръчка от Състезател.БГ",
      text: admin_text,
    });

    return NextResponse.json(amount, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
