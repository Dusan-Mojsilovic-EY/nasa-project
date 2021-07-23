import './Footer.scss'
import React from 'react';
import {Link, withRouter} from 'react-router-dom'


const Footer = ({location}) => {

    return(
    <div className="footer">
      { location.pathname === "/aplication" 
        ? <p className="privacyLink">Privacy Notice</p> 
        : <Link to="/privacy" className="privacyLink">Privacy Notice</Link>}
      { location.pathname === "/aplication" 
        ? <p className="termsLink">Terms and Conditions</p> 
        :<Link to="/terms" className="termsLink">Terms and Conditions</Link>}
    </div>
    );
}
 
export default withRouter(Footer) ;