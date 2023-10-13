import { useState } from 'react'

export class AuthenticatedUser {
    constructor(refreshToken, accessToken) {
        this.refreshToken = refreshToken
        this.accessToken = accessToken
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        }
    }

    isAuthenticated() {
        if (this.refreshToken && this.refreshToken.length > 20) {
            return true
        }
        return false;
    }
}

export const useAuth = (refreshToken, accessToken) => {
    if (typeof window !== 'undefined') {
        refreshToken ??= localStorage.getItem('refreshToken')
        accessToken ??= localStorage.getItem('accessToken')
    }
    const obj = new AuthenticatedUser(refreshToken, accessToken)
    const [auth, setAuth] = useState(obj)
    const setAuthValue = (refreshToken, accessToken) => {
        const obj_new = new AuthenticatedUser(refreshToken, accessToken)
        setAuth(obj_new)
    }
    return [auth, setAuthValue]
}