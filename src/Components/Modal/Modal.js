import './Modal.scss'

const Modal = ({modal, data, handleClose}) => {

    if (!modal) {return null}

    return (
        <div className='Modal-Container'>
            <section className='Modal-Main'>
                <div className='Modal-Information'>
                    <img src={data.hdurl} alt="" />
                    <div className="Modal-Info">
                    <h3 className='Modal-Details'>{data.title}</h3>
                    <p className='Modal-Notes'>{data.explanation}</p>
                    </div>
                </div>
                <button type="button" className="closeBtn" onClick={handleClose}>Close</button>
            </section>
        </div>
      );
}
 
export default Modal;