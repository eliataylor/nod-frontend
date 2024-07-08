import React, { useContext, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { AuthContext } from '../../context/AuthContext'
import { Button, HelperText } from '@windmill/react-ui'
import  GoogleIcon from '../../assets/icons/google.svg'
import useQuery from '../../utils/useQuery'

function GoogleAuthForm() {
    const query = useQuery()
    const { googleAuth } = useContext(AuthContext)
    const [status, setStatus] = useState('')

    const handleLogin = useGoogleLogin({
        onSuccess: (response) => {
            googleAuth(response.access_token).catch((error: any) => {
                if (error.response.data.domain) {
                    setStatus(error.response.data.domain)
                } else {
                    setStatus('An error occurred. Please try again.')
                }
            })
        },
    })



    return (
        <>
            <Button
                block
                layout="outline"
                className="mt-4"
                onClick={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}
            >
                <img
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                    src={GoogleIcon}
                    alt="Office"
                />
                Google
            </Button>
            <HelperText valid={false}>{status}</HelperText>
            {query.get('OAuthRedirect') === 'google' && (
                <HelperText valid={false}>
                    Google Authentication Failed. Please try again.
                </HelperText>
            )}
        </>
    )
}

export default GoogleAuthForm
