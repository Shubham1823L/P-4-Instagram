import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import TextField from '../../components/TextField/TextField'
import EmailField from '../../components/TextField/EmailField'
import UsernameField from '../../components/TextField/UsernameField'
import PasswordField from '../../components/TextField/PasswordField'
import FullNameField from '../../components/TextField/FullNameField'
import styles from './signup.module.css'
import clsx from 'clsx'

const Signup = () => {
    const [valid, setValid] = useState({ email: false, password: false, username: false, fullName: false })
    const [clickable, setClickable] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("clicked")
    }

    useEffect(() => {
        if (Object.values(valid).every(e => e)) setClickable(true)
        else setClickable(false)
    }, [valid])






    return (
        <form>
            <EmailField toggleValid={setValid} />
            <PasswordField toggleValid={setValid} />
            <UsernameField toggleValid={setValid} />
            <FullNameField toggleValid={setValid} />
            <button onClick={handleSubmit} type='submit' className={clsx(!clickable && styles.disabled)}>Sign up</button>
        </form>
    )
}

export default Signup
