import React from 'react'
import { useAuth } from '../../hooks/useAuth'


const Profile = () => {
    const { user } = useAuth()

    return (
        <>
            <p> Hello {user.username}</p>
            <p>Your Followers:{user.followersCount}</p>
            <p>Following:{user.followingCount}</p>

        </>
    )
}

export default Profile
