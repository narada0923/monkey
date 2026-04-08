import { hasQPayEnv } from "@/lib/env";
import { apiSuccess } from "@/lib/server/response";

export async function GET() {
  return apiSuccess({
    provider: "qpay",
    configured: hasQPayEnv(),
  });
}
