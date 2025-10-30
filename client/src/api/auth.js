import axios from "axios"
import { api } from "./axios"

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password })
        const data = response.data

        if (!data) return console.error("Data object not recieved on frontend")
        return data
    } catch (error) {
        console.log(error)
        return null

    }

}


export const logout = async () => {
    await api.post('/auth/logout')
}


export const signup = async (data) => {
    const { email, username, password, fullName } = data

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, data)
        return response
    } catch (error) {
        return error.response
    }

}
