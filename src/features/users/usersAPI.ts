import { axiosPrivate } from '../../api/connector'

export function getUsers(page: number, sortBy: string, search: string | undefined) {
    const baseUrl = '/auth/users/'
    let url = `${baseUrl}?page=${page}&sort=${sortBy}`

    if (search) {
        url += `&search=${search}`;
    }

    return axiosPrivate.get(url)
}
