import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal = (props) => {
    const onCancel = (event) => {
        event.preventDefault()
        props.onHide()
    }
    
    const onSubmit = (event) => {
        event.preventDefault()
        props.onSubmit()
    }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id='logout-modal'
    >   
        <Modal.Body>
            <h2>AUSLOGGEN</h2>
            <h3>Abmelden bestätigen?</h3>
            <div className="modal-btns">
                <a onClick={onCancel} data-dismiss="modal" className="cancel-btn">NEIN</a>
                <a onClick={onSubmit} className="logout-btn">JA</a>
            </div>
        </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal