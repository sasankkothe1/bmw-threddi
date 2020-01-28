import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

class CreateConfiguratorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      newConfiguration: {
        name: "",
        id: "",
        processing: "",
        description: "",
        fieldMapping: [{ original: "", mapping: "" }],
        filterOptions: [{ filter: "", method: "", threshold: "" }],
        sdi: [{ sdi_name: "", sdi_type: "", sdi_description: "" }]
      },

      showError: false,
      error_msg: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMappingField = this.addMappingField.bind(this);
    this.handleFieldMapping = this.handleFieldMapping.bind(this);
    this.addFilterField = this.addFilterField.bind(this);
    this.handleFilterMapping = this.handleFilterMapping.bind(this);
    this.addSDIField = this.addSDIField.bind(this);
    this.handleSDIMapping = this.handleSDIMapping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      })
    );
  };

  handleFieldMapping(e) {
      e.persist();
      let classSplit = e.target.className.split(" ");
      console.log(classSplit[0]);
      if(["original","mapping"].includes(classSplit[0])){
          
          let fieldMappings = [...this.state.newConfiguration.fieldMapping];
          fieldMappings[e.target.id][classSplit[0]] = e.target.value;
          this.setState({fieldMappings});
      }
  }

  handleFilterMapping(e) {
    e.persist();
    let classSplit = e.target.className.split(" ");
    console.log(classSplit[0]);
    if(["filter","method","threshold"].includes(classSplit[0])){
        
        let filterOptions = [...this.state.newConfiguration.filterOptions];
        filterOptions[e.target.id][classSplit[0]] = e.target.value;
        this.setState({filterOptions});
    }
    
  }

  handleSDIMapping(e) {
    e.persist();
    let classSplit = e.target.className.split(" ");
    console.log(classSplit[0]);
    if(["sdi_name","sdi_type","sdi_description"].includes(classSplit[0])){
        
        let sdi = [...this.state.newConfiguration.sdi];
        sdi[e.target.id][classSplit[0]] = e.target.value;
        this.setState({sdi});
    }
    console.log(this.state.newConfiguration)
  }

  handleSubmit(){
      
  }
  addMappingField = () => {
    this.setState(prevState => ({
      newConfiguration: {
        ...prevState.newConfiguration,
        fieldMapping: this.state.newConfiguration.fieldMapping.concat([
          { original: "", mapping: "" }
        ])
      }
    }));
  };

  addFilterField = () => {
    this.setState(prevState => ({
      newConfiguration: {
        ...prevState.newConfiguration,
        filterOptions: this.state.newConfiguration.filterOptions.concat([
          { filter: "", method: "", threshold:"" }
        ])
      }
    }));
  };

  addSDIField = () => {
    this.setState(prevState => ({
      newConfiguration: {
        ...prevState.newConfiguration,
        sdi: this.state.newConfiguration.sdi.concat([
          { sdi_name: "", sdi_type: "", sdi_description:"" }
        ])
      }
    }));
  };
  render() {
    return (
      <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Group as={Row} md="6">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator Name"
              onChange={this.handleChange}
              name="name"
            />
          </Col>
          <Form.Label column sm={2}>
            Processing
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Processing"
              onChange={this.handleChange}
              name="processing"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} md="6">
          <Form.Label column sm={2}>
            ID
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator ID"
              onChange={this.handleChange}
              name="id"
            />
          </Col>
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator Description"
              onChange={this.handleChange}
              name="description"
            />
          </Col>
        </Form.Group>
        <hr />
        
        {this.state.newConfiguration.fieldMapping.map((val, idx) => {
        let originalId = `${idx}`, mappingId = `${idx}`
          return (
            <Form.Row>
              <Form.Group as={Col} md="6" id="originalFieldColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} original`}
                  onChange={this.handleFieldMapping}
                  name="original_fields"
                  id={originalId}
                  className = "original"
                />
              </Form.Group>

              <Form.Group as={Col} md="6" id="mappingFieldColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} mapping`}
                  onChange={this.handleFieldMapping}
                  name="mapping_fields"
                  id={mappingId}
                  className = "mapping"
                />
              </Form.Group>
            </Form.Row>
          );
        })}
        <Button block variant="light" onClick={this.addMappingField}>
          + Original and Mapping
        </Button>
        <hr />
        {this.state.newConfiguration.filterOptions.map((val, idx) => {
        let fieldId = `${idx}`, methodId = `${idx}`, thresholdId = `${idx}`
          return (
            <Form.Row>
              <Form.Group as={Col} md="4" id="filterColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} filter`}
                  onChange={this.handleFilterMapping}
                  name="filter_fields"
                  id={fieldId}
                  className = "filter"
                />
              </Form.Group>

              <Form.Group as={Col} md="4" id="methodColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} method`}
                  onChange={this.handleFilterMapping}
                  name="method_fields"
                  id={methodId}
                  className = "method"
                />
              </Form.Group>

              <Form.Group as={Col} md="4" id="thresholdColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} threshold`}
                  onChange={this.handleFilterMapping}
                  name="threshold_fields"
                  id={thresholdId}
                  className = "threshold"
                />
              </Form.Group>
            </Form.Row>
          );
        })}
        <Button block variant="light" onClick={this.addFilterField}>
          + Filter
        </Button>
        <hr/>
        {this.state.newConfiguration.sdi.map((val, idx) => {
        let nameId = `${idx}`, typeId = `${idx}`, descId = `${idx}`
          return (
            <Form.Row>
              <Form.Group as={Col} md="4" id="sourceName">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} name`}
                  onChange={this.handleSDIMapping}
                  name="name_fields"
                  id={nameId}
                  className = "sdi_name"
                />
              </Form.Group>

              <Form.Group as={Col} md="4" id="sourceType">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} type`}
                  onChange={this.handleSDIMapping}
                  name="type_fields"
                  id={typeId}
                  className = "sdi_type"
                />
              </Form.Group>

              <Form.Group as={Col} md="4" id="sourceDescription">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} description`}
                  onChange={this.handleSDIMapping}
                  name="desc_fields"
                  id={descId}
                  className = "sdi_description"
                />
              </Form.Group>
            </Form.Row>
          );
        })}
        <Button block variant="light" onClick={this.addSDIField}>
          + Source Dependant Information
        </Button>
      </Form>
    );
  }
}
export default CreateConfiguratorForm;
