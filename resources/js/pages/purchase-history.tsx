import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DigitalTicket from '@/components/DigitalTicket';

interface Purchase {
    id: number;
    orderNumber: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    ticketType: string;
    quantity: number;
    totalPrice: number;
    purchaseDate: string;
}

interface PurchaseHistoryProps {
    purchases: Purchase[];
}

export default function PurchaseHistory({ purchases = [] }: PurchaseHistoryProps) {
    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

    return (
        <>
            <Head title="Riwayat Pembelian" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-white">
                    <div className="container mx-auto px-4 py-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="btn-brutalist-outline"
                        >
                            ← BERANDA
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <h1 className="mb-8 text-center">RIWAYAT PEMBELIAN</h1>

                    {purchases.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="card-brutalist-no-hover inline-block">
                                <h3 className="text-2xl font-bold uppercase mb-2">BELUM ADA PEMBELIAN</h3>
                                <p className="text-sm mb-4">Anda belum melakukan pembelian tiket</p>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="btn-brutalist-accent"
                                >
                                    LIHAT EVENT
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Purchase List */}
                            <div>
                                <h3 className="mb-4">DAFTAR TRANSAKSI</h3>

                                <table className="table-brutalist">
                                    <thead>
                                        <tr>
                                            <th>NO. ORDER</th>
                                            <th>EVENT</th>
                                            <th>TANGGAL</th>
                                            <th>TOTAL</th>
                                            <th>AKSI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchases.map(purchase => (
                                            <tr key={purchase.id}>
                                                <td className="font-bold">{purchase.orderNumber}</td>
                                                <td>{purchase.eventName}</td>
                                                <td>{purchase.purchaseDate}</td>
                                                <td>Rp {purchase.totalPrice.toLocaleString('id-ID')}</td>
                                                <td>
                                                    <button
                                                        className="btn-brutalist text-xs py-1 px-2"
                                                        onClick={() => setSelectedPurchase(purchase)}
                                                    >
                                                        LIHAT
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Digital Ticket Display */}
                            <div>
                                <h3 className="mb-4">TIKET DIGITAL</h3>

                                {selectedPurchase ? (
                                    <DigitalTicket {...selectedPurchase} />
                                ) : (
                                    <div className="card-brutalist-no-hover text-center py-12">
                                        <div className="text-sm uppercase">
                                            PILIH TRANSAKSI UNTUK MELIHAT TIKET
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
