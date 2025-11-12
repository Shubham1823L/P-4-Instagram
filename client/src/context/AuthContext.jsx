import { useEffect, useState } from 'react'
import { AuthContext } from './../hooks/useAuth'
import axios from 'axios'
import LoadingPage from '../pages/Extras/LoadingPage'


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const refreshSession = async () => {
            try {
                console.log("inside refreshSession")
                const response = await axios.post('/auth/refresh', {}, {
                    withCredentials: true,
                    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
                })
                console.log(response)
                const { accessToken, user } = response.data
                setToken(accessToken)
                setUser(user)
            } catch (error) {
                const { status, data } = error.response
                if (data.code === "TOKEN_NOT_FOUND") return
                if (status === 500) return console.error("Internal Server Error. Please Retry")
                if (data.code === "USER_NOT_FOUND") return console.warn("Unauthorized User")
            }


        }
        refreshSession().then(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1500);

        })

    }, [])

    const updateToken = (token) => setToken(token)
    const updateUser = (user) => setUser(user)

    const value = { user, updateUser, token, updateToken }
    return (
        <>
            {
                loading ? <LoadingPage /> :
                    <AuthContext.Provider value={value}>
                        {children}
                    </AuthContext.Provider>
            }
        </>

    )
}


