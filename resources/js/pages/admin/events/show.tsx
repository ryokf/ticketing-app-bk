import { Head } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';

interface Ticket {
    id: number;
    type: string;
    price: number;
    quota: number;
}

interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    category: string;
    image: string;
    tickets?: Ticket[];
}

interface EventShowProps {
    event: Event;
}

export default function EventShow({ event }: EventShowProps) {
    const handleEdit = () => {
        window.location.href = `/admin/events/${event.id}/edit`;
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <Head title={`Detail Event - ${event.title}`} />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">DETAIL EVENT</h1>
                        <button
                            onClick={handleBack}
                            className="btn-brutalist-outline text-white border-white hover:bg-white hover:text-black"
                        >
                            ← KEMBALI
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Image */}
                            {event.image && (
                                <div className="border-3 border-black mb-8 overflow-hidden bg-brutalist-dirty aspect-video">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Info */}
                            <div className="border-3 border-black p-8 mb-8">
                                <div className="mb-6">
                                    <span className="text-xs font-bold uppercase text-gray-500 bg-brutalist-dirty px-3 py-1">
                                        {event.category}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold mb-4 uppercase">{event.title}</h1>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            TANGGAL & WAKTU
                                        </div>
                                        <div className="font-bold">
                                            {new Date(event.date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            LOKASI
                                        </div>
                                        <div className="font-bold">{event.location}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border-3 border-black p-8 mb-8">
                                <h2 className="text-xl font-bold uppercase mb-4">DESKRIPSI</h2>
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Tickets */}
                            {event.tickets && event.tickets.length > 0 && (
                                <div className="border-3 border-black p-8">
                                    <h2 className="text-xl font-bold uppercase mb-6">DAFTAR TIKET</h2>
                                    <div className="space-y-4">
                                        {event.tickets.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="border-b-2 border-black pb-4 flex justify-between items-center"
                                            >
                                                <div>
                                                    <div className="font-bold uppercase">
                                                        {ticket.type}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Quota: {ticket.quota}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-lg">
                                                        Rp{(ticket.price).toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div>
                            {/* Actions */}
                            <div className="space-y-3 sticky top-4">
                                <BrutalistButton
                                    variant="accent"
                                    onClick={handleEdit}
                                    className="w-full"
                                >
                                    ✏️ EDIT EVENT
                                </BrutalistButton>
                                <a
                                    href="/admin/events"
                                    className="btn-brutalist w-full text-center block"
                                >
                                    LIHAT SEMUA EVENT
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
