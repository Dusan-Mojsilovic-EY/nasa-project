import React, {useState, useEffect} from 'react';
import './StepThree.scss';

const StepThree = ({nextStep, prevStep, data, setData, setStep, submitForm}) => {

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

    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      };

    const handleChangeRadio = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: !!e.target.value
                }))
    };

    const handleChangeConvictions = (e, i) => {
        const {name, value} = e.target;
        const list = [...inputs.convictions];
        list[i][name] = value;
        setInputs((prevState) => ({
            ...prevState,
            convictions: list,
        }))
    }

    const handleRemoveClick = (i) => {
        const list = [...inputs.convictions];
        list.splice(i, 1);
        setInputs((prevState) => ({
            ...prevState,
            convictions: list,
        }))
    }

    const handleAddClick = () => {
        setInputs((prevState) => ({
            ...prevState,
            convictions: [...inputs.convictions, {forWhat: '', convictionDate: ""}]}))
    }

    const handleCheck = (e) => {
        let newArray = [...inputs.metalworkSkills, e.target.value];
        if (inputs.metalworkSkills.includes(e.target.value)) {
            newArray = newArray.filter((elem) => elem !==e.target.value)
        }
        setInputs((prevState)=>({
            ...prevState,
            metalworkSkills: newArray,
        }))
    }
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
                <input 
                type="radio" 
                id="doesHaveAgricultureSkillsYes"
                value={true} 
                name="doesHaveAgricultureSkills" 
                onChange={handleChangeRadio}/>
                <label htmlFor="doesHaveAgricultureSkillsYes">Yes</label>
                </div>
                <div>
                <input 
                type="radio" 
                id="doesHaveAgricultureSkillsNo"
                value={""}
                name="doesHaveAgricultureSkills"   
                onChange={handleChangeRadio}/>
                <label htmlFor="doesHaveAgricultureSkillsYes">No</label>
                </div>
            </div>
        </div>

        {inputs.doesHaveAgricultureSkills && <div className="skillsDescription">
            <p><span>*</span> What? Please describe</p>
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
            <p><span>*</span> Do you have any metalwork skills?</p>
            <div>
                <div>
                <input 
                 type="radio" 
                 id="skillsMetalWorkYes"
                 value={true} 
                 name="doesHaveMetalworkSkills" 
                 onChange={handleChangeRadio}/>
                <label htmlFor="skillsMetalWorkYes">Yes</label>
                </div>
                <div>
                <input 
                 type="radio" 
                 id="skillsMetalWorkNo"
                 value={""} 
                 name="doesHaveMetalworkSkills" 
                 onChange={handleChangeRadio}/>
                <label htmlFor="skillsMetalWorkNo">No</label>
                </div>
            </div>
            </div>
            </div>

        {inputs.doesHaveMetalworkSkills && <div className="metalWorkWhat">
            <p><span>*</span> What? Please select all that apply</p>
            <div className="selectMetalWork">
                    <div>
                    <input 
                    type="checkbox" 
                    id="marking" 
                    name="metalworkSkills"
                    value={"marking"}
                    onChange={(e)=>handleCheck(e)}/>
                    <label htmlFor="marking">Marking</label>
                    </div>
                    <div>
                    <input 
                    type="checkbox" 
                    id="cutting" 
                    name="metalworkSkills"
                    value={"cutting"}
                    onChange={(e)=>handleCheck(e)}/>
                    <label htmlFor="cutting">Cutting</label></div>
                    <div>
                    <input 
                    type="checkbox" 
                    id="drilling" 
                    name="metalworkSkills"
                    value={"drilling"}
                    onChange={(e)=>handleCheck(e)}/>
                    <label htmlFor="drilling">Drilling</label></div>
                    <div><input 
                    type="checkbox" 
                    id="cuttThreads" 
                    name="metalworkSkills"
                    value={"cuttThreads"}
                    onChange={(e)=>handleCheck(e)}/>
                    <label htmlFor="cuttThreads">Cutting internal and external threads</label></div>
                    <div>
                    <input 
                    type="checkbox"
                    id="filling" 
                    name="metalworkSkills"
                    value={"filling"}
                    onChange={(e)=>handleCheck(e)}/>
                    <label htmlFor="filling">Filling</label></div>
                    <div> 
                    <input 
                    type="checkbox" 
                    id="joining" 
                    name="metalworkSkills"
                    value={"joining"}
                    onChange={(e)=>handleCheck(e)}/>
                    <label htmlFor="joining">Joining</label></div>
               </div>
            </div> 
            }
        

        <div className="skills">
            <p><span>*</span> Have you aver been convicted?</p>
            <div className="isConvicted">
                <div>
                <input  
                 type="radio" 
                 id="isConvictedYes"
                 value={true} 
                 name="isConvicted" 
                 onChange={handleChangeRadio}/>
                <label htmlFor="isConvictedYes">Yes</label>
                </div>
                <div>
                <input 
                type="radio" 
                id="convictedNo" 
                value={""} 
                name="isConvicted" 
                onChange={handleChangeRadio}/>
                <label htmlFor="convictedNo" >No</label>
                </div>
            </div>
            </div>
            {inputs.isConvicted && inputs.convictions.map((x, i) => {     
            return (
                <div className="convicted" >
                    <div className="convictedWhat">
                        <p><span>*</span> For what?</p>
                        <input 
                        type="text" 
                        placeholder="Reason"
                        name="forWhat"
                        value={x.forWhat}
                        key={inputs.convictions.forWhat + "129121"}
                        onChange={(e)=>handleChangeConvictions(e, i)}/>
                     </div>
                <div className="convictedWhen">
                        <p><span>*</span> When?</p>
                        <input 
                        type="date" 
                        name="convictionDate"
                        value={x.convictionDate}
                        key={inputs.convictions.convictionDate + "129121"}
                        onChange={(e)=>handleChangeConvictions(e, i)}/>
                </div>
                <div className="date-cut">
                    {inputs.convictions.length !== 1 && <button onClick={()=> handleRemoveClick(i)}>&#8854;</button>}
                    {inputs.convictions.length - 1 === i && <button onClick={handleAddClick}>&#8853;</button>}
                </div>
                </div> )
            })}

        <div className="skills">
            <p><span>*</span> Do you know how to fly an airplane?</p>
            <div>
                <div>
                <input 
                type="radio" 
                id="flyYes"
                value={true} 
                name="doesFlyAirplane" 
                onChange={handleChangeRadio}/>
                <label htmlFor="flyYes">Yes</label></div>
                <div>
                <input
                type="radio" 
                id="flyNo"
                value={""} 
                name="doesFlyAirplane" 
                onChange={handleChangeRadio}/>
                <label htmlFor="flyNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> Do you know how to drive a car?</p>
            <div>
                <div>
                <input  
                type="radio" 
                id="driveYes"
                value={true} 
                name="doesDriveCar" 
                onChange={handleChangeRadio}/>
                <label htmlFor="driveYes">Yes</label>
                </div>
                <div>
                <input
                type="radio" 
                id="driveNo"
                value={""} 
                name="doesDriveCar" 
                onChange={handleChangeRadio}/>
                <label htmlFor="driveNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> Do you know how to drive a bicycle?</p>
            <div>
                <div>
                <input  
                type="radio" 
                id="bicycleYes"
                value={true} 
                name="doesDriveBicycle" 
                onChange={handleChangeRadio}/>
                <label htmlFor="bicycleYes">Yes</label>
                </div>
                <div>
                <input 
                type="radio" 
                id="bicycleNo"
                value={false} 
                name="doesDriveBicycle" 
                onChange={handleChangeRadio}/>
                <label htmlFor="bicycleNo">No</label>
                </div>
            </div>
        </div>
        </div>

          <div className="firstButtonsField">
            <button className="back" onClick={prevStep}>Back</button>
            <button className="next" onClick={submitForm}
                disabled={
                inputs.doesHaveAgricultureSkills === "" ||
                (inputs.doesHaveAgricultureSkills === true && !inputs.agricultureSkills) ||
                inputs.doesHaveMetalworkSkills === "" ||
                (inputs.doesHaveMetalworkSkills === true && !inputs.metalworkSkills) ||
                inputs.isConvicted === "" ||
                (inputs.isConvicted === true && !inputs.convictions) ||
                inputs.doesDriveCar === "" ||
                inputs.doesFlyAirplane === "" ||
                inputs.doesDriveBicycle === "" 
               }>Countinue</button>
          </div>
        </div>
    );
}
 
export default StepThree;