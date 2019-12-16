
import EventDispatcher from '../dispatchers/locations.dispatcher'

class EventActions{

    updateNumber(data){
        EventDispatcher.dispatch({
            actionType: 'UPDATE_NUMBER',
            value: data
        });
    }
}

export default new EventActions()