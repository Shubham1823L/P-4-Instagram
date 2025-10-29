import React, { useRef } from 'react'
import styles from './login.module.css'
import { useAuth } from '../../hooks/useAuth'
import { login } from '../../api/auth'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { updateUser, updateToken } = useAuth()


    const emailRef = useRef()
    const passwordRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        const data = await login(email, password)
        if (!data) return

        const { user, accessToken } = data
        updateUser(user)
        updateToken(accessToken)
        navigate(location.state?.from || "/profile", { replace: true })
    }

    return (
        <form className={styles.loginForm}>
            <legend>Login Form</legend>
            <input type="email" placeholder='Enter your Email' ref={emailRef} />
            <input type="password" placeholder='Enter your Password' ref={passwordRef} />
            <button type='submit' onClick={handleSubmit}>Login</button>
        </form>
    )
}

export default Login
