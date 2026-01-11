'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth'
import Link from "next/link";

const initialState = {
    message: '',
}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState)

    return (
        <div className="flex items-center justify-center h-full p-4">
        <div className="w-full max-w-md">
            <div className="neumorphic-outset rounded-xl p-8 bg-background flex flex-col gap-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Witaj ponownie</h2>
                    <p className="text-text-main/60 text-sm mt-2">Zaloguj się aby kontynuować</p>
                </div>
                <form action={formAction} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-main/70 ml-1"
                               htmlFor="email">Email</label>
                        <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                            <span className="material-symbols-outlined text-text-main/50 mr-3">person</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                id="email" name="email" placeholder="john@example.com" type="text"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-main/70"
                                   htmlFor="password">Hasło</label>
                        </div>
                        <div className="neumorphic-inset rounded-xl flex items-center px-4 h-14">
                            <span className="material-symbols-outlined text-text-main/50 mr-3">lock</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-main/30 w-full h-full text-base"
                                id="password" name="password" placeholder="••••••••" type="password"/>
                        </div>
                        {state?.message && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                                {state.message}
                            </div>
                        )}
                    </div>
                    <button
                        className="bg-primary text-background font-bold text-lg h-14 rounded-xl neumorphic-button-hover neumorphic-button-active transition-all mt-2"
                        disabled={isPending}
                        type="submit">
                        { isPending ? "Logowanie..." : "Zaloguj" }
                    </button>
                </form>
            </div>
            <p className="text-center mt-10 text-text-main/60">
                Jeszcze nie masz konta?
                <Link className="text-primary font-bold hover:underline transition-all" href="/register">Zarejestruj się</Link>
            </p>
        </div>
        </div>
        )
        }