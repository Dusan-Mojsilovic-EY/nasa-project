/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, {useState, useEffect} from "react";
import "./StepThree.scss";
import Input from "../Inputs/Inputs";
import { agricultureSkillsInfo, agricultureSkillsWhatInfo, backButton, bicycleInfo, 
    convictedInfo, countinueButton, driveInfo, flyInfo, mandatoryFields, 
    metalWorkSkillsInfo, metalWorkSkillsWhatInfo, stepNumber } from "../../Constants/Constants";

const StepThree = ({prevStep, setData, data, submitForm, step, getRealDate}) => {

    const [inputs, setInputs] = useState({
      doesHaveAgricultureSkills: data.doesHaveAgricultureSkills,
      agricultureSkills: data.agricultureSkills,
      doesHaveMetalworkSkills: data.doesHaveMetalworkSkills,
      metalworkSkills: [],
      isConvicted: data.isConvicted,
      convictions: [
        {
         forWhat: "",
         convictionDate: "",
        }
      ],
      doesFlyAirplane: data.doesFlyAirplane,
      doesDriveCar: data.doesDriveCar,
      doesDriveBicycle: data.doesDriveBicycle,
    });

    const metalWorkSkillsTypes = ["marking", "cutting", "drilling", "cutThreads", "filling" ,"joining"];

    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    const handleChangeRadio = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: !!e.target.value
                }));
    };

    const handleChangeConvictions = (e, i) => {
        const {name, value} = e.target;
        const list = [...inputs.convictions];
        list[i][name] = value;
        setInputs((prevState) => ({
            ...prevState,
            convictions: list,
        }));
    };

    const handleRemoveClick = (i) => {
        const list = [...inputs.convictions];
        list.splice(i, 1);
        setInputs((prevState) => ({
            ...prevState,
            convictions: list,
        }));
    };

    const handleAddClick = () => {
        setInputs((prevState) => ({
            ...prevState,
            convictions: [...inputs.convictions, {forWhat: "", convictionDate: ""}]}));
    };

    const handleCheck = (e) => {
        let newArray = [...inputs.metalworkSkills, e.target.value];
        let {value} = e.target;
        if (inputs.metalworkSkills.includes(value)) {
            newArray = newArray.filter((elem) => elem !== value);
        }
        setInputs((prevState)=>({
            ...prevState,
            metalworkSkills: newArray,
        }));
    };
    
    const createMetalWorkLabel = (e) => {
        if (e !== "cutThreads") {
            return (
        e.charAt(0).toUpperCase() + e.slice(1));
    } else {
        return ("Cutting internal and external threads");
    }
};
    useEffect(() => {
        const stringMetalWorkSkills = inputs.metalworkSkills.toString();
          setData((data) => ({
            ...data,
            doesHaveAgricultureSkills: inputs.doesHaveAgricultureSkills,
            agricultureSkills: inputs.agricultureSkills,
            doesHaveMetalworkSkills: inputs.doesHaveMetalworkSkills,
            metalworkSkills: stringMetalWorkSkills,
            isConvicted: inputs.isConvicted,
            convictions: inputs.convictions,
            doesFlyAirplane: inputs.doesFlyAirplane,
            doesDriveCar: inputs.doesDriveCar,
            doesDriveBicycle: inputs.doesDriveBicycle,
          }));
        
      }, [inputs]);

      const isDisabled = () => {
        if ( 
        inputs.doesHaveAgricultureSkills === "" ||
        (inputs.doesHaveAgricultureSkills === true && !inputs.agricultureSkills) ||
        inputs.doesHaveMetalworkSkills === "" ||
        (inputs.doesHaveMetalworkSkills === true && !inputs.metalworkSkills) ||
        inputs.isConvicted === "" ||
        (inputs.isConvicted === true && !(inputs.convictions.every(checkConvictions))) ||
        inputs.doesDriveCar === "" ||
        inputs.doesFlyAirplane === "" ||
        inputs.doesDriveBicycle === "" 
        ) 
        { return true;
           } else {
             return false;
           }
        };

        const checkConvictions = (el) => {
            if (el.forWhat !== "" && el.convictionDate !== "") {
                return true;
            } else {
                return false;
            }
        };

    return(
      <div className="wizardContainer">
          <div className="inputContainer">
              <div className="inputHeader">
                  <h4>{stepNumber} {step}</h4>
                  <p>{mandatoryFields}</p>
              </div>
          </div>

        <div className="thirdInputFields">

        <div className="skills">
            <p><span>*</span> {agricultureSkillsInfo}</p>
            <div>
                <div>
                <Input 
                        type="radio"
                        id="doesHaveAgricultureSkillsYes"
                        value={true} 
                        name="doesHaveAgricultureSkills"
                        onChange={handleChangeRadio}/>
                <label htmlFor="doesHaveAgricultureSkillsYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="doesHaveAgricultureSkillsNo"
                        value="" 
                        name="doesHaveAgricultureSkills"
                        onChange={handleChangeRadio}/>
                <label htmlFor="doesHaveAgricultureSkillsNo">No</label>
                </div>
            </div>
        </div>
        {inputs.doesHaveAgricultureSkills && <div className="skillsDescription">
            <p><span>*</span> {agricultureSkillsWhatInfo}</p>
            <div>
                <textarea 
                type="text" 
                rows="6" 
                cols="80" 
                name="agricultureSkills"
                value={inputs.agricultureSkills}
                onChange={handleChange}/>
            </div>
        </div>}

        <div className="skills">
            <div className="metalWorkIf">
            <p><span>*</span> {metalWorkSkillsInfo}</p>
            <div>
                <div>
                <Input 
                        type="radio"
                        id="skillsMetalWorkYes"
                        value={true} 
                        name="doesHaveMetalworkSkills"
                        onChange={handleChangeRadio}/>
                <label htmlFor="skillsMetalWorkYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="skillsMetalWorkNo"
                        value=""
                        name="doesHaveMetalworkSkills"
                        onChange={handleChangeRadio}/>
                <label htmlFor="skillsMetalWorkNo">No</label>
                </div>
            </div>
            </div>
            </div>
        {inputs.doesHaveMetalworkSkills && <div className="metalWorkWhat">
            <p><span>*</span> {metalWorkSkillsWhatInfo}</p>
            <div className="selectMetalWork">
                        {metalWorkSkillsTypes.map((elem, index) => {
                             return (
                        <div key={`${elem}${index}`}>
                            <Input type="checkbox"
                            id={elem}
                            value={elem}
                            name="metalworkSkills"
                            onChange={handleCheck}/>
                            <label htmlFor={elem}>{createMetalWorkLabel(elem)}</label>
                        </div>
                             );}
                        )}
               </div>
          </div>
            }
        

        <div className="skills">
            <p><span>*</span> {convictedInfo}</p>
            <div className="isConvicted">
                <div>
                <Input 
                        type="radio"
                        id="isConvictedYes"
                        value={true} 
                        name="isConvicted"
                        onChange={handleChangeRadio}/>
                <label htmlFor="isConvictedYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="isConvictedNo"
                        value="" 
                        name="isConvicted"
                        onChange={handleChangeRadio}/>
                <label htmlFor="isConvictedNo" >No</label>
                </div>
            </div>
            </div>
            {inputs.isConvicted && inputs.convictions.map((x, i) => {     
            return (
                <div className="convicted" key={`key-${i}`}>
                    <div className="convictedWhat">
                        <p><span>*</span> For what?</p>
                        <input 
                        type="text" 
                        placeholder="Reason"
                        name="forWhat"
                        value={x.forWhat}
                        onChange={(e)=>handleChangeConvictions(e, i)}/>
                     </div>
                <div className="convictedWhen"> 
                        <p><span>*</span> When?</p>
                        <input 
                        type="date" 
                        name="convictionDate"
                        min="1900-01-01"
                        max={getRealDate()}
                        value={x.convictionDate}
                        onChange={(e)=>handleChangeConvictions(e, i)}/>
                </div>
                <div className="date-cut">
                    {inputs.convictions.length !== 1 && <button onClick={()=> handleRemoveClick(i)}>&#8854;</button>}
                    {inputs.convictions.length - 1 === i && <button onClick={handleAddClick}>&#8853;</button>}
                </div>
                </div> );
            })}

        <div className="skills">
            <p><span>*</span> {flyInfo}</p>
            <div>
                <div>
                <Input 
                        type="radio"
                        id="flyYes"
                        value={true} 
                        name="doesFlyAirplane"
                        onChange={handleChangeRadio}/>
                <label htmlFor="flyYes">Yes</label></div>
                <div>
                <Input 
                        type="radio"
                        id="flyNo"
                        value=""
                        name="doesFlyAirplane"
                        onChange={handleChangeRadio}/>
                <label htmlFor="flyNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> {driveInfo}</p>
            <div>
                <div>
                <Input 
                        type="radio"
                        id="driveYes"
                        value={true} 
                        name="doesDriveCar"
                        onChange={handleChangeRadio}/>
                <label htmlFor="driveYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="driveNo"
                        value="" 
                        name="doesDriveCar" 
                        onChange={handleChangeRadio}/>
                <label htmlFor="driveNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> {bicycleInfo}</p>
            <div>
                <div>
                <Input 
                        type="radio"
                        id="bicycleYes"
                        value={true} 
                        name="doesDriveBicycle"
                        onChange={handleChangeRadio}/>
                <label htmlFor="bicycleYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="bicycleNo"
                        value=""
                        name="doesDriveBicycle"
                        onChange={handleChangeRadio}/>
                <label htmlFor="bicycleNo">No</label>
                </div>
            </div>
        </div>
        </div>

          <div className="firstButtonsField">
            <button className="back" onClick={prevStep}>{backButton}</button>
            <button className="next" onClick={submitForm}
                disabled={
               isDisabled()
               }>{countinueButton}</button>
          </div>
        </div>
    );
};
 
export default StepThree;