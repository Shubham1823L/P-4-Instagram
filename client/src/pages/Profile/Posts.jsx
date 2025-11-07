import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { useOutletContext } from 'react-router-dom'
import { fetchMyPosts } from '../../api/posts'
import { FiCamera } from "react-icons/fi";


const Posts = () => {
    const {myPosts,showCreateNewPostDialog}= useOutletContext()
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const { status, data } = await fetchMyPosts(1, 5)
            if (status == 500) return console.log("Something went wrong on our side getting your posts")
            if (status == 200) {
                setAllPosts(prevPosts => [...prevPosts, ...data.posts])
            }
            setLoading(false)
        })()

    }, [])
    useEffect(() => {
        myPosts.length != 0 && setAllPosts(prevPosts => [myPosts[myPosts.length - 1], ...prevPosts])
    }, [myPosts])




    return (
        <>
            {loading || allPosts.length == 0 ? <div className={styles.emptyPostsPlaceholder}>
                <div className={styles.camIconContainer}>
                    <FiCamera size={36} strokeWidth={.8} />
                </div>
                <h3>Share photos</h3>
                <p>When you share photos, they will appear on your profile.</p>
                <button onClick={showCreateNewPostDialog}>Share your first photo</button>
            </div>
                :
                <div className={styles.posts}>
                    {allPosts.map(e => {
                        return (
                            <div className={styles.post} key={e._id}><img src={e.content?.secureUrl} alt={e._id} /></div>

                        )
                    })}
                </div>}
        </>
    )
}

export default Posts
