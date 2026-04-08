export class AppError extends Error {
  statusCode: number;
  code?: string;
  expose: boolean;

  constructor(
    message: string,
    options: {
      statusCode?: number;
      code?: string;
      expose?: boolean;
      cause?: unknown;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.statusCode = options.statusCode ?? 500;
    this.code = options.code;
    this.expose = options.expose ?? this.statusCode < 500;
  }
}

export function getErrorMessage(
  error: unknown,
  fallback = "Алдаа гарлаа. Дахин оролдоно уу.",
) {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return fallback;
}

export function getErrorStatusCode(error: unknown, fallback = 500) {
  if (error instanceof AppError) {
    return error.statusCode;
  }

  return fallback;
}
