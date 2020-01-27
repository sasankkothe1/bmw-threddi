import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

class CreateConfigurationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated : false,
      newConfiguration: {
        config_name: "",
        config_id: "",
        config_processing: "",
        config_description: "",
        original_fields: [],
        mapping_fields: [],
        filters: [],
        methods: [],
        thresholds: [],
        sdi_names: [],
        sdi_types: [],
        sdi_descriptions: [],
      },
      
      showError: false,
      error_msg: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    //this.submitConfigurator = this.submitConfigurator.bind(this);
  }

  addMappingField() {
      let parentOriginalFieldElement = document.getElementById("originalFieldColumn");
      let parentMappingFieldelement = document.getElementById("mappingFieldColumn");
   
    let newOriginalField = document.createElement("input");
    let newMappingField = document.createElement("input");
    newOriginalField.setAttribute("required",""); newOriginalField.setAttribute("placeholder","Original Field"); newOriginalField.setAttribute("type", "text"); newOriginalField.setAttribute("class","form-control"); newOriginalField.setAttribute("name", "original_fields")
    newMappingField.setAttribute("required",""); newMappingField.setAttribute("placeholder","Mapping Field"); newMappingField.setAttribute("type", "text"); newMappingField.setAttribute("class","form-control"); newMappingField.setAttribute("name", "mapping_fields")
    parentOriginalFieldElement.appendChild(newOriginalField);
    parentMappingFieldelement.appendChild(newMappingField);
  }

  addFilterField() {
    let parentFilterFieldElement = document.getElementById("filterColumn");
    let parentMethodFieldElement = document.getElementById("methodColumn");
    let parentThresholdFieldElement = document.getElementById("thresholdColumn");
  let newFilterField = document.createElement("input");
  let newMethodField = document.createElement("input");
  let newThresholdField = document.createElement("input");
  newFilterField.setAttribute("required",""); newFilterField.setAttribute("placeholder","Filter"); newFilterField.setAttribute("type", "text"); newFilterField.setAttribute("class","form-control"); newFilterField.setAttribute("name" , "filters");
  newMethodField.setAttribute("required",""); newMethodField.setAttribute("placeholder","Method"); newMethodField.setAttribute("type", "text"); newMethodField.setAttribute("class","form-control"); newMethodField.setAttribute("name" , "methods")
  newThresholdField.setAttribute("required",""); newThresholdField.setAttribute("placeholder","Threshold"); newThresholdField.setAttribute("type", "text"); newThresholdField.setAttribute("class","form-control"); newThresholdField.setAttribute("name" , "thresholds")
  parentFilterFieldElement.appendChild(newFilterField);
  parentMethodFieldElement.appendChild(newMethodField);
  parentThresholdFieldElement.appendChild(newThresholdField);
}

