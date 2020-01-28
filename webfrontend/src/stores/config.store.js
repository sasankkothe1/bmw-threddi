import {EventEmitter} from 'events';
import configuraitonSendDispatcher from '../dispatchers/configurationSend.dispatcher';

let _store = {

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
}
export default new ConfigStore()
