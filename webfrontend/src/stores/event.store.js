import {EventEmitter} from 'events';
import EventDispatcher from '../dispatchers/events.dispatcher';
import EventService from "../services/events.service";

let _store = {
    number: 0,
    events: [],
    activeEvent: null,
    hovered_event: null
};

class EventStore extends EventEmitter {

    constructor() {
        super();
        this.dispatchToken = EventDispatcher.register(this.dispatcherCallback.bind(this))

    }

    emitChange(eventName) {
        this.emit(eventName)
    }

    updateNumber(value) {
        _store.number += value;
    }

    updateActiveEvent(event) {
        _store.activeEvent = event
    }

    updateHoveredEvent(event) {
        _store.hovered_event = event
    }


    async dispatcherCallback(action) {
        switch (action.actionType) {
            case 'UPDATE_NUMBER':
                this.updateNumber(action.value);
                break;

            case 'FETCH_EVENTS':
                await this.fetchEvents(action.value);
                break;
            case 'UPDATE_ACTIVE_EVENT':
                await this.updateActiveEvent(action.value);
                break;

            case 'UPDATE_HOVERED_EVENT':
                await this.updateHoveredEvent(action.value);
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

    getActiveEvent() {
        return _store.activeEvent;
    }

    getEvents() {
        return _store.events;
    }
    getNumberOfEvents() {
        return _store.events.length;
    }
    getHoveredEvent(){
        return _store.hovered_event;
    }

    async fetchEvents(value) {
        _store.events = await EventService.getEvents()
    }
}

export default new EventStore()