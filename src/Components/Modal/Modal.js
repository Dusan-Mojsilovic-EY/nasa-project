import "./Modal.scss";

const Modal = ({ modal, data, handleClose }) => {
  if (!modal) {
    return null;
  }

  return (
    <div className="modal-Container">
      <section className="modal-Main">
        <div className="modal-Information">
          <img src={data.hdurl} alt="pic.jpg" />
          <div className="modal-Info">
            <h3 className="modal-Details">{data.title}</h3>
            <p className="modal-Notes">{data.explanation}</p>
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
