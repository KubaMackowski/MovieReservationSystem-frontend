'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/app/actions/user-actions';

export default function AddUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'USER' // Domyślna rola
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await createUser(formData);

        if (result.success) {
            router.push('/users');
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[800px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Dodaj użytkownika
                    </h2>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 gap-6">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="password">
                                    Hasło
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••••••"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="role">
                                    Rola użytkownika
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer outline-none"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6f6189] text-[20px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => router.back()}
                                className="px-6 h-10 rounded-xl text-sm font-bold text-gray-300 hover:bg-gray-800 transition-colors"
                                type="button"
                                disabled={loading}
                            >
                                Anuluj
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl h-10 px-8 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>Zapisywanie...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                        <span>Zapisz</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}