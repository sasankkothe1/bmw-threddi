import {EventEmitter} from 'events';
import userRegistrationDispatcher from '../dispatchers/userRegistration.dispatcher';

let _store = {

};

class UserRegStore extends EventEmitter{

    constructor() {
        super();
        this.dispatchToken = userRegistrationDispatcher.register(this.dispatcherCallback.bind(this))

    }

    emitChange(eventName){
        this.emit(eventName)
    }


    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'REGISTRATION_SUCCESSFUL':
                localStorage.setItem("Regtoken", action.value);
                break;
            case 'REGISTRATION_ERROR':
                console.dir(action.value.toJSON().message);
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
export default new UserRegStore()