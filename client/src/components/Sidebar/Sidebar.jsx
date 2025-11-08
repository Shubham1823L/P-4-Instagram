import React, { useEffect, useRef, useState } from 'react'
import styles from './sidebar.module.css'
import { NavLink } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";

import CreateNewPost from './CreateNewPost';
import { callApiSearch } from '../../api/userQuery';

const Sidebar = ({ setMyPosts, createNewPostRef, showCreateNewPostDialog }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {

            if (searchQuery) {
                (async () => {
                    const response = await callApiSearch(searchQuery, 1, 5)
                    if (response.status == 500) return console.log("Server side bad", response)
                    if (response.status == 200) {
                        const users = response.data.users
                        console.log("And the users are:", users)
                    }
                })()
            }


        }, 400);


        return () => {
            clearTimeout(timer)
        }
    }, [searchQuery])





    return (
        <div className={styles.sidebarWrapper}>

            <CreateNewPost setMyPosts={setMyPosts} createNewPostRef={createNewPostRef} showCreateNewPostDialog={showCreateNewPostDialog} />


            <div className={styles.sidebar}>

                <NavLink to={"/"} className={styles.logoWrapper}>
                    <img src="instagram-wordmark.svg" alt="instaWordmark" className={styles.instaWordmark} />
                    <img src="01 Static Glyph/02 White Glyph/Instagram_Glyph_White.svg" alt="instaLogo" className={styles.instaLogo} />
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
                        <button className={styles.searchBtn}>
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
                            <div><img src="www.instagram.com/reels.svg" alt="reelsIcon" /></div>
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
                        <SidebarNavLink to={"/profile"} >
                            <div>
                                <BsPersonCircle size={28} />
                            </div>
                            <span className={styles.listItemText}>Profile</span>
                        </SidebarNavLink>
                    </li>
                </ul>
                <div></div>
            </div>
            <div className={styles.searchMenu}>
                <div className={styles.searchHeader}>
                    <h2>Search</h2>
                    <div className={styles.searchBarWrapper}>
                        <CiSearch size={20} color='#bbb9b9ff' className={styles.svg} />

                        <input onChange={e => setSearchQuery(e.target.value)} value={searchQuery} placeholder='Search' type="text" className={styles.searchBar} />

                        <button onClick={() => {
                            setSearchQuery("")
                            // ###DOUBT why blur won't work
                            // inputRef.current.blur()
                        }} className={styles.svg}>
                            <IoIosCloseCircle size={20} color='#bbb9b9ff' aria-label='clear-search' />
                        </button>
                    </div>
                </div>


                <div className={styles.searchResultsWrapper}>
                    <div className={styles.searchResultsHeader}>
                        <span>Recent</span>
                        <button>Clear All</button>
                    </div>

                    <div className={styles.searchResults}>

                    </div>
                </div>


            </div>
        </div>
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
