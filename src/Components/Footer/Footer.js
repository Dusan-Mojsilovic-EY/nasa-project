import './Footer.scss'
import React from 'react';
import {Link} from 'react-router-dom'

const Footer = () => {
    return(
    <div className="footer">
      <Link to="/privacy" className="privacyLink">Privacy Notice</Link>
      <Link to="/terms" className="termsLink">Terms and Conditions</Link>
       </div>
    );
}
 
export default Footer ;