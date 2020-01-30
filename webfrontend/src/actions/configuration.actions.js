import ConfigService from "../services/config.service";
import configurationSendDispatcher from '../dispatchers/configurationSend.dispatcher';

class ConfigurationActions {

    createConfiguration(data) {
        ConfigService.createConfig(data)
        .then(() => {
            configurationSendDispatcher.dispatch({
                actionType:'CONFIGURATION_CREATED_SUCCESS',
                value: 200
            });
        })
            .catch((error)=>{
                configurationSendDispatcher.dispatch({
                    actionType: 'CONFIGURATOR_CREATION_FAILED',
                    value: error
                });
            }
        );
    }

    fetchConfigs(data){
        configurationSendDispatcher.dispatch({
            actionType: 'FETCH_CONFIGS',
            value: data
        });
    }

}

export default new ConfigurationActions()
