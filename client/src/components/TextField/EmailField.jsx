import React, { useRef, useState } from 'react'
import TextField from './TextField'
import { validateEmail } from '../../api/dbValidation'

const EmailField = () => {
    const ref = useRef()
    const [error, setError] = useState(null)

    const handleBlur = async () => {
        const value = ref.current.value
        if (!value) return setError("This is a required field")
        setError(null)
        const status = await validateEmail(value)
        if(status==400) return setError("Invalid email address")
        if(status == 409) return setError("Email already registered")
        if(status==500) return setError("Internal Server Error") //### HANDLE THIS LATER
    }

    return (
        <TextField type={"email"} placeholder={"Email address"} ref={ref} error={error} handleBlur={handleBlur} />
    )
}

export default EmailField
