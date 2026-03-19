import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, runSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const { booking } = await req.json();

    if (!booking?.booking_id) {
      return NextResponse.json({ error: "booking.booking_id is required" }, { status: 400 });
    }

    const existing = queryOne(db, "SELECT * FROM bookings WHERE booking_id = ?", [booking.booking_id]);
    if (!existing) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    if (booking.status === "CANCELLED") {
      runSql(db, "UPDATE bookings SET status = 'CANCELLED' WHERE booking_id = ?", [booking.booking_id]);
    }

    const updated = queryOne(db, "SELECT * FROM bookings WHERE booking_id = ?", [booking.booking_id]);
    return NextResponse.json({
      booking: { booking_id: updated?.booking_id, status: updated?.status },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
