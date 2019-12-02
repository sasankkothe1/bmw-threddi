
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
}

export default new EventActions()