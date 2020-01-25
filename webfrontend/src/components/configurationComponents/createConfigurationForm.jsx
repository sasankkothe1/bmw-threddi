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
    
    // this.addOriginalField = this.addMappingField.bind(this);
    // this.addFilterField = this.addFilterField.bind(this);
    // this.addSIIField = this.addSIIField.bind(this);
    // this.handleConfigName = this.handleConfigName.bind(this);
    // this.handleConfigProcessing = this.handleConfigProcessing.bind(this);
    // this.handleConfigID = this.handleConfigID.bind(this);
    // this.handleConfigDescription = this.handleConfigDescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addMappingField() {
      var parentOriginalFieldElement = document.getElementById("originalFieldColumn");
      var parentMappingFieldelement = document.getElementById("mappingFieldColumn");
   
    var newOriginalField = document.createElement("input");
    var newMappingField = document.createElement("input");
    newOriginalField.setAttribute("required",""); newOriginalField.setAttribute("placeholder","Original Field"); newOriginalField.setAttribute("type", "text"); newOriginalField.setAttribute("class","form-control");
    newMappingField.setAttribute("required",""); newMappingField.setAttribute("placeholder","Mapping Field"); newMappingField.setAttribute("type", "text"); newMappingField.setAttribute("class","form-control");
    parentOriginalFieldElement.appendChild(newOriginalField);
    parentMappingFieldelement.appendChild(newMappingField);
  }

  addFilterField() {
    var parentFilterFieldElement = document.getElementById("filterColumn");
    var parentMethodFieldElement = document.getElementById("methodColumn");
    var parentThresholdFieldElement = document.getElementById("thresholdColumn");
  var newFilterField = document.createElement("input");
  var newMethodField = document.createElement("input");
  var newThresholdField = document.createElement("input");
  newFilterField.setAttribute("required",""); newFilterField.setAttribute("placeholder","Filter"); newFilterField.setAttribute("type", "text"); newFilterField.setAttribute("class","form-control");
  newMethodField.setAttribute("required",""); newMethodField.setAttribute("placeholder","Method"); newMethodField.setAttribute("type", "text"); newMethodField.setAttribute("class","form-control");
  newThresholdField.setAttribute("required",""); newThresholdField.setAttribute("placeholder","Threshold"); newThresholdField.setAttribute("type", "text"); newThresholdField.setAttribute("class","form-control");
  parentFilterFieldElement.appendChild(newFilterField);
  parentMethodFieldElement.appendChild(newMethodField);
  parentThresholdFieldElement.appendChild(newThresholdField);
}

addSIIField(){
    var parentSourceNameElement = document.getElementById("sourceName");
    var parentSourceTypeElement = document.getElementById("sourceType");
    var parentSourceDescriptionElement = document.getElementById("sourceDescription");
  var newSourceNameField = document.createElement("input");
  var newSourceTypeField = document.createElement("input");
  var newSourceDescriptionField = document.createElement("input");
  newSourceNameField.setAttribute("required",""); newSourceNameField.setAttribute("placeholder","Filter"); newSourceNameField.setAttribute("type", "text"); newSourceNameField.setAttribute("class","form-control");
  newSourceTypeField.setAttribute("required",""); newSourceTypeField.setAttribute("placeholder","Method"); newSourceTypeField.setAttribute("type", "text"); newSourceTypeField.setAttribute("class","form-control");
  newSourceDescriptionField.setAttribute("required",""); newSourceDescriptionField.setAttribute("placeholder","Threshold"); newSourceDescriptionField.setAttribute("type", "text"); newSourceDescriptionField.setAttribute("class","form-control");
  parentSourceNameElement.appendChild(newSourceNameField);
  parentSourceTypeElement.appendChild(newSourceTypeField);
  parentSourceDescriptionElement.appendChild(newSourceDescriptionField);
}

// handleConfigName = e => {
//     let config_name = e.target.value;
//         this.setState(
//             prevState => ({
//               newConfiguration: {
//                     ...prevState.newConfiguration,
//                     config_name: config_name
//                 }
//             }),
//             () => console.log(this.state.newConfiguration.config_name)
//         );
//   };

//   handleConfigProcessing = e => {
//     let config_processing = e.target.value;
//         this.setState(
//             prevState => ({
//               newConfiguration: {
//                     ...prevState.newConfiguration,
//                     config_processing: config_processing
//                 }
//             }),
//             () => console.log(this.state.newConfiguration.config_processing)
//         );
//   };

//   handleConfigID = e => {
//     let config_id = e.target.value;
//         this.setState(
//             prevState => ({
//               newConfiguration: {
//                     ...prevState.newConfiguration,
//                     config_id: config_id
//                 }
//             }),
//             () => console.log(this.state.newConfiguration.config_id)
//         );
//   };

//   handleConfigDescription = e => {
//     let config_description = e.target.value;
//         this.setState(
//             prevState => ({
//               newConfiguration: {
//                     ...prevState.newConfiguration,
//                     config_description: config_description
//                 }
//             }),
//             () => console.log(this.state.newConfiguration.config_description)
//         );
//   };

  handleChange = e => {
      e.persist();
      let value = e.target.value;
    this.setState(
        prevState => ({
          newConfiguration: {
                ...prevState.newConfiguration,
                [e.target.name]: value
            }
        }),
        () => console.log(this.state.newConfiguration.config_id)
    );
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
              onChange = {this.handleChange}
              name = "config_name"
            />
          </Col>
          <Form.Label column sm={2}>
            Processing
          </Form.Label>
          <Col sm={4}>
            <Form.Control required type="text" placeholder="Processing" onChange = {this.handleChange} name = "config_processing" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} md="6">
          <Form.Label column sm={2}>
            ID
          </Form.Label>
          <Col sm={4}>
            <Form.Control required type="text" placeholder="Configurator ID" onChange = {this.handleChange} name = "config_id" />
          </Col>
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator Description"
              onChange = {this.handleChange}
              name = "config_description"
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
            + Original and Mapping
          </Button>
        </Form.Row>
        <hr/>
        <Form.Row>
          <Form.Group as={Col} md="4" id="filterColumn">
            <Form.Label>Filter</Form.Label>
            <Form.Control required type="text" placeholder="Filter" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="methodColumn">
            <Form.Label>Method</Form.Label>
            <Form.Control required type="text" placeholder="Method" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="thresholdColumn">
            <Form.Label>Threshold</Form.Label>
            <Form.Control required type="text" placeholder="Threshold" />
          </Form.Group>
          <Button block variant="light" onClick={this.addFilterField}>
            + Filter
          </Button>
        </Form.Row>
        <hr />
        <Form.Row>
          <Form.Group as={Col} md="4" id="sourceName">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Name" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="sourceType">
            <Form.Label>Type</Form.Label>
            <Form.Control required type="text" placeholder="Type" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="sourceDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" placeholder="Description" />
          </Form.Group>
          <Button block variant="light" onClick={this.addSIIField}>
            + Source Dependant Information
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
