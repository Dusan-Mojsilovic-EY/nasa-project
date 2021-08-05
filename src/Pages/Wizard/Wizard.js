/* eslint-disable react/display-name */
import React, {useContext, useState} from "react";
import "./Wizard.scss";

import StepOne from "../../Components/StepOne/StepOne";
import StepTwo from "../../Components/StepTwo/StepTwo";
import StepThree from "../../Components/StepThree/StepThree";
import StepFour from "../../Components/StepFour/StepFour";

import {DataContext} from "../../Context/DataContext";
import { urlPost } from "../../Constants/Constants";
import { postData } from "../../DataFetch/DataFetch";


const Wizard = () => {

    const {data, setData, initialData} = useContext(DataContext);

    const [step, setStep] = useState(1);
 
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const progressStep = () => {
        if (step === 1) {
            return (
                <span>0</span>
            );
        } else if ( step === 2) {
            return (
                <span>1</span>
            );
        } else if ( step === 3) {
            return (
                <span>2</span>
            );
        } else {
            return (
                <span>3</span>
            );
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        const aplicant = {...data};

        if (data.doesHaveAgricultureSkills === "" || data.agricultureSkills === "") {
            aplicant.agricultureSkills = "No agriculture skills.";
        } 

        if (data.doesHaveMetalworkSkills === "" || data.metalworkSkills === "") {
            aplicant.metalworkSkills = "No metal work skills.";
        }

        if (data.convictions[0].forWhat === "" || data.convictions[0].convictionDate === "") {
            aplicant.convictions[0].forWhat = "Nothing to report";
            aplicant.convictions[0].convictionDate = "0001-01-01";
        }
        const urlForPost = urlPost + "/applicants";
        postData(urlForPost, aplicant)
        .then(response => {
            if (response.status < 200 && response.status > 400) {
                throw new Error("Could not fetch the data!");
            } else {
                setStep(4);
                setData(initialData);
            }})
        .catch((err) => {
        alert(err.message);
        });
    };

    const getRealDate = () => {
        let realDate = new Date();
        let date = realDate.getDate();
        let month = realDate.getMonth() + 1;
        let year = realDate.getFullYear();

        return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date< 10 ? `0${date}` : `${date}`}`;
    };
     
    const switchSections = (num) => {
       var wizardObj = {
            1: function() {
                return (<StepOne nextStep={nextStep} getRealDate={getRealDate} setData={setData} data={data} initialData={initialData} step={step}/>); },
            2: function() {
                return (<StepTwo nextStep={nextStep} prevStep={prevStep} setData={setData} data={data} initialData={initialData} step={step}/>);},
            3: function() {
                return (<StepThree nextStep={nextStep} getRealDate={getRealDate} submitForm={submitForm} prevStep={prevStep} setData={setData} data={data} initialData={initialData} setStep={setStep} step={step}/>);},
            4: function() {
                return (<StepFour />);},
            "default": function() {
               return (console.log("Default message"));}
       };
       return (wizardObj[num]() || wizardObj["default"]);
        };
    

    return(
        <div className="wizard">
          <h3>Aplication Wizard</h3>
          <div className="progressBar">
            <p> {progressStep()} / 3 Completed</p>
            <div className="bar">
              <div className={step === 1 ? "defaultBar" : "active"}></div>
              <div className={step === 1 || step === 2 ? "defaultBar" : "active"}></div>
              <div className={step === 1 || step === 2 || step === 3 ? "defaultBar" : "active"}></div>
            </div>
          </div>
          <div className="switch">
              {switchSections(step)}
          </div>
        </div>
    );
};
 
export default Wizard ;