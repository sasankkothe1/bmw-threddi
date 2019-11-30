import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {GoGlobe} from "react-icons/go";
import {GoThreeBars} from "react-icons/go";
import {GoLocation} from "react-icons/go";
import {Navbar, NavbarBrand} from 'react-bootstrap';

import EventStore from "../../stores/event.store";
import EventAction from "../../actions/actions";
import MapComponent from "../../components/map/MapComponent";
import EventSidebar from "../../components/eventSidebar/EventSidebar";

export default class Home extends Component {
    render() {
        return (
            <div className="wrap">
                <div className="fleft">
                    <MapComponent/>
                </div>
                <div className="fright">
                    <EventSidebar/>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {number: 0};

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        EventStore.addChangeListener("UPDATE_NUMBER", this.onSubmit);
    }

    updateNumber(){
        EventAction.updateNumber(1)
    }

    onSubmit() {
        this.setState({
            number: EventStore.getNumber()
        });
    }

}