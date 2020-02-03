import ConfigService from "../services/config.service";
import configurationSendDispatcher from '../dispatchers/configurationSend.dispatcher';

class ConfigurationActions {

    updateConfiguration(data) {
        console.log("Update");
        ConfigService.updateConfig(data)
            .then(() => {
                ConfigurationActions.triggerExtracting();
                configurationSendDispatcher.dispatch({
                    actionType: 'CONFIGURATION_CREATED_SUCCESS',
                    value: 200
                });
            })
            .catch((error) => {
                    configurationSendDispatcher.dispatch({
                        actionType: 'CONFIGURATOR_CREATION_FAILED',
                        value: error
                    });
                }
            );
    }

    fetchConfigs(){
        configurationSendDispatcher.dispatch({
            actionType: 'FETCH_CONFIGS',
            value: undefined
        });
    }

    triggerExtracting() {
        ConfigService.triggerConfig()
            .then(() => {
                configurationSendDispatcher.dispatch({
                    actionType: 'TRIGGER_EXTRACTOR',
                    value: true
                })
            }).catch((error)=>{
                console.log("error", error);
                 configurationSendDispatcher.dispatch({
                    actionType: 'TRIGGER_EXTRACTOR_ERROR',
                    value: true
                })
        });

    }

}

export default new ConfigurationActions()
