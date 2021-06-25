import React from "react";
import "./Home.scss";
import Carousel from "../../Components/Carousel/Carousel";

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <div className="applicationPart">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cumque
          distinctio ducimus, repellendus similique eos sed corporis obcaecati.
          Soluta nesciunt fugiat quo expedita alias, in quas distinctio neque
          quam id?
        </p>
        <button id="appButton">Start Application Process</button>
      </div>
    </div>
  );
};

export default Home;
