import {EventEmitter} from 'events';
import LocationsDispatcher from '../dispatchers/locations.dispatcher';

let _store = {

};

class EventStore extends EventEmitter {

    constructor() {
        super();
        this.dispatchToken = LocationsDispatcher.register(this.dispatcherCallback.bind(this))

    }

    emitChange(eventName) {
        this.emit(eventName)
    }

    updateNumber(value) {
        _store.number += value;
    }

    async dispatcherCallback(action) {
        switch (action.actionType) {
            case 'UPDATE_NUMBER':
                this.updateNumber(action.value);
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