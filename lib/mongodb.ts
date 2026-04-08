import { Db, MongoClient } from "mongodb";

const options = {};

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.monkey_MONGODB_URI;

  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "monkey_MONGODB_URI"');
  }

  return uri;
}

export function getMongoClient() {
  if (clientPromise) {
    return clientPromise;
  }

  const uri = getMongoUri();

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect();
    }

    clientPromise = global._mongoClientPromise;
    return clientPromise;
  }

  clientPromise = new MongoClient(uri, options).connect();

  return clientPromise;
}

export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}
