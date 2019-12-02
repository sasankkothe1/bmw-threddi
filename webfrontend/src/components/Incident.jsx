import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer.jsx';

export default class Incident extends Component {
    render () {
        return (
            <div className="main">
                <h1> This is from Incident Page.</h1>
                <h3> Sample Form Container </h3>
                <FormContainer />
            </div>
        )
    }
}
