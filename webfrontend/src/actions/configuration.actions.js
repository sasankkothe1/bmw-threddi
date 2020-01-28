import ConfigurationSendDispatcher from '../dispatchers/configurationSend.dispatcher';
import ConfigCreateService from "../services/configCreate.service";

class ConfigurationActions {

    createConfiguration(data) {
        ConfigCreateService.createConfig(data)
            .catch((error)=>{
                ConfigurationSendDispatcher.dispatch({
                    actionType: 'CONFIGURATOR_CREATION_FAILED',
                    value: error
                });
            }
        );
    }

}

export default new ConfigurationActions()
