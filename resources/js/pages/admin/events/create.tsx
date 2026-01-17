import { Head } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

interface Category {
    id: number;
    name: string;
}

interface EventsCreateProps {
    categories?: Category[];
}

export default function EventsCreate({ categories = [] }: EventsCreateProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    // Category states
    const [categoryMode, setCategoryMode] = useState<'existing' | 'new'>('existing');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
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

        if (!title || !description || !location || !date) {
            alert('SEMUA FIELD HARUS DIISI');
            return;
        }

        if (categoryMode === 'existing' && !selectedCategory) {
            alert('PILIH KATEGORI ATAU BUAT KATEGORI BARU');
            return;
        }

        if (categoryMode === 'new' && !newCategoryName) {
            alert('MASUKKAN NAMA KATEGORI BARU');
            return;
        }

        // Handle create with FormData for file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('date', date);

        if (categoryMode === 'existing') {
            formData.append('category_id', selectedCategory);
        } else {
            formData.append('new_category', newCategoryName);
        }

        if (imageFile) {
            formData.append('image', imageFile);
        }

        // TODO: Send formData to backend
        alert('EVENT BERHASIL DITAMBAHKAN');
        window.location.href = '/admin/events';
    };

    return (
        <>
            <Head title="Tambah Event" />

            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="border-b-3 border-black bg-brutalist-black">
                    <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                        <h1 className="text-white">TAMBAH EVENT BARU</h1>
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
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
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
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value.toUpperCase())}
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
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    />

                                    <BrutalistInput
                                        label="TANGGAL & WAKTU:"
                                        type="datetime-local"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
                                                Format: JPG, PNG, GIF (Max 2MB)
                                            </p>
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-4 border-3 border-black p-4">
                                                <p className="text-xs font-bold uppercase mb-2">PREVIEW:</p>
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
                                            <p className="text-xs font-bold uppercase mb-2">
                                                💡 CATATAN:
                                            </p>
                                            <p className="text-xs">
                                                Tiket dapat ditambahkan setelah event dibuat di halaman detail event.
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
                                        SIMPAN EVENT
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
