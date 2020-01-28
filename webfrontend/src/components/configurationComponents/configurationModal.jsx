import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import CreateConfiguratorForm from './createConfiguratorForm';


export default class ConfigurationModal extends Component {

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
                className="modal-wrapper"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add Configuration
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    {/* <CreateConfigurationForm /> */}
                    <CreateConfiguratorForm />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
        )
    }
}
