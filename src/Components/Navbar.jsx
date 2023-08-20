import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Stylesheets/Navbar.css';
import { Link } from 'react-router-dom';
import { updateId, updateUserEmail, updateName, updatePlannedTasksId } from '../Slices/userSlice';

const Navbar = () => {
    const id = useSelector((state) => state.user.id);
    const dispatch = useDispatch();

    const resetReduxState = () => {
        dispatch(updateId(-1));
        dispatch(updateUserEmail(""));
        dispatch(updateName(""));
        dispatch(updatePlannedTasksId(-1));
    }

    const resetState = () => {
        resetReduxState();
    }

    return (
        <div id="navigation-bar">
            <div className="logo"><a href="/"><img src="https://helios-i.mashable.com/imagery/articles/00apgKgIAO4EnFfjOgCApRe/hero-image.fill.size_1200x1200.v1619086604.jpg" className="logo" alt="logo" /></a></div>
            <div className="login-register-buttons">
                {
                    id == -1 ? (
                        <>
                            <Link to="register" className="redirect-buttons">Register</Link>
                            <Link to="login" className="redirect-buttons">Login</Link>
                        </>
                    )
                    : (
                        <>
                            <Link to="/" className="redirect-buttons" onClick={resetState} >Logout</Link>
                            <Link to="profile" className="redirect-buttons">Profile</Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;