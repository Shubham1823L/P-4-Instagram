import React from 'react'
import Footer from '../../components/Footer/Footer'
import TextField from '../../components/TextField/TextField'
import EmailField from '../../components/TextField/EmailField'
import UsernameField from '../../components/TextField/UsernameField'


const Signup = () => {


    return (
        <form>
            <EmailField />
            <UsernameField/>
        </form>
    )
}

export default Signup
