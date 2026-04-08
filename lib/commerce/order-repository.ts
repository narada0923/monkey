import "server-only";

import { getDatabase } from "@/lib/mongodb";
import { readDatabaseName } from "@/lib/env";
import type { OrderRecord } from "@/types/commerce";

type OrderDocument = OrderRecord & {
  _id?: unknown;
};

const ORDERS_COLLECTION = "orders";
const WEBHOOK_COLLECTION = "qpay_webhooks";

async function getOrdersCollection() {
  const database = await getDatabase(readDatabaseName());

  return database.collection<OrderDocument>(ORDERS_COLLECTION);
}

function stripMongoId(document: OrderDocument | null) {
  if (!document) {
    return null;
  }

  const { _id, ...order } = document;
  void _id;

  return order;
}

export async function insertOrder(order: OrderRecord) {
  const collection = await getOrdersCollection();
  await collection.insertOne(order);

  return order;
}

export async function listOrdersByUser(authUserId: string) {
  const collection = await getOrdersCollection();
  const documents = await collection
    .find({ authUserId })
    .sort({ createdAt: -1 })
    .toArray();

  return documents
    .map((document) => stripMongoId(document))
    .filter((order): order is OrderRecord => Boolean(order));
}

export async function listAllOrders() {
  const collection = await getOrdersCollection();
  const documents = await collection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return documents
    .map((document) => stripMongoId(document))
    .filter((order): order is OrderRecord => Boolean(order));
}

export async function findOrderByInvoiceId(invoiceId: string) {
  const collection = await getOrdersCollection();
  const document = await collection.findOne({ "invoice.invoiceId": invoiceId });

  return stripMongoId(document);
}

export async function findOrderByOrderNumber(orderNumber: string) {
  const collection = await getOrdersCollection();
  const document = await collection.findOne({ orderNumber });

  return stripMongoId(document);
}

export async function findOrderBySenderInvoiceNo(senderInvoiceNo: string) {
  const collection = await getOrdersCollection();
  const document = await collection.findOne({ senderInvoiceNo });

  return stripMongoId(document);
}

export async function markOrderPaid(input: {
  invoiceId: string;
  paymentId: string | null;
  paidAmount: number;
  latestStatus: string | null;
  latestDescription: string | null;
}) {
  const collection = await getOrdersCollection();
  const now = new Date();

  await collection.updateOne(
    { "invoice.invoiceId": input.invoiceId },
    {
      $set: {
        status: "paid",
        "payment.paymentId": input.paymentId,
        "payment.paidAmount": input.paidAmount,
        "payment.latestStatus": input.latestStatus,
        "payment.latestDescription": input.latestDescription,
        "payment.paidAt": now,
        updatedAt: now,
      },
    },
  );

  return findOrderByInvoiceId(input.invoiceId);
}

export async function storeQPayWebhookEvent(event: Record<string, unknown>) {
  const database = await getDatabase(readDatabaseName());
  await database.collection(WEBHOOK_COLLECTION).insertOne(event);
}
