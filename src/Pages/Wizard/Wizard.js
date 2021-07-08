import React, {useState} from 'react';
import './Wizard.scss';

import StepOne from '../../Components/StepOne/StepOne'
import StepTwo from '../../Components/StepTwo/StepTwo'
import StepThree from '../../Components/StepThree/StepThree'

const Wizard = () => {

    const [step, setStep] = useState(1)

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const switchSections = () => {
        switch (step) {
            case 1: 
                return (<StepOne nextStep={nextStep} />)
            case 2:
                return (<StepTwo nextStep={nextStep} prevStep={prevStep}/>)
            case 3:
                return (<StepThree nextStep={nextStep} prevStep={prevStep}/>)
            default:
               return (console.log('Successful'))
        }
    }

    return(
        <div className="wizard">
          <h3>Aplication Wizard</h3>
          <div className="progressBar">
              <p> 0 / 3 Completed</p>
          </div>
          <div className="switch">
              {switchSections()}
          </div>
        </div>
    );
}
 
export default Wizard ;