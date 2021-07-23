import React, {useState, useEffect} from 'react';
import './StepThree.scss';
import Input from '../Inputs/Inputs';

const StepThree = ({nextStep, prevStep, data, setData, setStep, submitForm, initialData}) => {

    const [inputs, setInputs] = useState({
      doesHaveAgricultureSkills: initialData.doesHaveAgricultureSkills,
      agricultureSkills: initialData.agricultureSkills,
      doesHaveMetalworkSkills: initialData.doesHaveMetalworkSkills,
      metalworkSkills: [],
      isConvicted: initialData.isConvicted,
      convictions: [
        {
         forWhat: "",
         convictionDate: "",
        }
      ],
      doesFlyAirplane: initialData.doesFlyAirplane,
      doesDriveCar: initialData.doesDriveCar,
      doesDriveBicycle: initialData.doesDriveBicycle,
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
        let {value} = e.target;
        if (inputs.metalworkSkills.includes(value)) {
            newArray = newArray.filter((elem) => elem !== value)
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
                  <p>Mandatory fields are labeled with *</p>
              </div>
          </div>

        <div className="thirdInputFields">

        <div className="skills">
            <p><span>*</span> Do you have any agriculture skills?</p>
            <div>
                <div>
                <Input 
                        type={"radio"}
                        id={"doesHaveAgricultureSkillsYes"}
                        value={true} 
                        name={"doesHaveAgricultureSkills"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="doesHaveAgricultureSkillsYes">Yes</label>
                </div>
                <div>
                <Input 
                        type={"radio"}
                        id={"doesHaveAgricultureSkillsNo"}
                        value={""} 
                        name={"doesHaveAgricultureSkills"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="doesHaveAgricultureSkillsNo">No</label>
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
                <Input 
                        type={"radio"}
                        id={"skillsMetalWorkYes"}
                        value={true} 
                        name={"doesHaveMetalworkSkills"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="skillsMetalWorkYes">Yes</label>
                </div>
                <div>
                <Input 
                        type={"radio"}
                        id={"skillsMetalWorkNo"}
                        value={""} 
                        name={"doesHaveMetalworkSkills"} 
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
                    <Input 
                        type={"checkbox"}
                        id={"marking"}
                        value={"marking"} 
                        name={"metalworkSkills"} 
                        onChange={handleCheck}/>
                    <label htmlFor="marking">Marking</label>
                    </div>
                    <div>
                    <Input 
                        type={"checkbox"}
                        id={"cutting"}
                        value={"cutting"} 
                        name={"metalworkSkills"} 
                        onChange={handleCheck}/>
                    <label htmlFor="cutting">Cutting</label></div>
                    <div>
                    <Input 
                        type={"checkbox"}
                        id={"drilling"}
                        value={"drilling"} 
                        name={"metalworkSkills"} 
                        onChange={handleCheck}/>
                    <label htmlFor="drilling">Drilling</label></div>
                    <div>
                    <Input 
                        type={"checkbox"}
                        id={"cutThreads"}
                        value={"cutThreads"} 
                        name={"metalworkSkills"} 
                        onChange={handleCheck}/>
                    <label htmlFor="cuttThreads">Cutting internal and external threads</label></div>
                    <div>
                    <Input 
                        type={"checkbox"}
                        id={"filling"}
                        value={"filling"} 
                        name={"metalworkSkills"} 
                        onChange={handleCheck}/>
                    <label htmlFor="filling">Filling</label></div>
                    <div> 
                    <Input 
                        type={"checkbox"}
                        id={"joining"}
                        value={"joining"} 
                        name={"metalworkSkills"} 
                        onChange={handleCheck}/>
                    <label htmlFor="joining">Joining</label></div>
               </div>
            </div> 
            }
        

        <div className="skills">
            <p><span>*</span> Have you ever been convicted?</p>
            <div className="isConvicted">
                <div>
                <Input 
                        type={"radio"}
                        id={"isConvictedYes"}
                        value={true} 
                        name={"isConvicted"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="isConvictedYes">Yes</label>
                </div>
                <div>
                <Input 
                        type={"radio"}
                        id={"isConvictedNo"}
                        value={""} 
                        name={"isConvicted"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="isConvictedNo" >No</label>
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
                        key={`${inputs.convictions.forWhat}` + i}
                        onChange={(e)=>handleChangeConvictions(e, i)}/>
                     </div>
                <div className="convictedWhen">
                        <p><span>*</span> When?</p>
                        <input 
                        type="date" 
                        name="convictionDate"
                        value={x.convictionDate}
                        key={`${inputs.convictions.convictionDate}` + i}
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
                <Input 
                        type={"radio"}
                        id={"flyYes"}
                        value={true} 
                        name={"doesFlyAirplane"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="flyYes">Yes</label></div>
                <div>
                <Input 
                        type={"radio"}
                        id={"flyNo"}
                        value={""} 
                        name={"doesFlyAirplane"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="flyNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> Do you know how to drive a car?</p>
            <div>
                <div>
                <Input 
                        type={"radio"}
                        id={"driveYes"}
                        value={true} 
                        name={"doesDriveCar"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="driveYes">Yes</label>
                </div>
                <div>
                <Input 
                        type={"radio"}
                        id={"driveNo"}
                        value={""} 
                        name={"doesDriveCar"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="driveNo">No</label>
                </div>
            </div>
        </div>

        <div className="skills">
            <p><span>*</span> Do you know how to drive a bicycle?</p>
            <div>
                <div>
                <Input 
                        type={"radio"}
                        id={"bicycleYes"}
                        value={true} 
                        name={"doesDriveBicycle"} 
                        onChange={handleChangeRadio}/>
                <label htmlFor="bicycleYes">Yes</label>
                </div>
                <div>
                <Input 
                        type={"radio"}
                        id={"bicycleNo"}
                        value={""} 
                        name={"doesDriveBicycle"} 
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