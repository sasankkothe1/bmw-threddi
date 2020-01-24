import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

class CreateConfigurationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newConfiguration: {
        config_name: "",
        config_id: "",
        config_processing: "",
        config_description: "",
        field_mapping: {
          original_fields: [],
          mapping_fields: []
        },
        filter_options: {
          field: [],
          method: [],
          threshold: []
        },
        source_dependent_information: {
          name: [],
          type: [],
          description: []
        }
      },
      showError: false,
      error_msg: ""
    };
    this.addOriginalField = this.addMappingField.bind(this);
  }

  addMappingField() {
      var parentOriginalFieldElement = document.getElementById("originalFieldColumn");
      var parentMappingFieldelement = document.getElementById("mappingFieldColumn");
    //   var newOriginalFieldElement = document.createElement("<input required=\"\" placeholder=\"Original Field\" type=\"text\" class=\"form-control\">");
    //   var newMappingFieldElement = document.createElement("<input required=\"\" placeholder=\"Mapping Field\" type=\"text\" class=\"form-control\">");
    //   parentOriginalFieldElement.appendChild(newOriginalFieldElement);
    //   parentMappingFieldelement.appendChild(newMappingFieldElement);
    var newOriginalField = document.createElement("input");
    var newMappingField = document.createElement("input");
    newOriginalField.setAttribute("required","")
    newOriginalField.setAttribute("placeholder","Original Field");
    newOriginalField.setAttribute("type", "text");
    newOriginalField.setAttribute("class","form-control");
    newMappingField.setAttribute("required","")
    newMappingField.setAttribute("placeholder","Mapping Field");
    newMappingField.setAttribute("type", "text");
    newMappingField.setAttribute("class","form-control");
    parentOriginalFieldElement.appendChild(newOriginalField);
    parentMappingFieldelement.appendChild(newMappingField);
  }

  render() {
    return (
      <Form>
        <Form.Group as={Row} md="6">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator Name"
            />
          </Col>
          <Form.Label column sm={2}>
            Processing
          </Form.Label>
          <Col sm={4}>
            <Form.Control required type="text" placeholder="Processing" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} md="6">
          <Form.Label column sm={2}>
            ID
          </Form.Label>
          <Col sm={4}>
            <Form.Control required type="text" placeholder="Configurator ID" />
          </Col>
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator Description"
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Row>
          <Form.Group as={Col} md="6" id="originalFieldColumn">
            <Form.Label>Orginal Field</Form.Label>
            <Form.Control required type="text" placeholder="Original Field" />
          </Form.Group>

          <Form.Group as={Col} md="6" id="mappingFieldColumn">
            <Form.Label>Mapping Field</Form.Label>
            <Form.Control required type="text" placeholder="Mapping Field" />
          </Form.Group>
          <Button block variant="light" onClick={this.addMappingField}>
            + Original and Mapping Field
          </Button>
        </Form.Row>
      </Form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default CreateConfigurationForm;
