/* eslint-disable react/prop-types */
import React from "react";
import "./Modal.scss";

const Modal = ({ modal, data, handleClose }) => {

  if (!modal) {
    return null;
  }

  const { title , explanation } = data;

  return (
    <div className="modal-Container">
      <section className="modal-Main">
        <div className="modal-Information">
          <div className="modal-Info">
            <h3 className="modal-Details">{title}</h3>
            <p className="modal-Notes">{explanation}</p>
          </div>
        </div>
        <button type="button" className="closeBtn" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
