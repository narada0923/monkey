import "server-only";

import type { OrderRecord } from "@/types/commerce";

import { readDatabaseName } from "@/lib/env";
import { getDatabase } from "@/lib/mongodb";

type OrderDocument = OrderRecord & {
  _id?: unknown;
};

export async function getOrdersCollection() {
  const database = await getDatabase(readDatabaseName());

  return database.collection<OrderDocument>("orders");
}
