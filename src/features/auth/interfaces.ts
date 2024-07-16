
export interface UserData {
    id: number
    username: string
    first_name: string
    last_name: string
    email: string
    is_staff: boolean
    is_active: boolean
    last_login: Date
    date_joined: Date
    avatar: null
    language: null
    prevState: null
}

export interface LoginSuccessData {
    user: UserData
    access_token: string
    refresh_token: string
}

export interface LoginSuccessResponse {
    data: LoginSuccessData
}

export interface AuthState {
    status: 'idle' | 'loading' | 'failed'
    user: UserData | null
    accessToken: string
    refreshToken: string
    accessTokenExpiration: string
    isTokenExpired?: boolean
}
