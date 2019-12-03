import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncidentEventTable from './IncidentEventTable';
import IncidentEventDetails from './IncidentEventDetails';
import EventSideBar from './eventSidebarComponent/EventSidebar';


export default class Location extends Component {
    render () {
        return (
        <div className="incidentClassMain">
            <IncidentEventTable />
            <EventSideBar />
        </div>
        )
    }
}