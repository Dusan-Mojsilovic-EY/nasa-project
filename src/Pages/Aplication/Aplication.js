import React from 'react';
import './Aplication.scss';
import { useState } from "react";
import {Link} from 'react-router-dom'

const Aplication = () => {

    const [isCheckedFirst, setIsCheckedFirst] = useState (false);
    const [isCheckedSecond, setIsCheckedSecond] = useState (false);

    const handleOnChange = (something, someState) => {
        something(!someState)
    }

    return(
        <div className="aplication">
            <div className='aplicationDescription'>
                <h3 className='aplicationHeader'> Privacy Notice & Terms and Conditions agreement</h3>
                <p className='aplicatonText'>You are about to start the application process for EY-NASA mission to Mars. Please read <span> </span>
                    <Link to="/privacy" className="privacy">„Privacy Notice“</Link> <span> </span> and <span> </span>
                    <Link to="/terms" className="terms">„Terms and Conditions“</Link> <span> </span>
                        before giving your consent. If you agree, EY and NASA will use the data for the purposes of the 
                        legitimate interest(s) of the Mars mission.The specific legitimate interest(s) are the 
                        provision of mission planning and are for internal use by EY and NASA employees.</p>
            </div>
            <div className='aplicationProceed'>
                <div className='aplicationCheckbox'>
                    <div>
                        <input type="checkbox" id='readDocumentations' name='readDecumentations'
                            checked={isCheckedFirst} onChange={()=>handleOnChange(setIsCheckedFirst, isCheckedFirst)}/>
                        <label> I have read the above mentioned documents.</label>
                    </div>
                    <div>
                    <input type="checkbox" id='agreeDocumentations' name='agreeDocumentations'
                            checked={isCheckedSecond} onChange={()=>handleOnChange(setIsCheckedSecond, isCheckedSecond)}/> 
                           <label> I agree to above mentioned conditions.</label>
                    </div>
                </div>
                <div className='aplicationButton'>
                    
                    <Link to="/Wizard"><button className='aBtn' disabled={ isCheckedFirst && isCheckedSecond ? false : true }>PROCEED</button></Link>
                  
                </div>
            </div>
        </div>
    );
}
 
export default Aplication ;