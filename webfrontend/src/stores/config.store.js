import {EventEmitter} from 'events';
import configurationSendDispatcher from '../dispatchers/configurationSend.dispatcher';
import ConfigService from '../services/config.service';

let _store = {
    configs: [],
    status : null
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
            case 'CONFIGURATION_CREATED_SUCCESS':
                this.setStatus(200);
                break;
            case 'CONFIGURATOR_CREATION_FAILED':
                this.setStatus(400);
                //localStorage.setItem("error", action.value.toString())
                break;
            case 'FETCH_CONFIGS':
                await this.fetchConfigs();
                break;
            case 'TRIGGER_EXTRACTOR':
                alert("tRIGER it");
                break;
            default:
                break;
        }

        this.emitChange(action.actionType);

        return true;
    }

    setStatus(value){
        _store.status = value;
    }
    
    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    async fetchConfigs() {
        _store.fetchConfigs = await ConfigService.getEvents()
    }

    getConfigs() {
        //TODO Add the slice !
        return _store.configs;
    }
}
export default new ConfigStore()
