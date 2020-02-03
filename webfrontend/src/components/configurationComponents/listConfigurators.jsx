import React, { Component } from "react";
import ConfigurationActions from "../../actions/configuration.actions";
import ConfigStore from "../../stores/config.store";
import ConfigurationTable from "./ConfigurationTable";

class ListConfigurators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      configs: [],
    };

    this.onFetchConfigs = this.onFetchConfigs.bind(this);
    ConfigurationActions.fetchConfigs();
  }

  componentWillMount() {
    ConfigStore.addChangeListener('FETCH_CONFIGS', this.onFetchConfigs);

  }

  componentWillUnmount() {
    ConfigStore.removeChangeListener("FETCH_CONFIGS", this.onFetchConfigs);
  }

  onFetchConfigs() {
    this.setState({
      configs: ConfigStore.getConfigs()
    })

    //console.log("+++++++++++" + this.state.configs[0]._source.configuration.name)

    // let configs = this.state.configs;
    // let configs_array = []
    // // let json_config = configs[0]._source.configuration;
    // // console.log(json_config.name)
    // // console.log(json_config.configuration_id)
    // // console.log(json_config.description)
    // // console.log(json_config.processing)
    // for(let i = 0; i<configs.length; i++){
    //   configs_array.push(configs[0]._source.configuration);
    // }

    // this.setState({
    //   configurations: configs_array
    // })
  }

  render() {
    return (
    <>
      <ConfigurationTable configurations = {this.state.configs} />
    </>
    )
  }
}
export default ListConfigurators;
