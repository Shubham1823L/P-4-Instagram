import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/auth/Login'
import Profile from '../pages/Profile/Profile'
import ProtectedRoutes from './ProtectedRoutes'
import AntiProtectedRoutes from './AntiProtectedRoutes'



export default function AppRouter() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            
            <Route element={<AntiProtectedRoutes />} >
                <Route path='/login' element={<Login />} />
            </Route>

            <Route element={<ProtectedRoutes />} >
                <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
    )
}