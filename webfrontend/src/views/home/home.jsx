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
                                  onChangeActiveRequest={(event)=>this.onChangeActiveRequest(event)}
                                  onRemoveActiveEvent={()=>this.onRemoveActiveEvent()}/>
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
            activeEvent: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFetchEvents = this.onFetchEvents.bind(this);
        this.setActiveEvent = this.setActiveEvent.bind(this);


        EventAction.fetchEvents()
    }

    componentDidMount() {
        EventStore.addChangeListener("UPDATE_NUMBER", this.onSubmit);
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }

    updateNumber(){
        EventAction.updateNumber(1)
    }

    onChangeActiveRequest(event){
        console.log("CLICKED THE MARKER");
        this.setActiveEvent(event)
    }

    onSubmit() {
        this.setState({
            number: EventStore.getNumber()
        });
    }

    setActiveEvent(event){
        this.setState({
            activeEvent: event
        });
        console.log("ACTIVE EVENT", this.state.activeEvent)
    }

    onFetchEvents(){
        this.setState({
            events: EventStore.getEvents()
        })
    }

    onRemoveActiveEvent() {
        console.log("REMOVE IT")
        this.setState({
            activeEvent: null
        })
    }
}