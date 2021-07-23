import React, { useEffect, useState } from "react";
import "./Carousel.scss";
import useFetch from "../useFetch/useFetch";
import Modal from "../Modal/Modal";
import { url, numberReq } from "../../Constants";


const Carousel = () => {

  const { dataFetch, error} = useFetch(url);

  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [modal, setModal] = useState(false);
  const [text, setText] = useState(null);

  const showModal = (tt) => {
    setModal(!modal);
    setText(tt);
  };

  const closeModal = () => {
    setModal(false);
  };

  let count = 4;

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (width < 900) {
    count = 2;
  }
  if (width < 600) {
    count = 1;
  }

  const goBack = () => {
    if (offset > 0) {
      setOffset(offset - count);
    } else {
      setOffset(offset);
    }
  };

  const goForward = () => {
    if (offset < numberReq - count) {
      setOffset(offset + count);
    } else {
      setOffset(offset);
    }
  };

  let newData;

  if (dataFetch.length === 0) {
    return (<div className='loading'>Loading ...</div>)
  } else {
    newData = dataFetch.slice(offset, offset + count);
  }

  return (
    <div className="container">
      <div className="carousel">
        <div className="leftButton">
          <button id="back" onClick={goBack}>
            ⇦
          </button>
        </div>
        <div className="curouselPictures">
        
          {dataFetch &&
            newData.map((elem) => {
              return (
                <div className="wrapper" key={elem.explanation}>
                  <img src={elem.hdurl} className="imageWrapper" alt="pic.jpg" />
                  <h3 className="imageTittle">{elem.title}</h3>
                  <button id="text" onClick={() => showModal(elem)}>
                    TEXT
                  </button>
                </div>
              );
            })}
        </div>
        <div className="rightButton">
          <button id="forward" onClick={goForward}>
            ⇨
          </button>
        </div>
      </div>
      <Modal 
        modal={modal} 
        data={text} 
        handleClose={closeModal}
      />
    </div>
  );
};

export default Carousel;
