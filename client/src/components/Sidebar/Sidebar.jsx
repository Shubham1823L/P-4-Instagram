import React from 'react'
import styles from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

const Sidebar = () => {

    return (
        <div className={styles.sidebarWrapper}>
            <div className={styles.sidebar}>
                <div>
                    <Link to={"/"}>
                        <img src="instagram-wordmark.svg" alt="instaLogo" className={styles.instaLogo} />
                    </Link>
                </div>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <Link>
                            <GoHomeFill size={28} />
                            Home
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <div>
                            <IoIosSearch size={28} />
                            Search
                        </div>
                    </li>
                    <li className={styles.listItem}>
                        <Link>
                            <MdOutlineExplore size={28} />
                            Explore
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link>
                            <img src="www.instagram.com/reels.svg" alt="reelsIcon" />
                            Reels
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <Link>
                            <PiPaperPlaneTiltBold size={28} />
                            Messages
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <div>
                            <FaRegHeart size={28} />
                            Notifications
                        </div>
                    </li>
                    <li className={styles.listItem}>
                        <div>
                            <FiPlus size={28} />
                            Create
                        </div>
                    </li>
                    <li className={styles.listItem}>
                        <Link to={"/profile"}>
                            <BsPersonCircle size={28} />
                            Profile
                        </Link>
                    </li>
                </ul>
                <div></div>
            </div>
        </div>
    )
}

export default Sidebar
