import React, { Component } from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import EditConfigurationform from "./EditConfigurationForm";
import ListConfigurators from "./ListConfigurators";

export default class ConfigurationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      activeKey : "add"
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
        <Tabs activeKey={this.state.activeKey} id="noanim-tab-example">
         
          <Tab eventKey="add" title="All Configurators">
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
