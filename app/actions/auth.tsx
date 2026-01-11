'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type FormState = {
    message: string
    field?: 'email' | 'password'
}

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { message: 'Wypełnij wszystkie pola.' }
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'

    try {
        const response = await fetch(`${backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            cache: 'no-store',
        })


        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))

            return {
                message: errorData.title || 'Nieprawidłowy email lub hasło.'
            }
        }

        const data = await response.json()

        const token = data.token || data.accessToken

        if (!token) {
            return { message: 'Błąd serwera: brak tokena w odpowiedzi.' }
        }

        const cookieStore = await cookies()

        cookieStore.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
        })

    } catch (error) {
        console.error('Login error:', error)
        return { message: 'Wystąpił błąd połączenia z serwerem.' }
    }

    redirect('/')
}

export async function registerAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string
    const firstname = formData.get('firstname') as string
    const lastname = formData.get('lastname') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!email || !firstname || !lastname || !password || !confirmPassword) {
        return { message: 'Wypełnij wszystkie pola.' }
    }

    if (password !== confirmPassword) {
        return { message: 'Hasła muszą być identyczne.' }
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'

    try {
        const response = await fetch(`${backendUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, firstname, lastname, password }),
            cache: 'no-store',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))

            if (Array.isArray(errorData)) {
                const messages = errorData.map((e: any) => e.description || e.code).join(', ');
                return { message: messages || 'Błąd rejestracji.' }
            }
            return { message: errorData.title || 'Nie udało się utworzyć konta.' }
        }

    } catch (error) {
        console.error('Registration error:', error)
        return { message: 'Wystąpił błąd połączenia z serwerem.' }
    }

    redirect('/login?registered=true')
}