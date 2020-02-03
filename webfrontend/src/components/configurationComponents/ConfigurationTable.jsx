import React, { Component } from 'react';
import ConfigurationRow from './ConfigurationRow';

export default class ConfigurationTable extends Component {
  constructor(props){
    super(props)
  }

  render() {
      return (
        <div className="location-table">
          {this.props.configurations.length>0?
            this.props.configurations.map((configuration,idx) => (
              <ConfigurationRow key={idx} configuration={configuration._source.configuration}/>)): "No Locations found :("
          }
        </div>
      );
  }
}
