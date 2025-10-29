import { useEffect, useState } from 'react'
import { AuthContext } from './../hooks/useAuth'
import axios from 'axios'


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const refreshSession = async () => {
            const response = await axios.post('/auth/refresh', {}, {
                withCredentials: true,
                baseURL: `${import.meta.env.VITE_API_BASE_URL}`
            })

            const { accessToken, user } = response.data
            setToken(accessToken)
            setUser(user)

        }
        refreshSession().then(()=>setLoading(false))

    }, [])

    const updateToken = (token) => setToken(token)
    const updateUser = (user) => setUser(user)

    const value = { user, updateUser, token, updateToken }
    return (
        <>
            {
                loading ? "Loading Page" :
                    <AuthContext.Provider value={value}>
                        {children}
                    </AuthContext.Provider>
            }
        </>

    )
}


