import type { ZodType } from "zod";

import { AppError } from "@/lib/error-utils";

export async function readValidatedJson<T>(
  request: Request,
  schema: ZodType<T>,
) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    throw new AppError("Хүсэлтийн мэдээлэл буруу байна.", {
      statusCode: 400,
      code: "INVALID_JSON",
      cause: error,
    });
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0]?.message || "Хүсэлтийн өгөгдөл буруу байна.", {
      statusCode: 400,
      code: "VALIDATION_ERROR",
    });
  }

  return parsed.data;
}
