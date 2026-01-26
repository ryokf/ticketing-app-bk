import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';
import { update } from '@/routes/admin/events';

interface Category {
    id: number;
    name: string;
}

interface Event {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    category: string;
    image: string;
}

interface EventsEditProps {
    event: Event;
    categories?: Category[];
}

export default function EventsEdit({ event, categories = [] }: EventsEditProps) {
    const [imagePreview, setImagePreview] = useState<string>(event.image);

    // Category states
    const [categoryMode, setCategoryMode] = useState<'existing' | 'new'>('existing');

    const { data, setData, put, processing } = useForm({
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        category_id: event.category_id?.toString() || '',
        new_category: '',
        image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.title || !data.description || !data.location || !data.date) {
            alert('SEMUA FIELD HARUS DIISI');
            return;
        }

        if (categoryMode === 'existing' && !data.category_id) {
            alert('PILIH KATEGORI ATAU BUAT KATEGORI BARU');
            return;
        }

        if (categoryMode === 'new' && !data.new_category) {
            alert('MASUKKAN NAMA KATEGORI BARU');
            return;
        }

        // Submit form using Inertia
        put(update.url({ id: event.id }), {
            forceFormData: true,
            onSuccess: () => {
                // Redirect handled by backend
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            },
        });
    };

    return (
        <>
            <Head title="Edit Event" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">EDIT EVENT</h1>
                        <button
                            onClick={() => window.location.href = '/admin/events'}
                            className="btn-brutalist-outline text-white border-white hover:bg-white hover:text-black"
                        >
                            ← KEMBALI
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="card-brutalist-no-hover">
                            <form className="form-brutalist" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <BrutalistInput
                                            label="JUDUL EVENT:"
                                            type="text"
                                            placeholder="MASUKKAN JUDUL EVENT..."
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Category Selection */}
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase mb-2">
                                            KATEGORI:
                                        </label>

                                        {/* Toggle Mode */}
                                        <div className="flex gap-2 mb-3">
                                            <button
                                                type="button"
                                                onClick={() => setCategoryMode('existing')}
                                                className={`flex-1 py-2 px-4 border-2 border-black font-mono font-bold text-xs uppercase ${categoryMode === 'existing'
                                                    ? 'bg-black text-white'
                                                    : 'bg-white text-black hover:bg-brutalist-dirty'
                                                    }`}
                                            >
                                                PILIH KATEGORI
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCategoryMode('new')}
                                                className={`flex-1 py-2 px-4 border-2 border-black font-mono font-bold text-xs uppercase ${categoryMode === 'new'
                                                    ? 'bg-black text-white'
                                                    : 'bg-white text-black hover:bg-brutalist-dirty'
                                                    }`}
                                            >
                                                + BUAT BARU
                                            </button>
                                        </div>

                                        {/* Existing Category Dropdown */}
                                        {categoryMode === 'existing' && (
                                            <select
                                                value={data.category_id}
                                                onChange={(e) => setData('category_id', e.target.value)}
                                                className="w-full border-3 border-black p-3 font-mono text-sm focus:outline-none focus:border-brutalist-accent bg-white"
                                                required={categoryMode === 'existing'}
                                            >
                                                <option value="">-- PILIH KATEGORI --</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}

                                        {/* New Category Input */}
                                        {categoryMode === 'new' && (
                                            <input
                                                type="text"
                                                value={data.new_category}
                                                onChange={(e) => setData('new_category', e.target.value.toUpperCase())}
                                                placeholder="MASUKKAN NAMA KATEGORI BARU..."
                                                className="w-full border-3 border-black p-3 font-mono text-sm focus:outline-none focus:border-brutalist-accent bg-white uppercase"
                                                required={categoryMode === 'new'}
                                            />
                                        )}
                                    </div>

                                    <BrutalistInput
                                        label="LOKASI:"
                                        type="text"
                                        placeholder="MASUKKAN LOKASI EVENT..."
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        required
                                    />

                                    <BrutalistInput
                                        label="TANGGAL & WAKTU:"
                                        type="datetime-local"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        required
                                    />

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase mb-2">
                                            DESKRIPSI:
                                        </label>
                                        <textarea
                                            className="w-full border-3 border-black p-4 font-mono text-sm focus:outline-none focus:border-brutalist-accent bg-white"
                                            rows={6}
                                            placeholder="MASUKKAN DESKRIPSI EVENT..."
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase mb-2">
                                            GAMBAR EVENT:
                                        </label>
                                        <div className="border-3 border-black p-4 bg-white">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="w-full font-mono text-sm file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:bg-brutalist-accent file:text-black file:font-bold file:uppercase file:text-xs hover:file:bg-black hover:file:text-brutalist-accent file:cursor-pointer"
                                            />
                                            <p className="text-xs mt-2 text-gray-600">
                                                Format: JPG, PNG, GIF (Max 2MB) • Kosongkan jika tidak ingin mengubah gambar
                                            </p>
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-4 border-3 border-black p-4">
                                                <p className="text-xs font-bold uppercase mb-2">
                                                    {data.image ? 'PREVIEW GAMBAR BARU:' : 'GAMBAR SAAT INI:'}
                                                </p>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full max-h-64 object-cover border-2 border-black"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="border-2 border-black p-4 bg-brutalist-dirty">
                                            <p className="text-xs font-bold uppercase">
                                                KATEGORI SAAT INI: {event.category}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <BrutalistButton
                                        type="submit"
                                        variant="accent"
                                        className="flex-1"
                                    >
                                        UPDATE EVENT
                                    </BrutalistButton>
                                    <BrutalistButton
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => window.location.href = '/admin/events'}
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
