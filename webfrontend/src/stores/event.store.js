
import { EventEmitter } from 'events';
import EventDispatcher from '../dispatchers/events.dispatcher';

let _store = {
    number: 0
};

class EventStore extends EventEmitter{

    constructor() {
        super();
        this.dispatchToken = EventDispatcher.register(this.dispatcherCallback.bind(this))

    }

    emitChange(eventName){
        this.emit(eventName)
    }

    updateNumber(value){
        _store.number +=value;
    }

    dispatcherCallback(action) {
        switch(action.actionType) {
            case 'UPDATE_NUMBER':
                this.updateNumber(action.value);
                break;
            case 'TEST2':
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

    getNumber() {
        return _store.number;
    }
}
export default new EventStore()