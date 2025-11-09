import React, { useEffect, useRef, useState } from 'react'
import styles from './sidebar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import clsx from 'clsx'
import CreateNewPost from './CreateNewPost';
import { callApiSearch } from '../../api/userQuery';


const Sidebar = ({ setMyPosts, createNewPostRef, showCreateNewPostDialog }) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const searchMenuRef = useRef()
    const [searchedUsers, setSearchedUsers] = useState([])
    const [recentUsers, setRecentUsers] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {

            if (searchQuery) {
                (async () => {
                    const response = await callApiSearch(searchQuery, 1, 5)
                    if (response.status == 500) return console.log("Server side bad", response)
                    if (response.status == 200) {
                        const users = response.data.users
                        setSearchedUsers(users)
                    }
                })()
            }


        }, 400);


        return () => {
            clearTimeout(timer)
        }
    }, [searchQuery])





    return (
        <div className={clsx(styles.sidebarWrapper, isOpen ? styles.openSearchMenu : "")}>

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
                        <button className={styles.searchBtn} onMouseDown={() => {

                            setIsOpen(true)
                            setTimeout(() => {
                                searchMenuRef.current.focus()
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
            <div ref={searchMenuRef} tabIndex="-1" className={styles.searchMenu} onBlur={(e) => {
                if (e.currentTarget.contains(e.relatedTarget)) return
                setIsOpen(false)
            }}>
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


                <div className={clsx(styles.searchResultsWrapper, !searchQuery ? styles.emptySearchQuery : "")}>
                    {!searchQuery && <div className={styles.searchResultsHeader}>
                        <span>Recent</span>
                        <button onClick={() => setRecentUsers([])}>Clear All</button>
                    </div>}

                    {searchQuery ?
                        //Search query is not empty
                        (searchedUsers.length != 0 ?
                            //Search Results have something to show(not empty)
                            //Show results
                            <div className={styles.searchResults}>
                                {
                                    searchedUsers.map(user => {
                                        return (
                                            <Link key={user._id} onClick={() => {
                                                if (recentUsers.some(e => e._id == user._id)) {
                                                    const newUsers = [...recentUsers]
                                                    const finalUsers = newUsers.filter(e => e._id != user._id)
                                                    finalUsers.unshift(user)
                                                    setRecentUsers(finalUsers)

                                                }
                                                else setRecentUsers(prev => [user, ...prev])
                                            }} to={"#"} className={styles.searchResult} >
                                                <div>
                                                    <img src={user.profilePic?.secureUrl || "vite.svg"} alt="userProfilePic" />
                                                </div>

                                                <div className={styles.searchedUserData}>
                                                    <p className={styles.oneLineText}>{user.username}</p>
                                                    <div className={styles.extraUserDetails}>
                                                        <p>{user.fullName}</p>
                                                        <ul>
                                                            <li>
                                                                <span className={styles.oneLineText}>
                                                                    {user.followersCount} followers
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }


                            </div> :
                            //Search Results are empty , show no results
                            <div className={styles.noResults}>No results found.</div>
                        ) :
                        //Search query is empty
                        (recentUsers.length != 0 ?
                            //Recently Searched Users are there , show them
                            <div className={clsx(styles.recentResults, styles.searchResults)}>
                                {recentUsers.map(user => {
                                    return (
                                        <Link key={user._id} to={"#"} className={styles.searchResult} >
                                            <div>
                                                <img src={user.profilePic?.secureUrl || "vite.svg"} alt="userProfilePic" />
                                            </div>

                                            <div className={styles.searchedUserData}>
                                                <p className={styles.oneLineText}>{user.username}</p>
                                                <div className={styles.extraUserDetails}>
                                                    <p>{user.fullName}</p>
                                                    <ul>
                                                        <li>
                                                            <span className={styles.oneLineText}>
                                                                {user.followersCount} followers
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}

                            </div> :
                            <div className={styles.noResults}>
                                No recent searches.
                            </div>)
                    }
                </div>


            </div>
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
