import React from 'react';
import './Home.scss';

import Carousel from '../../Components/Carousel/Carousel';


const Home = () => {
    return(
        <div className="Home">
          <Carousel />
          <div className="ApplicationPart">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cumque distinctio ducimus, repellendus similique eos sed corporis obcaecati. Soluta nesciunt fugiat quo expedita alias, in quas distinctio neque quam id?</p>
              <button className="AppButton">Start Application Process</button>
          </div>
        </div>
    );
}
 
export default Home ;