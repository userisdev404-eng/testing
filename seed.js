const initSqlJs = require("sql.js");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const uuidv4 = () => crypto.randomUUID();

const DB_PATH = path.join(__dirname, "reservations.db");

async function seed() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, address TEXT NOT NULL, phone TEXT NOT NULL,
      cuisine_type TEXT NOT NULL, party_size_min INTEGER DEFAULT 1, party_size_max INTEGER DEFAULT 10,
      open_time TEXT DEFAULT '09:00', close_time TEXT DEFAULT '22:00',
      slot_duration_min INTEGER DEFAULT 60, tables_available INTEGER DEFAULT 20,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      booking_id TEXT PRIMARY KEY, merchant_id TEXT NOT NULL, slot_start TEXT NOT NULL,
      slot_end TEXT NOT NULL, party_size INTEGER NOT NULL, user_name TEXT NOT NULL,
      user_email TEXT NOT NULL, user_phone TEXT NOT NULL, status TEXT DEFAULT 'CONFIRMED',
      idempotency_token TEXT UNIQUE, created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (merchant_id) REFERENCES restaurants(id)
    )
  `);

  const restaurants = [
    { id: uuidv4(), name: "The Spicy Spoon", address: "45 Galle Road, Colombo 03, Sri Lanka", phone: "+94 11 234 5678", cuisine_type: "Sri Lankan", party_size_min: 1, party_size_max: 8, open_time: "10:00", close_time: "22:00", slot_duration_min: 60, tables_available: 15 },
    { id: uuidv4(), name: "Sakura Garden", address: "12 Duplication Road, Colombo 04, Sri Lanka", phone: "+94 11 345 6789", cuisine_type: "Japanese", party_size_min: 1, party_size_max: 6, open_time: "11:00", close_time: "23:00", slot_duration_min: 90, tables_available: 10 },
    { id: uuidv4(), name: "Mama Mia Pizzeria", address: "78 Marine Drive, Colombo 06, Sri Lanka", phone: "+94 11 456 7890", cuisine_type: "Italian", party_size_min: 1, party_size_max: 12, open_time: "09:00", close_time: "21:00", slot_duration_min: 60, tables_available: 20 },
    { id: uuidv4(), name: "Dragon Palace", address: "156 Havelock Road, Colombo 05, Sri Lanka", phone: "+94 11 567 8901", cuisine_type: "Chinese", party_size_min: 2, party_size_max: 10, open_time: "11:30", close_time: "22:30", slot_duration_min: 60, tables_available: 18 },
    { id: uuidv4(), name: "Curry Leaf", address: "23 Park Street, Colombo 02, Sri Lanka", phone: "+94 11 678 9012", cuisine_type: "Indian", party_size_min: 1, party_size_max: 8, open_time: "10:00", close_time: "22:00", slot_duration_min: 45, tables_available: 12 },
  ];

  for (const r of restaurants) {
    db.run(
      `INSERT INTO restaurants (id, name, address, phone, cuisine_type, party_size_min, party_size_max, open_time, close_time, slot_duration_min, tables_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [r.id, r.name, r.address, r.phone, r.cuisine_type, r.party_size_min, r.party_size_max, r.open_time, r.close_time, r.slot_duration_min, r.tables_available]
    );
  }

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const bookings = [
    { booking_id: uuidv4(), merchant_id: restaurants[0].id, slot_start: `${todayStr}T12:00:00.000Z`, slot_end: `${todayStr}T13:00:00.000Z`, party_size: 4, user_name: "Kasun Perera", user_email: "kasun@example.com", user_phone: "+94 77 123 4567", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[0].id, slot_start: `${todayStr}T13:00:00.000Z`, slot_end: `${todayStr}T14:00:00.000Z`, party_size: 2, user_name: "Nimali Silva", user_email: "nimali@example.com", user_phone: "+94 77 234 5678", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[0].id, slot_start: `${todayStr}T18:00:00.000Z`, slot_end: `${todayStr}T19:00:00.000Z`, party_size: 6, user_name: "Amal Fernando", user_email: "amal@example.com", user_phone: "+94 77 345 6789", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[0].id, slot_start: `${todayStr}T15:00:00.000Z`, slot_end: `${todayStr}T16:00:00.000Z`, party_size: 3, user_name: "Ruwan Jayawardena", user_email: "ruwan@example.com", user_phone: "+94 77 456 7890", status: "CANCELLED" },
    { booking_id: uuidv4(), merchant_id: restaurants[1].id, slot_start: `${tomorrowStr}T12:30:00.000Z`, slot_end: `${tomorrowStr}T14:00:00.000Z`, party_size: 2, user_name: "Tharushi Wijesinghe", user_email: "tharushi@example.com", user_phone: "+94 77 567 8901", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[1].id, slot_start: `${tomorrowStr}T18:00:00.000Z`, slot_end: `${tomorrowStr}T19:30:00.000Z`, party_size: 4, user_name: "Dilshan Mendis", user_email: "dilshan@example.com", user_phone: "+94 77 678 9012", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[2].id, slot_start: `${yesterdayStr}T19:00:00.000Z`, slot_end: `${yesterdayStr}T20:00:00.000Z`, party_size: 5, user_name: "Samantha De Silva", user_email: "samantha@example.com", user_phone: "+94 77 789 0123", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[3].id, slot_start: `${todayStr}T12:30:00.000Z`, slot_end: `${todayStr}T13:30:00.000Z`, party_size: 8, user_name: "Chamara Kapugedera", user_email: "chamara@example.com", user_phone: "+94 77 890 1234", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[3].id, slot_start: `${todayStr}T19:00:00.000Z`, slot_end: `${todayStr}T20:00:00.000Z`, party_size: 4, user_name: "Hiruni Gamage", user_email: "hiruni@example.com", user_phone: "+94 77 901 2345", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[4].id, slot_start: `${todayStr}T13:00:00.000Z`, slot_end: `${todayStr}T13:45:00.000Z`, party_size: 3, user_name: "Rajitha Bandara", user_email: "rajitha@example.com", user_phone: "+94 77 012 3456", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[4].id, slot_start: `${tomorrowStr}T18:00:00.000Z`, slot_end: `${tomorrowStr}T18:45:00.000Z`, party_size: 2, user_name: "Sachini Jayasuriya", user_email: "sachini@example.com", user_phone: "+94 77 111 2233", status: "CONFIRMED" },
    { booking_id: uuidv4(), merchant_id: restaurants[4].id, slot_start: `${yesterdayStr}T20:00:00.000Z`, slot_end: `${yesterdayStr}T20:45:00.000Z`, party_size: 5, user_name: "Nuwan Kulasekara", user_email: "nuwan@example.com", user_phone: "+94 77 222 3344", status: "CANCELLED" },
  ];

  for (const b of bookings) {
    db.run(
      `INSERT INTO bookings (booking_id, merchant_id, slot_start, slot_end, party_size, user_name, user_email, user_phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [b.booking_id, b.merchant_id, b.slot_start, b.slot_end, b.party_size, b.user_name, b.user_email, b.user_phone, b.status]
    );
  }

  // Save
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));

  console.log(`\nSeeded ${restaurants.length} restaurants and ${bookings.length} bookings\n`);
  restaurants.forEach((r, i) => console.log(`  ${i + 1}. ${r.name} (${r.cuisine_type})`));
  const confirmed = bookings.filter(b => b.status === "CONFIRMED").length;
  console.log(`\n  ${confirmed} confirmed, ${bookings.length - confirmed} cancelled`);
  console.log('\nRun "npm run dev" to start the Next.js app.');
}

seed().catch(console.error);
