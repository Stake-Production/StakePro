import mongoose from "mongoose";
import dns from "dns";

// Fix querySrv ENOTFOUND error on local networks that have issues resolving DNS SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  console.warn("Could not set custom DNS servers:", err);
}

const MONGO_URI = process.env.MONGO_URI as string;


if (!MONGO_URI) {
  throw new Error("MONGO_URI not defined");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
