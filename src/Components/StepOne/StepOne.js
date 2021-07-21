import React, {useState, useEffect} from 'react';
import './StepOne.scss';

const StepOne = ({nextStep, data, setData}) => {

  const [inputs, setInputs] = useState({
    title: data.title,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
  });

  const [firstNameErr, setFirstNameErr] = useState({})
  const [lastNameErr, setLastNameErr] = useState({})

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))}

  const onSubmitForm = (e) => {
    e.preventDefault();
    const isValid = formValidation()
    if (isValid) {
      nextStep(2)
    }
  }

  const formValidation = () => {
      const firstNameErr = {}
      const lastNameErr = {}
      let isValid = true;

      if (!inputs.firstName.trim()) {
        firstNameErr.firstName = "Enter the valid name!";
        isValid = false;
      } else if (!inputs.firstName.match(/^[A-Za-z]+$/)) {
       firstNameErr.firstName = "First name has to be text!";
       isValid = false;
      }
     
      if (!inputs.lastName.trim()) {
        lastNameErr.lastName = "Enter the valid last name!";
        isValid = false;
      } else if (!inputs.lastName.match(/^[A-Za-z]+$/)) {
        lastNameErr.lastName = "Last name has to be text!";
        isValid = false;
      }
      setFirstNameErr(firstNameErr)
      setLastNameErr(lastNameErr)

      return isValid;
  }

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
                  <h4>Step 1</h4>
                  <p>Mandatory fields are labeld with *</p>
              </div>

              <div className="firstInputFields">
                <p className="mandatoryInputs"><span>*</span> Please provide you title and name</p>

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
                   <div> <input type="text" placeholder="First Name" name="firstName" value={inputs.firstName} onChange={handleChange}/>
                    {firstNameErr && <div>{firstNameErr?.firstName}</div>}</div>
                   <div> <input type="text"  placeholder="Second Name" name="lastName" value={inputs.lastName} onChange={handleChange}/>
                    {lastNameErr && <div>{lastNameErr?.lastName}</div>}</div>

                </div>
                <div className="dateOfBirth">
                    <p className="mandatoryDateOfBirth"><span>*</span> What is your date of birth?</p>
                    <input type="date" name="dateOfBirth" value={inputs.dateOfBirth} onChange={handleChange}/>
                </div>
              </div>
          </div>
          <div className="firstButtonsField">
              <button className="back">Back</button>
              <button className="next" onClick={onSubmitForm}
                      disabled={inputs.title.length < 1 ||
                                inputs.firstName.lenght < 1 || 
                                inputs.lastName.length < 1 ||
                                inputs.dateOfBirth < 1}>Countinue</button>
          </div>
        </div>
    );
}
 
export default StepOne ;