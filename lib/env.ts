import { z } from "zod";

import { AppError } from "@/lib/error-utils";

const auth0EnvSchema = z.object({
  AUTH0_DOMAIN: z
    .string()
    .min(1)
    .transform((value) =>
      value.startsWith("http://") || value.startsWith("https://")
        ? value
        : `https://${value}`,
    ),
  AUTH0_CLIENT_ID: z.string().min(1),
  AUTH0_CLIENT_SECRET: z.string().min(1),
  AUTH0_SECRET: z.string().min(32),
  APP_BASE_URL: z.string().url().optional(),
  AUTH0_AUDIENCE: z.string().min(1).optional(),
  AUTH0_SCOPE: z.string().min(1).optional(),
  AUTH0_ROLE_CLAIM: z.string().min(1).optional(),
  AUTH0_ROLE_CLAIM_NAMESPACE: z.string().min(1).optional(),
  AUTH0_ADMIN_ROLE: z.string().min(1).optional(),
});

const qpayEnvSchema = z.object({
  QPAY_BASE_URL: z.string().url().default("https://merchant.qpay.mn"),
  QPAY_CLIENT_ID: z.string().min(1).optional(),
  QPAY_CLIENT_SECRET: z.string().min(1).optional(),
  QPAY_USERNAME: z.string().min(1).optional(),
  QPAY_PASSWORD: z.string().min(1).optional(),
  QPAY_INVOICE_CODE: z.string().min(1),
  QPAY_CALLBACK_URL: z.string().url(),
  QPAY_SENDER_BRANCH_CODE: z.string().min(1).default("ONLINE"),
  QPAY_SENDER_STAFF_CODE: z.string().min(1).default("online"),
});

export type Auth0Env = z.output<typeof auth0EnvSchema>;
export type QPayEnv = z.output<typeof qpayEnvSchema>;

let auth0EnvCache: Auth0Env | null | undefined;
let qpayEnvCache: QPayEnv | null | undefined;

function readRawAuth0Env() {
  return {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    APP_BASE_URL: process.env.APP_BASE_URL,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_ROLE_CLAIM: process.env.AUTH0_ROLE_CLAIM,
    AUTH0_ROLE_CLAIM_NAMESPACE: process.env.AUTH0_ROLE_CLAIM_NAMESPACE,
    AUTH0_ADMIN_ROLE: process.env.AUTH0_ADMIN_ROLE,
  };
}

function readRawQPayEnv() {
  return {
    QPAY_BASE_URL: process.env.QPAY_BASE_URL || "https://merchant.qpay.mn",
    QPAY_CLIENT_ID: process.env.QPAY_CLIENT_ID,
    QPAY_CLIENT_SECRET: process.env.QPAY_CLIENT_SECRET,
    QPAY_USERNAME: process.env.QPAY_USERNAME,
    QPAY_PASSWORD: process.env.QPAY_PASSWORD,
    QPAY_INVOICE_CODE: process.env.QPAY_INVOICE_CODE,
    QPAY_CALLBACK_URL: process.env.QPAY_CALLBACK_URL,
    QPAY_SENDER_BRANCH_CODE: process.env.QPAY_SENDER_BRANCH_CODE || "ONLINE",
    QPAY_SENDER_STAFF_CODE: process.env.QPAY_SENDER_STAFF_CODE || "online",
  };
}

export function hasAuth0Env() {
  if (auth0EnvCache !== undefined) {
    return auth0EnvCache !== null;
  }

  const parsed = auth0EnvSchema.safeParse(readRawAuth0Env());
  auth0EnvCache = parsed.success ? parsed.data : null;

  return parsed.success;
}

export function readAuth0Env() {
  if (auth0EnvCache !== undefined) {
    if (!auth0EnvCache) {
      throw new AppError(
        "Auth0 тохиргоо дутуу байна. AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_SECRET болон APP_BASE_URL хувьсагчуудыг шалгана уу.",
        { statusCode: 500, code: "AUTH0_ENV_INVALID", expose: true },
      );
    }

    return auth0EnvCache;
  }

  const parsed = auth0EnvSchema.safeParse(readRawAuth0Env());

  if (!parsed.success) {
    auth0EnvCache = null;

    throw new AppError(
      "Auth0 тохиргоо дутуу байна. AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_SECRET болон APP_BASE_URL хувьсагчуудыг шалгана уу.",
      { statusCode: 500, code: "AUTH0_ENV_INVALID", expose: true },
    );
  }

  auth0EnvCache = parsed.data;

  return parsed.data;
}

export function hasQPayEnv() {
  if (qpayEnvCache !== undefined) {
    return qpayEnvCache !== null;
  }

  const parsed = qpayEnvSchema
    .superRefine((value, context) => {
      if (!(value.QPAY_CLIENT_ID || value.QPAY_USERNAME)) {
        context.addIssue({
          code: "custom",
          message: "QPAY_CLIENT_ID эсвэл QPAY_USERNAME заавал шаардлагатай.",
        });
      }

      if (!(value.QPAY_CLIENT_SECRET || value.QPAY_PASSWORD)) {
        context.addIssue({
          code: "custom",
          message:
            "QPAY_CLIENT_SECRET эсвэл QPAY_PASSWORD заавал шаардлагатай.",
        });
      }
    })
    .safeParse(readRawQPayEnv());

  qpayEnvCache = parsed.success ? parsed.data : null;

  return parsed.success;
}

export function readQPayEnv() {
  if (qpayEnvCache !== undefined) {
    if (!qpayEnvCache) {
      throw new AppError(
        "QPay тохиргоо дутуу байна. QPAY_* орчны хувьсагчуудаа шалгана уу.",
        { statusCode: 500, code: "QPAY_ENV_INVALID", expose: true },
      );
    }

    return qpayEnvCache;
  }

  const parsed = qpayEnvSchema
    .superRefine((value, context) => {
      if (!(value.QPAY_CLIENT_ID || value.QPAY_USERNAME)) {
        context.addIssue({
          code: "custom",
          message: "QPAY_CLIENT_ID эсвэл QPAY_USERNAME заавал шаардлагатай.",
        });
      }

      if (!(value.QPAY_CLIENT_SECRET || value.QPAY_PASSWORD)) {
        context.addIssue({
          code: "custom",
          message:
            "QPAY_CLIENT_SECRET эсвэл QPAY_PASSWORD заавал шаардлагатай.",
        });
      }
    })
    .safeParse(readRawQPayEnv());

  if (!parsed.success) {
    qpayEnvCache = null;

    throw new AppError(
      "QPay тохиргоо дутуу байна. QPAY_* орчны хувьсагчуудаа шалгана уу.",
      { statusCode: 500, code: "QPAY_ENV_INVALID", expose: true },
    );
  }

  qpayEnvCache = parsed.data;

  return parsed.data;
}

export function readDatabaseName() {
  return process.env.MONGODB_DB_NAME || "monkey";
}
