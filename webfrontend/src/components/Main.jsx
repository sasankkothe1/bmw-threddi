import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Incident from './Incident';
import Home from '../views/home/home';
import Location from '../views/location/Location';
import LoginPage from '../views/login/LoginPage';
import Register from '../views/registration/registration-page';

export default class Main extends Component {
    render () {
        return (
            <div className="main">
                <Route exact path="/" component={Home} />
                <Route exact path="/home/:activeLocation" component={Home} />
                <Route exact path="/incidents" component={Incident} />
                <Route exact path="/locations" component={Location} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={Register} />
            </div>
        )
    }
}
