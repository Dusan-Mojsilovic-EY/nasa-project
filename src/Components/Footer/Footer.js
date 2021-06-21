import './Footer.scss'
import React from 'react';
import PrivacyNotice from '../../Pages/PrivacyNotice/PrivacyNotice'
import Terms from '../../Pages/Terms/Terms'
import {Link} from 'react-router-dom'

const Footer = () => {
    return(
    <div className="Footer">
      <Link to="/privacy" className="PrivacyLink">Privacy Notice</Link>
      <Link to="/terms" className="TermsLink">Terms and Conditions</Link>
       </div>
    );
}
 
export default Footer ;