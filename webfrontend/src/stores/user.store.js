import {EventEmitter} from 'events';
import userLoginDispatcher from '../dispatchers/userLogin.dispatcher';

let _store = {

};

class UserStore extends EventEmitter{

    constructor() {
        super();
        this.dispatchToken = userLoginDispatcher.register(this.dispatcherCallback.bind(this))

    }

    emitChange(eventName){
        this.emit(eventName)
    }


    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'LOGIN_SUCCESSFUL':
                localStorage.setItem("token", action.value);
                break;
            case 'LOGIN_ERROR':
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
export default new UserStore()