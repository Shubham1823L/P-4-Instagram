import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './profile.module.css'
import { logout } from '../../api/auth'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const { user, updateToken, updateUser } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async (e) => {
        e.preventDefault()
        await logout()
        updateToken(null)
        updateUser(null)
        navigate('/login')
    }
    return (
        <>
            <div className={styles.userDataWrapper}>
                {
                    Object.keys(user).map(key => {
                        return (
                            <p>{key}:{user[key]}</p>
                        )
                    })
                }
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Profile
