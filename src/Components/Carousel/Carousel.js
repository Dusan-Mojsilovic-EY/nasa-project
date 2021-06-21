import React from 'react';
import './Carousel.scss';

import useFetch from '../useFetch/useFetch';

const Carousel = () => {
   
    const {data} = useFetch()
    console.log(data);
    return(
        <div className="Carousel">
            <div className="LeftButton">⇦</div>
             <div className="CurouselPictures">
                {data && data.map((e) => {
                 return ( 
                 <div className="Wrapper">
                    <img src={e.hdurl} className="ImageWrapper"/>
               
                <h3 className="ImageTittle">{e.title}</h3>
                <p className="ImageText">{e.explanation}</p>
               
                </div> 
                )
        })}
        </div>
            <div className="RightButton">⇨</div>
        </div>
    );
}
 
export default Carousel;