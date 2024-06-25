import React, { useState, useMemo, useEffect, createContext } from 'react'
import { config } from '../config/config'
import ThemedSuspense from '../components/General/ThemedSuspense'
import {
    LoginSuccessData,
    LoginSuccessResponse,
    UserData,
} from '../features/auth/interfaces'
import {
    resetAuthData,
    selectAuth,
    setAuthData,
} from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { axiosPublic } from '../api/connector'
import { redirect, useNavigate } from 'react-router-dom'

const apiUrl = config.api.url

// create context
export const AuthContext = createContext<any>({} as any)

export const AuthProvider = ({ children }: { children: any }) => {
    const [isLoaded, setLoaded] = useState(true)
    const [status, setStatus]: [any, any] = useState('')
    const [statusReason, setStatusReason]: [any, any] = useState('')
    const dispatch = useAppDispatch()
    const authData = useAppSelector(selectAuth)
    const [user, setUser] = useState<UserData | null>(authData.user)

    const value = useMemo(() => {
        const register = (
            first_name: string,
            last_name: string,
            email: string,
            password1: string,
            password2: string,
            privacyOptIn: boolean
        ) => {
            return axiosPublic
                .post(`${apiUrl}/auth/register/`, {
                    first_name: first_name,
                    last_name: last_name,
                    username: email, // We set the username to the user's email, no usernames needed for now.
                    email: email,
                    password1: password1,
                    password2: password2,
                })
                .then((response: any) => {
                    setStatus('pending_verification')
                    if (response && response.data.detail) {
                        setStatusReason(response.data.detail)
                        return Promise.resolve(response.data.detail)
                    }
                })
                .catch((error: any) => {
                    setUser(null)
                    dispatch(resetAuthData())
                    return Promise.reject(error)
                })
        }

        const onSuccessAuth = (data: LoginSuccessData) => {
            setUser({ ...data.user })
            localStorage.setItem('loggedIn', 'true')
            dispatch(setAuthData(data))
        }

        const login = (email: string, password: string) => {
            return axiosPublic.post(`${apiUrl}/auth/login/`, {
                email: email,
                password: password,
            })
        }

        const googleAuth = (code: string) => {
            return axiosPublic
                .post(`${apiUrl}/auth/social-login/google/`, {
                    access_token: code,
                })
                .then((response: LoginSuccessResponse) => {
                    onSuccessAuth(response.data)
                })
        }

        const logout = () => {
            dispatch(resetAuthData())
            setUser(null)
            localStorage.removeItem('noticeModalShown')
            localStorage.removeItem('loggedIn')
        }

        const resetPassword = (email: string) => {
            return axiosPublic.post(`${apiUrl}/auth/password/reset/`, {
                email: email,
            })
        }

        const resetPasswordConfirmation = (
            newPassword1: string,
            newPassword2: string,
            id: string,
            resetToken: string
        ) => {
            return axiosPublic.post(
                `${apiUrl}/auth/password/reset/confirm/`,
                {
                    new_password1: newPassword1,
                    new_password2: newPassword2,
                    uid: id,
                    token: resetToken,
                }
            )
        }

        return {
            user,
            status,
            statusReason,
            setUser,
            setStatus,
            setStatusReason,
            register,
            login,
            googleAuth,
            logout,
            resetPasswordConfirmation,
            resetPassword,
            onSuccessAuth,
        }
    }, [dispatch, status, statusReason, user])

    if (!isLoaded) {
        return <ThemedSuspense />
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
