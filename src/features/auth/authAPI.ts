import { axiosPublic } from '../../api/connector'

export function refreshAccessToken(refreshToken: string | undefined) {
    return axiosPublic.post(`/auth/token/refresh/`, {
        refresh: refreshToken,
    })
}
