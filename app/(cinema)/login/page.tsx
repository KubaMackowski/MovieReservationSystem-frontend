'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth'

const initialState = {
    message: '',
}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState)

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <form
                action={formAction}
                className="flex flex-col gap-4 p-8 border rounded-lg shadow-md bg-white w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-center mb-4">Zaloguj się</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="admin@test.pl"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hasło</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Hasło"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {state?.message && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {state.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending} // Blokujemy przycisk podczas wysyłania
                    className={`w-full p-2 rounded text-white transition-colors ${
                        isPending
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isPending ? 'Logowanie...' : 'Zaloguj'}
                </button>
            </form>
        </div>
    )
}