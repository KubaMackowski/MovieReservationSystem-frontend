'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // <--- 1. Import useParams
import { getUserById, updateUser } from '@/app/actions/user-actions';

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();

    const userId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [email, setEmail] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');

    useEffect(() => {
        if (!userId) return;

        const loadUser = async () => {
            const user = await getUserById(userId);
            if (!user) {
                alert('Nie znaleziono użytkownika');
                router.push('/panel/users');
                return;
            }

            setEmail(user.email);
            setOriginalEmail(user.email);
            setLoading(false);
        };

        loadUser();
    }, [userId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        setSaving(true);

        const result = await updateUser(userId, { email });

        if (result.success) {
            router.push('/panel/users');
        } else {
            alert(result.error);
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-white text-center">Ładowanie danych...</div>;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark">
            <div className="flex-1 max-w-[600px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                        Zmień adres email
                    </h2>
                </div>

                <div className="bg-surface-dark rounded-xl border border-border-dark shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
                        <div className="grid grid-cols-1 gap-6">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-200" htmlFor="email">
                                    Nowy Email
                                </label>
                                <input
                                    className="w-full h-11 px-4 bg-[#2a2636] border-none rounded-lg text-sm text-white placeholder:text-[#6f6189] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="new.email@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => router.back()}
                                className="px-6 h-10 rounded-xl text-sm font-bold text-gray-300 hover:bg-gray-800 transition-colors"
                                type="button"
                                disabled={saving}
                            >
                                Anuluj
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 rounded-xl h-10 px-8 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-md shadow-primary/20 disabled:opacity-50"
                                type="submit"
                                disabled={saving}
                            >
                                {saving ? 'Zapisywanie...' : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">save</span>
                                        <span>Zaktualizuj Email</span>
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