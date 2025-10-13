import crypto from "crypto";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getExpTime() {
  const pad = (n) => String(n).padStart(2, "0");
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function buildEncodedData({ MIN, INVOICE, AMOUNT, CURRENCY, EXP_TIME, DESCR }) {
  const lines = [
    `MIN=${MIN}`,
    `INVOICE=${INVOICE}`,
    `AMOUNT=${AMOUNT}`,
    CURRENCY ? `CURRENCY=${CURRENCY}` : null,
    EXP_TIME ? `EXP_TIME=${EXP_TIME}` : null,
    DESCR ? `DESCR=${DESCR}` : null,
    `ENCODING=utf-8`,
  ].filter(Boolean);

  const data = lines.join("\n");

  return Buffer.from(data, "utf8").toString("base64");
}

function hmacSha1Hex(data, secret) {
  return crypto.createHmac("sha1", secret).update(data).digest("hex");
}

function generateInvoice() {
  return Math.floor(Date.now() / 1000).toString();
}

export async function registerEasyPayBill({ amount }) {
  if (!amount || Number(amount) <= 0) throw new Error("Invalid amount");
  amount = amount.toFixed(2);
  
  const invoice = generateInvoice();
  const currency = requireEnv("EPAY_CURRENCY");

  const EPAY_KIN = requireEnv("EPAY_KIN");
  const EPAY_SECRET = requireEnv("EPAY_SECRET");

  const isProd = process.env.NODE_ENV === "production";
  const endpoint = isProd
    ? "https://www.epay.bg/ezp/reg_bill.cgi"
    : "https://demo.epay.bg/ezp/reg_bill.cgi";

  const EXP_TIME = getExpTime();

  const ENCODED = buildEncodedData({
    MIN: EPAY_KIN,
    INVOICE: String(invoice),
    AMOUNT: String(amount),
    CURRENCY: currency,
    EXP_TIME,
  });

  const CHECKSUM = hmacSha1Hex(ENCODED, EPAY_SECRET);

  const url = `${endpoint}?${new URLSearchParams({ ENCODED, CHECKSUM })}`;

  const resp = await fetch(url, {
    method: "GET",
    headers: { Accept: "text/plain" },
    cache: "no-store",
  });

  const text = await resp.text();
  const match = text.match(/\b(\d{10})\b/);

  if (!resp.ok || !match) {
    throw new Error(`Unexpected response from ePay: ${resp.status} ${text}`);
  }

  return {
    idn: match[1],
    expTime: EXP_TIME,
    env: isProd ? "production" : "development",
    raw: text,
    amount
  };
}
