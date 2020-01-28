import {EventEmitter} from 'events';
import configuraitonSendDispatcher from '../dispatchers/configurationSend.dispatcher';
import ConfigService from '../services/config.service';

let _store = {
    configs: []
};

class ConfigStore extends EventEmitter{

    constructor() {
        super();

    }

    emitChange(eventName){
        this.emit(eventName)
    }


    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'CONFIGURATOR_CREATION_FAILED':
                console.dir(action.value.toJSON().message);
                //localStorage.setItem("error", action.value.toString())
                break;
            case 'FETCH_CONFIGS':
                await this.fetchConfigs(action.value);
                break;
        }

        this.emitChange(action.actionType);

        return true;
    }

    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    async fetchConfigs(value) {
        _store.fetchConfigs = await ConfigService.getEvents()
    }

    getConfigs() {
        //TODO Add the slice !
        return _store.configs;
    }
}
export default new ConfigStore()
