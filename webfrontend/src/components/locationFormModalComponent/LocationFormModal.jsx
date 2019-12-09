import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import './LocationFormModal.css';
import FormContainer from '../locationFormComponent/FormContainer'


export default class LocationFormModal extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        return (
          <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add location
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <FormContainer />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
        )
    }
}
