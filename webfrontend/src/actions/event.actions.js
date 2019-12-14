
import EventDispatcher from '../dispatchers/events.dispatcher'

class EventActions{

    updateNumber(data){
        EventDispatcher.dispatch({
            actionType: 'UPDATE_NUMBER',
            value: data
        });
    }

    fetchEvents(data){
        EventDispatcher.dispatch({
            actionType: 'FETCH_EVENTS',
            value: data
        });
    }
    updateActiveEvent(data){
        EventDispatcher.dispatch({
            actionType: 'UPDATE_ACTIVE_EVENT',
            value: data
        });
    }
    updateHoveredEvent(data){
        EventDispatcher.dispatch({
            actionType: 'UPDATE_HOVERED_EVENT',
            value: data
        });
    }
}

export default new EventActions()