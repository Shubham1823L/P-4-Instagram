import { api } from "./axios"


export const callApiSearch = async (query,page,limit) => {
    try {
        const response = await api.get(`/users/${query}?page=${page}&limit=${limit}`)
        return response
    } catch (error) {
        console.error("shit happened trying to fetch users")
        return error.response
    }

}
