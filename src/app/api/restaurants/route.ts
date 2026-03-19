import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getDb, queryAll, runSql } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const restaurants = queryAll(db, "SELECT * FROM restaurants ORDER BY created_at DESC");
  return NextResponse.json(restaurants);
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();
    const { name, address, phone, cuisine_type, party_size_min, party_size_max, open_time, close_time, slot_duration_min, tables_available } = body;

    if (!name || !address || !phone || !cuisine_type) {
      return NextResponse.json({ error: "name, address, phone, and cuisine_type are required" }, { status: 400 });
    }

    const id = uuidv4();
    runSql(db,
      `INSERT INTO restaurants (id, name, address, phone, cuisine_type, party_size_min, party_size_max, open_time, close_time, slot_duration_min, tables_available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, address, phone, cuisine_type,
       party_size_min || 1, party_size_max || 10,
       open_time || "09:00", close_time || "22:00",
       slot_duration_min || 60, tables_available || 20]
    );

    return NextResponse.json({ id, name, message: "Restaurant registered successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
