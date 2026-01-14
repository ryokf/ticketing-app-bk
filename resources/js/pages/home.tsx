import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MarqueeBrutalist from '@/components/MarqueeBrutalist';
import EventCard from '@/components/EventCard';
import BrutalistInput from '@/components/BrutalistInput';
import BrutalistButton from '@/components/BrutalistButton';

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
                {/* Marquee Effect */}
                <MarqueeBrutalist text="← TIKET MURAH - TIKET KONSER - BELI SEKARANG →" />

                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-center mb-8">
                        TIKET TERSEDIA<br />SEKARANG
                    </h1>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Input */}
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    className="input-brutalist"
                                    placeholder="CARI EVENT..."
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

                        {/* Filter Tags */}
                        {selectedCategory && (
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-xs font-bold uppercase">FILTER AKTIF:</span>
                                <button
                                    className="bg-brutalist-accent px-3 py-1 text-xs font-bold uppercase border-2 border-black"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    {categories.find(c => c.id === selectedCategory)?.name} ✕
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Event Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.length === 0 ? (
                            <div className="col-span-full text-center py-16">
                                <div className="card-brutalist-no-hover inline-block">
                                    <h3 className="text-2xl font-bold uppercase mb-2">TIDAK ADA EVENT</h3>
                                    <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
                                </div>
                            </div>
                        ) : (
                            filteredEvents.map(event => (
                                <EventCard
                                    key={event.id}
                                    {...event}
                                    onBuyClick={() => {
                                        // Navigate to event detail
                                        window.location.href = `/events/${event.id}`;
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="border-t-3 border-black bg-brutalist-dirty py-8 mt-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="text-xs font-bold uppercase tracking-wider">
                            SISTEM TICKETING EVENT © 2026
                        </div>
                        <div className="text-xs mt-2">
                            BRUTALIST DESIGN - NO PAYMENT REQUIRED
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
