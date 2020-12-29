import { Button, Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Are you sure?
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <p>
                    You are shure you wont to delete this note? You CAN NOT restore this NOTE later.
          </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={props.onHide}>Close</Button>
                <Button variant="danger" onClick={props.onExiting}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;