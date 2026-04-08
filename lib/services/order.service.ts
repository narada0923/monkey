import "server-only";

import {
  findOrderByInvoiceId,
  findOrderByOrderNumber,
  listAllOrders,
  listOrdersByUser,
} from "@/lib/db/repositories/orders.repository";
import { mapOrderToProfileCard } from "@/lib/services/checkout.service";

export async function listUserOrders(authUserId: string) {
  return listOrdersByUser(authUserId);
}

export async function listUserOrderCards(authUserId: string) {
  const orders = await listOrdersByUser(authUserId);

  return orders.map(mapOrderToProfileCard);
}

export async function getOrderByInvoiceIdForUser(invoiceId: string) {
  return findOrderByInvoiceId(invoiceId);
}

export async function getUserOrderByOrderNumber(
  authUserId: string,
  orderNumber: string,
) {
  const order = await findOrderByOrderNumber(orderNumber);

  if (!order || order.authUserId !== authUserId) {
    return null;
  }

  return order;
}

export async function listAllOrderRecords() {
  return listAllOrders();
}
