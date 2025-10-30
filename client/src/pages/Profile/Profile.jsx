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
                <p> Hello {user.username}</p>
                <p>Your Followers:{user.followersCount}</p>
                <p>Following:{user.followingCount}</p>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Profile
