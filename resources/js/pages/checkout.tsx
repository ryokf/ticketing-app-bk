import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

interface Ticket {
    id: number;
    type: string;
    price: number;
}

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
}

interface CheckoutProps {
    event: Event;
    ticket: Ticket;
    quantity: number;
}

export default function Checkout({ event, ticket, quantity }: CheckoutProps) {
    const totalPrice = ticket.price * quantity;
    const [isProcessing, setIsProcessing] = useState(false);

    const { data, setData, post, errors } = useForm({
        event_id: event.id,
        ticket_id: ticket.id,
        quantity: quantity,
        total_price: totalPrice,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
    });

    const handleConfirmPurchase = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.customer_name || !data.customer_email || !data.customer_phone) {
            alert('ISI SEMUA DATA TERLEBIH DAHULU');
            return;
        }

        setIsProcessing(true);
        post('/purchases', {
            onSuccess: () => {
                setIsProcessing(false);
            },
            onError: (err) => {
                setIsProcessing(false);
                console.error('Error:', err);
            },
        });
    };

        <>
            <Head title="Checkout - Konfirmasi Pembelian" />

            <div className="min-h-screen bg-white">
                {/* Header */}
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
                    <h1 className="mb-8 text-center">KONFIRMASI PEMBELIAN</h1>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <div>
                            <h3 className="mb-4">RINGKASAN PESANAN</h3>

                            <table className="table-brutalist">
                                <tbody>
                                    <tr>
                                        <td className="font-bold">EVENT:</td>
                                        <td>{event.title}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">TANGGAL:</td>
                                        <td>{event.date}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">LOKASI:</td>
                                        <td>{event.location}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">TIPE TIKET:</td>
                                        <td>{ticket.type}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">HARGA SATUAN:</td>
                                        <td>Rp {ticket.price.toLocaleString('id-ID')}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">JUMLAH:</td>
                                        <td>{quantity}x</td>
                                    </tr>
                                    <tr className="bg-brutalist-accent">
                                        <td className="font-bold text-lg">TOTAL:</td>
                                        <td className="font-bold text-lg">
                                            Rp {totalPrice.toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Customer Information Form */}
                        <div>
                            <h3 className="mb-4">DATA PEMBELI</h3>

                            <div className="card-brutalist-no-hover">
                                <form className="form-brutalist" onSubmit={handleConfirmPurchase}>
                                    <BrutalistInput
                                        label="NAMA LENGKAP:"
                                        type="text"
                                        placeholder="MASUKKAN NAMA..."
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        required
                                    />
                                    {errors.customer_name && (
                                        <div className="text-red-600 text-xs mb-2">{errors.customer_name}</div>
                                    )}

                                    <BrutalistInput
                                        label="EMAIL:"
                                        type="email"
                                        placeholder="MASUKKAN EMAIL..."
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        required
                                    />
                                    {errors.customer_email && (
                                        <div className="text-red-600 text-xs mb-2">{errors.customer_email}</div>
                                    )}

                                    <BrutalistInput
                                        label="NO. TELEPON:"
                                        type="tel"
                                        placeholder="MASUKKAN NO. TELEPON..."
                                        value={data.customer_phone}
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        required
                                    />
                                    {errors.customer_phone && (
                                        <div className="text-red-600 text-xs mb-2">{errors.customer_phone}</div>
                                    )}

                                    <div className="mt-6">
                                        <BrutalistButton
                                            type="submit"
                                            variant="accent"
                                            className="w-full text-lg py-4"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? 'MEMPROSES...' : 'KONFIRMASI PEMBELIAN'}
                                        </BrutalistButton>
                                    </div>

                                    <div className="mt-4 p-4 border-2 border-black bg-brutalist-dirty">
                                        <div className="text-xs font-bold uppercase mb-2">CATATAN:</div>
                                        <div className="text-xs">
                                            Sistem ini adalah simulasi. Tidak ada pembayaran yang diperlukan.
                                            Tiket akan langsung tercatat setelah konfirmasi.
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
                            <h3 className="mb-4">DATA PEMBELI</h3>

                            <div className="card-brutalist-no-hover">
                                <form className="form-brutalist" onSubmit={(e) => {
                                    e.preventDefault();
                                    handleConfirmPurchase();
                                }}>
                                    <BrutalistInput
                                        label="NAMA LENGKAP:"
                                        type="text"
                                        placeholder="MASUKKAN NAMA..."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />

                                    <BrutalistInput
                                        label="EMAIL:"
                                        type="email"
                                        placeholder="MASUKKAN EMAIL..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <BrutalistInput
                                        label="NO. TELEPON:"
                                        type="tel"
                                        placeholder="MASUKKAN NO. TELEPON..."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />

                                    <div className="mt-6">
                                        <BrutalistButton
                                            type="submit"
                                            variant="accent"
                                            className="w-full text-lg py-4"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? 'MEMPROSES...' : 'KONFIRMASI PEMBELIAN'}
                                        </BrutalistButton>
                                    </div>

                                    <div className="mt-4 p-4 border-2 border-black bg-brutalist-dirty">
                                        <div className="text-xs font-bold uppercase mb-2">CATATAN:</div>
                                        <div className="text-xs">
                                            Sistem ini adalah simulasi. Tidak ada pembayaran yang diperlukan.
                                            Tiket akan langsung tercatat setelah konfirmasi.
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
