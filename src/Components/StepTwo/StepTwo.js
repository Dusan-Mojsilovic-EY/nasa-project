import React, {useState} from 'react';
import './StepTwo.scss';


const StepTwo = ({nextStep, prevStep}) => {

    return(
      <div className="wizardContainer">
         <div className="inputContainer">

              <div className="inputHeader">
                  <h4>Step 2</h4>
                  <p>Mandatory fields are labeld with *</p>
              </div>

            <div className="secondInputFields">

                <div className="emailInput">
                <p><span>*</span> What's your email address?</p>
                <input type="email" name="" id="" placeholder="Email"/>
                </div>

                <div className="homeAddressInput">
                <div className="addressLine">
                    <p><span>*</span> Address Line 1</p>
                    <input type="text" placeholder="Address"/>
                </div>
                <div className="addressLine">
                    <p><span>*</span> Address Line 2</p>
                    <input type="text" placeholder="Address"/>
                </div>
            </div>

            <div className="homeCityInput">
                <div className="city">
                    <p><span>*</span> City/Town</p>
                    <input type="text" name="" id="" placeholder="City"/>
                </div>
                <div className="state">
                    <p><span>*</span> State</p>
                    <input type="text" name="" id="" placeholder="State"/>
                </div>
                <div className="zip">
                    <p><span>*</span> Postal Code</p>
                    <input type="number" name="" id="" placeholder="Zip"/>
                </div>
            </div>

            <div className="yearsOnAddress">
                <p><span>*</span> How many years have you lived there?</p>
                <input type="number" name="" id="" placeholder="Years"/>
            </div>


            </div>
            </div>

          <div className="firstButtonsField">
              <button className="back" onClick={prevStep}>Back</button>
              <button className="next" onClick={nextStep}>Countinue</button>
          </div>
        </div>
    );
}
 
export default StepTwo ;