import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {GoGlobe} from "react-icons/go";
import {GoThreeBars} from "react-icons/go";
import {GoLocation} from "react-icons/go";
import {Navbar, NavbarBrand} from 'react-bootstrap';

import EventStore from "../stores/event.store";
import EventAction from "../actions/actions";

export default class Home extends Component {
    render() {
        return (
            <div className="main">
                <h1>This is home</h1>
                <h2>This is my number {this.state.number}</h2>
                <button onClick={()=>this.updateNumber()}>Click me</button>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {number: 0}

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