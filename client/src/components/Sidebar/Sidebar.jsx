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
import { IoClose } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { publishNewPost, uploadFile } from '../../api/posts';

const Sidebar = ({ setMyPosts, createNewPostRef, showCreateNewPostDialog }) => {
    const [file, setFile] = useState(null)
    const [tempURL, setTempURL] = useState(null)


    const handleClose = () => {
        createNewPostRef.current.style.display = "none"
        setTempURL(null)
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setFile(file)
        setTempURL(url)
    }

    const handleFileUpload = async (e) => {
        e.preventDefault()
        const { status, data } = await uploadFile(file)
        if (status == 400) return console.log("File was empty, Bad request")
        if (status == 500) return console.log("Something went wrong on our end")
        if (status == 200) {
            const response = await publishNewPost(data)
            if (response.status == 500) return console.log("Something went wrong on our end")
            if (response.status == 200) {
                console.log(response)
                setMyPosts(prev => [...prev, response.data.post])
                return
            }
        }
        console.error("SHIT HAPPENED , TOO MUCH ERROR HANDLING, NGL")
    }

    return (
        <div className={styles.sidebarWrapper}>


            <div ref={createNewPostRef} className={styles.createNewPost}>
                <IoClose onClick={handleClose} className={styles.closeIcon} size={32} />
                <div className={styles.dialogBoxWrapper}>
                    <form className={styles.dialogBox}>
                        <div>
                            {tempURL && <button onClick={(e) => {
                                e.preventDefault()
                                setTempURL(null)
                            }} className={styles.backBtn}><FaArrowLeftLong /></button>}
                            <p>Create New Post</p>
                            {tempURL && <button onClick={handleFileUpload} className={styles.uploadFile}>Share</button>}
                        </div>

                        {tempURL ? <img className={styles.previewContent} src={tempURL} alt="userSelectedContentPreview" /> : <>
                            <section>
                                <img src="www.instagram.com/image&video.svg" alt="image&videoIcon" />
                                <p>Drag photos and videos here</p>
                                <div className={styles.selectFile}>
                                    <label htmlFor="fileUpload">Select from Computer</label>
                                    <input onChange={handleFileSelect} id='fileUpload' type="file" accept='image/* video/*' />
                                </div>
                            </section>
                        </>
                        }

                    </form>
                </div>
            </div>




            <div className={styles.sidebar}>
                <div>
                    <NavLink to={"/"}>
                        <div><img src="instagram-wordmark.svg" alt="instaLogo" className={styles.instaLogo} /></div>
                    </NavLink>
                </div>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div>
                                <GoHomeFill size={28} />
                            </div>
                            <span>Home</span>
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <div>
                            <div>
                                <CiSearch strokeWidth={.6} size={28} />
                            </div>
                            <span>Search</span>
                        </div>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div>
                                <MdOutlineExplore size={28} />
                            </div>
                            <span>Explore</span>
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div><img src="www.instagram.com/reels.svg" alt="reelsIcon" /></div>
                            Reels
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/"}>
                            <div>
                                <PiPaperPlaneTiltBold size={26} />
                            </div>
                            Messages
                        </SidebarNavLink>
                    </li>
                    <li className={styles.listItem}>
                        <div>
                            <div>
                                <FaRegHeart size={24} />
                            </div>
                            Notifications
                        </div>
                    </li>
                    <li className={styles.listItem}>
                        <button onClick={showCreateNewPostDialog}>
                            <div>
                                <FiPlus size={28} />
                            </div>
                            Create
                        </button>
                    </li>
                    <li className={styles.listItem}>
                        <SidebarNavLink to={"/profile"} >
                            <div>
                                <BsPersonCircle size={28} />
                            </div>
                            Profile
                        </SidebarNavLink>
                    </li>
                </ul>
                <div></div>
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
