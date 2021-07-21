import React, { createContext, useState } from "react";
 
export const DataContext = createContext();
 
const emptyData = {
  title: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",

  email: "",
  residencyDuration: 0,
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
}
const DataContextProvider = ({ children }) => {

  const [data, setData] = useState(emptyData);

  return (
    <DataContext.Provider value={{ data, setData, emptyData }}>
      {children}
    </DataContext.Provider>
  );
};
 
export default DataContextProvider;