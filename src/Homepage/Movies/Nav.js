import React, { useEffect, useState } from 'react';
import './nav.css';
import logo from '../../assets/Logonetflix.png'

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img src={logo} alt="Netflix logo" className='nav_logo' />
            <img src="https://pbs.twimg.com/profile_images/124011999041155" alt="profile" className='nav_avatar' />
        </div>
    )
}

export default Nav;