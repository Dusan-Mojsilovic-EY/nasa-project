import React from 'react';
import './Header.scss';
import logo from '../../Images/logo.png'


const Header = () => {
    return(
        <div className="Header">
            <img className="Picture" src={logo} alt="" />
        </div>
    );
}
 
export default Header ;