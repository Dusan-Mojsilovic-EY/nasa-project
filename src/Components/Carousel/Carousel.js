import React, { useEffect, useState } from "react";
import "./Carousel.scss";
import useFetch from "../useFetch/useFetch";
import Modal from "../Modal/Modal";


const Carousel = () => {
  const { data, numberReq} = useFetch();

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
  }, []);

  // useEffect(() => {
  //   if (offset === 0) {
  //     setActivePage(0);
  //   } else if (offset > 0 && offset < numberReq - count) {
  //     setActivePage(1);
  //   } else if (offset + count == numberReq) {
  //     setActivePage(2);
  //   }
  // }, [offset, numberReq, count]);

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

  if (data.length === 0) {
    return (<div className='loading'>Loading ...</div>)
  } else {
    newData = data.slice(offset, offset + count);
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
        
          {data &&
            newData.map((e) => {
              return (
                <div className="wrapper" key={e.explanation}>
                  <img src={e.hdurl} className="imageWrapper" alt="pic.jpg" />
                  <h3 className="imageTittle">{e.title}</h3>
                  <button id="text" onClick={() => showModal(e)}>
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
