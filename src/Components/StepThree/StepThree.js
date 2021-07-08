import React, {useState} from 'react';
import './StepThree.scss';

const StepThree = ({nextStep, prevStep}) => {

    const [startDate, setStartDate] = useState(new Date())

    return(
      <div className="wizardContainer">
          <div className="inputContainer">
              <div className="inputHeader">
                  <h4>Step 3</h4>
                  <p>Mandatory fields are labeld with *</p>
              </div>
          </div>

        <div className="thirdInputFields">

           <div className="skills">
            <p><span>*</span> Do you have any agriculture skills?</p>
            <div>
                <div>
                <input type="radio" id="skillsAgrYes" value="yes" name="skAgr"/>
                <label for="skillsAgrYes">Yes</label>
                </div>
                <div>
                <input type="radio" id="skillsAgrNo" value="No" name="skAgr"/>
                <label for="skillsAgrNo">No</label>
                </div>
            </div>
        </div>

        <div className="skillsDescription">
            <p><span>*</span> What? Please describe</p>
            <div>
                <textarea type="text" rows="6" cols="100"/>
            </div>
        </div>

        <div className="skills">
            <div className="metalWorkIf">
            <p><span>*</span> Do you have any metalwork skills?</p>
            <div>
                <div>
                <input type="radio" id="skillsMetalWorkYes" value="yes" name="skMW"/>
                <label for="skillsMetalWorkYes">Yes</label>
                </div>
                <div>
                <input type="radio" id="skillsMetalWorkNo" value="No" name="skMW"/>
                <label for="skillsMetalWorkNo">No</label>
                </div>
            </div>
            </div>
            </div>

        <div className="metalWorkWhat">
            <p><span>*</span> What? Please select all that apply</p>
            <div className="selectMetalWork">
                    <div>
                    <input type="checkbox" id="marking" name="metalWork"/>
                    <label for="marking">Marking</label>
                    </div>
                    <div><input type="checkbox" id="cutting" name="metalWork"/>
                    <label for="cutting">Cutting</label></div>
                    <div><input type="checkbox" id="drilling" name="metalWork"/>
                    <label for="drilling">Drilling</label></div>
                    <div><input type="checkbox" id="cuttThreads" name="metalWork"/>
                    <label for="cuttThreads">Cutting internal and external threads</label></div>
                    <div><input type="checkbox" id="filling" name="metalWork"/>
                    <label for="filling">Filling</label></div>
                    <div> <input type="checkbox" id="joining" name="metalWork"/>
                    <label for="joining">Joining</label></div>
               </div>
            </div>
        

        <div className="skills">
            <p><span>*</span> Have you aver been convicted?</p>
            <div className="ifConvicted">
                <div>
                <input type="radio" id="convictedYes" value="yes" name="con"/>
                <label for="convictedYes">Yes</label>
                </div>
                <div>
                <input type="radio" id="convictedNo" value="No" name="con"/>
                <label for="convictedNo">No</label>
                </div>
            </div>
            </div>
        <div className="convicted">
            <div className="convictedWhat">
                    <p><span>*</span> For what?</p>
                    <input type="text" placeholder="Reason"/>
                </div>
            <div className="convictedWhen">
                    <p><span>*</span> When?</p>
                   <input type="date" />
                </div>
                </div>

        <div className="skills">
            <p><span>*</span> Do you know how to fly an airplane?</p>
            <div>
                <div>
                <input type="radio" id="flyYes" value="yes" name="flyAP"/>
                <label for="flyYes">Yes</label></div>
                <div>
                <input type="radio" id="flyNo" value="No" name="flyAP"/>
                <label for="flyNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> Do you know how to drive a car?</p>
            <div>
                <div>
                <input type="radio" id="driveYes" value="yes" name="driveC"/>
                <label for="driveYes">Yes</label>
                </div>
                <div>
                <input type="radio" id="driveNo" value="No" name="driveC"/>
                <label for="driveNo">No</label>
                </div>
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
 
export default StepThree ;