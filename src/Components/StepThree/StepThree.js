/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useReducer} from "react";
import "./StepThree.scss";
import Input from "../Inputs/Inputs";
import { agricultureSkillsInfo, agricultureSkillsWhatInfo, backButton, bicycleInfo, 
    convictedInfo, countinueButton, driveInfo, flyInfo, mandatoryFields, 
    metalWorkSkillsInfo, metalWorkSkillsWhatInfo, stepNumber } from "../../Constants/Constants";

const StepThree = ({prevStep, setData, data, submitForm, step, getRealDate}) => {

    const reducerStepThree = (state, action) => {
        switch (action.type) {
            case "agricultureSkills":
                return {
                    ...state,
                    [action.type]: action.payload.target.value,
                };
            case "metalworkSkills":
            case "convictions":
                return {
                    ...state,
                    [action.type]: action.payload,
                  };
            case "doesHaveAgricultureSkills":
            case "doesHaveMetalworkSkills":
            case "isConvicted":
            case "doesFlyAirplane":
            case "doesDriveCar":
            case "doesDriveBicycle":
                return {
                    ...state,
                    [action.type]: !!action.payload.target.value,
                  };
            case "forWhat":
            case "convictionDate":
                return {
                    ...state,
                      convictions: {
                            ...state.convictions,
                            [action.type]: action.payload,
                      }
                    };
            default:
                throw new Error("Try again.");
                    }
                  };

    const [state, dispatch] = useReducer(reducerStepThree, data);


    const metalWorkSkillsTypes = ["marking", "cutting", "drilling", "cutThreads", "filling" ,"joining"];

    const handleChangeConvictions = (e, i) => {
        const {name, value} = e.target;
        const list = [...state.convictions];
        console.log(list);
        list[i][name] = value;
            dispatch({
                type: "convictions",
                payload: list
            });
        };

    const handleRemoveClick = (i) => {
        const list = [...state.convictions];
        list.splice(i, 1);
        dispatch({
            type: "convictions",
            payload: list
        });
    };

    const handleAddClick = () => {
        dispatch({
            type: "convictions",
            payload: [...state.convictions, {forWhat: "", convictionDate: ""}]});

    };

    const handleCheck = (e) => {
        let newArray = [...state.metalworkSkills, e.target.value];
        let {value} = e.target;
        if (state.metalworkSkills.includes(value)) {
            newArray = newArray.filter((elem) => elem !== value);
        }
        dispatch({
            type: "metalworkSkills",
            payload: newArray,
        });
    
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
        const stringMetalWorkSkills = state.metalworkSkills.toString();
          setData((data) => ({
            ...data,
            doesHaveAgricultureSkills: state.doesHaveAgricultureSkills,
            agricultureSkills: state.agricultureSkills,
            doesHaveMetalworkSkills: state.doesHaveMetalworkSkills,
            metalworkSkills: stringMetalWorkSkills,
            isConvicted: state.isConvicted,
            convictions: state.convictions,
            doesFlyAirplane: state.doesFlyAirplane,
            doesDriveCar: state.doesDriveCar,
            doesDriveBicycle: state.doesDriveBicycle,
          }));
        
      }, [state]);

      const isDisabled = () => {
        if ( 
        state.doesHaveAgricultureSkills === "" ||
        (state.doesHaveAgricultureSkills === true && !state.agricultureSkills) ||
        state.doesHaveMetalworkSkills === "" ||
        (state.doesHaveMetalworkSkills === true && !state.metalworkSkills) ||
        state.isConvicted === "" ||
        (state.isConvicted === true && !(state.convictions.every(checkConvictions))) ||
        state.doesDriveCar === "" ||
        state.doesFlyAirplane === "" ||
        state.doesDriveBicycle === "" 
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

    console.log(state);

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
                        onChange={(event) => {
                            dispatch({
                                type: "doesHaveAgricultureSkills",
                                payload: event
                            });
                        }}/>
                <label htmlFor="doesHaveAgricultureSkillsYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="doesHaveAgricultureSkillsNo"
                        value="" 
                        name="doesHaveAgricultureSkills"
                        onChange={(event) => {
                            dispatch({
                                type: "doesHaveAgricultureSkills",
                                payload: event
                            });
                        }}/>
                <label htmlFor="doesHaveAgricultureSkillsNo">No</label>
                </div>
            </div>
        </div>
        {state.doesHaveAgricultureSkills && <div className="skillsDescription">
            <p><span>*</span> {agricultureSkillsWhatInfo}</p>
            <div>
                <textarea 
                type="text" 
                rows="6" 
                cols="80" 
                name="agricultureSkills"
                value={state.agricultureSkills}
                onChange={(event) => {
                    dispatch({
                        type: "agricultureSkills",
                        payload: event
                    });
                }}/>
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
                        onChange={(event) => {
                            dispatch({
                                type: "doesHaveMetalworkSkills",
                                payload: event
                            });
                        }}/>
                <label htmlFor="skillsMetalWorkYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="skillsMetalWorkNo"
                        value=""
                        name="doesHaveMetalworkSkills"
                        onChange={(event) => {
                            dispatch({
                                type: "doesHaveMetalworkSkills",
                                payload: event
                            });
                        }}/>
                <label htmlFor="skillsMetalWorkNo">No</label>
                </div>
            </div>
            </div>
            </div>
        {state.doesHaveMetalworkSkills && <div className="metalWorkWhat">
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
                         onChange={(event) => {
                                dispatch({
                                    type: "isConvicted",
                                    payload: event
                                });
                            }}/>
                <label htmlFor="isConvictedYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="isConvictedNo"
                        value="" 
                        name="isConvicted"
                         onChange={(event) => {
                                dispatch({
                                    type: "isConvicted",
                                    payload: event
                                });
                            }}/>
                <label htmlFor="isConvictedNo" >No</label>
                </div>
            </div>
            </div>
            {state.isConvicted && state.convictions.map((x, i) => {     
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
                    {state.convictions.length !== 1 && <button onClick={()=> handleRemoveClick(i)}>&#8854;</button>}
                    {state.convictions.length - 1 === i && <button onClick={handleAddClick}>&#8853;</button>}
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
                        onChange={(event) => {
                            dispatch({
                                type: "doesFlyAirplane",
                                payload: event
                            });
                        }}/>
                <label htmlFor="flyYes">Yes</label></div>
                <div>
                <Input 
                        type="radio"
                        id="flyNo"
                        value=""
                        name="doesFlyAirplane"
                        onChange={(event) => {
                            dispatch({
                                type: "doesFlyAirplane",
                                payload: event
                            });
                        }}/>
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
                        onChange={(event) => {
                            dispatch({
                                type: "doesDriveCar",
                                payload: event
                            });
                        }}/>
                <label htmlFor="driveYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="driveNo"
                        value="" 
                        name="doesDriveCar" 
                        onChange={(event) => {
                            dispatch({
                                type: "doesDriveCar",
                                payload: event
                            });
                        }}/>
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
                        onChange={(event) => {
                            dispatch({
                                type: "doesDriveBicycle",
                                payload: event
                            });
                        }}/>
                <label htmlFor="bicycleYes">Yes</label>
                </div>
                <div>
                <Input 
                        type="radio"
                        id="bicycleNo"
                        value=""
                        name="doesDriveBicycle"
                        onChange={(event) => {
                            dispatch({
                                type: "doesDriveBicycle",
                                payload: event
                            });
                        }}/>
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