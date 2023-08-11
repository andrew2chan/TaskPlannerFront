import { createBrowserRouter } from "react-router-dom";
import Main from '../Components/Main';
import Register from '../Components/Register';
import Login from '../Components/Login';

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
    }
])

export default router;