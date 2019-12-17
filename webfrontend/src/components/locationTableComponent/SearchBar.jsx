import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    const filterText = this.props.filterText;

    return (
      React.createElement("form", null,
      React.createElement("input", {
        type: "text",
        placeholder: "Search locations ...",
        value: filterText })
      )
    );
  }}
