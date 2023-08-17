import { createBrowserRouter } from "react-router-dom";
import Main from '../Components/Main';
import Register from '../Components/Register';
import Login from '../Components/Login';
import UserCalendar from "../Components/UserCalendar";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/usercalendar',
        element: <UserCalendar />
    }
])

export default router;