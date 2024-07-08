import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ImageDark from '../../assets/img/forgot-password-office.jpeg'
import { AuthContext } from '../../context/AuthContext'
import { Button } from '@windmill/react-ui'

function EmailVerificationForm() {
    return (
        <p className="text-sm font-medium text-gray-600">
            Your email has been confirmed! Please{' '}
            <Link
                className="text-sm font-medium text-lime-600 dark:text-lime-400 hover:underline"
                to="/auth/login"
            >
                log in
            </Link>{' '}
            to your account to continue.
        </p>
    )
}

function EmailVerification() {
    const { user, status } = useContext(AuthContext)
    const navigate = useNavigate()

    // Redirect to log in if already confirmed.
    useEffect(() => {
        if (user) {
            navigate('/auth/login')
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Link
                to="/"
                className="px-8 pt-8 text-xl font-bold text-gray-800 dark:text-gray-200"
            >
                ELI Taylor
            </Link>
            <div className="flex flex-1 h-full items-center mt-4 lg:mt-0 p-6">
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
                    <div className="bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <img
                                    aria-hidden="true"
                                    className="object-cover w-full h-full"
                                    src={ImageDark}
                                    alt="Office"
                                />
                            </div>
                            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                <div className="w-full">
                                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                        Email Confirmation
                                    </h1>

                                    <EmailVerificationForm />

                                    <hr className="my-8" />

                                    <p className="mt-4">
                                        <Button
                                            layout="primary"
                                            size="regular"
                                            aria-label="login"
                                            onClick={(e) => {
                                                navigate('/auth/login')
                                            }}
                                        >
                                            Log In
                                        </Button>
                                    </p>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification
