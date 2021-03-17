
import { React, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


function Confirmmodal(props) {
  
    return (
        <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter" style={{color:'crimson'}}>
          Confirm Deleting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete this</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onDelete} className="btn btn-danger">Yes</Button>
        <Button onClick={props.onHide} className="btn btn-info">No</Button>
      </Modal.Footer>
    </Modal>
    );
  }
  
  export default Confirmmodal