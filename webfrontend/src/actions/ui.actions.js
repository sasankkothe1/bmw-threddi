
import UIDispatcher from '../dispatchers/ui.dispatcher'

class UIActions{

    closeAdditionalInformationModal(data){
        console.log("close da shihtldfhgö")
        UIDispatcher.dispatch({
            actionType: 'CLOSE_ADDITIONAL_INFORMATION_MODAL',
            value: data
        });
    }
    showAdditionalInformationModal(data){

        UIDispatcher.dispatch({
            actionType: 'SHOW_ADDITIONAL_INFORMATION_MODAL',
            value: data
        });
    }
}

export default new UIActions()