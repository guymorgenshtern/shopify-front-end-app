import CentreWrapper from "./CentreWrapper";
import "../Styles/Modal.scss";

const Modal = (props) => {
  if (props.visible) {
    return (
      <CentreWrapper>
        <div className="modal">
          <button onClick={props.onClose}>Close</button>
          <div className="content">
            <div className="modal-header">{props.header}</div>
            <div className="modal-body">{props.body}</div>
          </div>
        </div>
      </CentreWrapper>
    );
  } else {
    return null;
  }
};

export default Modal;
