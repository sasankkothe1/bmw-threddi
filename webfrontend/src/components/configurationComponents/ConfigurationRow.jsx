import React, { Component } from 'react';

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';

import ConfigurationActions from '../../actions/configuration.actions';
import {Redirect} from "react-router";
import EditConfigurationForm from './EditConfigurationForm';

export default class ConfigurationRow extends Component {

  constructor(props) {
    super(props);
    this.state={
      redirect: false,
      edit : false
    }

    this.editConfiguration = this.editConfiguration.bind(this);
  }

  editConfiguration(){
    this.setState({
      edit:true
    })
  }


  render() {
    let configuration = this.props.configuration;

    return (
      <>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {configuration.name}
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">

                <div className="typeRow">
                  <div className="typeRowHeader">Configuration ID:</div>
                  <div className="typeRowContent">{configuration.configuration_id}</div>
                </div>

                <div className="descriptionHeader">Description:</div>
                <div className="descriptionContent">{configuration.description}</div>

                <div className="cardBodyButtons">
                  <Button variant="secondary" onClick = {this.editConfiguration}> Edit Configuration </Button>
                </div>
              </Card.Body>
          </Accordion.Collapse>
          {this.state.edit? <EditConfigurationForm configuration={configuration} />:""} 
        </Card>
        
      </Accordion>
      
      </>
    )
  }
}
