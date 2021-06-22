import React, {useEffect, useState} from 'react';
import './Carousel.scss';

import useFetch from '../useFetch/useFetch';

const Carousel = () => {
   
    const {data} = useFetch()
    console.log(data);

    const [offset, setOffset] = useState(0)
    const [width, setWidth] = useState(window.innerWidth)
    
    let count = 4;

    useEffect(() => {
        const listener = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", listener)
        
        return () => {
        window.removeEventListener("resize", listener)
        }
        
    },[])

    console.log(width)

    if (width < 900 ) {
        count = 2
    } 
    if (width < 600) {
        count = 1
     }

    const goBack = () => {
        setOffset(offset - count)
        }
    

    const goForward = () => {
        setOffset(offset + count)
    }
    
    if (!data) { return null}

    const newData = data.slice(offset, offset + count)
    
  

    return(
        <div className="Carousel">
            <div className="LeftButton">
                <button id="back" onClick={goBack}>⇦</button>
            </div>
            <div className="CurouselPictures">
                {data && newData.map((e) => {
                 return ( 
                 <div className="Wrapper">
                    <img src={e.hdurl} className="ImageWrapper"/>
               
                <h3 className="ImageTittle">{e.title}</h3>
                <p className="ImageText">{e.explanation}</p>
               
                </div> 
                )
        })}
        </div>
        
            <div className="RightButton">
                <button id="forward" onClick={goForward}>⇨</button>
            </div>
        </div>
    );
}
 
export default Carousel;