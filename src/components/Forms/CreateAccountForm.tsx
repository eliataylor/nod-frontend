import React, { useContext, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { Input, Label, HelperText, Button } from '@windmill/react-ui'
import { Link } from 'react-router-dom'

function CreateAccountForm() {
    const { register }: any = useContext(AuthContext)
    const [statusReason, setStatusReason]: [any, any] = useState('')
    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                password1: '',
                password2: '',
                privacyOptIn: false,
                termsOptIn: false,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email().required('Email is required'),
                phone_number: Yup.string().required('Phone number is required'),
                first_name: Yup.string().required('First name is required'),
                last_name: Yup.string().required('Last name is required'),
                password1: Yup.string().required('Password is required'),
                password2: Yup.string()
                    .oneOf([Yup.ref('password1')], 'Passwords must match')
                    .required('Confirm password is required'),
                privacyOptIn: Yup.boolean().oneOf(
                    [true],
                    'You must agree to the privacy policy'
                ),
                termsOptIn: Yup.boolean().oneOf(
                    [true],
                    'You must agree to the terms and conditions'
                ),
            })}
            onSubmit={(
                { first_name, last_name, email, phone_number, password1, password2, privacyOptIn },
                { setStatus, setSubmitting, setErrors }
            ) => {
                setSubmitting(true)
                setStatus()
                register(first_name, last_name, email, phone_number, password1, password2, privacyOptIn)
                    .then((statusReason: string) => {
                        setStatusReason(statusReason)
                        setSubmitting(false)
                    })
                    .catch((error: any) => {
                        const errors: any = {}
                        if (error.response) {
                            if (error.response.data.email) {
                                errors.email = error.response.data.email
                            }
                            if (error.response.data.phone_number) {
                                errors.phone_number = error.response.data.phone_number
                            }
                            if (error.response.data.password1) {
                                errors.password = error.response.data.password1
                            }
                            if (error.response.data.password2) {
                                errors.password = error.response.data.password2
                            }
                            if (error.response.data.domain) {
                                errors.domain = error.response.data.domain
                            }
                            setErrors(errors)
                        }
                        if (error.response.data.domain) {
                            setStatus(error.response.data.domain)
                        } else if (Object.keys(errors).length === 0) {
                            setStatus('An error occurred. Please try again.')
                        }
                        setSubmitting(false)
                    })
            }}
        >
            {({ status, isSubmitting }) => (
                <Form>
                    <Label className="mt-4">
                        <span>First Name</span>
                        <Field
                            className="mt-1"
                            as={Input}
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                        />
                        <ErrorMessage name="first_name">
                            {(msg) => (
                                <HelperText valid={false}>{msg}</HelperText>
                            )}
                        </ErrorMessage>
                    </Label>
                    <Label className="mt-4">
                        <span>Last Name</span>
                        <Field
                            className="mt-1"
                            as={Input}
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                        />
                        <ErrorMessage name="last_name">
                            {(msg) => (
                                <HelperText valid={false}>{msg}</HelperText>
                            )}
                        </ErrorMessage>
                    </Label>

                    <Label className="mt-4">
                        <span>Email</span>
                        <Field
                            className="mt-1"
                            as={Input}
                            name="email"
                            type="email"
                            placeholder="john@doe.com"
                        />
                        <ErrorMessage name="email">
                            {(msg) => (
                                <HelperText valid={false}>{msg}</HelperText>
                            )}
                        </ErrorMessage>
                    </Label>

                    <Label className="mt-4">
                        <span>Phone Number</span>
                        <Field
                            className="mt-1"
                            as={Input}
                            name="phone_number"
                            type="text"
                            placeholder="Phone Number"
                        />
                        <ErrorMessage name="phone_number">
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
                            name="password1"
                            type="password"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password1">
                            {(msg) => (
                                <HelperText valid={false}>{msg}</HelperText>
                            )}
                        </ErrorMessage>
                    </Label>

                    <Label className="mt-4">
                        <span>Confirm Password</span>
                        <Field
                            className="mt-1"
                            as={Input}
                            name="password2"
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <ErrorMessage name="password2">
                            {(msg) => (
                                <HelperText valid={false}>{msg}</HelperText>
                            )}
                        </ErrorMessage>
                    </Label>

                    <Label className="mt-6 flex flex-col" check>
                        <div className="flex flex-none items-center">
                            <Field
                                as={Input}
                                name="privacyOptIn"
                                type="checkbox"
                            />
                            <div className="ml-2">
                                I agree to the{' '}
                                <Link
                                    className="underline"
                                    to="/privacy-policy"
                                >
                                    privacy policy
                                </Link>
                            </div>
                        </div>
                        <ErrorMessage name="privacyOptIn">
                            {(msg) => (
                                <div className="flex flex-none items-center w-full">
                                    <HelperText valid={false}>{msg}</HelperText>
                                </div>
                            )}
                        </ErrorMessage>
                    </Label>

                    <Label className="mt-1 flex flex-col" check>
                        <div className="flex flex-none items-center">
                            <Field
                                as={Input}
                                name="termsOptIn"
                                type="checkbox"
                            />
                            <div className="ml-2">
                                I agree to the{' '}
                                <Link
                                    className="underline"
                                    to="/terms-and-conditions"
                                >
                                    terms and conditions.
                                </Link>
                            </div>
                        </div>
                        <ErrorMessage name="termsOptIn">
                            {(msg) => (
                                <div className="flex flex-none items-center w-full">
                                    <HelperText valid={false}>{msg}</HelperText>
                                </div>
                            )}
                        </ErrorMessage>
                    </Label>

                    <Button
                        className="mt-4"
                        block
                        type="submit"
                        value="submit"
                        disabled={isSubmitting}
                    >
                        Create Account
                    </Button>
                    {status && <HelperText valid={false}>{status}</HelperText>}
                    {statusReason && (
                        <HelperText
                            className="text-lg font-semibold text-green-500 mt-3 block"
                            valid={true}
                        >
                            Please click on the confirmation link we sent you by
                            email to begin using our service.{' '}
                        </HelperText>
                    )}
                </Form>
            )}
        </Formik>
    )
}

export default CreateAccountForm
