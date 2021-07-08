import React, {useState} from 'react';
import './StepOne.scss';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const StepOne = ({nextStep}) => {

    const [startDate, setStartDate] = useState(new Date())

    return(
      <div className="wizardContainer">
          <div className="inputContainer">
              <div className="inputHeader">
                  <h4>Step 1</h4>
                  <p>Mandatory fields are labeld with *</p>
              </div>
              <div className="firstInputFields">
                <p className="mandatoryInputs"><span>*</span> Please provide you title and name</p>
                <div className="candidateTitle">
                  <select name="title" id="title" value="Title">
                    <option disabled selected>Title</option>
                      <option value="mr">Mr</option>
                      <option value="mrs">Mrs</option>
                      <option value="miss">Miss</option>
                  </select>
                </div>
                <div className="candidateName">
                    <input type="text" placeholder="First Name"/>
                    <input type="text"  placeholder="Second Name"/>
                </div>
                <div className="dateOfBirth">
                    <p className="mandatoryDateOfBirth"><span>*</span> What is your date of birth?</p>
                    <input type="date" />
                </div>
              </div>
          </div>
          <div className="firstButtonsField">
              <button className="back">Back</button>
              <button className="next" onClick={nextStep}>Countinue</button>
          </div>
        </div>
    );
}
 
export default StepOne ;