import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Incident from './Incident';
import Home from '../views/home/home';
import Location from '../views/location/Location';
import LocationForm from './locationFormComponent/LocationForm';

export default class Main extends Component {
    render () {
        return (
            <div className="main">
                <Route exact path="/"          component={Home} />
                <Route exact path="/incidents" component={Incident} />
                <Route exact path="/locations" component={Location} />
            </div>
        )
    }
}
