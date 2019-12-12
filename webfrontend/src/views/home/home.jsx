import React, {Component} from 'react';

import EventStore from "../../stores/event.store";
import EventAction from "../../actions/event.actions";
import MapComponent from "../../components/mapComponent/MapComponent";
import EventSidebar from "../../components/eventSidebarComponent/EventSidebar";
import AdditionalInformationModalComponent
    from "../../components/additionalInformationModal/AdditionalInformationModalComponent";

export default class Home extends Component {
    render() {
        return (
            <div className="wrap">
                <div className="fleft">
                    <MapComponent events={this.state.events}
                                  activeElement={this.state.activeEvent}/>
                </div>
                <div className="fright">
                    <EventSidebar activeEvent={this.state.activeEvent}
                                  onRemoveActiveEvent={()=>this.onRemoveActiveEvent()}/>
                </div>
                <div>
                    <AdditionalInformationModalComponent activeEvent={this.state.activeEvent}/>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            events: [],
            activeEvent: EventStore.getActiveEvent()
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFetchEvents = this.onFetchEvents.bind(this);
        this.onNewActiveEvent = this.onNewActiveEvent.bind(this);

        EventAction.fetchEvents()
    }

    componentDidMount() {
        EventStore.addChangeListener("UPDATE_NUMBER", this.onSubmit);
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
        EventStore.addChangeListener("UPDATE_ACTIVE_EVENT", this.onNewActiveEvent);

    }

    updateNumber(){
        EventAction.updateNumber(1)
    }

    onChangeActiveEvent(event){
        EventAction.updateActiveEvent(event);
    }

    onSubmit() {
        this.setState({
            number: EventStore.getNumber()
        });
    }

    onFetchEvents(){
        this.setState({
            events: EventStore.getEvents()
        })
    }

    onRemoveActiveEvent() {
        EventAction.updateActiveEvent(null)
    }

    onNewActiveEvent() {
        this.setState({
            activeEvent: EventStore.getActiveEvent()
        })
    }
}