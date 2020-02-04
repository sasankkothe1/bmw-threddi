import {EventEmitter} from 'events';
import LocationsDispatcher from '../dispatchers/locations.dispatcher';
import LocationsActions from '../actions/location.actions';

let _store = {
    locations: [],
    locations_error: {},
    active_location: null,
    deleted : false
};

class LocationStore extends EventEmitter {

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
            case 'UPDATE_ACTIVE_LOCATION':
                _store.active_location = action.value;
                break;
            case 'DELETE_LOCATION_ERROR':
                _store.locations_error = action.value;
                break;
            case 'DELETE_LOCATION_SUCCESSFUL':
                _store.deleted = true
                break;
            default:
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

    getActiveLocation(){
        return _store.active_location
    }

    getLocationError(){
        return _store.locations_error
    }
    getLocations() {
        return _store.locations;
    }

    getDeleted(){
      return _store.deleted;
    }


}

export default new LocationStore()
