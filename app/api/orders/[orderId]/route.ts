import { requireCurrentUser } from "@/lib/auth";
import { findOrderByOrderNumber } from "@/lib/db/repositories/orders.repository";
import { getUserOrderByOrderNumber } from "@/lib/services/order.service";
import { apiError, apiSuccess } from "@/lib/server/response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const user = await requireCurrentUser();
    const { orderId } = await params;
    const order = user.isAdmin
      ? await findOrderByOrderNumber(orderId)
      : await getUserOrderByOrderNumber(user.id, orderId);

    if (!order) {
      return apiSuccess(
        {
          message: "Захиалга олдсонгүй.",
        },
        { status: 404 },
      );
    }

    return apiSuccess({ order });
  } catch (error) {
    return apiError(error);
  }
}
