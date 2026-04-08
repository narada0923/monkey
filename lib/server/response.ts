import { NextResponse } from "next/server";

import { getErrorMessage, getErrorStatusCode } from "@/lib/error-utils";

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function apiError(error: unknown, fallback?: string) {
  return NextResponse.json(
    { message: getErrorMessage(error, fallback) },
    { status: getErrorStatusCode(error) },
  );
}
