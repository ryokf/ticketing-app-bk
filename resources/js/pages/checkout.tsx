import { Head } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

interface CheckoutProps {
    ticket: {
        id: number;
        type: string;
        price: number;
        event: {
            title: string;
            date: string;
            location: string;
        };
    };
    quantity: number;
}

export default function Checkout({ ticket, quantity }: CheckoutProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const totalPrice = ticket.price * quantity;

    const handleConfirmPurchase = () => {
        if (!name || !email || !phone) {
            alert('ISI SEMUA DATA TERLEBIH DAHULU');
            return;
        }

        // Simulate purchase (no payment required)
        alert('PEMBELIAN BERHASIL!');
        window.location.href = '/purchases';
    };

    return (
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
                                        <td>{ticket.event.title}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">TANGGAL:</td>
                                        <td>{ticket.event.date}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">LOKASI:</td>
                                        <td>{ticket.event.location}</td>
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
                                        >
                                            KONFIRMASI PEMBELIAN
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
