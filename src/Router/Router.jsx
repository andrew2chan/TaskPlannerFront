import { createBrowserRouter, Outlet } from "react-router-dom";
import Main from '../Components/Main';
import Register from '../Components/Register';
import Login from '../Components/Login';
import UserCalendar from "../Components/UserCalendar";
import Profile from '../Components/Profile';
import Navbar from '../Components/Navbar';

const NavbarWrapper = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarWrapper />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'usercalendar',
                element: <UserCalendar />
            },
            {
                path: 'profile',
                element: <Profile />
            }
        ]
    }
])

export default router;