import React from 'react';
import './content.css';
import clock from '../../assets/clock.png';
import globe from '../../assets/globe.png';
import users from '../../assets/users.png';


const Content = () => {
  return (
    <div className='whySec'>
        <h3>Why Us</h3>
        <div className="cards">
            <div className="card r">
                <img src={ clock } alt="" />
                <h4>Manage screen time</h4>
                <p>Manage the time you and your kids spend on watching movies and series.</p>
            </div>
            <div className="card ">
                <img src={ globe } alt="" />
                <h4>Watch anywhere</h4>
                <p>Stream unlimited movies and Tv shows on your phone, tablet and laptop.</p>
            </div>
            <div className="card l">
                <img src={ users } alt="" />
                <h4>Multiple profiles</h4>
                <p>Send Kids on adventures with their favorite characters in a space made just for them.</p>
            </div>
        </div>
    </div>
  )
}

export default Content;