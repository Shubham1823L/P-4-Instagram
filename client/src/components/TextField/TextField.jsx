import React from 'react'
import styles from './textField.module.css'
import { IoIosCloseCircleOutline } from "react-icons/io";


const TextField = ({ type, placeholder, handleBlur, ref, error }) => {

    return (
        <>
            <div className={styles.inputWrapper}>
                <div className={styles.textFieldWrapper}>
                    <input onBlur={handleBlur} ref={ref} placeholder={placeholder} type={type} className={styles.textField} />
                    <label className={styles.placeholder}>{placeholder}</label>
                </div>

                <div className={styles.error}>
                    {error}
                </div>
            </div>
        </>
    )
}

export default TextField
