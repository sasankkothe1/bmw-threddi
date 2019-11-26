import React, { Component } from 'react';

import Card from "react-bootstrap/Card"

export default class LocationRow extends Component {
  render() {
    const location = this.props.location;

    return (
        <Card>
          <Card.Header>
            {this.props.location.name}
          </Card.Header>

          <Card.Body>
            <div>{this.props.location.description}</div>
          </Card.Body>
        </Card>
    )
  }
}
