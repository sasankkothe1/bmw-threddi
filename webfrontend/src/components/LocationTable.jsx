import React, { Component } from 'react';
import LocationNameRow from './LocationNameRow.jsx';
import LocationRow from './LocationRow.jsx';

export default class LocationTable extends Component {
  constructor(props){
    super(props)
  }


  render() {
      return (
        <div className="location-table">
          {
            this.props.locations.map(location => (
              <LocationRow key={location.id} location={location}/>))
          }
        </div>
      );
  }
}
