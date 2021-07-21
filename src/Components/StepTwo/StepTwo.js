import React, {useState, useEffect} from 'react';
import './StepTwo.scss';
import axios from 'axios';
import useFetchForm from '../useFetchForm/useFetchForm';
import { url2 } from '../../Constants';

const StepTwo = ({prevStep, nextStep, data, setData}) => {

  const {dataStates} = useFetchForm(url2);
  
  const [errors, setErrors] = useState({})
  const [dataCities, setDataCities] = useState([])
  const [dataPostalCodes, setDataPostalCodes] = useState([])
  const [tla, setTla] = useState('');
    
  useEffect(()=> {
        if (tla) {
        axios.get(url2 + "/" + tla + "/cities")
        .then(res => {
            setDataCities(res.data)
        })
    }
    },[tla])

    const [inputs, setInputs] = useState({
      email: data.email,
      residencyDuration: data.residencyDuration,
      address: {
            addressLine1: data.address.addressLine1,
            addressLine2: data.address.addressLine2,
            city: data.address.city,
            state: data.address.state,
            postalCode: data.address.postalCode,
      },
       
    });
    
    useEffect(()=> {
      if (inputs.address.city) {
      axios.get(url2 + "/" + tla + "/cities/" + inputs.address.city + "/postalcodes" )
      .then(res => {
          setDataPostalCodes(res.data)
      })
  }
  },[inputs.address.city])

 
    const handleChange = (e) => {
        if ( e.target.name === "residencyDuration" || e.target.name ==="email") {
        e.preventDefault();
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        })
        )
      }  else {
          e.preventDefault();
          setInputs((prevStep) => ({
              ...prevStep,
              address: {
                  ...inputs.address,
                  [e.target.name]: e.target.value
              }
          }))
          if (e.target.name === "state") {
            const findTla = dataStates.find((state) => state.name === e.target.value);
            findTla && setTla(findTla.tla);
          }
      }};
    
    const onSubmitForm = (e) => {
        e.preventDefault();
        const isValid = formValidation()
        if(isValid) {
          nextStep(3)
        }
      }
 
    const formValidation = () => {
        const emailErr = {};
        const residencyDurationErr = {};
        let isValid = true;
  
        if (!inputs.email) {
          emailErr.email = "Email required!";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
         emailErr.email = "Email is invalid!";
         isValid = false;
        }

        if(inputs.residencyDuration < 1) {
          residencyDurationErr.residencyDuration = "Input number has to be greater then 0!";
          isValid = false;
        }

       setErrors((errors) => ({
         ...errors,
          email: emailErr,
          residencyDuration: residencyDurationErr,
       }));
  
        return isValid;
  
    }
    
    useEffect(() => {
          setData((data) => ({
            ...data,
            address: inputs.address,
            email: inputs.email,
            residencyDuration: Number(inputs.residencyDuration),
          }));
      }, [inputs]);


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
                    <input 
                    type="text" 
                    name="email" 
                    placeholder="Email"
                    value={inputs.email} 
                    onChange={handleChange}/>
                   {errors.email && <div style={{color: "red"}}>{errors.email?.email}</div>}
                </div>

                <div className="homeAddressInput">
                    <div className="addressLine">
                    <p><span>*</span> Address Line 1</p>
                    <input 
                    type="text"
                    name={"addressLine1"} 
                    placeholder="Address" 
                    value={inputs.address.addressLine1}
                    onChange={handleChange}/>
                    </div>
                    <div className="addressLine">
                    <p><span>*</span> Address Line 2</p>
                    <input 
                    type="text" 
                    placeholder="Address"
                    name={"addressLine2"} 
                    value={inputs.address.addressLine2} 
                    onChange={handleChange}/>
                    </div>
                </div>

                <div className="homeCityInput">
                    <div className="state">
                    <p><span>*</span> State</p>
                    <input 
                    type="text" 
                    name={"state"}
                    list={"state"} 
                    value={inputs.address.state} 
                    placeholder="State"
                    onChange={handleChange}/>
                    <datalist id={"state"}>
                    {dataStates.map((state) => (
                    <option value={state.name || state.code} 
                    key={state.name + state.code} />
                      ))}
                    </datalist>
                    </div>

                    <div className="city">
                    <p><span>*</span> City/Town</p>
                    <input
                    type="text" 
                     name={"city"}
                     list={"city"}
                     placeholder="City"
                     value={inputs.address.city}
                     disabled={inputs.address.state === "" ? true : false} 
                     onChange={handleChange}/>
                     <datalist id={"city"}>
                      { tla && dataCities.map((city) => {
                        return (
                          <option 
                          value={city.name || city.code} 
                          key={city.name + city.code}>{city.name}</option>
                        )
                      })}
                  </datalist>
                    </div>
               
                    <div className="zip">
                    <p><span>*</span> Postal Code</p>
                    <input 
                    type="text" 
                    name={"postalCode"}
                    list={"postalCode"} 
                    value={inputs.address.postalCode} 
                    disabled={inputs.address.city  === "" ? true : false} 
                    placeholder="Zip"
                    onChange={handleChange}/>
                    <datalist id={"postalCode"}>
                    {dataPostalCodes.map((zip) => (
                    <option value={zip.name || zip.code} 
                    key={zip.name + zip.code} />
                      ))}
                    </datalist>
                </div>
            </div>

            <div className="yearsOnAddress">
                <p><span>*</span> How many years have you lived there?</p>
                <input 
                type="number" 
                name="residencyDuration" 
                placeholder="Years"
                value={inputs.residencyDuration} 
                onChange={handleChange}/>
               {errors.residencyDuration && <div>{errors.residencyDuration?.residencyDuration}</div>}

            </div>
            </div>
            </div>

          <div className="firstButtonsField">
              <button className="back" onClick={prevStep}>Back</button>
              <button className="next" onClick={onSubmitForm}
               disabled={
                !inputs.email ||
                !inputs.address.addressLine1 ||
                !inputs.address.city ||
                !inputs.address.state ||
                !inputs.address.postalCode 
               }>Countinue</button>
          </div>
        </div>
    );
}
 
export default StepTwo ;