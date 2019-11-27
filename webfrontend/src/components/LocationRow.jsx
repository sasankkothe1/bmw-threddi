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
              {this.props.location.name}
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">
                <div>{this.props.location.description}</div>
                <div className="cardBodyButtons">
                  <Button variant="secondary"> Edit location </Button>
                  <Button variant="danger"> Delete location </Button>
                </div>
              </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}
