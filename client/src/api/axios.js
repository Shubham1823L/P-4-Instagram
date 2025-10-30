import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})


export const useAxiosInterceptors = () => {

    const {token,updateToken} = useAuth()

    api.interceptors.request.use(config => {
        config.headers.Authorization = token && `Bearer ${token}`
        return config
    })

    api.interceptors.response.use(res => res, async error => {
        const originalRequest = error.config

        // TokenExpiredError is sufficent to say that error.response?.status == 401
        // So if token is expired then we retry by refreshing token ONCE, therefore we add a new key-value pair to the originalRequest i.e. hasRetried , which if is false(undefined), we try otherwise after retrying once , we set it to true therefore if() goes false and we dont retry
        if (error.response?.data?.name == "TokenExpiredError" && !originalRequest.hasRetried) {
            console.warn("Token Expired , refreshing token now...")

            originalRequest.hasRetried = true
            try {
                const response = await axios.post(`${baseUrl}/auth/refresh`, {}, { withCredentials: true })
                const newToken = response.data?.accessToken
                updateToken(newToken)

                originalRequest.headers['authorization'] = newToken && `Bearer ${newToken}`
                return api(originalRequest)
            } catch (error) {
                console.error("Token refresh Failed:", error)
            }

        }
        else {
            console.warn("Invalid Session, user must re-login")
        }

        return Promise.reject(error)

    })
}