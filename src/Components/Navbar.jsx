import React from 'react';
import '../Stylesheets/Navbar.css';

const Navbar = () => {
    return (
        <div id="navigation-bar">
            <div className="logo"><a href="/"><img src="https://helios-i.mashable.com/imagery/articles/00apgKgIAO4EnFfjOgCApRe/hero-image.fill.size_1200x1200.v1619086604.jpg" className="logo" alt="logo" /></a></div>
            <div className="login-register-buttons">
                <a href="/Register" className="redirect-buttons">Register</a>
                <a href="/Login" className="redirect-buttons">Login</a>
            </div>
        </div>
    )
}

export default Navbar;