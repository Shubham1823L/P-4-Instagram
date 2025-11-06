import React from 'react'
import styles from './profile.module.css'
import { useAuth } from '../../hooks/useAuth'

const Posts = () => {
    const { user: { posts } } = useAuth()
    return (
        <>
            {posts.map(e => <div key={posts.indexOf(e)}>{e}</div>)}
        </>
    )
}

export default Posts
