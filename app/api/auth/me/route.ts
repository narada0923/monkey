import { getCurrentUser } from "@/lib/auth";
import { apiSuccess } from "@/lib/server/response";

export async function GET() {
  return apiSuccess({
    user: await getCurrentUser(),
  });
}
