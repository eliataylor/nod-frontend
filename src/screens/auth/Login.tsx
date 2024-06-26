import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import LoginImage from '../../assets/img/login-image.jpeg'
import LoginForm from '../../components/Forms/LoginForm'
import GoogleAuthForm from '../../components/Forms/GoogleAuthForm'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuth, resetAuthData } from '../../features/auth/authSlice'

function Login() {
    const { isTokenExpired } = useAppSelector(selectAuth)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isTokenExpired) {
            enqueueSnackbar(
                `You have been logged out because your session has expired.`,
                { variant: 'info', autoHideDuration: 2500 }
            )
            dispatch(resetAuthData())
        }
    }, [isTokenExpired, enqueueSnackbar, dispatch])

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="px-8 pt-8">
                <Link
                    to="/"
                    className="text-xl font-bold text-gray-800 dark:text-gray-200"
                >
                    ELI Taylor
                </Link>
            </div>
            <div className="flex flex-1 h-full items-center mt-4 lg:mt-0 p-6">
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                className="object-cover w-full h-full dark:hidden"
                                src={LoginImage}
                                alt="Office"
                            />
                            <img
                                aria-hidden="true"
                                className="hidden object-cover w-full h-full dark:block"
                                src={LoginImage}
                                alt="Office"
                            />
                        </div>
                        <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Login
                                </h1>

                                <LoginForm />

                                <hr className="my-8" />

                                <GoogleAuthForm />

                                <p className="mt-4">
                                    <Link
                                        className="text-sm font-medium text-lime-600 dark:text-lime-400 hover:underline"
                                        to="/auth/forgot-password"
                                    >
                                        Forgot your password?
                                    </Link>
                                </p>
                                <p className="mt-1">
                                    <Link
                                        className="text-sm font-medium text-lime-600 dark:text-lime-400 hover:underline"
                                        to="/auth/create-account"
                                    >
                                        Create account
                                    </Link>
                                </p>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
