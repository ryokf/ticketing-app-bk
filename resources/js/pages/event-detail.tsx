import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import TicketCard from '@/components/TicketCard';
import { type SharedData } from '@/types';

interface Ticket {
    id: number;
    type: string;
    price: number;
    stock: number;
}

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
    tickets: Ticket[];
}

interface EventDetailProps {
    event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    console.log(event)

    const handleBuyTicket = async () => {
        if (!selectedTicket) {
            alert('PILIH TIKET TERLEBIH DAHULU');
            return;
        }

        if (!auth.user) {
            // Redirect to login if not authenticated
            window.location.href = '/login';
            return;
        }

        // Check if user is admin
        if ((auth.user as any).isAdmin) {
            alert('ADMIN TIDAK DAPAT MEMBELI TIKET. Silakan gunakan akun pembeli untuk membeli tiket.');
            return;
        }

        setIsLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            if (!csrfToken) {
                alert('CSRF token tidak ditemukan. Silakan refresh halaman.');
                setIsLoading(false);
                return;
            }

            const response = await fetch('/buy-now', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({
                    event_id: event.id,
                    ticket_id: selectedTicket,
                    quantity: quantity,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('PEMBELIAN TIKET BERHASIL! Silakan cek riwayat pembelian Anda.');
                window.location.href = '/purchases';
            } else {
                alert(data.error || 'Terjadi kesalahan saat membeli tiket');
                console.error('Error response:', data);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(event.ticket)

    const selectedTicketData = event.tickets.find(t => t.id === selectedTicket);
    const totalPrice = selectedTicketData ? selectedTicketData.price * quantity : 0;

    return (
        <>
            <Head title={`${event.title} - Event Detail`} />

            <div className="min-h-screen bg-white">
                {/* Header/Navigation */}
                <div className="border-b-3 border-black bg-white">
                    <div className="container mx-auto px-4 py-4">
                        <button
                            onClick={() => window.history.back()}
                            className="btn-brutalist-outline"
                        >
                            ← KEMBALI
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Event Image */}
                        <div>
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full border-3 border-black img-brutalist-contrast"
                            />
                        </div>

                        {/* Event Info */}
                        <div>
                            <div className="card-brutalist-no-hover mb-6">
                                <div className="space-y-4">
                                    {/* Category */}
                                    <div className="border-b-2 border-black pb-2">
                                        <div className="text-xs font-bold uppercase mb-1">KATEGORI:</div>
                                        <div className="bg-brutalist-accent inline-block px-3 py-1 border-2 border-black">
                                            {event.category}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div className="border-b-2 border-black pb-2">
                                        <h1 className="text-4xl">{event.title}</h1>
                                    </div>

                                    {/* Date */}
                                    <div className="border-b-2 border-black pb-2">
                                        <div className="text-xs font-bold uppercase mb-1">TANGGAL:</div>
                                        <div className="text-lg">{event.date}</div>
                                    </div>

                                    {/* Location */}
                                    <div className="border-b-2 border-black pb-2">
                                        <div className="text-xs font-bold uppercase mb-1">LOKASI:</div>
                                        <div className="text-lg">{event.location}</div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <div className="text-xs font-bold uppercase mb-2">DESKRIPSI:</div>
                                        <div className="text-sm leading-relaxed">{event.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Selection */}
                    <div className="mt-12">
                        <h2 className="mb-6">PILIH TIKET</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {event.tickets.map(ticket => (
                                <TicketCard
                                    key={ticket.id}
                                    {...ticket}
                                    selected={selectedTicket === ticket.id}
                                    onSelect={() => setSelectedTicket(ticket.id)}
                                />
                            ))}
                        </div>

                        {/* Quantity and Total */}
                        {selectedTicket && (
                            <div className="card-brutalist-no-hover max-w-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Quantity Selector */}
                                    <div>
                                        <label className="text-xs font-bold uppercase mb-2 block">
                                            JUMLAH TIKET:
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="btn-brutalist w-12 h-12"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                -
                                            </button>
                                            <div className="input-brutalist text-center w-20">
                                                {quantity}
                                            </div>
                                            <button
                                                className="btn-brutalist w-12 h-12"
                                                onClick={() => setQuantity(Math.min(selectedTicketData?.stock || 1, quantity + 1))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total Price */}
                                    <div>
                                        <label className="text-xs font-bold uppercase mb-2 block">
                                            TOTAL HARGA:
                                        </label>
                                        <div className="text-4xl font-bold">
                                            Rp {totalPrice.toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                </div>

                                {/* Buy Button */}
                                <div className="mt-6">
                                    <BrutalistButton
                                        variant="accent"
                                        className="w-full text-lg py-4"
                                        onClick={handleBuyTicket}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'MEMPROSES...' : 'BELI TIKET SEKARANG'}
                                    </BrutalistButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
