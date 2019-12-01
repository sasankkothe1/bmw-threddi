import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {GoGlobe} from "react-icons/go";
import {GoThreeBars} from "react-icons/go";
import {GoLocation} from "react-icons/go";
import {Navbar, NavbarBrand} from 'react-bootstrap';

import EventStore from "../../stores/event.store";
import EventAction from "../../actions/event.actions";
import MapComponent from "../../components/mapComponent/MapComponent";
import EventSidebar from "../../components/eventSidebarComponent/EventSidebar";

export default class Home extends Component {
    render() {
        return (
            <div className="wrap">
                <div className="fleft">
                    <MapComponent events={this.state.events}/>
                </div>
                <div className="fright">
                    <EventSidebar/>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            events: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onFetchEvents = this.onFetchEvents.bind(this);
        EventAction.fetchEvents()
    }

    componentDidMount() {
        EventStore.addChangeListener("UPDATE_NUMBER", this.onSubmit);
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }

    updateNumber(){
        EventAction.updateNumber(1)
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
}