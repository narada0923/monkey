import { requireCurrentUser } from "@/lib/auth";
import { listAllOrderRecords, listUserOrders } from "@/lib/services/order.service";
import { apiError, apiSuccess } from "@/lib/server/response";

export async function GET(request: Request) {
  try {
    const user = await requireCurrentUser();
    const { searchParams } = new URL(request.url);
    const scope = searchParams.get("scope");
    const orders =
      scope === "all" && user.isAdmin
        ? await listAllOrderRecords()
        : await listUserOrders(user.id);

    return apiSuccess({ orders });
  } catch (error) {
    return apiError(error);
  }
}
