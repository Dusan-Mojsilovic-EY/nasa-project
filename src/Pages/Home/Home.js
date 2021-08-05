import React from "react";
import "./Home.scss";
import Carousel from "../../Components/Carousel/Carousel";
import {Link} from "react-router-dom";

const Home = () => (
    <div className="home">
      <Carousel /> 
      <div className="applicationPart">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cumque
          distinctio ducimus, repellendus similique eos sed corporis obcaecati.
          Soluta nesciunt fugiat quo expedita alias, in quas distinctio neque
          quam id?
        </p>
        <Link to="/aplication" id="appButton">Start Application Process</Link>
      </div>
    </div>
  );
  
export default Home;
