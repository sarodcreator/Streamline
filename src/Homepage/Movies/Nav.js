import React, { useEffect, useState } from 'react';
import './nav.css';
import logo from '../../assets/Logonetflix.png';
import profile from '../../assets/profile-img.jpeg';

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
            <img src={ profile } className='nav_avatar' alt='profile icon'/>
        </div>
    )
}

export default Nav;