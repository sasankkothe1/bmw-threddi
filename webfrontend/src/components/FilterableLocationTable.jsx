import React, { Component } from 'react';
import LocationTable from './LocationTable.jsx';
import SearchBar from './SearchBar.jsx';
import Button from 'react-bootstrap/Button'

import "./FilterableLocationTable.css";

// clear blocks to avoid mess up with other rows below

export default class FilterableLocationTable extends Component {
  render() {
    return (
      <div className ="FilterableLocationTableDiv">
        <div className="searchbar">
          <div>
                <SearchBar id="filterText"/>
          </div>
          <div className="SearchButton">
                <a href="/locations/form"> <Button variant="success"> Create new location </Button> </a>
          </div>
          <div />
        </div>
        <LocationTable locations={this.props.locations} />
      </div>)
  }
}
