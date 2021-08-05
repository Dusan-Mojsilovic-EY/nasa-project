/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./StepOne.scss";

import { firstNameErrMessage1, firstNameErrMessage2, lastNameErrMessage1, lastNameErrMessage2,
stepNumber, mandatoryFields, titleAndNameInfo, dateOfBirthInfo, backButton, countinueButton } from "../../Constants/Constants";
import Input from "../Inputs/Inputs";

// eslint-disable-next-line react/prop-types
const StepOne = ({nextStep, setData, data, step, getRealDate}) => {

  const [inputs, setInputs] = useState({
    title: data.title,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
  });

  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));};

  const onSubmitForm = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      nextStep(2);
    }
  };

  const formValidation = () => {
      const firstNameErr = {};
      const lastNameErr = {};
      let isValid = true;

      if (!inputs.firstName.trim()) {
        firstNameErr.firstName = firstNameErrMessage1;
        isValid = false;
      } else if (!inputs.firstName.match(/^[A-Za-z]+$/)) {
       firstNameErr.firstName = firstNameErrMessage2;
       isValid = false;
      }
     
      if (!inputs.lastName.trim()) {
        lastNameErr.lastName = lastNameErrMessage1;
        isValid = false;
      } else if (!inputs.lastName.match(/^[A-Za-z]+$/)) {
        lastNameErr.lastName = lastNameErrMessage2;
        isValid = false;
      }
      setErrors((errors) => ({
        ...errors,
         firstName: firstNameErr,
         lastName: lastNameErr,
      }));

      return isValid;
  };

  const isDisabled = () => {
    if (
        inputs.title.length < 1 ||
        inputs.firstName.lenght < 1 || 
        inputs.lastName.length < 1 ||
        inputs.dateOfBirth < 1 ) {
          return true ;
        } else {
          return false ;
        }
  };

  useEffect(() => {
      setData((data) => ({
        ...data,
        title: inputs.title,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        dateOfBirth: inputs.dateOfBirth,
      }));
    
  }, [inputs]);
  
    return(
      <div className="wizardContainer">
          <div className="inputContainer">
              <div className="inputHeader">
                  <h4>{stepNumber} {step}</h4>
                  <p>{mandatoryFields}</p>
              </div>

              <div className="firstInputFields">
                <p className="mandatoryInputs"><span>*</span> {titleAndNameInfo}</p>

                <div className="candidateTitle">
                  <select name="title" id="title" value={inputs.title} onChange={handleChange}>
                      <option value="" disabled defaultValue hidden>Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Mr">Ms</option>
                      <option value="Dr">Dr</option>
                  </select>
                </div>

                <div className="candidateName">
                   <div><Input 
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={inputs.firstName} 
                        onChange={handleChange}/>
                    {errors.firstName && <div>{errors.firstName?.firstName}</div>}</div>
                   <div> <Input 
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={inputs.lastName} 
                        onChange={handleChange}/>
                    {errors.lastName && <div>{errors.lastName?.lastName}</div>}</div>

                </div>
                <div className="dateOfBirth">
                    <p className="mandatoryDateOfBirth"><span>*</span>{dateOfBirthInfo}</p>
                    <Input 
                        type="date"
                        placeholder="Date of birth"
                        name="dateOfBirth"
                        value={inputs.dateOfBirth} 
                        min="1900-01-01"
                        max={getRealDate()}
                        onChange={handleChange}/>
                </div>
              </div>
          </div>
          <div className="firstButtonsField">
              <Link to="/" className="back">{backButton}</Link>
              <button className="next" onClick={onSubmitForm}
                      disabled={isDisabled()}>{countinueButton}</button>
          </div>
        </div>
    );
};
 
export default StepOne ;