addSIIField(){
    let parentSourceNameElement = document.getElementById("sourceName");
    let parentSourceTypeElement = document.getElementById("sourceType");
    let parentSourceDescriptionElement = document.getElementById("sourceDescription");
  let newSourceNameField = document.createElement("input");
  let newSourceTypeField = document.createElement("input");
  let newSourceDescriptionField = document.createElement("input");
  newSourceNameField.setAttribute("required",""); newSourceNameField.setAttribute("placeholder","Filter"); newSourceNameField.setAttribute("type", "text"); newSourceNameField.setAttribute("class","form-control"); newSourceNameField.setAttribute("name" , "names")
  newSourceTypeField.setAttribute("required",""); newSourceTypeField.setAttribute("placeholder","Method"); newSourceTypeField.setAttribute("type", "text"); newSourceTypeField.setAttribute("class","form-control"); newSourceTypeField.setAttribute("name" , "types")
  newSourceDescriptionField.setAttribute("required",""); newSourceDescriptionField.setAttribute("placeholder","Threshold"); newSourceDescriptionField.setAttribute("type", "text"); newSourceDescriptionField.setAttribute("class","form-control"); newSourceDescriptionField.setAttribute("name", "descriptions")
  parentSourceNameElement.appendChild(newSourceNameField);
  parentSourceTypeElement.appendChild(newSourceTypeField);
  parentSourceDescriptionElement.appendChild(newSourceDescriptionField);
}

  handleChange = e => {
      e.persist();
      let value = e.target.value;
    this.setState(
        prevState => ({
          newConfiguration: {
                ...prevState.newConfiguration,
                [e.target.name]: value
            }
        })//,
        // ()  => console.log("config id : " + this.state.newConfiguration.config_id +
        // "\n"+"config name : "+ this.state.newConfiguration.config_name + 
        // "\n"+"config processing : "+ this.state.newConfiguration.config_processing + 
        // "\n"+"config description : "+ this.state.newConfiguration.config_description)
    );
  }

  // submitConfigurator(e){
  //   e.persist();
  //   e.preventDefault();
  //   let org_fs= document.getElementsByName("original_fields");
  //    for(let i = 0; i<org_fs.length; i++) {
  //     let val = org_fs[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           original_fields: [...prevState.newConfiguration.original_fields, val]
  //         }
  //       })
  //     );
  //   }
  //   console.log(this.state.newConfiguration)
  //   let maps_fs= document.getElementsByName("mapping_fields");
  //   for(let i = 0; i<maps_fs.length; i++) {
  //     let val = maps_fs[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           mapping_fields: [...prevState.newConfiguration.mapping_fields, val]
  //         }
  //       })
  //     );
  //   }
  //   let fil_fs= document.getElementsByName("filters");
  //   for(let i = 0; i<fil_fs.length; i++) {
  //     let val = fil_fs[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           filters: [...prevState.newConfiguration.filters, val]
  //         }
  //       })
  //     );
  //   }
  //   let mets= document.getElementsByName("methods");
  //   for(let i = 0; i<mets.length; i++) {
  //     let val = mets[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           methods: [...prevState.newConfiguration.methods, val]
  //         }
  //       })
  //     );
  //   }
  //   let thres= document.getElementsByName("thresholds");
  //   for(let i = 0; i<thres.length; i++) {
  //     let val = thres[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           thresholds: [...prevState.newConfiguration.thresholds, val]
  //         }
  //       })
  //     );
  //   }
  //   let sdi_name= document.getElementsByName("names");
  //   for(let i = 0; i<sdi_name.length; i++) {
  //     let val = sdi_name[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           sdi_names: [...prevState.newConfiguration.sdi_names, val]
  //         }
  //       })
  //     );
  //   }
  //   let sdi_type= document.getElementsByName("types");
  //   for(let i = 0; i<sdi_type.length; i++) {
  //     let val = sdi_type[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           sdi_types: [...prevState.newConfiguration.sdi_types, val]
  //         }
  //       })
  //     );
  //   }
  //   let sdi_des= document.getElementsByName("descriptions");
  //   for(let i = 0; i<sdi_des.length; i++) {
  //     let val = sdi_des[i].value;
  //     console.log(val);
  //     this.setState (
  //       prevState => ({
  //         newConfiguration: {
  //           sdi_descriptions: [...prevState.newConfiguration.sdi_descriptions, val]
  //         }
  //       })
  //     );
  //   }
  //   console.log(this.state.newConfiguration);
  // }


  render() {
    return (
      <Form noValidate validated={this.state.validated}>
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
            <Form.Control required type="text" placeholder="Original Field" name = "original_fields" />
          </Form.Group>

          <Form.Group as={Col} md="6" id="mappingFieldColumn">
            <Form.Label>Mapping Field</Form.Label>
            <Form.Control required type="text" placeholder="Mapping Field" name = "mapping_fields" />
          </Form.Group>
          <Button block variant="light" onClick={this.addMappingField}>
            + Original and Mapping
          </Button>
        </Form.Row>
        <hr/>
        <Form.Row>
          <Form.Group as={Col} md="4" id="filterColumn">
            <Form.Label>Filter</Form.Label>
            <Form.Control required type="text" placeholder="Filter" name = "filters" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="methodColumn">
            <Form.Label>Method</Form.Label>
            <Form.Control required type="text" placeholder="Method" name = "methods" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="thresholdColumn">
            <Form.Label>Threshold</Form.Label>
            <Form.Control required type="text" placeholder="Threshold" name = "thresholds"/>
          </Form.Group>
          <Button block variant="light" onClick={this.addFilterField}>
            + Filter
          </Button>
        </Form.Row>
        <hr />
        <Form.Row>
          <Form.Group as={Col} md="4" id="sourceName">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Name" name = "names" />
          </Form.Group>

          <Form.Group as={Col} md="4" id="sourceType">
            <Form.Label>Type</Form.Label>
            <Form.Control required type="text" placeholder="Type" name = "types"/>
          </Form.Group>

          <Form.Group as={Col} md="4" id="sourceDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control required type="text" placeholder="Description" name = "descriptions" />
          </Form.Group>
          <Button block variant="light" onClick={this.addSIIField}>
            + Source Dependant Information
          </Button>
        </Form.Row>
        <hr/>
        <Form.Row>
          <Button block type="submit" onClick = {this.submitConfigurator}>Add the configurator</Button>
        </Form.Row>
      </Form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default CreateConfigurationForm;
