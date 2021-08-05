/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import "./StepTwo.scss";
import { getData } from "../../DataFetch/DataFetch";
import useFetch from "../useFetch/useFetch";
import Input from "../Inputs/Inputs";

import { emailErrMessage1, emailErrMessage2, residencyDurationErrMessage, urlStates,
stepNumber, mandatoryFields, addressLineOne, addressLineTwo, howManyYears, backButton, 
countinueButton, postalCodeInfo, cityInfo, stateInfo} from "../../Constants/Constants";
import { emailInfo } from "../../Constants/Constants";

const StepTwo = ({prevStep, nextStep, setData, data, step}) => {


  const {dataFetch} = useFetch(urlStates);
  
  const [errors, setErrors] = useState({});
  const [tla, setTla] = useState("");

  const [dataCities, setDataCities] = useState([]);
  const [dataPostalCodes, setDataPostalCodes] = useState([]);
  const [cityFetchSelected, setCityFetchSelected] = useState(null);
    
  useEffect(()=> {
        if (tla) {
        getData(`${urlStates}/${tla}/cities`)
        .then(res => {
            setDataCities(res.data);
        })
        .catch(err => {
          alert(err.message);
      });
    }
    },[tla]);

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
      if (cityFetchSelected) {
     getData(`${urlStates}/${tla}/cities/${inputs.address.city}/postalcodes`)
      .then(res => {
          setDataPostalCodes(res.data);
      })
      .catch(err => {
        alert(err.message);
    });
  }
  },[inputs.address.city]);

 
    const handleChange = (e) => {
      const {name, value} = e.target;
        if (name === "residencyDuration" || name ==="email") {
        e.preventDefault();
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        })
        );
      }  else {
          e.preventDefault();
          setInputs((prevStep) => ({
              ...prevStep,
              address: {
                  ...inputs.address,
                  [name]: value
              }
          }));
          if (name === "city") {
            const cityFetch = dataCities.find((city) => city.name === value && city.name);
            cityFetch && setCityFetchSelected(cityFetch);
          }
      }};

   const handleChangeAddressState = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
          setInputs((prevStep) => ({
              ...prevStep,
              address: {
                  ...inputs.address,
                  [name]: value,
                  city: "",
                  postalCode: "",
              }
          }));
          if (name === "state") {
            const findTla = dataFetch.find((state) => state.name === value);
            findTla && setTla(findTla.tla);
          }
      };
    
    const onSubmitForm = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid) {
          nextStep(3);
        }
      };
 
    const formValidation = () => {
        const emailErr = {};
        const residencyDurationErr = {};
        let isValid = true;
  
        if (!inputs.email) {
          emailErr.email = emailErrMessage1;
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
         emailErr.email = emailErrMessage2;
         isValid = false;
        }

        if(inputs.residencyDuration < 1 || inputs.residencyDuration > 100) {
          residencyDurationErr.residencyDuration = residencyDurationErrMessage;
          isValid = false;
        }

       setErrors((errors) => ({
         ...errors,
          email: emailErr,
          residencyDuration: residencyDurationErr,
       }));
  
        return isValid;
    };
    
    const isDisabled = () => {
    if (!inputs.email ||
        !inputs.address.addressLine1 ||
        !inputs.address.city ||
        !inputs.address.state ||
       !inputs.address.postalCode ||
       !inputs.residencyDuration) {
         return true;
       } else {
         return false;
       }
    };

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
                  <h4>{stepNumber} {step}</h4>
                  <p>{mandatoryFields}</p>
              </div>

            <div className="secondInputFields">

                <div className="emailInput">
                    <p><span>*</span>{emailInfo}</p>
                    <Input 
                        type="text" 
                        placeholder="Email"
                        name="email"
                        value={inputs.email} 
                        onChange={handleChange}/>
                   {errors.email && <div>{errors.email?.email}</div>}
                </div>

                <div className="homeAddressInput">
                    <div className="addressLine">
                    <p><span>*</span> {addressLineOne}</p>
                    <Input 
                        type="text" 
                        placeholder="Address"
                        name="addressLine1"
                        value={inputs.address.addressLine1} 
                        onChange={handleChange}/>
                    </div>
                    <div className="addressLine">
                    <p>{addressLineTwo}</p>
                    <Input 
                        type="text" 
                        placeholder="Address"
                        name="addressLine2"
                        value={inputs.address.addressLine2} 
                        onChange={handleChange}/>
                    </div>
                </div>

                <div className="homeCityInput">
                    <div className="state">
                    <p><span>*</span> {stateInfo}</p>
                    <Input 
                        type="text" 
                        placeholder="State"
                        name="state"
                        list="state" 
                        value={inputs.address.state} 
                        onChange={handleChangeAddressState}/>
                    <datalist id={"state"}>
                    {dataFetch.map((state, index) => (
                    <option value={state.name || state.code} 
                    key={`${state.name}${index}`} />
                      ))}
                    </datalist>
                    </div>
                    <div className="city">
                    <p><span>*</span> {cityInfo}</p>
                    <Input 
                        type="text" 
                        placeholder="City"
                        name="city" 
                        list="city"
                        disabled={inputs.address.state === ""} 
                        value={inputs.address.city} 
                        onChange={handleChange}/>
                     <datalist id={"city"}>
                      { tla && dataCities.map((city, index) => (
                          <option 
                          value={city.name || city.code} 
                          key={`${city.name}${index}`}> </option>
                        )
                      )}
                  </datalist>
                    </div>
                    <div className="zip">
                    <p><span>*</span> {postalCodeInfo}</p>
                    <Input 
                        type="text" 
                        placeholder="Zip"
                        name="postalCode" 
                        list="postalCode"
                        disabled={inputs.address.city  === "" ? true : false} 
                        value={inputs.address.postalCode} 
                        onChange={handleChange}/>
                    <datalist id="postalCode">
                    {dataPostalCodes.map((zip, index) => (
                    <option value={zip.name || zip.code} 
                    key={`${zip.name}${index}`}  />
                      ))}
                    </datalist>
                </div>
            </div>

            <div className="yearsOnAddress">
                <p><span>*</span> {howManyYears}</p>
                <Input 
                        type="number"
                        maxlength="2"
                        placeholder="Years"
                        name="residencyDuration"
                        value={inputs.residencyDuration} 
                        onChange={handleChange}
                        />
               {errors.residencyDuration && <div>{errors.residencyDuration?.residencyDuration}</div>}

            </div>
            </div>
            </div>

          <div className="firstButtonsField">
              <button className="back" onClick={prevStep}>{backButton}</button>
              <button className="next" onClick={onSubmitForm}
               disabled={
                isDisabled()
               }>{countinueButton}</button>
          </div>
        </div>
    );
};
 
export default StepTwo ;