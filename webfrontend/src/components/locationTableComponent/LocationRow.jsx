import React, { Component } from 'react';

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';

export default class LocationRow extends Component {
  render() {
    const location = this.props.location;

    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {this.props.location.location_id.replace("_"," ")}
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">

                <div className="typeRow">
                  <div className="typeRowHeader">Type:</div>
                  <div className="typeRowContent">{this.props.location.location_type}</div>
                </div>

                <div className="descriptionHeader">Description:</div>
                <div className="descriptionContent">{this.props.location.description}</div>

                <div className="priorityRow">
                  <div className="typeRowHeader">Priority:</div>
                  <div className="typeRowContent">{this.props.location.priority}</div>
                </div>

                <div className="cardBodyButtons">
                  <Button variant="secondary"> Edit Location </Button>
                  <Button variant="danger" > Delete Location </Button>
                </div>
              </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}
