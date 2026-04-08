import "server-only";

import { readDatabaseName } from "@/lib/env";
import { getDatabase } from "@/lib/mongodb";

export async function getQPayWebhooksCollection() {
  const database = await getDatabase(readDatabaseName());

  return database.collection("qpay_webhooks");
}
