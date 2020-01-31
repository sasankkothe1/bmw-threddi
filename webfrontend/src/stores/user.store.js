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
                
                break;
            case 'LOGIN_ERROR':
                
                localStorage.setItem("error", action.value.toString())
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
