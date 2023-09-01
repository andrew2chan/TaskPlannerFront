import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Stylesheets/Navbar.css';
import { Link } from 'react-router-dom';
import { updateId, updateUserEmail, updateName, updatePlannedTasksId } from '../Slices/userSlice';

const Navbar = () => {
    const idFromRedux = useSelector((state) => state.user.id);
    const [id, updateCurrId] = useState(-1);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("id") != null) {
            updateCurrId(localStorage.getItem("id"));

            dispatch(updateId(localStorage.getItem("id"))); 
            dispatch(updateUserEmail(localStorage.getItem("email")));
            dispatch(updateName(localStorage.getItem("name")));
            dispatch(updatePlannedTasksId(localStorage.getItem("plannedTasksId")));
        }
    },[])

    useEffect(() => {
        updateCurrId(idFromRedux);
    },[idFromRedux])

    const resetReduxState = () => {
        dispatch(updateId(-1));
        dispatch(updateUserEmail(""));
        dispatch(updateName(""));
        dispatch(updatePlannedTasksId(-1));
    }

    const resetState = (e) => {
        localStorage.clear();
        resetReduxState();
    }

    return (
        <div id="navigation-bar">
            <div className="logo"><Link to="/"><img src="https://helios-i.mashable.com/imagery/articles/00apgKgIAO4EnFfjOgCApRe/hero-image.fill.size_1200x1200.v1619086604.jpg" className="logo" alt="logo" /></Link></div>
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
                            <Link to="usercalendar" className="redirect-buttons">Calendar</Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;