import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { Label, Input, HelperText, Button } from '@windmill/react-ui'
import { LoginSuccessResponse } from '../../features/auth/interfaces'

function LoginForm({ onSuccess }: null | any) {
    const { login, onSuccessAuth } = useContext(AuthContext)

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required('Email is required'),
                    password: Yup.string().required('Password is required'),
                })}
                onSubmit={(
                    { email, password },
                    { setStatus, setSubmitting }
                ) => {
                    setSubmitting(true)
                    setStatus()
                    login(email, password)
                        .then((response: LoginSuccessResponse) => {
                            onSuccessAuth(response.data)
                        })
                        .catch((error: any) => {
                            if (error.response) {
                                if (error.response.data.domain) {
                                    setStatus(error.response.data.domain)
                                } else if (
                                    error.response.data.non_field_errors
                                ) {
                                    setStatus(
                                        error.response.data.non_field_errors[0]
                                    )
                                } else {
                                    setStatus(error.response.data.message)
                                }
                            } else {
                                setStatus(
                                    'Some error occurred. Please try again.'
                                )
                            }
                            setSubmitting(false)
                        })
                }}
            >
                {({ errors, status, touched, isSubmitting }) => (
                    <Form id="login_form">
                        <Label>
                            <span>Email</span>
                            <Field
                                className="mt-1"
                                as={Input}
                                name="email"
                                type="email"
                                placeholder="Your email"
                            />
                            <ErrorMessage name="email">
                                {(msg) => (
                                    <HelperText valid={false}>{msg}</HelperText>
                                )}
                            </ErrorMessage>
                        </Label>

                        <Label className="mt-4">
                            <span>Password</span>
                            <Field
                                className="mt-1"
                                as={Input}
                                name="password"
                                type="password"
                                placeholder="Your password"
                            />
                            <ErrorMessage name="password">
                                {(msg) => (
                                    <HelperText valid={false}>{msg}</HelperText>
                                )}
                            </ErrorMessage>
                        </Label>

                        <Button
                            className="mt-4 bg-lime-600"
                            type="submit"
                            value="submit"
                            disabled={isSubmitting}
                        >
                            Log in
                        </Button>
                        {status && (
                            <div>
                                <HelperText valid={false}>{status}</HelperText>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default LoginForm
