import { cookies } from 'next/headers'
import type { UserProfile } from '@/types/user'

export async function getMe(): Promise<UserProfile | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('session_token')?.value

    if (!token) {
        return null
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'

    try {
        const res = await fetch(`${backendUrl}/api/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        })

        console.log(res)

        if (!res.ok) {
            return null
        }

        const user: UserProfile = await res.json()
        return user

    } catch (error) {
        console.error('Błąd pobierania profilu /me:', error)
        return null
    }
}