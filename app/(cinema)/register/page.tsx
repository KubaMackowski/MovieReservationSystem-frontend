'use client'

import { useActionState } from 'react'
import { registerAction } from '@/app/actions/auth' // Importujemy nową akcję
import Link from "next/link";

const initialState = {
    message: '',
}

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(registerAction, initialState)

    return (
        <div className="flex items-center justify-center h-full p-4">
            <div className="w-full max-w-md">
                <div className="neumorphic-outset rounded-xl p-8 bg-background flex flex-col gap-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Stwórz konto</h2>
                        <p className="text-text-main/60 text-sm mt-2">Dołącz do nas już dziś</p>
                    </div>

                    <form action={formAction} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-main/70 ml-1"
                                   htmlFor="firstname">Imię</label>
                            <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                                <span className="material-symbols-outlined text-text-main/50 mr-3">badge</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                    id="firstname" name="firstname" placeholder="Jan" type="text" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-main/70 ml-1"
                                   htmlFor="lastname">Nazwisko</label>
                            <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                                <span className="material-symbols-outlined text-text-main/50 mr-3">badge</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                    id="lastname" name="lastname" placeholder="Kowalski" type="text" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-main/70 ml-1"
                                   htmlFor="email">Email</label>
                            <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                                <span className="material-symbols-outlined text-text-main/50 mr-3">mail</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                    id="email" name="email" placeholder="john@example.com" type="email" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-main/70 ml-1"
                                   htmlFor="password">Hasło</label>
                            <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                                <span className="material-symbols-outlined text-text-main/50 mr-3">lock</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                    id="password" name="password" placeholder="••••••••" type="password" required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-main/70 ml-1"
                                   htmlFor="confirmPassword">Powtórz hasło</label>
                            <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                                <span className="material-symbols-outlined text-text-main/50 mr-3">lock_reset</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                    id="confirmPassword" name="confirmPassword" placeholder="••••••••" type="password" required />
                            </div>
                        </div>

                        {state?.message && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm animate-pulse">
                                {state.message}
                            </div>
                        )}

                        <button
                            className="bg-primary text-background font-bold text-lg h-14 rounded-xl neumorphic-button-hover neumorphic-button-active transition-all mt-4"
                            disabled={isPending}
                            type="submit">
                            {isPending ? "Tworzenie konta..." : "Zarejestruj się"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-10 text-text-main/60">
                    Masz już konto?
                    <Link className="text-primary font-bold hover:underline transition-all ml-1" href="/login">
                        Zaloguj się
                    </Link>
                </p>
            </div>
        </div>
    )
}