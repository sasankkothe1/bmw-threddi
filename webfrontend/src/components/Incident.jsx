import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncidentEventTable from './IncidentEventTable';
import IncidentEventDetails from './IncidentEventDetails';
import EventSideBar from './eventSidebarComponent/EventSidebar';


export default class Location extends Component {

    constructor(props){
        super(props);

        this.state={
            activeEvent: null
        }
    }

    render () {
        return (
        <div className="incidentClassMain">
            <IncidentEventTable onChangeActiveEvent={(event)=>this.setState({activeEvent:event})} />
            <EventSideBar activeEvent={this.state.activeEvent}  />
        </div>
        )
    }
}