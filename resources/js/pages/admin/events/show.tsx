import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

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
    const [showAddTicket, setShowAddTicket] = useState(false);
    const [editingTicket, setEditingTicket] = useState<number | null>(null);

    // Form for adding new ticket
    const { data: addData, setData: setAddData, post, reset } = useForm({
        type: '',
        price: '',
        stock: '',
    });

    // Form for editing ticket
    const { data: editData, setData: setEditData, put } = useForm({
        type: '',
        price: '',
        stock: '',
    });

    const handleEdit = () => {
        window.location.href = `/admin/events/${event.id}/edit`;
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleAddTicket = (e: React.FormEvent) => {
        e.preventDefault();

        if (!addData.type || !addData.price || !addData.stock) {
            alert('SEMUA FIELD HARUS DIISI');
            return;
        }

        post(`/admin/events/${event.id}/tickets`, {
            onSuccess: () => {
                setShowAddTicket(false);
                reset();
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            },
        });
    };

    const handleEditTicket = (ticket: Ticket) => {
        setEditingTicket(ticket.id);
        setEditData({
            type: ticket.type,
            price: ticket.price.toString(),
            stock: ticket.stock.toString(),
        });
    };

    const handleUpdateTicket = (e: React.FormEvent, ticketId: number) => {
        e.preventDefault();

        put(`/admin/events/${event.id}/tickets/${ticketId}`, {
            onSuccess: () => {
                setEditingTicket(null);
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            },
        });
    };

    const handleDeleteTicket = (ticketId: number, ticketType: string) => {
        if (confirm(`YAKIN INGIN MENGHAPUS TIKET "${ticketType}"?`)) {
            router.delete(`/admin/events/${event.id}/tickets/${ticketId}`, {
                onSuccess: () => {
                    // Redirect handled by backend
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                    alert('GAGAL MENGHAPUS TIKET');
                },
            });
        }
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

                            {/* Ticket Management Section */}
                            <div className="border-3 border-black p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold uppercase">KELOLA TIKET</h2>
                                    <BrutalistButton
                                        variant="accent"
                                        onClick={() => setShowAddTicket(!showAddTicket)}
                                    >
                                        {showAddTicket ? '✕ BATAL' : '+ TAMBAH TIKET'}
                                    </BrutalistButton>
                                </div>

                                {/* Add Ticket Form */}
                                {showAddTicket && (
                                    <div className="border-2 border-black p-6 mb-6 bg-brutalist-dirty">
                                        <h3 className="text-sm font-bold uppercase mb-4">FORM TAMBAH TIKET</h3>
                                        <form onSubmit={handleAddTicket} className="space-y-4">
                                            <BrutalistInput
                                                label="TIPE TIKET:"
                                                type="text"
                                                placeholder="Contoh: VIP, REGULER, EARLY BIRD..."
                                                value={addData.type}
                                                onChange={(e) => setAddData('type', e.target.value)}
                                                required
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <BrutalistInput
                                                    label="HARGA (Rp):"
                                                    type="number"
                                                    placeholder="0"
                                                    value={addData.price}
                                                    onChange={(e) => setAddData('price', e.target.value)}
                                                    required
                                                />
                                                <BrutalistInput
                                                    label="STOK:"
                                                    type="number"
                                                    placeholder="0"
                                                    value={addData.stock}
                                                    onChange={(e) => setAddData('stock', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <BrutalistButton type="submit" variant="accent" className="w-full">
                                                SIMPAN TIKET
                                            </BrutalistButton>
                                        </form>
                                    </div>
                                )}

                                {/* Tickets List */}
                                {event.tickets && event.tickets.length > 0 ? (
                                    <div className="space-y-3">
                                        {event.tickets.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="border-2 border-black p-4"
                                            >
                                                {editingTicket === ticket.id ? (
                                                    // Edit Form
                                                    <form onSubmit={(e) => handleUpdateTicket(e, ticket.id)} className="space-y-4">
                                                        <h3 className="text-sm font-bold uppercase mb-4">EDIT TIKET</h3>
                                                        <BrutalistInput
                                                            label="TIPE TIKET:"
                                                            type="text"
                                                            placeholder="Contoh: VIP, REGULER, EARLY BIRD..."
                                                            value={editData.type}
                                                            onChange={(e) => setEditData('type', e.target.value)}
                                                            required
                                                        />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <BrutalistInput
                                                                label="HARGA (Rp):"
                                                                type="number"
                                                                placeholder="0"
                                                                value={editData.price}
                                                                onChange={(e) => setEditData('price', e.target.value)}
                                                                required
                                                            />
                                                            <BrutalistInput
                                                                label="STOK:"
                                                                type="number"
                                                                placeholder="0"
                                                                value={editData.stock}
                                                                onChange={(e) => setEditData('stock', e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <BrutalistButton type="submit" variant="accent" className="flex-1">
                                                                UPDATE TIKET
                                                            </BrutalistButton>
                                                            <BrutalistButton
                                                                type="button"
                                                                variant="secondary"
                                                                onClick={() => setEditingTicket(null)}
                                                                className="flex-1"
                                                            >
                                                                BATAL
                                                            </BrutalistButton>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    // Display View
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex-1">
                                                            <div className="font-bold uppercase text-lg mb-1">
                                                                {ticket.type}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                Stok: <span className="font-bold">{ticket.stock}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-right mr-4">
                                                                <div className="font-bold text-xl">
                                                                    Rp {ticket.price.toLocaleString('id-ID')}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    className="btn-brutalist text-xs py-2 px-3"
                                                                    onClick={() => handleEditTicket(ticket)}
                                                                >
                                                                    EDIT
                                                                </button>
                                                                <button
                                                                    className="bg-red-600 text-white border-2 border-black font-mono font-bold text-xs uppercase px-3 py-2 shadow-brutalist hover:bg-red-700"
                                                                    onClick={() => handleDeleteTicket(ticket.id, ticket.type)}
                                                                >
                                                                    HAPUS
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="border-2 border-black p-8 text-center bg-brutalist-dirty">
                                        <div className="text-sm uppercase mb-2">BELUM ADA TIKET</div>
                                        <div className="text-xs text-gray-600">
                                            Klik tombol "TAMBAH TIKET" untuk menambahkan tiket pertama
                                        </div>
                                    </div>
                                )}
                            </div>
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

                                {/* Ticket Stats */}
                                {event.tickets && event.tickets.length > 0 && (
                                    <div className="border-3 border-black p-4 mt-6">
                                        <div className="text-xs font-bold uppercase mb-3">STATISTIK TIKET</div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Total Tipe:</span>
                                                <span className="font-bold">{event.tickets.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Total Stok:</span>
                                                <span className="font-bold">
                                                    {event.tickets.reduce((sum, t) => sum + t.stock, 0)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm border-t-2 border-black pt-2">
                                                <span>Harga Terendah:</span>
                                                <span className="font-bold">
                                                    Rp {Math.min(...event.tickets.map(t => t.price)).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Harga Tertinggi:</span>
                                                <span className="font-bold">
                                                    Rp {Math.max(...event.tickets.map(t => t.price)).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
