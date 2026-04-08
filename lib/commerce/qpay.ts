import "server-only";

import { Buffer } from "node:buffer";

import { AppError, getErrorMessage } from "@/lib/error-utils";
import { readQPayEnv } from "@/lib/env";
import type { QPayInvoiceLink } from "@/types/commerce";

export type QPayTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
};

export type QPayInvoiceReceiverData = {
  register?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export type QPayInvoiceLine = {
  line_description: string;
  line_quantity: string;
  line_unit_price: string;
  note?: string;
  surcharges?: Array<{
    surcharge_code: string;
    description?: string;
    amount: number;
    note?: string;
  }>;
  taxes?: Array<{
    tax_code: string;
    description?: string;
    amount: number;
    note?: string;
  }>;
};

export type QPayInvoiceResponse = {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  urls?: QPayInvoiceLink[];
};

export type QPayPaymentCheckResponse = {
  count?: number;
  paid_amount?: number;
  rows?: Array<{
    payment_id?: string;
    payment_status?: string;
    payment_status_description?: string;
    payment_amount?: number;
    paid_amount?: number;
  }>;
};

export type QPayPaymentStatusSnapshot = {
  paid: boolean;
  paymentId: string | null;
  paidAmount: number;
  latestStatus: string | null;
  latestDescription: string | null;
  rows: NonNullable<QPayPaymentCheckResponse["rows"]>;
};

export type CreateQPayInvoiceInput = {
  senderInvoiceNo: string;
  receiverCode: string;
  description: string;
  amount: number;
  callbackUrl: string;
  note?: string;
  receiverData?: QPayInvoiceReceiverData;
  lines?: QPayInvoiceLine[];
};

type QPaySession = {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
};

let tokenCache: QPaySession | null = null;

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

async function qpayFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const config = readQPayEnv();
  const url = `${normalizeBaseUrl(config.QPAY_BASE_URL)}${path}`;
  const hasBody = init.body !== undefined && init.body !== null;

  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    throw new AppError(
      `QPay руу холбогдож чадсангүй: ${getErrorMessage(error, "Network error")}`,
      { statusCode: 502, code: "QPAY_NETWORK_ERROR" },
    );
  }

  const raw = await response.text();

  if (!response.ok) {
    throw new AppError(
      `QPay хүсэлт амжилтгүй боллоо (${response.status}): ${raw || "Хоосон хариу"}`,
      { statusCode: 502, code: "QPAY_REQUEST_FAILED" },
    );
  }

  if (!raw) {
    return {} as T;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new AppError(
      `QPay буруу JSON хариу буцаалаа: ${raw.slice(0, 300)}`,
      { statusCode: 502, code: "QPAY_INVALID_JSON" },
    );
  }
}

function isCachedSessionValid() {
  return Boolean(tokenCache && tokenCache.expiresAt - Date.now() > 30_000);
}

async function loginToQPay() {
  const config = readQPayEnv();
  const clientId = config.QPAY_CLIENT_ID || config.QPAY_USERNAME || "";
  const clientSecret =
    config.QPAY_CLIENT_SECRET || config.QPAY_PASSWORD || "";
  const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const token = await qpayFetch<QPayTokenResponse>("/v2/auth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicToken}`,
    },
  });

  if (!token.access_token) {
    throw new AppError("QPay access token ирсэнгүй.", {
      statusCode: 502,
      code: "QPAY_TOKEN_MISSING",
    });
  }

  tokenCache = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + Math.max(token.expires_in || 300, 30) * 1000,
  };

  return tokenCache;
}

async function getQPaySession() {
  if (isCachedSessionValid() && tokenCache) {
    return tokenCache;
  }

  return loginToQPay();
}

async function qpayAuthorizedFetch<T>(path: string, init: RequestInit = {}) {
  const session = await getQPaySession();

  try {
    return await qpayFetch<T>(path, {
      ...init,
      headers: {
        ...(init.headers ?? {}),
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
  } catch (error) {
    const message = getErrorMessage(error);

    if (!message.includes("(401)")) {
      throw error;
    }

    tokenCache = null;
    const refreshed = await getQPaySession();

    return qpayFetch<T>(path, {
      ...init,
      headers: {
        ...(init.headers ?? {}),
        Authorization: `Bearer ${refreshed.accessToken}`,
      },
    });
  }
}

export function buildQPayCallbackUrl(senderInvoiceNo: string) {
  const config = readQPayEnv();
  const callbackUrl = new URL(config.QPAY_CALLBACK_URL);
  callbackUrl.searchParams.set("sender_invoice_no", senderInvoiceNo);

  return callbackUrl.toString();
}

export function buildQPayInvoicePayload(input: CreateQPayInvoiceInput) {
  const config = readQPayEnv();

  return {
    invoice_code: config.QPAY_INVOICE_CODE,
    sender_invoice_no: input.senderInvoiceNo,
    invoice_receiver_code: input.receiverCode,
    sender_branch_code: config.QPAY_SENDER_BRANCH_CODE,
    invoice_description: input.description,
    enable_expiry: "false",
    allow_partial: false,
    minimum_amount: null,
    allow_exceed: false,
    maximum_amount: null,
    amount: input.amount,
    callback_url: input.callbackUrl,
    sender_staff_code: config.QPAY_SENDER_STAFF_CODE,
    note: input.note || null,
    ...(input.receiverData ? { invoice_receiver_data: input.receiverData } : {}),
    ...(input.lines?.length ? { lines: input.lines } : {}),
  };
}

export function normalizeQPayQrImage(qrImage: string) {
  if (!qrImage) {
    return "";
  }

  if (qrImage.startsWith("data:image")) {
    return qrImage;
  }

  return `data:image/png;base64,${qrImage}`;
}

export function getQPayPaymentSnapshot(
  paymentCheck: QPayPaymentCheckResponse,
): QPayPaymentStatusSnapshot {
  const rows = Array.isArray(paymentCheck.rows) ? paymentCheck.rows : [];
  const latest = rows[0];
  const paid = rows.some((row) => {
    const status = row.payment_status?.toUpperCase();
    return status === "PAID" || (row.paid_amount || 0) > 0;
  });

  return {
    paid,
    paymentId: latest?.payment_id || null,
    paidAmount:
      latest?.paid_amount || latest?.payment_amount || paymentCheck.paid_amount || 0,
    latestStatus: latest?.payment_status || null,
    latestDescription: latest?.payment_status_description || null,
    rows,
  };
}

export async function createQPayInvoice(input: CreateQPayInvoiceInput) {
  const payload = buildQPayInvoicePayload(input);
  const invoice = await qpayAuthorizedFetch<QPayInvoiceResponse>("/v2/invoice", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    ...invoice,
    qr_image: normalizeQPayQrImage(invoice.qr_image || ""),
    urls: Array.isArray(invoice.urls) ? invoice.urls : [],
  };
}

export async function cancelQPayInvoice(invoiceId: string) {
  return qpayAuthorizedFetch<Record<string, unknown>>(`/v2/invoice/${invoiceId}`, {
    method: "DELETE",
  });
}

export async function checkQPayPayment(invoiceId: string) {
  return qpayAuthorizedFetch<QPayPaymentCheckResponse>("/v2/payment/check", {
    method: "POST",
    body: JSON.stringify({
      object_type: "INVOICE",
      object_id: invoiceId,
      offset: {
        page_number: 1,
        page_limit: 100,
      },
    }),
  });
}

export async function getQPayPayment(paymentId: string) {
  return qpayAuthorizedFetch<Record<string, unknown>>(`/v2/payment/${paymentId}`, {
    method: "GET",
  });
}
