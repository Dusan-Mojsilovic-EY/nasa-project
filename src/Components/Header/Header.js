import React from 'react';
import './Header.scss';
import logo from '../../Images/logo.png'
import {Link} from 'react-router-dom'

const Header = () => {
    return(
        <div className="Header">
           <Link to="/"><img className="Picture" src={logo} alt="" /></Link>
        </div>
    );
}
 
export default Header ;