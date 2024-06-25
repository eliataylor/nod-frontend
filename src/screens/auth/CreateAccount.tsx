import React from 'react'
import { Link } from 'react-router-dom'

import LoginImage from '../../assets/img/login-image.jpeg'
import CreateAccountForm from '../../components/Forms/CreateAccountForm'

function CreateAccount() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Link
                to="/"
                className="px-8 pt-8 text-xl font-bold text-gray-800 dark:text-gray-200"
            >
                ELI Taylor
            </Link>
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
                                    Create account
                                </h1>

                                <CreateAccountForm />

                                <hr className="my-8" />

                                <p className="mt-4">
                                    <Link
                                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline"
                                        to="/auth/login"
                                    >
                                        Already have an account? Login
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

export default CreateAccount
