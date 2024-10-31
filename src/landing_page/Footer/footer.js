import React from 'react';
import './footer.css';
import Logonetflix from '../../assets/Logonetflix.png';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="img">
                <img src={Logonetflix} alt="" />
            </div>
            <div className="links">
                <div className='footerRows'>
                    <a href="/">FAQ</a>
                    <a href="/">Privacy</a>
                    <a href="/">Speed Test</a>
                </div>
                <div className='footerRows'>
                    <a href="/">Help Center</a>
                    <a href="/">Cookie Preferences</a>
                    <a href="/">Legal Notice</a>
                </div>
                <div className='footerRows'>
                    <a href="/">Account</a>
                    <a href="/">Only On</a>
                    <a href="/">Ways To Watch</a>
                    <a href="/">Corporate Information</a>
                </div>
                <div className='footerRows'>
                    <a href="/">Terms of Use</a>
                    <a href="/">Contact Us</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;