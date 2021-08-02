import React from "react";
import "./StepFour.scss";

import { successfullySentAplication, messageForAplicant } from "../../Constants/Constants";

const StepFour = () => (
    <div className="stepFour-container">
      <p>{successfullySentAplication}<span>&#9786;</span>	
      </p>
      <p>{messageForAplicant}</p>
    </div>
  );

export default StepFour;