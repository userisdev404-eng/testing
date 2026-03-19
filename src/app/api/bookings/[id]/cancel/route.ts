import { NextResponse } from "next/server";
import { getDb, runSql } from "@/lib/db";

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const db = await getDb();
  runSql(db, "UPDATE bookings SET status = 'CANCELLED' WHERE booking_id = ? AND status = 'CONFIRMED'", [params.id]);
  const changes = db.getRowsModified();
  if (changes === 0) return NextResponse.json({ error: "Booking not found or already cancelled" }, { status: 404 });
  return NextResponse.json({ message: "Booking cancelled", booking_id: params.id });
}
