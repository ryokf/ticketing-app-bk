import { Head } from '@inertiajs/react';
import BrutalistCard from '@/components/BrutalistCard';

interface DashboardStats {
    totalEvents: number;
    totalCategories: number;
    totalTransactions: number;
    totalRevenue: number;
}

interface RecentTransaction {
    id: number;
    orderNumber: string;
    customerName: string;
    eventName: string;
    totalPrice: number;
    date: string;
}

interface AdminDashboardProps {
    stats: DashboardStats;
    recentTransactions: RecentTransaction[];
}

export default function AdminDashboard({
    stats = { totalEvents: 0, totalCategories: 0, totalTransactions: 0, totalRevenue: 0 },
    recentTransactions = []
}: AdminDashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-white">ADMIN DASHBOARD</h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <BrutalistCard hover={false}>
                            <div className="text-xs font-bold uppercase mb-2">TOTAL EVENT</div>
                            <div className="text-5xl font-bold">{stats.totalEvents}</div>
                        </BrutalistCard>

                        <BrutalistCard hover={false}>
                            <div className="text-xs font-bold uppercase mb-2">TOTAL KATEGORI</div>
                            <div className="text-5xl font-bold">{stats.totalCategories}</div>
                        </BrutalistCard>

                        <BrutalistCard hover={false}>
                            <div className="text-xs font-bold uppercase mb-2">TOTAL TRANSAKSI</div>
                            <div className="text-5xl font-bold">{stats.totalTransactions}</div>
                        </BrutalistCard>

                        <BrutalistCard hover={false}>
                            <div className="text-xs font-bold uppercase mb-2">TOTAL PENDAPATAN</div>
                            <div className="text-2xl font-bold">
                                Rp {stats.totalRevenue.toLocaleString('id-ID')}
                            </div>
                        </BrutalistCard>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-12">
                        <h2 className="mb-4">AKSI CEPAT</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button
                                onClick={() => window.location.href = '/admin/categories'}
                                className="btn-brutalist-accent w-full py-4"
                            >
                                KELOLA KATEGORI
                            </button>
                            <button
                                onClick={() => window.location.href = '/admin/events'}
                                className="btn-brutalist-accent w-full py-4"
                            >
                                KELOLA EVENT
                            </button>
                            <button
                                onClick={() => window.location.href = '/admin/tickets'}
                                className="btn-brutalist-accent w-full py-4"
                            >
                                KELOLA TIKET
                            </button>
                            <button
                                onClick={() => window.location.href = '/admin/transactions'}
                                className="btn-brutalist-accent w-full py-4"
                            >
                                LIHAT TRANSAKSI
                            </button>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div>
                        <h2 className="mb-4">TRANSAKSI TERBARU</h2>

                        {recentTransactions.length === 0 ? (
                            <div className="card-brutalist-no-hover text-center py-12">
                                <div className="text-sm uppercase">BELUM ADA TRANSAKSI</div>
                            </div>
                        ) : (
                            <table className="table-brutalist">
                                <thead>
                                    <tr>
                                        <th>NO. ORDER</th>
                                        <th>NAMA PEMBELI</th>
                                        <th>EVENT</th>
                                        <th>TOTAL</th>
                                        <th>TANGGAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td className="font-bold">{transaction.orderNumber}</td>
                                            <td>{transaction.customerName}</td>
                                            <td>{transaction.eventName}</td>
                                            <td>Rp {transaction.totalPrice.toLocaleString('id-ID')}</td>
                                            <td>{transaction.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
