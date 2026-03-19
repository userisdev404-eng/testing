import { NextResponse } from "next/server";
import { getDb, queryOne } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const db = await getDb();
  const restaurant = queryOne(db, "SELECT * FROM restaurants WHERE id = ?", [params.id]);
  if (!restaurant) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  return NextResponse.json(restaurant);
}
