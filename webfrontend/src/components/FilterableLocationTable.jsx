import React, { Component } from 'react';
import LocationTable from './LocationTable.jsx';
import SearchBar from './SearchBar.jsx';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LocationFormModal from "./locationFormModalComponent/LocationFormModal";

import "./FilterableLocationTable.css";

// clear blocks to avoid mess up with other rows below

export default class FilterableLocationTable extends Component {
  constructor(props){
    super(props);
    this.state = {addModalShow : false}
  }

  render() {
    let addModalClose =() => this.setState({addModalShow: false});

    return (
      <div className ="FilterableLocationTableDiv">
        <div className="wrapper-search-bar">
          <div className="search-bar">
                <SearchBar id="filterText"/>
          </div>

          <div className="add-location-button">
          <Button variant='success' onClick={()=> this.setState({addModalShow: true})}> Add location </Button>
            <LocationFormModal
              show={this.state.addModalShow}
              onHide = {addModalClose} />
          </div>
        </div>

        <LocationTable locations={this.props.locations} />
      </div>)
  }
}
