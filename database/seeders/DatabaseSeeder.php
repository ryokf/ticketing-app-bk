<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\DetailOrder;
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void

    {
        // ==========================================
        // 1. DATA PENGGUNA (USERS)
        // ==========================================

        $admin = User::create([
            'name' => 'Super Administrator',
            'email' => 'admin@tiketacara.com',
            'password' => Hash::make('password'),
            'isAdmin' => true,
        ]);

        $eoUsers = [
            'mahasiswa' => User::create([
                'name' => 'BEM UDINUS',
                'email' => 'bem@udinus.ac.id',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ]),
            'promotor' => User::create([
                'name' => 'Rajawali Indonesia',
                'email' => 'info@rajawali.id',
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ]),
        ];

        // Buat 5 user pembeli (array manual agar data statis/tetap)
        $buyers = [];
        for ($i = 1; $i <= 5; $i++) {
            $buyers[] = User::create([
                'name' => "User Pembeli $i",
                'email' => "user$i@gmail.com",
                'password' => Hash::make('password'),
                'isAdmin' => false,
            ]);
        }

        // ==========================================
        // 2. KATEGORI (CATEGORIES)
        // ==========================================

        $categoriesData = ['Konser Musik', 'Seminar', 'Olahraga', 'Festival', 'Workshop'];
        $cats = [];
        foreach ($categoriesData as $name) {
            $cats[$name] = Category::create(['name' => $name]);
        }

        // ==========================================
        // 3. EVENTS & TICKETS (STRICT ENUM)
        // ==========================================

        $eventsData = [
            [
                'eo' => $eoUsers['promotor'],
                'cat' => $cats['Konser Musik'],
                'title' => 'Sheila on 7: Tunggu Aku Di Semarang',
                'desc' => 'Konser tunggal outdoor.',
                'loc' => 'Stadion Diponegoro',
                'time' => '2026-05-20 19:00:00',
                'tickets' => [
                    // VIP kita mapping ke 'premium'
                    ['type' => 'premium', 'price' => 850000, 'stock' => 100],
                    // Festival kita mapping ke 'reguler'
                    ['type' => 'reguler', 'price' => 350000, 'stock' => 1000],
                ]
            ],
            [
                'eo' => $eoUsers['promotor'],
                'cat' => $cats['Konser Musik'],
                'title' => 'Jazz Traffic Festival 2026',
                'desc' => 'Festival Jazz terbesar.',
                'loc' => 'PRPP Semarang',
                'time' => '2026-06-12 15:00:00',
                'tickets' => [
                    // Sofa VVIP -> Premium (mahal)
                    ['type' => 'premium', 'price' => 1200000, 'stock' => 50],
                    // Presale -> Reguler (murah)
                    ['type' => 'reguler', 'price' => 250000, 'stock' => 500],
                ]
            ],
            [
                'eo' => $eoUsers['mahasiswa'],
                'cat' => $cats['Seminar'],
                'title' => 'National Tech Summit: AI Future',
                'desc' => 'Seminar teknologi nasional.',
                'loc' => 'Auditorium Unnes',
                'time' => '2026-03-10 09:00:00',
                'tickets' => [
                    // Umum + Sertifikat -> Premium
                    ['type' => 'premium', 'price' => 150000, 'stock' => 100],
                    // Mahasiswa -> Reguler
                    ['type' => 'reguler', 'price' => 50000, 'stock' => 300],
                ]
            ],
            [
                'eo' => $eoUsers['mahasiswa'],
                'cat' => $cats['Festival'],
                'title' => 'UDINUS Career Expo 2026',
                'desc' => 'Job fair kampus.',
                'loc' => 'Gedung E UDINUS',
                'time' => '2026-02-25 08:00:00',
                'tickets' => [
                    // Fast Track -> Premium
                    ['type' => 'premium', 'price' => 25000, 'stock' => 200],
                    // Free Entry -> Reguler
                    ['type' => 'reguler', 'price' => 0, 'stock' => 1000],
                ]
            ],
            [
                'eo' => $eoUsers['mahasiswa'],
                'cat' => $cats['Olahraga'],
                'title' => 'Fun Run 5K',
                'desc' => 'Lari pagi sehat.',
                'loc' => 'Simpang Lima',
                'time' => '2026-08-17 06:00:00',
                'tickets' => [
                    // Hanya ada satu jenis tiket, kita set reguler
                    ['type' => 'reguler', 'price' => 50000, 'stock' => 500],
                ]
            ],
        ];

        $allTickets = []; // Penampung untuk random order

        foreach ($eventsData as $e) {
            $event = Event::create([
                'user_id' => $e['eo']->id,
                'category_id' => $e['cat']->id,
                'title' => $e['title'],
                'description' => $e['desc'],
                'location' => $e['loc'],
                'time' => Carbon::parse($e['time']),
                'photo' => 'default.jpg',
            ]);

            foreach ($e['tickets'] as $t) {
                // VALIDASI FINAL: Pastikan type hanya 'premium' atau 'reguler'
                $ticket = Ticket::create([
                    'event_id' => $event->id,
                    'type' => $t['type'], // Value ini dijamin sesuai enum
                    'price' => $t['price'],
                    'stock' => $t['stock'],
                ]);
                $allTickets[] = $ticket;
            }
        }

        // ==========================================
        // 4. TRANSAKSI (ORDERS)
        // ==========================================

        // Buat 15 transaksi random
        for ($i = 0; $i < 15; $i++) {
            $buyer = $buyers[array_rand($buyers)];
            $ticket = $allTickets[array_rand($allTickets)]; // Pilih tiket acak

            // Ambil event berdasarkan tiket yang terpilih
            // (Kita tidak bisa pakai $ticket->event karena relation belum tentu ter-load di memori saat create,
            // jadi manual query id-nya atau asumsikan foreign key benar)
            $event_id = $ticket->event_id;

            $qty = rand(1, 3);
            $subtotal = $ticket->price * $qty;
            $date = Carbon::now()->subDays(rand(1, 30));

            $order = Order::create([
                'user_id' => $buyer->id,
                'event_id' => $event_id,
                'total_price' => $subtotal,
                'created_at' => $date,
                'updated_at' => $date,
            ]);

            DetailOrder::create([
                'order_id' => $order->id,
                'ticket_id' => $ticket->id,
                'qty' => $qty,
                'subtotal' => $subtotal,
                'created_at' => $date,
                'updated_at' => $date,
            ]);
        }
    }
}
