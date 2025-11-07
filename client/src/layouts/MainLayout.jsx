import React, { useRef, useState } from 'react'
import styles from './mainLayout.module.css'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from "../components/Footer/Footer"

const MainLayout = () => {
    const [myPosts, setMyPosts] = useState([])
    const createNewPostRef = useRef()

    const showCreateNewPostDialog = () => {
        createNewPostRef.current.style.display = "flex"
    }

    return (

        <>
            <div className={styles.mainLayoutWrapper}>
                <Sidebar setMyPosts={setMyPosts} createNewPostRef={createNewPostRef} showCreateNewPostDialog={showCreateNewPostDialog} />
                <main className={styles.main}>
                    <Outlet context={{myPosts,showCreateNewPostDialog}} />
                    <Footer />
                </main>
            </div>
        </>
    )
}

export default MainLayout
