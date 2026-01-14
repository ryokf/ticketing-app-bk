import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Login - Ticketing System" />

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
                            <h2 className="text-2xl mb-2">LOGIN</h2>
                            <p className="text-sm uppercase">MASUKKAN EMAIL DAN PASSWORD</p>
                        </div>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 p-4 border-2 border-black bg-brutalist-accent">
                            <div className="text-sm font-bold uppercase text-center">{status}</div>
                        </div>
                    )}

                    {/* Login Form */}
                    <div className="card-brutalist-no-hover">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="form-brutalist"
                        >
                            {({ processing, errors }) => (
                                <>
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
                                            autoFocus
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
                                        <div className="flex items-center justify-between mb-2">
                                            <label htmlFor="password" className="font-bold text-xs uppercase">
                                                PASSWORD:
                                            </label>
                                            {canResetPassword && (
                                                <a
                                                    href={request()}
                                                    className="text-xs uppercase hover:text-brutalist-accent transition-colors"
                                                >
                                                    LUPA PASSWORD?
                                                </a>
                                            )}
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            autoComplete="current-password"
                                            placeholder="MASUKKAN PASSWORD..."
                                            className="input-brutalist"
                                        />
                                        {errors.password && (
                                            <div className="mt-2 text-xs text-red-600 font-bold uppercase">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Remember Me */}
                                    <div className="form-group">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                className="w-6 h-6 border-2 border-black"
                                            />
                                            <span className="text-sm font-bold uppercase">INGAT SAYA</span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-brutalist w-full text-lg py-4 flex items-center justify-center gap-2"
                                    >
                                        {processing && <Spinner />}
                                        LOGIN
                                    </button>

                                    {/* Register Link */}
                                    {canRegister && (
                                        <div className="mt-6 text-center border-t-2 border-black pt-6">
                                            <p className="text-sm mb-3 uppercase">BELUM PUNYA AKUN?</p>
                                            <a href={register()} className="btn-brutalist-accent w-full inline-block text-center">
                                                REGISTER SEKARANG
                                            </a>
                                        </div>
                                    )}
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
