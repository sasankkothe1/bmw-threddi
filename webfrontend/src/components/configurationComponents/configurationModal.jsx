import React, { Component } from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import CreateConfiguratorForm from "./createConfiguratorForm";
import ListConfigurators from "./listConfigurators";

export default class ConfigurationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1
    };

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
        <Tabs defaultActiveKey="add" id="noanim-tab-example">
          <Tab eventKey="add" title="Add Configurator">
            <Modal.Header closeButton />
            <Modal.Body>
              <div className="container">
                {/* <CreateConfigurationForm /> */}
                <CreateConfiguratorForm />
              </div>
            </Modal.Body>
           
          </Tab>
          <Tab eventKey="edit" title="All Configurators">
          <Modal.Header/>
            <Modal.Body>
              <div className="container">
                <ListConfigurators/>
              </div>
            </Modal.Body>
          </Tab>
        </Tabs>

        
        <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>
                Close
              </Button>
            </Modal.Footer>
      </Modal>
    );
  }
}
