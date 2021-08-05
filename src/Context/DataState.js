/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { DataContext } from "./DataContext";
// import dataReducer from "./DataReducer";

const initialData = {
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  
    email: "",
    residencyDuration: "",
    address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
    },
  
    doesHaveAgricultureSkills: "",
    agricultureSkills: "",
    
    doesHaveMetalworkSkills: "",
    metalworkSkills: "",
    
    isConvicted: "",
    convictions: [
      {
       forWhat: "",
       convictionDate: "",
      }
    ],
    doesFlyAirplane: "",
    doesDriveCar: "",
    doesDriveBicycle: "",
};

const DataState = (props) => {

    const [data, setData] = useState(initialData);

    return (
        <DataContext.Provider value={{ data, setData, initialData }}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataState;