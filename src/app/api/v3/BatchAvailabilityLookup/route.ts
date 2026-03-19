import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const { merchant_id, slot_time_range, party_size } = await req.json();

    if (!merchant_id || !slot_time_range || !party_size) {
      return NextResponse.json({ error: "merchant_id, slot_time_range, and party_size are required" }, { status: 400 });
    }

    const restaurant = queryOne(db, "SELECT * FROM restaurants WHERE id = ?", [merchant_id]);
    if (!restaurant) return NextResponse.json({ error: "Merchant not found" }, { status: 404 });

    const minSize = restaurant.party_size_min as number;
    const maxSize = restaurant.party_size_max as number;
    if (party_size < minSize || party_size > maxSize) {
      return NextResponse.json({ slot_time_availability: [] });
    }

    const startDate = new Date(slot_time_range.start_time);
    const dateStr = startDate.toISOString().split("T")[0];

    const slotDurationMin = restaurant.slot_duration_min as number;
    const tablesAvailable = restaurant.tables_available as number;
    const openTime = restaurant.open_time as string;
    const closeTime = restaurant.close_time as string;
    const slotDurationMs = slotDurationMin * 60 * 1000;

    let cursor = new Date(`${dateStr}T${openTime}:00`);
    const closeDate = new Date(`${dateStr}T${closeTime}:00`);

    const slots = [];

    while (cursor.getTime() + slotDurationMs <= closeDate.getTime()) {
      const slotStart = cursor.toISOString();

      const row = queryOne(db,
        "SELECT COUNT(*) as count FROM bookings WHERE merchant_id = ? AND slot_start = ? AND status = 'CONFIRMED'",
        [merchant_id, slotStart]
      );
      const count = (row?.count as number) || 0;
      const spotsOpen = tablesAvailable - count;

      slots.push({
        slot: { merchant_id, start_sec: slotStart, duration_sec: slotDurationMin * 60, party_size },
        available: spotsOpen > 0,
        spots_open: Math.max(0, spotsOpen),
        spots_total: tablesAvailable,
      });

      cursor = new Date(cursor.getTime() + slotDurationMs);
    }

    return NextResponse.json({ slot_time_availability: slots });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
