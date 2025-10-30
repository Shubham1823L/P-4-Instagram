import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/auth/Login'
import Profile from '../pages/Profile/Profile'
import ProtectedRoutes from './ProtectedRoutes'
import AntiProtectedRoutes from './AntiProtectedRoutes'
import Signup from '../pages/auth/Signup'



export default function AppRouter() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route element={<AntiProtectedRoutes />} >
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Route>

            <Route element={<ProtectedRoutes />} >
                <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
    )
}