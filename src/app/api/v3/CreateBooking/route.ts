import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getDb, queryOne, runSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const { slot, user_information, idempotency_token } = await req.json();

    if (!slot || !user_information) {
      return NextResponse.json({ error: "slot and user_information are required" }, { status: 400 });
    }

    // Idempotency check
    if (idempotency_token) {
      const existing = queryOne(db, "SELECT * FROM bookings WHERE idempotency_token = ?", [idempotency_token]);
      if (existing) {
        return NextResponse.json({
          booking: {
            booking_id: existing.booking_id,
            slot: {
              merchant_id: existing.merchant_id,
              start_sec: existing.slot_start,
              duration_sec: Math.round((new Date(existing.slot_end as string).getTime() - new Date(existing.slot_start as string).getTime()) / 1000),
              party_size: existing.party_size,
            },
            user_information: {
              given_name: (existing.user_name as string).split(" ")[0],
              family_name: (existing.user_name as string).split(" ").slice(1).join(" "),
              email: existing.user_email,
              telephone: existing.user_phone,
            },
            status: existing.status,
            payment_information: { prepayment_status: "PREPAYMENT_NOT_PROVIDED" },
          },
        });
      }
    }

    const restaurant = queryOne(db, "SELECT * FROM restaurants WHERE id = ?", [slot.merchant_id]);
    if (!restaurant) return NextResponse.json({ error: "Merchant not found" }, { status: 404 });

    // Check availability
    const row = queryOne(db,
      "SELECT COUNT(*) as count FROM bookings WHERE merchant_id = ? AND slot_start = ? AND status = 'CONFIRMED'",
      [slot.merchant_id, slot.start_sec]
    );
    const count = (row?.count as number) || 0;

    if (count >= (restaurant.tables_available as number)) {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE", message: "No tables available for this time slot" }, { status: 409 });
    }

    const booking_id = uuidv4();
    const slotDuration = restaurant.slot_duration_min as number;
    const durationMs = (slot.duration_sec || slotDuration * 60) * 1000;
    const slotEnd = new Date(new Date(slot.start_sec).getTime() + durationMs).toISOString();
    const userName = `${user_information.given_name || ""} ${user_information.family_name || ""}`.trim();

    runSql(db,
      `INSERT INTO bookings (booking_id, merchant_id, slot_start, slot_end, party_size, user_name, user_email, user_phone, idempotency_token)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [booking_id, slot.merchant_id, slot.start_sec, slotEnd, slot.party_size,
       userName, user_information.email || "", user_information.telephone || "",
       idempotency_token || null]
    );

    return NextResponse.json({
      booking: {
        booking_id,
        slot: {
          merchant_id: slot.merchant_id,
          start_sec: slot.start_sec,
          duration_sec: slot.duration_sec || slotDuration * 60,
          party_size: slot.party_size,
        },
        user_information,
        status: "CONFIRMED",
        payment_information: { prepayment_status: "PREPAYMENT_NOT_PROVIDED" },
      },
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
