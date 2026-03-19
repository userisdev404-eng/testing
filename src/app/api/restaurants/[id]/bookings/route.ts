import { NextResponse } from "next/server";
import { getDb, queryAll } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const db = await getDb();
  const bookings = queryAll(db, "SELECT * FROM bookings WHERE merchant_id = ? ORDER BY slot_start DESC", [params.id]);
  return NextResponse.json(bookings);
}
