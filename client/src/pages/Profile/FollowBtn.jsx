import React from 'react'
import styles from './profile.module.css'
import clsx from 'clsx'
import { apiToggleFollowUser } from '../../api/follow.api'

const FollowBtn = ({ username, isFollowing, setIsFollowing }) => {

    const toggleFollow = async () => {
        //Call ToggleFollowRoute
        const { status, data } = await apiToggleFollowUser(username, isFollowing)
        console.log(status)
        if (status == 200) {
            setIsFollowing(bool => !bool)
            console.log(data.message)
            return
        }

        //Error must have occured
        console.error(`Some error occured ${isFollowing ? "unfollowing" : "following"} the user`)
    }

    return (
        <button onClick={toggleFollow} className={clsx(styles.followBtn, styles.darkBtnBase)}>
            {isFollowing ? "Following" : "Follow"}
        </button>
    )
}

export default FollowBtn
