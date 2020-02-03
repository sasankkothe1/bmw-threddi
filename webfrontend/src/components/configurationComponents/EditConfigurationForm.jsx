import React, { Component } from 'react';
import Select from 'react-select';
import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import ToastComponent from "../ToastComponent";
import ConfigurationActions from '../../actions/configuration.actions';
import ConfigStore from '../../stores/config.store';
import configStore from "../../stores/config.store";

class EditConfigurationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      setValidated: false,
      processingArray: [],
      editConfiguration : {
        name: props.configuration.name,
        id: props.configuration.configuration_id,
        description: props.configuration.description,
        processing : props.configuration.processing,
        fieldMapping : props.configuration.default_properties.field_mappings,
        generalFilterOptions: props.configuration.default_properties.general_filter_options,
        filterOptions : props.configuration.default_properties.filter_options,
        sdi : props.configuration.default_properties.source_dependent_information
      },

      showError: false,
      error_msg: "",
      showToast: false
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleProcessing = this.handleProcessing.bind(this);
    //this.addMappingField = this.addMappingField.bind(this);
    //this.handleFieldMapping = this.handleFieldMapping.bind(this);
    this.addFilterField = this.addFilterField.bind(this);
    this.handleFilterMapping = this.handleFilterMapping.bind(this);
    this.addGeneralFilterField = this.addGeneralFilterField.bind(this);
    this.handleGeneralFilterMapping = this.handleGeneralFilterMapping.bind(this);
    this.addSDIField = this.addSDIField.bind(this);
    this.handleSDIMapping = this.handleSDIMapping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.configCreationFailError = this.configCreationFailError.bind(this);
    this.configurationCreatedSuccess = this.configurationCreatedSuccess.bind(this);
    this.handleProcessingChange = this.handleProcessingChange.bind(this)
    this.addSDIInformation = this.addSDIInformation.bind(this)
    this.deleteGF = this.deleteGF.bind(this)
    this.deleteFO = this.deleteFO.bind(this)
    this.deleteSDI = this.deleteSDI.bind(this)
    ConfigStore.addChangeListener("CONFIGURATOR_CREATION_FAILED" , this.configCreationFailError);
    configStore.addChangeListener("CONFIGURATION_CREATED_SUCCESS", this.configurationCreatedSuccess)
  }

  componentWillMount(){
    console.log("see whether o/p is right or wrong in the bottom.")
    console.log(this.state.editConfiguration)
  }
  configurationCreatedSuccess(){
      this.setState({
          showToast: true
      })
  }

  configCreationFailError (){
      console.log("something went wrong")
  }

  deleteGF = (e) => {
    e.persist()
    let array = [...this.state.editConfiguration.generalFilterOptions];
    console.log(array.splice(e.target.id,1))
    // this.setState({
    //   editConfiguration: {
    //     ...this.state.editConfiguration,
    //     generalFilterOptions : array.splice(e.target.id , 1)
    //   }
    // });
  }

  deleteFO(index) {

  }

  deleteSDI(index) {


  }


  handleChange = e => {
    e.persist();
    let value = e.target.value;
    this.setState(
      prevState => ({
        editConfiguration: {
          ...prevState.editConfiguration,
          [e.target.name]: value
        }
      })
    );
  };

  handleProcessingChange = (selectedOption) => {
    console.log("1     "  + this.state.processingArray)
    let processingArray = [];
    selectedOption.map((val,idx)=>{
      this.setState(prevState => ({
        processingArray: [...prevState.processingArray, val.value]
      }))
    });
    //this.setState({processingArray : processingArray});
    console.log(this.state.processingArray)
    }
  

  // handleFieldMapping(e) {
  //     e.persist();
  //     let classSplit = e.target.className.split(" ");
  //     console.log(classSplit[0]);
  //     if(["original","mapping"].includes(classSplit[0])){
          
  //         let fieldMappings = [...this.state.editConfiguration.fieldMapping];
  //         fieldMappings[e.target.id][classSplit[0]] = e.target.value;
  //         this.setState({fieldMappings});
  //     }
  // }

  handleFilterMapping(e) {
    e.persist();
    let classSplit = e.target.className.split(" ");
    if(["filter","method","threshold"].includes(classSplit[0])){
        
        let filterOptions = [...this.state.editConfiguration.filterOptions];
        filterOptions[e.target.id][classSplit[0]] = e.target.value;
        this.setState({filterOptions});
    }
    
  }

  handleGeneralFilterMapping(e) {
    e.persist();
    let classSplit = e.target.className.split(" ");
    if(["filter","method","threshold"].includes(classSplit[0])){
        
        let generalFilterOptions = [...this.state.editConfiguration.generalFilterOptions];
        generalFilterOptions[e.target.id][classSplit[0]] = e.target.value;
        this.setState({generalFilterOptions});
    }
    
  }

  

  handleSDIMapping(e) {
    e.persist();
    let classSplit = e.target.className.split(" ");
    if(["sdi_name","sdi_type","sdi_description"].includes(classSplit[0])){
        
        let sdi = [...this.state.editConfiguration.sdi];
        sdi[e.target.id][classSplit[0]] = e.target.value;
        this.setState({sdi});
    }
    console.log(this.state.editConfiguration)
  }

  handleSubmit(e){
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({validated:true});

    if(form.checkValidity() === true) {
        let editedConfiguration = this.state.editConfiguration;
        ConfigurationActions.updateConfiguration(editedConfiguration);
        ConfigurationActions.triggerExtracting();
    }
  }
  // addMappingField = () => {
  //   this.setState(prevState => ({
  //     editConfiguration: {
  //       ...prevState.editConfiguration,
  //       fieldMapping: this.state.editConfiguration.fieldMapping.concat([
  //         { original: "", mapping: "" }
  //       ])
  //     }
  //   }));
  //   console.log(this.state.editConfiguration)
  // };

  addFilterField = () => {
    this.setState(prevState => ({
      editConfiguration: {
        ...prevState.editConfiguration,
        filterOptions: this.state.editConfiguration.filterOptions.concat([
          { filter: "", method: "", threshold:"" }
        ])
      }
    }));
  };

  addSDIInformation(val, idx){
   
          
      let nameId = `${idx}`, typeId = `${idx}`, descId = `${idx}`
      
        return (
          <Form.Row>
            <Form.Group as={Col} md="4" id="sourceName">
              <Form.Control
                required
                type="text"
                //placeholder={`${idx + 1} name`}
                onChange={this.handleSDIMapping}
                name="name_fields"
                id={nameId}
                defaultValue = {val.displayname}
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
                defaultValue = {val.id}
                className = "sdi_type"
              />
            </Form.Group>

            <Form.Group as={Col} md="3" id="sourceDescription">
              <Form.Control
                required
                type="text"
                placeholder={`${idx + 1} description`}
                onChange={this.handleSDIMapping}
                name="desc_fields"
                id={descId}
                defaultValue = {val.description}
                className = "sdi_description"
              />
            </Form.Group>
            <Form.Group as={Col} md="1" >
                <Button block variant="danger" id={descId} onClick={this.deleteSDI}>-</Button>
              </Form.Group>
          </Form.Row>
        );
      
  }

  addGeneralFilterField = () => {
    this.setState(prevState => ({
      editConfiguration: {
        ...prevState.editConfiguration,
        generalFilterOptions: this.state.editConfiguration.generalFilterOptions.concat([
          { filter: "", method: "", threshold:"" }
        ])
      }
    }));
  };

  addSDIField = () => {
    this.setState(prevState => ({
      editConfiguration: {
        ...prevState.editConfiguration,
        sdi: this.state.editConfiguration.sdi.concat([
          { sdi_name: "", sdi_type: "", sdi_description:"" }
        ])
      }
    }));
  };
  render() {
    const processings = [
      {value:'enricher_noun_fetcher', label:'Noun fetcher enricher'},
      {value:'enricher_title_to_description', label:'Title to description enricher'},
      {value:'enricher_translator', label:'Translator enricher'},
      {value:'distance', label:'Distance'},
      {value:'datastore', label:'DataStore'}
    ]
      if(this.state.showToast){
          return <ToastComponent show = {this.state.showToast}
           body = "Extractor Created. It will take time to reflect" />
      }
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
              name="name"
              value={this.state.editConfiguration.name}
              className="readOnlyConfiguration"
              readOnly
            />
          </Col>
          <Form.Label column sm={2}>
            ID
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator ID"
              name="id"
              value={this.state.editConfiguration.id}
              className="readOnlyConfiguration"
              readOnly
            />
          </Col>
         
        </Form.Group>
        <Form.Group as={Row} md="12">
        <Form.Label column sm={2}>
            Processing
          </Form.Label>
          <Col sm={10}>
            <Select
              options = {processings}
              onChange={this.handleProcessingChange}
              autoFocus={true}
              isMulti
            />
          </Col>
          </Form.Group>
          <Form.Group as={Row} md="12">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              type="text"
              placeholder="Configurator Description"
              value={this.state.editConfiguration.description}
              onChange={this.handleChange}
              name="description"
            />
          </Col>
        </Form.Group>
        <hr />
        
        {/* {this.state.editConfiguration.fieldMapping.map((val, idx) => {
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
        </Button> */}
        {this.state.editConfiguration.generalFilterOptions.map((val, idx) => {
        let fieldId = `${idx}`, methodId = `${idx}`, thresholdId = `${idx}`
          return (
          
            <Form.Row>
              <Form.Group as={Col} md="4" id="filterColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} General filter`}
                  onChange={this.handleGeneralFilterMapping}
                  name="filter_fields"
                  id={fieldId}
                  defaultValue={val.field}
                  className = "filter"
                />
              </Form.Group>

              <Form.Group as={Col} md="4" id="methodColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} method`}
                  onChange={this.handleGeneralFilterMapping}
                  name="method_fields"
                  id={methodId}
                  defaultValue={val.method}
                  className = "method"
                />
              </Form.Group>

              <Form.Group as={Col} md="3" id="thresholdColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} threshold`}
                  onChange={this.handleGeneralFilterMapping}
                  name="threshold_fields"
                  id={thresholdId}
                  defaultValue={val.threshold}
                  className = "threshold"
                />
              </Form.Group>
              <Form.Group as={Col} md="1" >
                <Button block variant="danger" id={thresholdId} onClick={this.deleteGF}>-</Button>
              </Form.Group>
            </Form.Row>
          );
        })}
        <Button block variant="light" onClick={this.addGeneralFilterField}>
          + General Filter
        </Button>
        <hr/>
        { this.state.editConfiguration.filterOptions.map((val, idx) => {
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
                  defaultValue={val.field}
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
                  defaultValue={val.method}
                  className = "method"
                />
              </Form.Group>

              <Form.Group as={Col} md="3" id="thresholdColumn">
                <Form.Control
                  required
                  type="text"
                  placeholder={`${idx + 1} threshold`}
                  onChange={this.handleFilterMapping}
                  name="threshold_fields"
                  id={thresholdId}
                  defaultValue={val.threshold}
                  className = "threshold"
                />
              </Form.Group>
              <Form.Group as={Col} md="1" >
                <Button block variant="danger" id={thresholdId} onclick={this.deleteFO}>-</Button>
              </Form.Group>
            </Form.Row>
          );
        })}
        <Button block variant="light" onClick={this.addFilterField}>
          + Filter
        </Button>
        <hr/>
        {this.state.editConfiguration.sdi.map(this.addSDIInformation)}
        <Button block variant="light" onClick={this.addSDIField}>
          + Source Dependant Information
        </Button>
        <hr/>
        <Button block type="submit">Submit form</Button>
      </Form>
    );
  }
}
export default EditConfigurationForm;
