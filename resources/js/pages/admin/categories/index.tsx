import { Head } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistTable from '@/components/BrutalistTable';

interface Category {
    id: number;
    name: string;
}

interface CategoriesIndexProps {
    categories: Category[];
}

export default function CategoriesIndex({ categories = [] }: CategoriesIndexProps) {
    const handleEdit = (id: number) => {
        window.location.href = `/admin/categories/${id}/edit`;
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`YAKIN INGIN MENGHAPUS KATEGORI "${name}"?`)) {
            // Handle delete
            alert('KATEGORI BERHASIL DIHAPUS');
        }
    };

    const columns = [
        {
            header: 'ID',
            accessor: 'id',
        },
        {
            header: 'NAMA KATEGORI',
            accessor: 'name',
        },
        {
            header: 'AKSI',
            accessor: 'id',
            render: (id: number, row: Category) => (
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
            <Head title="Kelola Kategori" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">KELOLA KATEGORI</h1>
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
                            onClick={() => window.location.href = '/admin/categories/create'}
                        >
                            + TAMBAH KATEGORI
                        </BrutalistButton>
                    </div>

                    {/* Categories Table */}
                    <BrutalistTable columns={columns} data={categories} />
                </div>
            </div>
        </>
    );
}
