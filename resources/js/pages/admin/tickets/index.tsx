import { Head } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistTable from '@/components/BrutalistTable';

interface Ticket {
    id: number;
    eventTitle: string;
    type: string;
    price: number;
    quota: number;
    sold: number;
    available: number;
    createdAt: string;
}

interface TicketsIndexProps {
    tickets: Ticket[];
}

export default function TicketsIndex({ tickets = [] }: TicketsIndexProps) {
    const handleEdit = (id: number) => {
        window.location.href = `/admin/tickets/${id}/edit`;
    };

    const handleDelete = (id: number, type: string) => {
        if (confirm(`YAKIN INGIN MENGHAPUS TIKET "${type}"?`)) {
            // Handle delete via API
            alert('TIKET BERHASIL DIHAPUS');
        }
    };

    const columns = [
        {
            header: 'ID',
            accessor: 'id',
        },
        {
            header: 'EVENT',
            accessor: 'eventTitle',
        },
        {
            header: 'TIPE TIKET',
            accessor: 'type',
        },
        {
            header: 'HARGA',
            accessor: 'price',
            render: (value: number) => `Rp${(value).toLocaleString('id-ID')}`,
        },
        {
            header: 'QUOTA',
            accessor: 'quota',
        },
        {
            header: 'TERJUAL',
            accessor: 'sold',
        },
        {
            header: 'TERSEDIA',
            accessor: 'available',
            render: (value: number, row: Ticket) => (
                <span className={value <= 10 ? 'font-bold text-red-600' : ''}>
                    {value}
                </span>
            ),
        },
        {
            header: 'AKSI',
            accessor: 'id',
            render: (id: number, row: Ticket) => (
                <div className="flex gap-2">
                    <button
                        className="btn-brutalist text-xs py-1 px-3"
                        onClick={() => handleEdit(id)}
                    >
                        EDIT
                    </button>
                    <button
                        className="bg-red-600 text-white border-3 border-black font-mono font-bold text-xs uppercase px-3 py-1 shadow-brutalist hover:bg-red-700"
                        onClick={() => handleDelete(id, row.type)}
                    >
                        HAPUS
                    </button>
                </div>
            ),
        },
    ];

    const totalQuota = tickets.reduce((sum, t) => sum + t.quota, 0);
    const totalSold = tickets.reduce((sum, t) => sum + t.sold, 0);
    const totalAvailable = tickets.reduce((sum, t) => sum + t.available, 0);

    return (
        <>
            <Head title="Kelola Tiket" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">KELOLA TIKET</h1>
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
                            <div className="text-xs font-bold uppercase mb-2">TOTAL TIKET</div>
                            <div className="text-4xl font-bold">{tickets.length}</div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">TOTAL QUOTA</div>
                            <div className="text-4xl font-bold">{totalQuota}</div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">TERJUAL</div>
                            <div className="text-4xl font-bold">{totalSold}</div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">TERSEDIA</div>
                            <div className="text-4xl font-bold">{totalAvailable}</div>
                        </div>
                    </div>

                    {/* Table */}
                    {tickets.length === 0 ? (
                        <div className="border-3 border-black p-12 text-center">
                            <h3 className="text-xl font-bold uppercase mb-4">TIDAK ADA TIKET</h3>
                            <p className="text-sm mb-6">Buat event terlebih dahulu untuk menambah tiket</p>
                        </div>
                    ) : (
                        <BrutalistTable columns={columns} data={tickets} />
                    )}
                </div>
            </div>
        </>
    );
}
