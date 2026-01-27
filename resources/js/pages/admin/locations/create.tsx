import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

export default function LocationsCreate() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        if (!name.trim()) {
            setErrors({ name: 'NAMA LOKASI HARUS DIISI' });
            setIsLoading(false);
            return;
        }

        router.post('/admin/locations', { name }, {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (errors: Record<string, string | string[]>) => {
                const formattedErrors: Record<string, string> = {};
                for (const key in errors) {
                    const value = errors[key];
                    formattedErrors[key] = Array.isArray(value) ? value[0] : value;
                }
                setErrors(formattedErrors);
                setIsLoading(false);
            },
        });
    };

    return (
        <>
            <Head title="Tambah Lokasi" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">TAMBAH LOKASI</h1>
                        <button
                            onClick={() => window.location.href = '/admin/locations'}
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
                                    label="NAMA LOKASI:"
                                    type="text"
                                    placeholder="MASUKKAN NAMA LOKASI..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {errors.name && (
                                    <div className="text-red-600 font-mono text-sm mb-4">
                                        {errors.name}
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <BrutalistButton
                                        type="submit"
                                        variant="accent"
                                        className="flex-1"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'MENYIMPAN...' : 'SIMPAN'}
                                    </BrutalistButton>
                                    <BrutalistButton
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => window.location.href = '/admin/locations'}
                                        disabled={isLoading}
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
