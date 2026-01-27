import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistTable from '@/components/BrutalistTable';

interface Location {
    id: number;
    name: string;
}

interface LocationsIndexProps {
    locations: Location[];
}

export default function LocationsIndex({ locations = [] }: LocationsIndexProps) {
    const handleEdit = (id: number) => {
        window.location.href = `/admin/locations/${id}/edit`;
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`YAKIN INGIN MENGHAPUS LOKASI "${name}"?`)) {
            router.delete(`/admin/locations/${id}`, {
                onSuccess: () => {
                    // Page will automatically refresh
                },
                onError: (errors) => {
                    alert('GAGAL MENGHAPUS LOKASI');
                    console.error(errors);
                },
            });
        }
    };

    const columns = [
        {
            header: 'ID',
            accessor: 'id',
        },
        {
            header: 'NAMA LOKASI',
            accessor: 'name',
        },
        {
            header: 'AKSI',
            accessor: 'id',
            render: (id: number, row: Location) => (
                <div className="flex gap-2">
                    <button
                        className="btn-brutalist text-xs py-1 px-3"
                        onClick={() => handleEdit(id)}
                    >
                        EDIT
                    </button>
                    <button
                        className="bg-red-600 text-white border-3 border-black font-mono font-bold text-xs uppercase px-3 py-1 shadow-brutalist hover:bg-red-700"
                        onClick={() => handleDelete(id, row.name)}
                    >
                        HAPUS
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Kelola Lokasi" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">KELOLA LOKASI</h1>
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
                            onClick={() => window.location.href = '/admin/locations/create'}
                        >
                            + TAMBAH LOKASI
                        </BrutalistButton>
                    </div>

                    {/* Locations Table */}
                    <BrutalistTable columns={columns} data={locations} />
                </div>
            </div>
        </>
    );
}
