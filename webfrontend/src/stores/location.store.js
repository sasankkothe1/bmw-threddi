import {EventEmitter} from 'events';
import LocationsDispatcher from '../dispatchers/locations.dispatcher';

let _store = {
    locations: [],
    locations_error: {}
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
            case 'GET_LOCATIONS':
                _store.locations = action.value;
                break;

            case 'POST_LOCATION_SUCCESSFUL':
                break;

            case 'POST_LOCATION_ERROR':
                _store.locations_error = action.value;
                break;

            case 'GET_LOCATION_ERROR':
                _store.locations_error = action.value;
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

    getLocationError(){
        return _store.locations_error
    }
    getLocations() {
        return _store.locations;
    }


}

export default new EventStore()