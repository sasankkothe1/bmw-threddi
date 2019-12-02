import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncidentEventTable from './IncidentEventTable';
import IncidentEventDetails from './IncidentEventDetails';


export default class Location extends Component {
    render () {
        return (
        <div className="incidentClassMain">
            <IncidentEventTable />
            <IncidentEventDetails />
        </div>
        )
    }
}