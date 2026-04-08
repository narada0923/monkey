import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { OrderDetailPage } from "@/components/shop/order-detail-page";
import { getCurrentUser } from "@/lib/auth";
import {
  getUserOrderByOrderNumber,
} from "@/lib/services/order.service";

type OrderDetailRouteProps = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata({
  params,
}: OrderDetailRouteProps): Promise<Metadata> {
  const { orderId } = await params;

  return {
    title: `Monkey Closet | Захиалга ${orderId}`,
    description: "Захиалгын дэлгэрэнгүй мэдээлэл.",
  };
}

export default async function OrderDetailRoute({
  params,
}: OrderDetailRouteProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { orderId } = await params;
  const order = await getUserOrderByOrderNumber(user.id, orderId);

  if (!order) {
    notFound();
  }

  return <OrderDetailPage order={order} />;
}
