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


