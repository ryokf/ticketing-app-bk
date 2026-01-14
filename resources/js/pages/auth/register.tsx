import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register - Ticketing System" />

            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                {/* Background Grid Pattern */}
                <div className="fixed inset-0 pointer-events-none opacity-10">
                    <div className="h-full w-full" style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="w-full max-w-md relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <a href="/" className="inline-block mb-6">
                            <h1 className="text-4xl">TICKETING</h1>
                        </a>
                        <div className="card-brutalist-no-hover bg-brutalist-accent text-center">
                            <h2 className="text-2xl mb-2">REGISTER</h2>
                            <p className="text-sm uppercase">BUAT AKUN BARU</p>
                        </div>
                    </div>

                    {/* Register Form */}
                    <div className="card-brutalist-no-hover">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="form-brutalist"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Name Field */}
                                    <div className="form-group">
                                        <label htmlFor="name" className="block mb-2 font-bold text-xs uppercase">
                                            NAMA LENGKAP:
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            required
                                            autoFocus
                                            autoComplete="name"
                                            placeholder="MASUKKAN NAMA LENGKAP..."
                                            className="input-brutalist"
                                        />
                                        {errors.name && (
                                            <div className="mt-2 text-xs text-red-600 font-bold uppercase">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="form-group">
                                        <label htmlFor="email" className="block mb-2 font-bold text-xs uppercase">
                                            EMAIL:
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoComplete="email"
                                            placeholder="MASUKKAN EMAIL..."
                                            className="input-brutalist"
                                        />
                                        {errors.email && (
                                            <div className="mt-2 text-xs text-red-600 font-bold uppercase">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="form-group">
                                        <label htmlFor="password" className="block mb-2 font-bold text-xs uppercase">
                                            PASSWORD:
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            autoComplete="new-password"
                                            placeholder="MASUKKAN PASSWORD..."
                                            className="input-brutalist"
                                        />
                                        {errors.password && (
                                            <div className="mt-2 text-xs text-red-600 font-bold uppercase">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="form-group">
                                        <label htmlFor="password_confirmation" className="block mb-2 font-bold text-xs uppercase">
                                            KONFIRMASI PASSWORD:
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            required
                                            autoComplete="new-password"
                                            placeholder="MASUKKAN ULANG PASSWORD..."
                                            className="input-brutalist"
                                        />
                                        {errors.password_confirmation && (
                                            <div className="mt-2 text-xs text-red-600 font-bold uppercase">
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-brutalist-accent w-full text-lg py-4 flex items-center justify-center gap-2"
                                    >
                                        {processing && <Spinner />}
                                        BUAT AKUN
                                    </button>

                                    {/* Login Link */}
                                    <div className="mt-6 text-center border-t-2 border-black pt-6">
                                        <p className="text-sm mb-3 uppercase">SUDAH PUNYA AKUN?</p>
                                        <a href={login()} className="btn-brutalist w-full inline-block text-center">
                                            LOGIN SEKARANG
                                        </a>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <a href="/" className="btn-brutalist-outline">
                            ← KEMBALI KE BERANDA
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
