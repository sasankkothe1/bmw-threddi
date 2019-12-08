import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import FilterableLocationTable from './FilterableLocationTable.jsx';
import Image from "./pictures/graph_events_locationView.png";
import LocationFormModal from "./locationFormModalComponent/LocationFormModal";

export default class Location extends Component {

    constructor(props){
      super(props);

      this.state = {
        locations: [
          { id: '00001', name: 'BMW Welt Munich', lat: '24.019',
          long: '26.013', type: 'Exhibition location',
          description: 'The BMW Welt is a combined exhibition, delivery, adventure, museum and event venue.', priority: '8'},
          { id: '00002', name: 'Production facility Oslo', lat: '26.513', long: '100.251',
           type: 'Production facility - BMW 1', description: 'Production facility located in Oslo suburbs', priority: '4'},
          { id: '00003', name: 'Production facility Mexico City', lat: '26.513', long: '100.251',
            type: 'Production facility - BMW 5', description: 'Production facility specialized in BMW 5 vehicles', priority: '6'},
          { id: '00004', name: 'BMW Group South Africa SAP Shared Service Center', lat: '26.513', long: '100.251',
             type: 'Internal IT Service', description: 'Shared servicec center for SAP services', priority: '10'},
          { id: '00005', name: 'BMW Group Research Center Shanghai', lat: '26.513', long: '100.251',
                type: 'R&D Center Shanghai', description: 'Research and Development Centercomprises four departments focusing on future mobility trends.', priority: '10'}
        ]}

    }


    render () {
        return (
        <div className="page-content">
          <div className="locationTable">
            <FilterableLocationTable locations = {this.state.locations} />
          </div>
          <div className="picture-container">
            <div className="picture">
              <img src={Image} alt="website logo" height={200} width={'auto'}/>
            </div>
          </div>
        </div>
        )
    }
}
