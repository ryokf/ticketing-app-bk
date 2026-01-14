import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MarqueeBrutalist from '@/components/MarqueeBrutalist';
import EventCard from '@/components/EventCard';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    image: string;
}

interface Category {
    id: number;
    name: string;
}

interface HomeProps {
    events: Event[];
    categories: Category[];
}

export default function Home({ events = [], categories = [] }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    // Filter events based on search and category
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === null || event.category === categories.find(c => c.id === selectedCategory)?.name;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Head title="Home - Ticketing System" />

            <div className="min-h-screen bg-white">
                {/* Navigation Header */}
                <div className="border-b-3 border-black bg-white sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <h2 className="text-2xl">TICKETING</h2>
                            <nav className="hidden md:flex gap-4">
                                <a href="/" className="btn-brutalist-outline text-sm py-2 px-4">BERANDA</a>
                                <a href="/purchases" className="btn-brutalist-outline text-sm py-2 px-4">RIWAYAT</a>
                            </nav>
                        </div>
                        <div className="flex gap-2">
                            <a href="/login" className="btn-brutalist text-sm py-2 px-4">LOGIN</a>
                            <a href="/register" className="btn-brutalist-accent text-sm py-2 px-4">REGISTER</a>
                        </div>
                    </div>
                </div>

                {/* Marquee Effect */}
                <MarqueeBrutalist text="← TIKET MURAH - TIKET KONSER - BELI SEKARANG - PROMO SPESIAL →" />

                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Left: Giant Typography */}
                        <div className="flex flex-col justify-center">
                            <div className="card-brutalist-no-hover bg-brutalist-accent">
                                <h1 className="mb-4">
                                    TIKET TERSEDIA<br />SEKARANG
                                </h1>
                                <p className="text-lg mb-6">
                                    SISTEM TICKETING EVENT TERBESAR DI INDONESIA. BELI TIKET TANPA RIBET, TANPA PEMBAYARAN.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="btn-brutalist"
                                    >
                                        LIHAT EVENT
                                    </button>
                                    <a href="/admin/dashboard" className="btn-brutalist-outline">
                                        ADMIN PANEL
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="card-brutalist-no-hover text-center">
                                <div className="text-5xl font-bold mb-2">{events.length}</div>
                                <div className="text-xs uppercase">EVENT AKTIF</div>
                            </div>
                            <div className="card-brutalist-no-hover text-center">
                                <div className="text-5xl font-bold mb-2">{categories.length}</div>
                                <div className="text-xs uppercase">KATEGORI</div>
                            </div>
                            <div className="card-brutalist-no-hover text-center">
                                <div className="text-5xl font-bold mb-2">24/7</div>
                                <div className="text-xs uppercase">LAYANAN</div>
                            </div>
                            <div className="card-brutalist-no-hover text-center">
                                <div className="text-5xl font-bold mb-2">100%</div>
                                <div className="text-xs uppercase">GRATIS</div>
                            </div>
                        </div>
                    </div>

                    {/* Category Quick Access */}
                    <div className="mb-12">
                        <h2 className="mb-6">KATEGORI POPULER</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`card-brutalist text-center py-8 ${selectedCategory === category.id ? 'bg-brutalist-accent' : ''
                                        }`}
                                >
                                    <div className="text-2xl font-bold uppercase">{category.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div id="events-section" className="mb-8">
                        <h2 className="mb-6">CARI EVENT</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Input */}
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    className="input-brutalist"
                                    placeholder="CARI EVENT ATAU LOKASI..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Category Filter */}
                            <div>
                                <select
                                    className="input-brutalist w-full"
                                    value={selectedCategory ?? ''}
                                    onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                                >
                                    <option value="">SEMUA KATEGORI</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(selectedCategory || searchQuery) && (
                            <div className="mt-4 flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold uppercase">FILTER AKTIF:</span>
                                {selectedCategory && (
                                    <button
                                        className="bg-brutalist-accent px-3 py-1 text-xs font-bold uppercase border-2 border-black"
                                        onClick={() => setSelectedCategory(null)}
                                    >
                                        {categories.find(c => c.id === selectedCategory)?.name} ✕
                                    </button>
                                )}
                                {searchQuery && (
                                    <button
                                        className="bg-brutalist-accent px-3 py-1 text-xs font-bold uppercase border-2 border-black"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        "{searchQuery}" ✕
                                    </button>
                                )}
                                <button
                                    className="btn-brutalist text-xs py-1 px-3"
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSearchQuery('');
                                    }}
                                >
                                    RESET SEMUA
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Event Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2>DAFTAR EVENT</h2>
                            <div className="text-sm font-bold">
                                MENAMPILKAN {filteredEvents.length} EVENT
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.length === 0 ? (
                                <div className="col-span-full text-center py-16">
                                    <div className="card-brutalist-no-hover inline-block">
                                        <h3 className="text-2xl font-bold uppercase mb-2">TIDAK ADA EVENT</h3>
                                        <p className="text-sm mb-4">Coba ubah filter atau kata kunci pencarian</p>
                                        <button
                                            className="btn-brutalist-accent"
                                            onClick={() => {
                                                setSelectedCategory(null);
                                                setSearchQuery('');
                                            }}
                                        >
                                            RESET FILTER
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                filteredEvents.map(event => (
                                    <EventCard
                                        key={event.id}
                                        {...event}
                                        onBuyClick={() => {
                                            window.location.href = `/events/${event.id}`;
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="border-t-3 border-black bg-brutalist-dirty py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card-brutalist-no-hover">
                                <h3 className="text-xl mb-4">TANPA PEMBAYARAN</h3>
                                <p className="text-sm">
                                    Sistem simulasi ticketing. Tidak ada pembayaran yang diperlukan.
                                    Tiket langsung tercatat setelah konfirmasi.
                                </p>
                            </div>
                            <div className="card-brutalist-no-hover">
                                <h3 className="text-xl mb-4">PROSES CEPAT</h3>
                                <p className="text-sm">
                                    Pemesanan tiket hanya butuh beberapa klik. Pilih event, pilih tiket,
                                    isi data, selesai!
                                </p>
                            </div>
                            <div className="card-brutalist-no-hover">
                                <h3 className="text-xl mb-4">TIKET DIGITAL</h3>
                                <p className="text-sm">
                                    Semua tiket tersimpan dalam format digital. Akses kapan saja dari
                                    halaman riwayat pembelian.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="border-t-3 border-black bg-brutalist-black text-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h3 className="text-xl mb-4">TICKETING SYSTEM</h3>
                                <p className="text-sm opacity-80">
                                    Platform ticketing event terbesar di Indonesia dengan desain Brutalist yang unik.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl mb-4">NAVIGASI</h3>
                                <div className="space-y-2 text-sm">
                                    <div><a href="/" className="hover:text-brutalist-accent transition-colors">BERANDA</a></div>
                                    <div><a href="/purchases" className="hover:text-brutalist-accent transition-colors">RIWAYAT PEMBELIAN</a></div>
                                    <div><a href="/admin/dashboard" className="hover:text-brutalist-accent transition-colors">ADMIN PANEL</a></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl mb-4">INFORMASI</h3>
                                <div className="space-y-2 text-sm opacity-80">
                                    <div>SISTEM SIMULASI</div>
                                    <div>TANPA PEMBAYARAN</div>
                                    <div>BRUTALIST DESIGN</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 border-white pt-6 text-center">
                            <div className="text-xs font-bold uppercase tracking-wider">
                                SISTEM TICKETING EVENT © 2026 - BRUTALIST DESIGN - NO PAYMENT REQUIRED
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
