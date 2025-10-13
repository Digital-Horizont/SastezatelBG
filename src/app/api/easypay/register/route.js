import { NextResponse } from "next/server";
import { registerEasyPayBill } from "@/lib/easypay-register";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { amount } = body;
    const result = await registerEasyPayBill({ amount });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
