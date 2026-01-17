import { Head } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistTable from '@/components/BrutalistTable';

interface Event {
    id: number;
    title: string;
    category: string;
    location: string;
    date: string;
    createdBy: string;
    createdAt: string;
}

interface EventsIndexProps {
    events: Event[];
}

export default function EventsIndex({ events = [] }: EventsIndexProps) {
    const handleEdit = (id: number) => {
        window.location.href = `/admin/events/${id}/edit`;
    };

    const handleView = (id: number) => {
        window.location.href = `/admin/events/${id}`;
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`YAKIN INGIN MENGHAPUS EVENT "${title}"?`)) {
            // Handle delete via API
            alert('EVENT BERHASIL DIHAPUS');
        }
    };

    const columns = [
        {
            header: 'ID',
            accessor: 'id',
        },
        {
            header: 'JUDUL EVENT',
            accessor: 'title',
        },
        {
            header: 'KATEGORI',
            accessor: 'category',
        },
        {
            header: 'LOKASI',
            accessor: 'location',
        },
        {
            header: 'TANGGAL',
            accessor: 'date',
            render: (value: string) => new Date(value).toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
            }),
        },
        {
            header: 'DIBUAT OLEH',
            accessor: 'createdBy',
        },
        {
            header: 'AKSI',
            accessor: 'id',
            render: (id: number, row: Event) => (
                <div className="flex gap-2">
                    <button
                        className="btn-brutalist text-xs py-1 px-3"
                        onClick={() => handleView(id)}
                    >
                        LIHAT
                    </button>
                    <button
                        className="btn-brutalist text-xs py-1 px-3"
                        onClick={() => handleEdit(id)}
                    >
                        EDIT
                    </button>
                    <button
                        className="bg-red-600 text-white border-3 border-black font-mono font-bold text-xs uppercase px-3 py-1 shadow-brutalist hover:bg-red-700"
                        onClick={() => handleDelete(id, row.title)}
                    >
                        HAPUS
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Kelola Event" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">KELOLA EVENT</h1>
                        <button
                            onClick={() => window.location.href = '/admin/dashboard'}
                            className="btn-brutalist-outline text-white border-white hover:bg-white hover:text-black"
                        >
                            ← DASHBOARD
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Add Button */}
                    <div className="mb-6">
                        <BrutalistButton
                            variant="accent"
                            onClick={() => window.location.href = '/admin/events/create'}
                        >
                            + TAMBAH EVENT BARU
                        </BrutalistButton>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">TOTAL EVENT</div>
                            <div className="text-4xl font-bold">{events.length}</div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">EVENT AKTIF</div>
                            <div className="text-4xl font-bold">
                                {events.filter(e => new Date(e.date) > new Date()).length}
                            </div>
                        </div>
                        <div className="border-3 border-black p-6">
                            <div className="text-xs font-bold uppercase mb-2">EVENT SELESAI</div>
                            <div className="text-4xl font-bold">
                                {events.filter(e => new Date(e.date) <= new Date()).length}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    {events.length === 0 ? (
                        <div className="border-3 border-black p-12 text-center">
                            <h3 className="text-xl font-bold uppercase mb-4">TIDAK ADA EVENT</h3>
                            <p className="text-sm mb-6">Mulai buat event pertama Anda</p>
                            <BrutalistButton
                                variant="accent"
                                onClick={() => window.location.href = '/admin/events/create'}
                            >
                                + BUAT EVENT BARU
                            </BrutalistButton>
                        </div>
                    ) : (
                        <BrutalistTable columns={columns} data={events} />
                    )}
                </div>
            </div>
        </>
    );
}
