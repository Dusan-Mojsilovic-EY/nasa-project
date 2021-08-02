import React from "react";
import "./Aplication.scss";
import { useState } from "react";
import {Link} from "react-router-dom";
import { agreeDocumentations, aplicationHeaderText, aplicationTextInfoOne, aplicationTextInfoTwo, readDocumentations } from "../../Constants/Constants";

const Aplication = () => {

    const [isCheckedFirst, setIsCheckedFirst] = useState (false);
    const [isCheckedSecond, setIsCheckedSecond] = useState (false);

    const handleOnChange = (changeState, appState) => {
        changeState(!appState);
    };

    return(
        <div className="aplication">
            <div className="aplicationDescription">
                <h3 className="aplicationHeader"> {aplicationHeaderText}</h3>
                <p className="aplicatonText">{aplicationTextInfoOne}<span> </span>
                    <Link to="/privacy" className="privacy">„Privacy Notice“</Link> <span> </span> and <span> </span>
                    <Link to="/terms" className="terms">„Terms and Conditions“</Link> <span> </span>
                       {aplicationTextInfoTwo}</p>
            </div>
            <div className="aplicationProceed">
                <div className="aplicationCheckbox">
                    <div>
                        <input type="checkbox" id="readDocumentations" name="readDecumentations"
                            checked={isCheckedFirst} onChange={()=>handleOnChange(setIsCheckedFirst, isCheckedFirst)}/>
                        <label> {readDocumentations}.</label>
                    </div>
                    <div>
                    <input type="checkbox" id="agreeDocumentations" name="agreeDocumentations"
                            checked={isCheckedSecond} onChange={()=>handleOnChange(setIsCheckedSecond, isCheckedSecond)}/> 
                           <label> {agreeDocumentations}</label>
                    </div>
                </div>
                <div className="aplicationButton">
                    
                    <Link to="/Wizard"><button className="aBtn" disabled={ isCheckedFirst && isCheckedSecond ? false : true }>PROCEED</button></Link>
                  
                </div>
            </div>
        </div>
    );
};
 
export default Aplication ;