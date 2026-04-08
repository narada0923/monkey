import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  buildQPayCallbackUrl,
  buildQPayInvoicePayload,
  getQPayPaymentSnapshot,
  normalizeQPayQrImage,
} from "@/lib/commerce/qpay";

const originalEnv = { ...process.env };

describe("qpay helpers", () => {
  beforeEach(() => {
    process.env.QPAY_BASE_URL = "https://merchant.qpay.mn";
    process.env.QPAY_CLIENT_ID = "CLIENT";
    process.env.QPAY_CLIENT_SECRET = "SECRET";
    process.env.QPAY_INVOICE_CODE = "MONKEY_INVOICE";
    process.env.QPAY_CALLBACK_URL = "http://localhost:3000/api/qpay/webhook";
    process.env.QPAY_SENDER_BRANCH_CODE = "ONLINE";
    process.env.QPAY_SENDER_STAFF_CODE = "online";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("builds a callback url with sender invoice information", () => {
    expect(buildQPayCallbackUrl("MONKEY-1001")).toBe(
      "http://localhost:3000/api/qpay/webhook?sender_invoice_no=MONKEY-1001",
    );
  });

  it("builds the invoice payload using configured invoice metadata", () => {
    const payload = buildQPayInvoicePayload({
      senderInvoiceNo: "MONKEY-1001",
      receiverCode: "WEB-123",
      description: "MC-1001 захиалга",
      amount: 129_300,
      callbackUrl:
        "http://localhost:3000/api/qpay/webhook?sender_invoice_no=MONKEY-1001",
      note: "Хүргэлтийн туршилтын төлөв",
    });

    expect(payload).toMatchObject({
      invoice_code: "MONKEY_INVOICE",
      sender_invoice_no: "MONKEY-1001",
      invoice_receiver_code: "WEB-123",
      sender_branch_code: "ONLINE",
      sender_staff_code: "online",
      amount: 129_300,
    });
  });

  it("normalizes raw qr images into data urls", () => {
    expect(normalizeQPayQrImage("abc123")).toBe("data:image/png;base64,abc123");
    expect(normalizeQPayQrImage("data:image/png;base64,abc123")).toBe(
      "data:image/png;base64,abc123",
    );
  });

  it("extracts the paid payment state from payment check rows", () => {
    const snapshot = getQPayPaymentSnapshot({
      rows: [
        {
          payment_id: "pay-1",
          payment_status: "PAID",
          payment_status_description: "Амжилттай",
          paid_amount: 129_300,
        },
      ],
    });

    expect(snapshot).toEqual({
      paid: true,
      paymentId: "pay-1",
      paidAmount: 129_300,
      latestStatus: "PAID",
      latestDescription: "Амжилттай",
      rows: [
        {
          payment_id: "pay-1",
          payment_status: "PAID",
          payment_status_description: "Амжилттай",
          paid_amount: 129_300,
        },
      ],
    });
  });
});
