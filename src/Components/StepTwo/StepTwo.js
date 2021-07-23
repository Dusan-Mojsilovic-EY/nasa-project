import React, {useState, useEffect} from 'react';
import './StepTwo.scss';
import { dataGet } from '../Axios/Axios';
import useFetch from '../useFetch/useFetch';
import Input from '../Inputs/Inputs';

import { emailErrMessage1, emailErrMessage2, residencyDurationErrMessage, url2 } from '../../Constants';

const StepTwo = ({prevStep, nextStep, data, setData, initialData}) => {

  const {dataFetch} = useFetch(url2);
  
  const [errors, setErrors] = useState({})
  const [tla, setTla] = useState('');

  const [dataCities, setDataCities] = useState([])
  const [dataPostalCodes, setDataPostalCodes] = useState([])
  const [cityFetchSelected, setCityFetchSelected] = useState(null)
    
  const [errorsCitites, setErrorsCities] = useState(null)
  const [errorsPostalCode, setErrorsPostalCode] = useState(null)
    
  useEffect(()=> {
        if (tla) {
        dataGet(url2 + "/" + tla + "/cities")
        .then(res => {
            setDataCities(res.data)
            setErrorsCities(null)
        })
        .catch(err => {
          setErrorsCities(err.message)
      })
    }
    },[tla])

    const [inputs, setInputs] = useState({
      email: initialData.email,
      residencyDuration: initialData.residencyDuration,
      address: {
            addressLine1: initialData.address.addressLine1,
            addressLine2: initialData.address.addressLine2,
            city: initialData.address.city,
            state: initialData.address.state,
            postalCode: initialData.address.postalCode,
      },
       
    });
    
    useEffect(()=> {
      if (cityFetchSelected) {
     dataGet(url2 + "/" + tla + "/cities/" + inputs.address.city + "/postalcodes" )
      .then(res => {
          setDataPostalCodes(res.data)
          setErrorsPostalCode(null)
      })
      .catch(err => {
        setErrorsPostalCode(err.message)
    })
  }
  },[inputs.address.city])

 
    const handleChange = (e) => {
      const {name, value} = e.target
        if (name === "residencyDuration" || name ==="email") {
        e.preventDefault();
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        })
        )
      }  else {
          e.preventDefault();
          setInputs((prevStep) => ({
              ...prevStep,
              address: {
                  ...inputs.address,
                  [name]: value
              }
          }))
          if (name === "city") {
            const cityFetch = dataCities.find((city) => city.name === value && city.name)
            cityFetch && setCityFetchSelected(cityFetch)
          }
      }};

   const handleChangeAddressState = (e) => {
        e.preventDefault();
        const {name, value} = e.target
          setInputs((prevStep) => ({
              ...prevStep,
              address: {
                  ...inputs.address,
                  [name]: value,
                  city: "",
                  postalCode: "",
              }
          }))
          if (name === "state") {
            const findTla = dataFetch.find((state) => state.name === value);
            findTla && setTla(findTla.tla);
          }
          
      }
    
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
          emailErr.email = emailErrMessage1;
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
         emailErr.email = emailErrMessage2;
         isValid = false;
        }

        if(inputs.residencyDuration < 1) {
          residencyDurationErr.residencyDuration = residencyDurationErrMessage
          isValid = false;
        }

       setErrors((errors) => ({
         ...errors,
          email: emailErr,
          residencyDuration: residencyDurationErr,
       }));
  
        return isValid;
    }
    
    const isDisabled = () => {
    if (!inputs.email ||
        !inputs.address.addressLine1 ||
        !inputs.address.city ||
        !inputs.address.state ||
       !inputs.address.postalCode ||
       !inputs.residencyDuration) {
         return true
       } else {
         return false
       }
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
                  <p>Mandatory fields are labeled with *</p>
              </div>

            <div className="secondInputFields">

                <div className="emailInput">
                    <p><span>*</span> What's your email address?</p>
                    <Input 
                        type={"text"} 
                        placeholder={"Email"}
                        name={"email"} 
                        value={inputs.email} 
                        onChange={handleChange}/>
                   {errors.email && <div>{errors.email?.email}</div>}
                </div>

                <div className="homeAddressInput">
                    <div className="addressLine">
                    <p><span>*</span> Address Line 1</p>
                    <Input 
                        type={"text"} 
                        placeholder={"Address"}
                        name={"addressLine1"} 
                        value={inputs.address.addressLine1} 
                        onChange={handleChange}/>
                    </div>
                    <div className="addressLine">
                    <p>Address Line 2</p>
                    <Input 
                        type={"text"} 
                        placeholder={"Address"}
                        name={"addressLine2"} 
                        value={inputs.address.addressLine2} 
                        onChange={handleChange}/>
                    </div>
                </div>

                <div className="homeCityInput">
                    <div className="state">
                    <p><span>*</span> State</p>
                    <Input 
                        type={"text"} 
                        placeholder={"State"}
                        name={"state"} 
                        list={"state"} 
                        value={inputs.address.state} 
                        onChange={handleChangeAddressState}/>
                    <datalist id={"state"}>
                    {dataFetch.map((state, index) => (
                    <option value={state.name || state.code} 
                    key={`${state.name}`+ index} />
                      ))}
                    </datalist>
                    </div>
                    <div className="city">
                    <p><span>*</span> City/Town</p>
                    <Input 
                        type={"text"} 
                        placeholder={"City"}
                        name={"city"} 
                        list={"city"} 
                        disabled={inputs.address.state === "" ? true : false} 
                        value={inputs.address.city} 
                        onChange={handleChange}/>
                     <datalist id={"city"}>
                      { tla && dataCities.map((city, index) => {
                        return (
                          <option 
                          value={city.name || city.code} 
                          key={`${city.name}`+ index}> </option>
                        )
                      })}
                  </datalist>
                    </div>
                    <div className="zip">
                    <p><span>*</span> Postal Code</p>
                    <Input 
                        type={"text"} 
                        placeholder={"Zip"}
                        name={"postalCode"} 
                        list={"postalCode"} 
                        disabled={inputs.address.city  === "" ? true : false} 
                        value={inputs.address.postalCode} 
                        onChange={handleChange}/>
                    <datalist id={"postalCode"}>
                    {dataPostalCodes.map((zip, index) => (
                    <option value={zip.name || zip.code} 
                    key={`${zip.name}`+ index}  />
                      ))}
                    </datalist>
                </div>
            </div>

            <div className="yearsOnAddress">
                <p><span>*</span> How many years have you lived there?</p>
                <Input 
                        type={"number"} 
                        placeholder={"Years"}
                        name={"residencyDuration"}
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
                isDisabled()
               }>Countinue</button>
          </div>
        </div>
    );
}
 
export default StepTwo ;