import {EventEmitter} from 'events';
import UIDispatcher from '../dispatchers/ui.dispatcher';

let _store = {
    showAdditionalInformationModal: false
};

class UIStore extends EventEmitter{

    constructor() {
        super();
        this.dispatchToken = UIDispatcher.register(this.dispatcherCallback.bind(this))

    }

    emitChange(eventName){
        this.emit(eventName)
    }


    async dispatcherCallback(action) {
        switch(action.actionType) {
            case 'SHOW_ADDITIONAL_INFORMATION_MODAL':
                this.showAdditionalInformationModal(action.value);
                break;
            case 'CLOSE_ADDITIONAL_INFORMATION_MODAL':
                this.closeAdditionalInformationModal(action.value);
                break;

        }

        this.emitChange(action.actionType);

        return true;
    }

    showAdditionalInformationModal(val){
        _store.showAdditionalInformationModal = true;
    }

    closeAdditionalInformationModal(val){

        _store.showAdditionalInformationModal = false;
    }

    getShowAdditionalInformationModal(){
        return _store.showAdditionalInformationModal;
    }


    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }
}
export default new UIStore()