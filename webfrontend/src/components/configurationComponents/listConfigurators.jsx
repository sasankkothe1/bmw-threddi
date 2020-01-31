import React, { Component } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import ConfigurationActions from '../../actions/configuration.actions';
import ConfigStore from '../../stores/config.store';
import configStore from "../../stores/config.store";

class ListConfigurators extends Component {
  constructor(props) {
    super(props);

    this.state = {
        configs: ConfigStore.getConfigs()
    }

    this.onFetchConfigs = this.onFetchConfigs.bind(this);
  }

  componentDidMount() {
    ConfigStore.addChangeListener("FETCH_CONFIGS", this.onFetchConfigs);

    if (this.state.configs.length < 1) {
        ConfigurationActions.fetchConfigs();
    }

}

onFetchConfigs() {
    this.setState({
        configs: configStore.getConfigs()
    })
    console.log(this.state.configs[0]);
}

  render() {
    return (
        <h1>This is bla bla</h1>
    );
  }
}
export default ListConfigurators;
