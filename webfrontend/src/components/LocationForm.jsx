import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';

export default class LocationForm extends Component {
    render () {
        return (
          <div>
          <h3> Sample Form Container </h3>
          <FormContainer />
          </div>
        )
    }
}
