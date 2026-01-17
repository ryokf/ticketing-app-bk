import { Head } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';

interface TransactionDetail {
    id: number;
    eventTitle: string;
    ticketType: string;
    price: number;
    quantity: number;
}

interface Transaction {
    id: number;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalPrice: number;
    status: string;
    date: string;
    details: TransactionDetail[];
}

interface TransactionShowProps {
    transaction: Transaction;
}

export default function TransactionShow({ transaction }: TransactionShowProps) {
    const handlePrint = () => {
        window.print();
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <>
            <Head title={`Detail Transaksi ${transaction.orderNumber}`} />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">DETAIL TRANSAKSI</h1>
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
                            {/* Order Info */}
                            <div className="border-3 border-black p-8 mb-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            NOMOR PESANAN
                                        </div>
                                        <div className="text-3xl font-bold">
                                            {transaction.orderNumber}
                                        </div>
                                    </div>
                                    <span className={`font-bold uppercase text-sm px-3 py-2 border-2 border-black ${
                                        transaction.status === 'completed' 
                                            ? 'bg-green-200' 
                                            : 'bg-yellow-200'
                                    }`}>
                                        {transaction.status === 'completed' ? 'SELESAI' : 'PENDING'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            NAMA PELANGGAN
                                        </div>
                                        <div className="font-bold">{transaction.customerName}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            EMAIL
                                        </div>
                                        <div className="font-bold">{transaction.customerEmail}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            TANGGAL
                                        </div>
                                        <div className="font-bold">
                                            {new Date(transaction.date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                                            JUMLAH TIKET
                                        </div>
                                        <div className="font-bold">{transaction.details.length} Tiket</div>
                                    </div>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="border-3 border-black p-8">
                                <h2 className="text-xl font-bold uppercase mb-6">DETAIL TIKET</h2>
                                <div className="space-y-4">
                                    {transaction.details.map((detail) => (
                                        <div key={detail.id} className="border-b-2 border-black pb-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <div className="font-bold text-sm uppercase">
                                                        {detail.eventTitle}
                                                    </div>
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        Tipe: {detail.ticketType}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold">
                                                        Rp{(detail.price).toLocaleString('id-ID')}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        x {detail.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            {/* Summary */}
                            <div className="border-3 border-black p-8 mb-6">
                                <h3 className="text-sm font-bold uppercase mb-6">RINGKASAN</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm">SUBTOTAL</span>
                                        <span className="font-bold">
                                            Rp{(transaction.totalPrice).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">PPN (0%)</span>
                                        <span className="font-bold">Rp0</span>
                                    </div>
                                    <div className="border-t-2 border-black pt-4">
                                        <div className="flex justify-between">
                                            <span className="font-bold uppercase text-sm">TOTAL</span>
                                            <span className="text-2xl font-bold">
                                                Rp{(transaction.totalPrice).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <BrutalistButton
                                    variant="accent"
                                    onClick={handlePrint}
                                    className="w-full"
                                >
                                    🖨️ CETAK
                                </BrutalistButton>
                                <a
                                    href="/admin/transactions"
                                    className="btn-brutalist w-full text-center block"
                                >
                                    LIHAT SEMUA TRANSAKSI
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
