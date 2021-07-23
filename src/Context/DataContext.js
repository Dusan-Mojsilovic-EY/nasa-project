import React, { createContext, useState } from "react";
 
export const DataContext = createContext();
 
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
}
const DataContextProvider = ({ children }) => {

  const [data, setData] = useState(initialData);

  return (
    <DataContext.Provider value={{ data, setData, initialData }}>
      {children}
    </DataContext.Provider>
  );
};
 
export default DataContextProvider;