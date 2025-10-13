import { NextResponse } from "next/server";
import { registerEasyPayBill } from "@/lib/easypay-register";
import { getPrice } from "@/lib/get-price";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();

  const { payment_type, key } = body;

  const amount = getPrice({ payment_type, key });

  if (amount == null) {
    return NextResponse.json(
      { error: "Невалиден продукт" },
      { status: 400 }
    );
  }

  try {
    const result = await registerEasyPayBill({ amount });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
