import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { type FormEvent, useState } from 'react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-surface-900">Admin Login</h1>
                        <p className="text-sm text-surface-500 mt-1">Sign in to manage your portfolio</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-surface-200 p-8 shadow-sm space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-medium text-surface-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                className="block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
                                placeholder="admin@portfolio.com"
                                required
                                autoFocus
                                autoComplete="email"
                                aria-invalid={errors.email ? 'true' : undefined}
                            />
                            {errors.email && <p className="text-xs text-danger-500" role="alert">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-surface-700">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(event) => setData('password', event.target.value)}
                                    className="block w-full rounded-lg border border-surface-300 bg-white px-3.5 py-2.5 pr-11 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    aria-invalid={errors.password ? 'true' : undefined}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-surface-400 hover:text-surface-700"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-danger-500" role="alert">{errors.password}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(event) => setData('remember', event.target.checked)}
                                className="h-4 w-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label htmlFor="remember" className="text-sm text-surface-600">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                            <LogIn className="h-4 w-4" />
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
