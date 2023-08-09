import { createBrowserRouter } from "react-router-dom";
import Main from '../Components/Main';
import Register from '../Components/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />
    },
    {
        path: '/register',
        element: <Register />
    }
])

export default router;