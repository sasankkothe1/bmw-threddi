import React, { Component } from 'react';

export default class LocationNameRow extends Component {
  render() {
    const name = this.props.name;
    return (
      React.createElement("tr", null,
      React.createElement("th", { colSpan: "2" , style: { color: 'blue' }},
      name)));
  }
}
