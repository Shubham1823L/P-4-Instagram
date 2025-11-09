import React, { useState } from 'react'
import styles from './sidebar.module.css'
import { publishNewPost, uploadFile } from '../../api/posts';
import { IoClose } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";

const CreateNewPost = ({createNewPostRef,setMyPosts}) => {
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
                            <img src="/www.instagram.com/image&video.svg" alt="image&videoIcon" />
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
    )
}

export default CreateNewPost
