import React, { Component } from 'react';
import IncidentEventTable from './IncidentEventTable';
import EventSideBar from './eventSidebarComponent/EventSidebar';
import AdditionalInformationModalComponent from "./additionalInformationModal/AdditionalInformationModalComponent";
import EventAction from "../actions/event.actions";
import EventStore from "../stores/event.store";


export default class Incident extends Component {

    constructor(props){
        super(props);

        this.state={
            activeEvent: null
        };

        this.onNewActiveEvent = this.onNewActiveEvent.bind(this)
    }

    componentWillMount() {
        EventStore.addChangeListener("UPDATE_ACTIVE_EVENT", this.onNewActiveEvent);
    }

    componentWillUnmount() {
        EventStore.removeChangeListener("UPDATE_ACTIVE_EVENT", this.onNewActiveEvent);
    }

    onRemoveActiveEvent() {
        EventAction.updateActiveEvent(null)
    }
    onNewActiveEvent() {
        this.setState({activeEvent: EventStore.getActiveEvent()})
    }

    render () {
        return (
            <div className="wrap">
        <div className="fleft">
            <IncidentEventTable onChangeActiveEvent={(event)=>this.setState({activeEvent:event})} />
            </div>
            <div className="fright">
            <EventSideBar activeEvent={this.state.activeEvent}
                          onRemoveActiveEvent={() => this.onRemoveActiveEvent()}/>
                          </div>
            <div>
                <AdditionalInformationModalComponent activeEvent={this.state.activeEvent}/>
            </div>
        </div>
        )
    }
}
