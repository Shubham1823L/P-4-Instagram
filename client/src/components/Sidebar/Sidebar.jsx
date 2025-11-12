import React, { useRef, useState } from 'react'
import styles from './sidebar.module.css'
import { NavLink } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import clsx from 'clsx'
import CreateNewPost from './CreateNewPost';
import SearchMenu from './SearchMenu';
import { useAuth } from '../../hooks/useAuth';
import { Menu } from 'lucide-react'

const Sidebar = ({ setMyPosts, createNewPostRef, showCreateNewPostDialog }) => {

    const [isOpen, setIsOpen] = useState(false)
    const searchInputRef = useRef()
    const { user } = useAuth()




    return (
        <div className={clsx(styles.sidebarWrapper, isOpen ? styles.openSearchMenu : "")}>

            <CreateNewPost setMyPosts={setMyPosts} createNewPostRef={createNewPostRef} showCreateNewPostDialog={showCreateNewPostDialog} />

            <div className={styles.sidebar}>

                <NavLink to={"/"} className={styles.logoWrapper}>
                    <img src="/instagram-wordmark.svg" alt="instaWordmark" className={styles.instaWordmark} />
                    <img src="/01 Static Glyph/02 White Glyph/Instagram_Glyph_White.svg" alt="instaLogo" className={styles.instaLogo} />
                </NavLink>

                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div>
                                <GoHomeFill size={28} />
                            </div>
                            <span className={styles.listItemText}>Home</span>
                        </SidebarNavLink>
                    </li>
                    {/* SearchBtn */}

                    <li className={styles.listItem}>
                        <button className={styles.searchBtn} onMouseDown={() => {

                            setIsOpen(true)
                            setTimeout(() => {
                                searchInputRef.current.focus()
                            }, .0001);

                        }}>
                            <div>
                                <CiSearch strokeWidth={.6} size={28} />
                            </div>
                            <span className={styles.listItemText}>Search</span>
                        </button>
                    </li>

                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div>
                                <MdOutlineExplore size={28} />
                            </div>
                            <span className={styles.listItemText}>Explore</span>
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div><img src="/www.instagram.com/reels.svg" alt="reelsIcon" /></div>
                            <span className={styles.listItemText}>Reels</span>
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div>
                                <PiPaperPlaneTiltBold size={26} />
                            </div>
                            <span className={styles.listItemText}>Messages</span>
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <div>
                            <div>
                                <FaRegHeart size={24} />
                            </div>
                            <span className={styles.listItemText}>Notifications</span>
                        </div>
                    </li>
                    <li className={styles.listItem}>
                        <button onClick={showCreateNewPostDialog}>
                            <div>
                                <FiPlus size={28} />
                            </div>
                            <span className={styles.listItemText}>Create</span>
                        </button>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={user.username} >
                            <div>
                                {user.avatar.secureUrl ? <img src={user.avatar.secureUrl} className={styles.avatar} alt="avatar" /> : <BsPersonCircle size={28} />}
                            </div>
                            <span className={styles.listItemText}>Profile</span>
                        </SidebarNavLink>
                    </li>
                </ul>
                <div>
                    <ul className={clsx(styles.list,styles.lowerList)}>
                        <li className={styles.listItem}>
                            <button>
                                <div>
                                    <Menu size={28} />
                                </div>
                                <span>
                                    More
                                </span>
                            </button>
                        </li>
                        <li className={styles.listItem}>
                            <button>
                                <div>
                                    <svg aria-label="Also from Meta" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Also from Meta</title><path d="M9.5 11h5c1.379 0 2.5-1.122 2.5-2.5v-5C17 2.122 15.879 1 14.5 1h-5A2.503 2.503 0 0 0 7 3.5v5C7 9.878 8.12 11 9.5 11ZM9 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5ZM8.499 13h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Zm11.5-7.5h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Z"></path></svg>
                                </div>
                                <span>
                                    Also from Meta
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <SearchMenu searchInputRef={searchInputRef} setIsOpen={setIsOpen} />
        </div >
    )
}

export default Sidebar





const SidebarNavLink = ({ to, children }) => {

    return (
        <NavLink to={to} className={({ isActive }) => isActive ? styles.activeListItem : ""}>
            {children}
        </NavLink>
    )
}
