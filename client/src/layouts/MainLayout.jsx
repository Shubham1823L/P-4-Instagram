import React from 'react'
import styles from './mainLayout.module.css'
import Sidebar from '../components/Sidebar/Sidebar'
import Profile from '../pages/Profile/Profile'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
    return (
        <>
            <div className={styles.mainLayoutWrapper}>
                <Sidebar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default MainLayout
