import { Head } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

interface Category {
    id: number;
    name: string;
}

interface CategoriesEditProps {
    category: Category;
}

export default function CategoriesEdit({ category }: CategoriesEditProps) {
    const [name, setName] = useState(category.name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            alert('NAMA KATEGORI HARUS DIISI');
            return;
        }

        // Handle update
        alert('KATEGORI BERHASIL DIUPDATE');
        window.location.href = '/admin/categories';
    };

    return (
        <>
            <Head title="Edit Kategori" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">EDIT KATEGORI</h1>
                        <button
                            onClick={() => window.location.href = '/admin/categories'}
                            className="btn-brutalist-outline text-white border-white hover:bg-white hover:text-black"
                        >
                            ← KEMBALI
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto">
                        <div className="card-brutalist-no-hover">
                            <form className="form-brutalist" onSubmit={handleSubmit}>
                                <BrutalistInput
                                    label="NAMA KATEGORI:"
                                    type="text"
                                    placeholder="MASUKKAN NAMA KATEGORI..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                                <div className="flex gap-4">
                                    <BrutalistButton
                                        type="submit"
                                        variant="accent"
                                        className="flex-1"
                                    >
                                        UPDATE
                                    </BrutalistButton>
                                    <BrutalistButton
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => window.location.href = '/admin/categories'}
                                    >
                                        BATAL
                                    </BrutalistButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
