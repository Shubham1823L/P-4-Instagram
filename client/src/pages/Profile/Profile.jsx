import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './profile.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { FaCamera } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { GrGrid } from "react-icons/gr";
import { RiBookmarkLine } from "react-icons/ri";
import { TbUserSquare } from "react-icons/tb";
import clsx from 'clsx';

const Profile = () => {
    const { user: { username, fullName, followersCount, followingCount, posts } } = useAuth()

    return (
        <>
            <div className={styles.wrapper}>

                <div className={styles.hero}>
                    <div className={styles.profile}>
                        <div className={styles.profilePicWrapper}>
                            <button className={styles.profilePic}>
                                <FaCamera size={"2.5rem"} />
                            </button>
                        </div>
                        <div className={styles.profileData}>
                            <div className={styles.profileDataHeader}>
                                <span>{username}</span>
                                <div className={styles.profileRelatedBtns}>
                                    <button className={styles.darkBtnBase}>
                                        Edit Profile
                                    </button>
                                    <button className={styles.darkBtnBase}>
                                        View Archive
                                    </button>
                                    <button className={styles.settings}>
                                        <img src="www.instagram.com/settings.svg" alt="settingsIcon" />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.metricsCount}>
                                <span>
                                    <span>{posts.length}</span>
                                    <span>post</span>
                                </span>
                                <span>
                                    <span>{followersCount}</span>
                                    <span>follower</span>
                                </span>
                                <span>
                                    <span>{followingCount}</span>
                                    <span>following</span>
                                </span>
                            </div>
                            <div className={styles.fullName}>
                                {fullName}
                            </div>
                        </div>

                    </div>
                    <div className={styles.heroBottom}>
                        <div>
                            <div className={styles.createNewPostWrapper}>
                                <button className={styles.createNewPost}>
                                    <FiPlus size={56} strokeWidth={1.5} color='grey' />
                                </button>
                            </div>
                            New
                        </div>

                    </div>
                </div>


                <div className={styles.mainContentWrapper}>
                    <div className={styles.mainContentNav}>
                        <div>
                            <NavLink to={""} end className={({ isActive }) => clsx(isActive && styles.selected, styles.navLink)} >
                                <GrGrid size={20} />
                            </NavLink>
                            <NavLink to={"saved"} className={({ isActive }) => clsx(isActive && styles.selected, styles.navLink)}>
                                <RiBookmarkLine size={24} />
                            </NavLink>
                            <NavLink to={"tagged"} className={({ isActive }) => clsx(isActive && styles.selected, styles.navLink)}>
                                <TbUserSquare size={24} />
                            </NavLink>
                        </div>

                    </div>
                    <div className={styles.mainContent}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
