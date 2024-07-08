export interface UsersState {
    status: 'idle' | 'loading' | 'failed'
    results: User[]
    count: number
    next: any
    previous: any
}

export interface User {
    username: string
    id: string
    last_login?: string
    first_name?: string
    last_name?: string
    email?: string
    is_staff?: boolean
    is_temporary_password: boolean
    date_joined: string
    updated_at: string
}
