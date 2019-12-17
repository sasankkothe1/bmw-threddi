import React, { Component } from 'react';
import LocationRow from './LocationRow.jsx';

export default class LocationTable extends Component {
  constructor(props){
    super(props)
  }

  render() {
      return (
        <div className="location-table">
          {
            this.props.locations.map((location,idx) => (
              <LocationRow key={idx} location={location._source.mainLocation}/>))
          }
        </div>
      );
  }
}
