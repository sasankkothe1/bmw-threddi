import React, { Component } from 'react';

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';

import LocationAction from '../../actions/location.actions';
import {Redirect} from "react-router";

export default class LocationRow extends Component {

  constructor(props) {
    super(props);
    this.state={redirect: false}
  }

  setActiveLocation(location){
    LocationAction.updateActiveLocation(location.mainLocation.location_id);
    // this.props.history.push('/')
    this.setState({redirect:true})
  }


  render() {
    let location = this.props.location.mainLocation;
    return (
      <Accordion>
        {this.state.redirect? <Redirect to={{path:"/", state: {location_id: this.props.location.mainLocation.location_id}}} />:""}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {location.location_id.replace("_"," ")}
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">

                <div className="typeRow">
                  <div className="typeRowHeader">Type:</div>
                  <div className="typeRowContent">{location.location_type}</div>
                </div>

                <div className="descriptionHeader">Description:</div>
                <div className="descriptionContent">{location.description}</div>

                <div className="priorityRow">
                  <div className="typeRowHeader">Priority:</div>
                  <div className="typeRowContent">{location.priority}</div>
                </div>

                <div className="cardBodyButtons">
                  <Button variant="secondary"> Edit Location </Button>
                  <Button variant="danger" > Delete Location </Button>
                  <Button variant="link" onClick={()=>this.setActiveLocation(this.props.location)}>Show on map</Button>
                </div>
              </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}
