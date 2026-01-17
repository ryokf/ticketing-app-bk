import { Head } from '@inertiajs/react';
import { useState } from 'react';
import BrutalistButton from '@/components/BrutalistButton';
import BrutalistInput from '@/components/BrutalistInput';

interface Event {
    id: number;
    user_id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    category: string;
    image: string;
}

interface EventsEditProps {
    event: Event;
}

export default function EventsEdit({ event }: EventsEditProps) {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date);
    const [image, setImage] = useState(event.image);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !location || !date) {
            alert('SEMUA FIELD HARUS DIISI');
            return;
        }

        // Handle update
        alert('EVENT BERHASIL DIUPDATE');
        window.location.href = '/admin/events';
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
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
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
                                        <BrutalistInput
                                            label="URL GAMBAR:"
                                            type="text"
                                            placeholder="MASUKKAN URL GAMBAR EVENT..."
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                        {image && (
                                            <div className="mt-4 border-3 border-black p-4">
                                                <p className="text-xs font-bold uppercase mb-2">PREVIEW:</p>
                                                <img
                                                    src={image}
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
