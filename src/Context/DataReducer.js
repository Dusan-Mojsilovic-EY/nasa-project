const dataReducer = (state, action) => {
    let { value } = action.payload.target;

    switch (action.type) {
      case "email":
      case "residencyDuration":
      case "title":
      case "firstName":
      case "lastName":
      case "dateOfBirth":
      case "doesHaveAgricultureSkills":
      case "agricultureSkills":
      case "doesHaveMetalworkSkills":
      case "metalworkSkills":
      case "doesFlyAirplane":
      case "doesDriveCar":
      case "doesDriveBicycle":
      case "isConvicted":
        return {
          ...state,
          [action.type]: value,
        };
      case "addressLine1":
      case "addressLine2":
      case "postalCode":
        return {
          ...state,
          address: {
            ...state.address,
            [action.type]: value,
          },
        };
      case "state":
        return {
          ...state,
          address: {
            ...state.address,
            [action.type]: value,
            postalCode: "",
            city: "",
          },
        };
      case "city":
        return {
          ...state,
          address: {
            ...state.address,
            [action.type]: value,
            postalCode: "",
          },
        };
        // case "forWhat":
        // case "convictionDate":
        //   return {
        //       ...state,
        //       convictions: {
        //           ...state.convictions,
        //           [action.type]: value
        //   },
        // };
       
      default:
        throw new Error("Try again.");
    }
  };

export default dataReducer;