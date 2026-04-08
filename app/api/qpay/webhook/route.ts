import { NextResponse } from "next/server";

import { getQPayPayment } from "@/lib/commerce/qpay";
import {
  storeQPayWebhookEvent,
} from "@/lib/commerce/order-repository";
import { syncOrderFromWebhook } from "@/lib/commerce/checkout-service";
import { getErrorMessage } from "@/lib/error-utils";

async function readOptionalJson(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function handleWebhook(request: Request, method: "GET" | "POST") {
  const { searchParams } = new URL(request.url);
  const payload = method === "POST" ? await readOptionalJson(request) : null;
  const paymentId =
    searchParams.get("payment_id") ||
    (payload &&
    typeof payload.payment_id === "string"
      ? payload.payment_id
      : null);
  const invoiceId =
    searchParams.get("invoice_id") ||
    (payload &&
    typeof payload.invoice_id === "string"
      ? payload.invoice_id
      : null);
  const senderInvoiceNo =
    searchParams.get("sender_invoice_no") ||
    (payload &&
    typeof payload.sender_invoice_no === "string"
      ? payload.sender_invoice_no
      : null);

  let payment: Record<string, unknown> | null = null;

  if (paymentId) {
    try {
      payment = await getQPayPayment(paymentId);
    } catch (error) {
      payment = {
        error: getErrorMessage(error, "QPay payment мэдээллийг уншиж чадсангүй."),
      };
    }
  }

  const syncResult = await syncOrderFromWebhook({
    invoiceId,
    senderInvoiceNo,
  });

  const event = {
    method,
    paymentId,
    invoiceId,
    senderInvoiceNo,
    query: Object.fromEntries(searchParams.entries()),
    payload,
    payment,
    syncResult,
    createdAt: new Date(),
  };

  await storeQPayWebhookEvent(event);

  return NextResponse.json({
    received: true,
    ...event,
  });
}

export async function GET(request: Request) {
  return handleWebhook(request, "GET");
}

export async function POST(request: Request) {
  return handleWebhook(request, "POST");
}
