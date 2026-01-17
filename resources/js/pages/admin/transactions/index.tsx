import { Head } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistTable from '@/components/BrutalistTable';

interface Transaction {
    id: number;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    eventName: string;
    ticketQuantity: number;
    totalPrice: number;
    status: string;
    date: string;
}

interface TransactionsIndexProps {
    transactions: Transaction[];
}

export default function TransactionsIndex({ transactions = [] }: TransactionsIndexProps) {
    const handleView = (id: number) => {
        window.location.href = `/admin/transactions/${id}`;
    };

    const handleExport = () => {
        alert('FITUR EXPORT SEDANG DIKEMBANGKAN');
    };

    const columns = [
        {
            header: 'NO. PESANAN',
            accessor: 'orderNumber',
        },
        {
            header: 'NAMA PELANGGAN',
            accessor: 'customerName',
        },
        {
            header: 'EMAIL',
            accessor: 'customerEmail',
        },
        {
            header: 'EVENT',
            accessor: 'eventName',
        },
        {
            header: 'JML TIKET',
            accessor: 'ticketQuantity',
        },
        {
            header: 'TOTAL',
            accessor: 'totalPrice',
            render: (value: number) => `Rp${(value).toLocaleString('id-ID')}`,
        },
        {
            header: 'STATUS',
            accessor: 'status',
            render: (value: string) => (
                <span className={`font-bold uppercase text-xs px-2 py-1 border-2 border-black ${
                    value === 'completed' ? 'bg-green-200' : 'bg-yellow-200'
                }`}>
                    {value === 'completed' ? 'SELESAI' : 'PENDING'}
                </span>
            ),
        },
        {
            header: 'TANGGAL',
            accessor: 'date',
            render: (value: string) => new Date(value).toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
        },
        {
            header: 'AKSI',
            accessor: 'id',
            render: (id: number) => (
                <button
                    className="btn-brutalist text-xs py-1 px-3"
                    onClick={() => handleView(id)}
                >
                    LIHAT
                </button>
            ),
        },
    ];

    const totalTransactions = transactions.length;
    const totalRevenue = transactions.reduce((sum, t) => sum + t.totalPrice, 0);
    const completedTransactions = transactions.filter(t => t.status === 'completed').length;

    return (
        <>
            <Head title="Kelola Transaksi" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">KELOLA TRANSAKSI</h1>
                        <button
                            onClick={() => window.location.href = '/admin/dashboard'}
                            className="btn-brutalist-outline text-white border-white hover:bg-white hover:text-black"
                        >
                            ← DASHBOARD
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">TOTAL TRANSAKSI</div>
                            <div className="text-4xl font-bold">{totalTransactions}</div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">TOTAL REVENUE</div>
                            <div className="text-3xl font-bold">
                                Rp{(totalRevenue).toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">SELESAI</div>
                            <div className="text-4xl font-bold">{completedTransactions}</div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">AVG REVENUE</div>
                            <div className="text-3xl font-bold">
                                Rp{(totalTransactions > 0 ? totalRevenue / totalTransactions : 0).toLocaleString('id-ID')}
                            </div>
                        </div>
                    </div>

                    {/* Export Button */}
                    <div className="mb-6">
                        <BrutalistButton
                            variant="accent"
                            onClick={handleExport}
                        >
                            📊 EXPORT DATA
                        </BrutalistButton>
                    </div>

                    {/* Table */}
                    {transactions.length === 0 ? (
                        <div className="border-3 border-black p-12 text-center">
                            <h3 className="text-xl font-bold uppercase mb-4">TIDAK ADA TRANSAKSI</h3>
                            <p className="text-sm">Belum ada pembelian tiket</p>
                        </div>
                    ) : (
                        <BrutalistTable columns={columns} data={transactions} />
                    )}
                </div>
            </div>
        </>
    );
}
